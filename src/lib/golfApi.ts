/**
 * ESPN PGA scoreboard — no API key.
 * Masters: event-specific endpoint (single event at root).
 * @see https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard/{eventId}
 */

const ESPN_PGA_SCOREBOARD_BASE =
  'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard'

/**
 * Masters Tournament — update when ESPN publishes a new event id for the next year
 * (find in league calendar or `scoreboard` JSON).
 */
export const MASTERS_EVENT_ID = '401811941'

export const ESPN_PGA_MASTERS_SCOREBOARD = `${ESPN_PGA_SCOREBOARD_BASE}/${MASTERS_EVENT_ID}`

/** Generic “current PGA week” URL — not used by the app. */
export const ESPN_PGA_SCOREBOARD = ESPN_PGA_SCOREBOARD_BASE

/** Strokes vs par for rounds 1–4; null = round not finished / not started on ESPN. */
export type FourRoundsNullable = readonly [
  number | null,
  number | null,
  number | null,
  number | null,
]

export interface LeaderboardPlayer {
  id: string
  displayName: string
  position: number
  totalToPar: number | null
  /** Raw ESPN total-to-par token: E, +2, -5, MC, etc. */
  scoreRaw: string
  missedCut: boolean
  /** Per-round score vs par from `linescores` (period 1–4, `displayValue`). */
  roundToPar: FourRoundsNullable
}

export interface TournamentSnapshot {
  tournamentName: string
  eventId: string
  players: LeaderboardPlayer[]
}

export type ScoreboardResult = { ok: true; data: TournamentSnapshot } | { ok: false; error: string }

/** Parse ESPN total relative to par; null if absent or non-numeric status (e.g. MC). */
export function parseScoreToPar(raw: string | undefined | null): number | null {
  if (raw == null || raw === '') return null
  const s = String(raw).trim()
  const upper = s.toUpperCase()
  if (upper === 'E') return 0
  if (isMissedCutToken(upper)) return null
  const parsed = Number.parseInt(s.replace(/^\+/, ''), 10)
  return Number.isNaN(parsed) ? null : parsed
}

export function isMissedCutToken(normalizedUpper: string): boolean {
  return normalizedUpper === 'MC' || normalizedUpper === 'CUT'
}

export function isMissedCutRaw(raw: string | undefined | null): boolean {
  if (raw == null || raw === '') return false
  return isMissedCutToken(String(raw).trim().toUpperCase())
}

interface EspnCompetitor {
  id?: string
  order?: number
  score?: string
  athlete?: { displayName?: string; fullName?: string }
  linescores?: unknown[]
}

interface EventShape {
  id?: string
  name?: string
  shortName?: string
  competitions?: { competitors?: EspnCompetitor[] }[]
}

/** Map ESPN round rows to vs-par for days 1–4 (uses each round’s `displayValue`). */
export function parseLinescoresToRoundToPar(linescores: unknown): FourRoundsNullable {
  const out: [number | null, number | null, number | null, number | null] = [
    null,
    null,
    null,
    null,
  ]
  if (!Array.isArray(linescores)) return out
  for (const entry of linescores) {
    if (!entry || typeof entry !== 'object') continue
    const row = entry as { period?: number; displayValue?: string }
    const period = row.period
    if (typeof period !== 'number' || period < 1 || period > 4) continue
    const toPar = parseScoreToPar(row.displayValue)
    if (toPar !== null) out[period - 1] = toPar
  }
  return out
}

export function mapCompetitorToPlayer(raw: EspnCompetitor): LeaderboardPlayer | null {
  const id = raw.id != null ? String(raw.id) : null
  if (!id) return null
  const displayName = raw.athlete?.displayName ?? raw.athlete?.fullName ?? 'Unknown'
  const order = typeof raw.order === 'number' ? raw.order : 9999
  const scoreRaw = raw.score != null ? String(raw.score) : ''
  const missedCut = isMissedCutRaw(scoreRaw)
  const totalToPar = parseScoreToPar(scoreRaw)
  const roundToPar = parseLinescoresToRoundToPar(raw.linescores)
  return {
    id,
    displayName,
    position: order,
    totalToPar,
    scoreRaw,
    missedCut,
    roundToPar,
  }
}

/** Tied players share the same T-rank label (by ESPN order / rank). */
export function positionDisplayMap(players: LeaderboardPlayer[]): Map<string, string> {
  const out = new Map<string, string>()
  const withScore = players.filter((p) => p.totalToPar != null)
  for (const p of players) {
    if (p.totalToPar == null) {
      out.set(p.id, '—')
      continue
    }
    const peers = withScore.filter((x) => x.totalToPar === p.totalToPar)
    if (peers.length > 1) {
      const minPos = Math.min(...peers.map((x) => x.position))
      out.set(p.id, `T${minPos}`)
    } else {
      out.set(p.id, `#${p.position}`)
    }
  }
  return out
}

function parseScoreboardEventJson(json: unknown): {
  tournamentName: string
  eventId: string
  competitors: EspnCompetitor[]
} | null {
  const root = json as Record<string, unknown>
  let event: EventShape

  if (Array.isArray(root.events) && root.events.length > 0) {
    event = root.events[0] as EventShape
  } else if (Array.isArray(root.competitions)) {
    event = root as unknown as EventShape
  } else {
    return null
  }

  const tournamentName =
    typeof event.name === 'string'
      ? event.name
      : typeof event.shortName === 'string'
        ? event.shortName
        : 'Masters Tournament'
  const eventId =
    event.id != null
      ? String(event.id)
      : typeof root.id === 'string'
        ? root.id
        : MASTERS_EVENT_ID

  const comps = event.competitions
  if (!Array.isArray(comps) || comps.length === 0) return null
  const competitors = comps[0].competitors ?? []

  return { tournamentName, eventId, competitors }
}

export async function fetchPgaScoreboard(): Promise<ScoreboardResult> {
  try {
    const res = await fetch(ESPN_PGA_MASTERS_SCOREBOARD)
    if (!res.ok) return { ok: false, error: `ESPN error: ${res.status}` }
    const json: unknown = await res.json()
    const parsed = parseScoreboardEventJson(json)
    if (!parsed) {
      return { ok: false, error: 'No Masters leaderboard data' }
    }
    const players: LeaderboardPlayer[] = []
    for (const c of parsed.competitors) {
      const p = mapCompetitorToPlayer(c)
      if (p) players.push(p)
    }
    return {
      ok: true,
      data: {
        tournamentName: parsed.tournamentName,
        eventId: parsed.eventId,
        players,
      },
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, error: msg }
  }
}
