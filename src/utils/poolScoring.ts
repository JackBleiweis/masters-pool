import type { FourRoundsNullable, LeaderboardPlayer } from '../lib/golfApi'
import type { PoolTeamDefinition } from '../data/poolTeams'

export type FourRounds = readonly [number, number, number, number]

/**
 * Field average vs par for one round (players who posted a number that day).
 * Rounded to the nearest whole stroke (pool rules). Used for missed-cut D3/D4.
 */
export function fieldAverageVsParForRound(
  players: LeaderboardPlayer[],
  roundIndex: 0 | 1 | 2 | 3
): number {
  const vals: number[] = []
  for (const p of players) {
    const v = p.roundToPar[roundIndex]
    if (v != null && Number.isFinite(v)) vals.push(v)
  }
  if (vals.length === 0) return 0
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length
  return Math.round(mean)
}

/**
 * Pool daily scores: ESPN vs par for R1–R2; if missed cut, R3–R4 = field average that day + 3 (pool rules).
 * Missing posted rounds still count as 0 for the pool sum where applicable; display uses dailyRaw for “—”.
 */
function pickDailyScoresForPool(
  p: LeaderboardPlayer | undefined,
  fieldAvgD3: number,
  fieldAvgD4: number
): FourRounds {
  if (!p) return [0, 0, 0, 0]
  const r = p.roundToPar
  const mc = p.missedCut === true
  const d3 = mc ? fieldAvgD3 + 3 : (r[2] ?? 0)
  const d4 = mc ? fieldAvgD4 + 3 : (r[3] ?? 0)
  return [r[0] ?? 0, r[1] ?? 0, d3, d4]
}

export interface PoolPickRow {
  playerId: string
  displayName: string
  positionDisplay: string
  /** Tournament total label from ESPN (E, +2, MC, …). */
  scoreLabel: string
  /** Posted vs par per day from ESPN; null = round not played / no score yet. */
  dailyRaw: FourRoundsNullable
  /** Daily scores that count toward the pool (same as raw, with null → 0). */
  dailyScores: FourRounds
  /** Sum of dailyScores — matches displayed D1–D4 numbers (— = 0). */
  poolTotal: number
  missedCut: boolean
  /** False for the one golfer dropped as worst 4-day pool total (higher = worse). */
  countsTowardPool: boolean
}

export interface PoolTeamStanding {
  teamName: string
  avatarSrc: string | null
  /** Sum of counting picks’ daily scores per day (worst 4-day total excluded). */
  teamDaily: FourRounds
  /** Sum of teamDaily — team ranking (lower better). */
  totalEffective: number
  picks: PoolPickRow[]
}

/** Highest pool total loses; ties drop the later-listed pick. Teams with one golfer keep them. */
function indexToDropAsWorst(picks: readonly { poolTotal: number }[]): number | null {
  if (picks.length <= 1) return null
  let max = -Infinity
  for (const p of picks) {
    if (p.poolTotal > max) max = p.poolTotal
  }
  for (let i = picks.length - 1; i >= 0; i--) {
    if (picks[i].poolTotal === max) return i
  }
  return null
}

export function buildPoolStandings(
  teams: PoolTeamDefinition[],
  players: LeaderboardPlayer[],
  positionById: Map<string, string>
): PoolTeamStanding[] {
  const byId = new Map(players.map((p) => [p.id, p]))
  const fieldAvgD3 = fieldAverageVsParForRound(players, 2)
  const fieldAvgD4 = fieldAverageVsParForRound(players, 3)

  const rows: PoolTeamStanding[] = teams.map((team) => {
    const picksBase = team.espnAthleteIds.map((id) => {
      const p = byId.get(id)
      const displayName = p?.displayName ?? `Player ${id}`
      const positionDisplay = p ? (positionById.get(id) ?? '—') : '—'
      const missedCut = p?.missedCut === true
      let scoreLabel: string
      if (!p) scoreLabel = '—'
      else if (missedCut) scoreLabel = 'MC'
      else if (p.scoreRaw) scoreLabel = p.scoreRaw
      else scoreLabel = '—'

      const dailyRaw = (p?.roundToPar ?? [null, null, null, null]) as FourRoundsNullable
      const dailyScores = pickDailyScoresForPool(p, fieldAvgD3, fieldAvgD4)
      const poolTotal = dailyScores.reduce((a, b) => a + b, 0)

      return {
        playerId: id,
        displayName,
        positionDisplay,
        scoreLabel,
        dailyRaw,
        dailyScores,
        poolTotal,
        missedCut,
      }
    })

    const dropIdx = indexToDropAsWorst(picksBase)
    const picks: PoolPickRow[] = picksBase.map((row, i) => ({
      ...row,
      countsTowardPool: dropIdx === null || i !== dropIdx,
    }))

    const counting = picks.filter((x) => x.countsTowardPool)
    const teamDaily: FourRounds = [
      counting.reduce((s, x) => s + x.dailyScores[0], 0),
      counting.reduce((s, x) => s + x.dailyScores[1], 0),
      counting.reduce((s, x) => s + x.dailyScores[2], 0),
      counting.reduce((s, x) => s + x.dailyScores[3], 0),
    ]
    const totalEffective = teamDaily.reduce((a, b) => a + b, 0)

    return {
      teamName: team.teamName,
      avatarSrc: team.avatarSrc,
      teamDaily,
      totalEffective,
      picks,
    }
  })

  return [...rows].sort((a, b) => a.totalEffective - b.totalEffective)
}
