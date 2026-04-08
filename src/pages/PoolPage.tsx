import { useState } from 'react'
import { PoolLeaderboard } from '../components/PoolLeaderboard/PoolLeaderboard'
import { ScoreboardLoadingScreen } from '../components/ScoreboardLoadingScreen/ScoreboardLoadingScreen'
import { StatusMessage } from '../components/StatusMessage/StatusMessage'
import { useScoreboard } from '../hooks/useScoreboard'
import styles from './PoolPage.module.scss'

export default function PoolPage() {
  const { data, loading, error, lastUpdated, refetch } = useScoreboard()
  /** Skip full-page loader when scoreboard data is already in context (e.g. after Pool ↔ Masters nav). */
  const [contentRevealed, setContentRevealed] = useState(() => data != null)
  /** Full-screen image loader after explicit Refresh (same UX as first load). */
  const [refreshLoader, setRefreshLoader] = useState(false)

  const handleRefresh = () => {
    setRefreshLoader(true)
    refetch()
  }

  if (!contentRevealed) {
    return (
      <ScoreboardLoadingScreen
        dataReady={!loading}
        onComplete={() => setContentRevealed(true)}
      />
    )
  }

  if (refreshLoader) {
    return (
      <ScoreboardLoadingScreen
        key="pool-refresh"
        dataReady={!loading}
        onComplete={() => setRefreshLoader(false)}
      />
    )
  }

  if (error && !data) {
    return <StatusMessage variant="error" title="Could not load ESPN data" detail={error} />
  }

  if (!data) {
    return <StatusMessage variant="empty" title="No tournament data." />
  }

  return (
    <>
      {error ? (
        <p className={styles.warn} role="alert">
          {error}
        </p>
      ) : null}
      <PoolLeaderboard
        snapshot={data}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        busy={loading}
      />
    </>
  )
}
