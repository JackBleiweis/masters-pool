import { useState } from 'react'
import { ScoreboardLoadingScreen } from '../components/ScoreboardLoadingScreen/ScoreboardLoadingScreen'
import { TournamentLeaderboard } from '../components/TournamentLeaderboard/TournamentLeaderboard'
import { StatusMessage } from '../components/StatusMessage/StatusMessage'
import { useScoreboard } from '../hooks/useScoreboard'
import { positionDisplayMap } from '../lib/golfApi'
import styles from './TournamentPage.module.scss'

export default function TournamentPage() {
  const { data, loading, error, lastUpdated, refetch } = useScoreboard()
  /** Skip full-page loader when scoreboard data is already in context (e.g. after Pool ↔ Masters nav). */
  const [contentRevealed, setContentRevealed] = useState(() => data != null)
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
        key="tournament-refresh"
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

  const positionById = positionDisplayMap(data.players)

  return (
    <>
      {error ? (
        <p className={styles.warn} role="alert">
          {error}
        </p>
      ) : null}
      <TournamentLeaderboard
        players={data.players}
        positionById={positionById}
        tournamentName={data.tournamentName}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        busy={loading}
      />
    </>
  )
}
