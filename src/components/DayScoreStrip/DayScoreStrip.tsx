import type { DayScoreCells, DayScoreEmphasis } from '../../utils/dayDisplay'
import styles from './DayScoreStrip.module.scss'

const DAY_SHORT = ['D1', 'D2', 'D3', 'D4'] as const

export interface DayScoreStripProps {
  cells: DayScoreCells
  className?: string
  /** When true, style that day’s value (e.g. missed-cut pool substitution on D3/D4). */
  dayEmphasis?: DayScoreEmphasis
}

export function DayScoreStrip({ cells, className, dayEmphasis }: DayScoreStripProps) {
  const rootClass = className ? `${styles.strip} ${className}` : styles.strip
  return (
    <div className={rootClass} role="group" aria-label="Scores versus par for each tournament day">
      {cells.map((text, i) => {
        const emphasize = dayEmphasis?.[i] ?? false
        const valClass =
          text === '-'
            ? `${styles.val} ${styles.dash}`
            : emphasize
              ? `${styles.val} ${styles.mcPenalty}`
              : styles.val
        return (
          <div key={DAY_SHORT[i]} className={styles.cell}>
            <span className={styles.day}>{DAY_SHORT[i]}</span>
            <span className={valClass}>{text}</span>
          </div>
        )
      })}
    </div>
  )
}
