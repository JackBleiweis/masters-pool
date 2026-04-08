import type { LeaderboardPlayer } from '../../lib/golfApi'
import { formatToPar } from '../../utils/formatToPar'
import styles from './TournamentLeaderboard.module.scss'

export interface TournamentLeaderboardProps {
  players: LeaderboardPlayer[]
  positionById: Map<string, string>
  tournamentName: string
  lastUpdated: Date | null
  onRefresh: () => void
  busy: boolean
}

function formatUpdated(d: Date | null): string {
  if (!d) return ''
  return new Intl.DateTimeFormat(undefined, {
    timeStyle: 'short',
    dateStyle: 'medium',
  }).format(d)
}

function scoreClass(total: number | null): string {
  if (total == null) return styles.scoreEven
  if (total < 0) return styles.scoreUnder
  if (total > 0) return styles.scoreOver
  return styles.scoreEven
}

export function TournamentLeaderboard({
  players,
  positionById,
  tournamentName,
  lastUpdated,
  onRefresh,
  busy,
}: TournamentLeaderboardProps) {
  const sorted = [...players].sort((a, b) => a.position - b.position)

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Tournament</h1>
          <p className={styles.eventName}>{tournamentName}</p>
          {lastUpdated ? (
            <p className={styles.meta}>Updated {formatUpdated(lastUpdated)}.</p>
          ) : null}
        </div>
        <button type="button" className={styles.refresh} onClick={onRefresh} disabled={busy}>
          {busy ? 'Refreshing…' : 'Refresh'}
        </button>
      </header>

      <ul className={styles.list} aria-label="Leaderboard">
        {sorted.map((p) => {
          const pos = positionById.get(p.id) ?? '—'
          const label = p.totalToPar != null ? formatToPar(p.totalToPar) : p.missedCut ? 'MC' : '—'
          return (
            <li key={p.id} className={styles.row}>
              <span className={styles.pos}>{pos}</span>
              <span className={styles.name}>{p.displayName}</span>
              <span className={`${styles.score} ${scoreClass(p.totalToPar)}`}>{label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
