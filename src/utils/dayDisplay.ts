import type { FourRoundsNullable } from '../lib/golfApi'
import { formatToPar } from './formatToPar'
import type { FourRounds, PoolPickRow } from './poolScoring'

export type DayScoreCells = readonly [string, string, string, string]

/** Per-day highlight (e.g. D3/D4 missed-cut pool line). */
export type DayScoreEmphasis = readonly [boolean, boolean, boolean, boolean]

/** One cell per day: posted vs par, or '-' if that round has no ESPN score yet. */
export function pickDayDisplayCells(raw: FourRoundsNullable): DayScoreCells {
  return [
    raw[0] == null ? '-' : formatToPar(raw[0]),
    raw[1] == null ? '-' : formatToPar(raw[1]),
    raw[2] == null ? '-' : formatToPar(raw[2]),
    raw[3] == null ? '-' : formatToPar(raw[3]),
  ]
}

/** True once that day counts for pool display (includes MC synthetic weekend lines). */
export function pickHasPostedPoolDay(p: PoolPickRow, dayIndex: 0 | 1 | 2 | 3): boolean {
  if (p.missedCut && (dayIndex === 2 || dayIndex === 3)) return true
  return p.dailyRaw[dayIndex] != null
}

/**
 * Pool leaderboard row: values from pool rules (incl. MC weekend); emphasis on D3/D4 when MC.
 */
export function pickPoolDisplayCells(p: PoolPickRow): {
  cells: DayScoreCells
  mcWeekendEmphasis: DayScoreEmphasis
} {
  const mcWeekendEmphasis: DayScoreEmphasis = [false, false, p.missedCut, p.missedCut]
  const text = (i: 0 | 1 | 2 | 3): string => {
    const syntheticMc = p.missedCut && (i === 2 || i === 3)
    if (!syntheticMc && p.dailyRaw[i] == null) return '-'
    return formatToPar(p.dailyScores[i])
  }
  return {
    cells: [text(0), text(1), text(2), text(3)],
    mcWeekendEmphasis,
  }
}

/**
 * Team row: '-' only if every counting pick has no posted pool line that day;
 * otherwise show the team total for that day.
 */
export function teamDayDisplayCells(teamDaily: FourRounds, picks: PoolPickRow[]): DayScoreCells {
  const active = picks.filter((p) => p.countsTowardPool)
  const cell = (dayIndex: 0 | 1 | 2 | 3) =>
    active.every((p) => !pickHasPostedPoolDay(p, dayIndex)) ? '-' : formatToPar(teamDaily[dayIndex])
  return [cell(0), cell(1), cell(2), cell(3)]
}
