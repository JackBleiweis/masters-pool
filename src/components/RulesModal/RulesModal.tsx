import { useEffect, useId, useRef } from 'react'
import styles from './RulesModal.module.scss'

export interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <h2 id={titleId} className={styles.title}>
            Pool rules
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close rules"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          <h3 className={styles.sectionTitle}>Entry & draft</h3>
          <ul className={styles.list}>
            <li>
              <strong>$50</strong> buy-in per person.
            </li>
            <li>
              <strong>Slow draft:</strong> everyone ends up with <strong>5 golfers</strong> (snake
              order, one pick at a time over a few days — no rush).
            </li>
          </ul>

          <h3 className={styles.sectionTitle}>Scoring</h3>
          <p className={styles.p}>
            For each golfer, total their <strong>strokes vs par</strong> for all four rounds (same
            numbers as D1–D4 in the app). Your team drops the <strong>one worst golfer</strong> by
            that four-day sum (higher = worse). Everyone else counts. Team score is the sum of the
            remaining picks. <strong>Lowest team total wins</strong> (more under par is better).
          </p>
          <p className={styles.p}>
            Ties for worst: the later pick in your list is the one dropped.
          </p>

          <h3 className={styles.sectionTitle}>Missed cut</h3>
          <p className={styles.p}>
            If one of your players <strong>misses the cut</strong>, they obviously don’t post real
            scores for Saturday or Sunday. For <strong>days 3 and 4 only</strong>, their “score” for
            the pool is:
          </p>
          <p className={styles.formula}>(field average for that day) + 3</p>
          <p className={styles.p}>
            “Field average” means: take everyone still on the leaderboard who has a real number that
            day, average their vs-par, <strong>round to the nearest whole stroke</strong>, then add 3
            for your guy who’s already headed home.
          </p>

          <div className={styles.example} role="note" aria-label="Example: missed cut">
            <p className={styles.exampleLabel}>Example</p>
            <p className={styles.p}>
              Your player shoots −6 and −2 Thursday/Friday, then misses the cut. On Saturday the
              players who made the cut average <strong>+1</strong> vs par for the round. His Saturday
              pool line is <strong>+4</strong> (that’s +1 + 3). If Sunday’s field averages{' '}
              <strong>−2</strong>, his Sunday line is <strong>+1</strong> (−2 + 3). Your other picks
              use their real scores those days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
