import type { FourRoundsNullable } from '../lib/golfApi'
import { formatToPar } from './formatToPar'
import type { FourRounds, PoolPickRow } from './poolScoring'

export type DayScoreCells = readonly [string, string, string, string]

/** One cell per day: posted vs par, or '-' if that round has no ESPN score yet. */
export function pickDayDisplayCells(raw: FourRoundsNullable): DayScoreCells {
  return [
    raw[0] == null ? '-' : formatToPar(raw[0]),
    raw[1] == null ? '-' : formatToPar(raw[1]),
    raw[2] == null ? '-' : formatToPar(raw[2]),
    raw[3] == null ? '-' : formatToPar(raw[3]),
  ]
}

/**
 * Team row: '-' only if every pick has no posted score that day;
 * otherwise show the team total for that day (sum of posted daily scores; — picks count as 0).
 */
export function teamDayDisplayCells(teamDaily: FourRounds, picks: PoolPickRow[]): DayScoreCells {
  const active = picks.filter((p) => p.countsTowardPool)
  return [
    active.every((p) => p.dailyRaw[0] == null) ? '-' : formatToPar(teamDaily[0]),
    active.every((p) => p.dailyRaw[1] == null) ? '-' : formatToPar(teamDaily[1]),
    active.every((p) => p.dailyRaw[2] == null) ? '-' : formatToPar(teamDaily[2]),
    active.every((p) => p.dailyRaw[3] == null) ? '-' : formatToPar(teamDaily[3]),
  ]
}
