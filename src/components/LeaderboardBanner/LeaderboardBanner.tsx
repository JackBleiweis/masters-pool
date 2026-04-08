import type { LeaderboardPlayer } from '../../lib/golfApi'
import { positionDisplayMap } from '../../lib/golfApi'
import { useScoreboard } from '../../hooks/useScoreboard'
import { displayLastName, formatPlayerScore, formatRankLabel } from '../../utils/playerDisplay'
import styles from './LeaderboardBanner.module.scss'

const TOP_N = 20

function sortedTopPlayers(players: LeaderboardPlayer[], n: number): LeaderboardPlayer[] {
  return [...players].sort((a, b) => a.position - b.position).slice(0, n)
}

export function LeaderboardBanner() {
  const { data, loading } = useScoreboard()

  if (loading && !data) {
    return (
      <div className={styles.banner} role="status" aria-live="polite">
        <div className={styles.skeleton} />
      </div>
    )
  }

  if (!data || data.players.length === 0) {
    return null
  }

  const top = sortedTopPlayers(data.players, TOP_N)
  const leader = top[0]
  if (!leader) return null

  const posMap = positionDisplayMap(data.players)
  const leaderRank = formatRankLabel(posMap.get(leader.id) ?? `#${leader.position}`)
  const leaderScore = formatPlayerScore(leader)

  const tickerSegments = top.map((p) => {
    const score = formatPlayerScore(p)
    const r = formatRankLabel(posMap.get(p.id) ?? `#${p.position}`) || `${p.position}.`
    return `${r} ${p.displayName} ${score}`
  })

  return (
    <section
      className={styles.banner}
      role="region"
      aria-label={`${data.tournamentName} top ${top.length} leaderboard ticker`}
    >
      <div className={styles.inner}>
        <div
          className={styles.leader}
          aria-label={`${leaderRank} ${leader.displayName}, ${leaderScore}`}
        >
          <span className={styles.rank}>{leaderRank}</span>
          <span className={styles.leaderNameFull}>{leader.displayName}</span>
          <span className={styles.leaderNameLast}>{displayLastName(leader.displayName)}</span>
          <span className={styles.leaderScore}>{leaderScore}</span>
        </div>

        <div className={styles.tickerMask} aria-hidden="true">
          <div className={styles.track}>
            {tickerSegments.map((text, i) => (
              <span key={`a-${i}`} className={styles.segment}>
                <span className={styles.dot} aria-hidden />
                {text}
              </span>
            ))}
            {tickerSegments.map((text, i) => (
              <span key={`b-${i}`} className={styles.segment}>
                <span className={styles.dot} aria-hidden />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
