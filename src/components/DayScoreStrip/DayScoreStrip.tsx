import type { DayScoreCells } from '../../utils/dayDisplay'
import styles from './DayScoreStrip.module.scss'

const DAY_SHORT = ['D1', 'D2', 'D3', 'D4'] as const

export interface DayScoreStripProps {
  cells: DayScoreCells
  className?: string
}

export function DayScoreStrip({ cells, className }: DayScoreStripProps) {
  const rootClass = className ? `${styles.strip} ${className}` : styles.strip
  return (
    <div className={rootClass} role="group" aria-label="Scores versus par for each tournament day">
      {cells.map((text, i) => (
        <div key={DAY_SHORT[i]} className={styles.cell}>
          <span className={styles.day}>{DAY_SHORT[i]}</span>
          <span className={text === '-' ? `${styles.val} ${styles.dash}` : styles.val}>{text}</span>
        </div>
      ))}
    </div>
  )
}
