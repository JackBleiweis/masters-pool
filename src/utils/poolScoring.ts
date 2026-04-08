import type { FourRoundsNullable, LeaderboardPlayer } from '../lib/golfApi'
import type { PoolTeamDefinition } from '../data/poolTeams'

export type FourRounds = readonly [number, number, number, number]

/**
 * Pool daily score = ESPN posted vs par for that round only.
 * Rounds not yet played (or missing on the leaderboard) count as 0 so the row Σ matches the visible numbers + “-” days.
 */
function pickDailyScores(p: LeaderboardPlayer | undefined): FourRounds {
  if (!p) return [0, 0, 0, 0]
  const r = p.roundToPar
  return [
    r[0] ?? 0,
    r[1] ?? 0,
    r[2] ?? 0,
    r[3] ?? 0,
  ]
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
      const dailyScores = pickDailyScores(p)
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
