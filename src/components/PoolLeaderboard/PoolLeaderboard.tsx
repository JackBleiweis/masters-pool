import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { poolTeams } from '../../data/poolTeams'
import { positionDisplayMap } from '../../lib/golfApi'
import type { TournamentSnapshot } from '../../lib/golfApi'
import { buildPoolStandings } from '../../utils/poolScoring'
import { RulesModal } from '../RulesModal/RulesModal'
import { TeamAccordionRow } from '../TeamAccordionRow/TeamAccordionRow'
import styles from './PoolLeaderboard.module.scss'

export interface PoolLeaderboardProps {
  snapshot: TournamentSnapshot
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

export function PoolLeaderboard({ snapshot, lastUpdated, onRefresh, busy }: PoolLeaderboardProps) {
  const navigate = useNavigate()
  const [rulesOpen, setRulesOpen] = useState(false)
  const posMap = positionDisplayMap(snapshot.players)
  const standings = buildPoolStandings(poolTeams, snapshot.players, posMap)

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Pool</h1>
          <p className={styles.eventName}>{snapshot.tournamentName}</p>
          {lastUpdated ? (
            <p className={styles.meta}>
              <span className={styles.nowrap}>Updated {formatUpdated(lastUpdated)}.</span>
            </p>
          ) : null}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.analysis} onClick={() => navigate('/intro')}>
            AI analysis
          </button>
          <button type="button" className={styles.rules} onClick={() => setRulesOpen(true)}>
            Rules
          </button>
          <button type="button" className={styles.refresh} onClick={onRefresh} disabled={busy}>
            {busy ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </header>

      <RulesModal isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />

      <div className={styles.list}>
        {standings.map((row, i) => (
          <TeamAccordionRow
            key={row.teamName}
            teamName={row.teamName}
            avatarSrc={row.avatarSrc}
            rank={i + 1}
            teamDaily={row.teamDaily}
            teamTotal={row.totalEffective}
            picks={row.picks}
          />
        ))}
      </div>

      <aside className={styles.mcFootnote} aria-label="How missed cut scores are calculated">
        <p className={styles.mcFootnoteText}>
          <strong>Missed cut (D3 &amp; D4):</strong> For Saturday and Sunday, a cut player has score. So their pool
          line is{' '}
          <span className={styles.mcFootnoteFormula}>
            (field average vs par that day) + 3
          </span>
          , where the average is over everyone who posted a score that round, then{' '}
          <strong>rounded to the nearest whole stroke</strong> before the +3.
        </p>
      </aside>
    </div>
  )
}
