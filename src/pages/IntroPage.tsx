import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { draftDigestParagraphs, poolTeamsInPredictionOrder } from '../data/draftDigest'
import { poolTeams } from '../data/poolTeams'
import { completeIntro, hasCompletedIntro } from '../lib/introStorage'
import styles from './IntroPage.module.scss'

const LOADING_MESSAGES = [
  'Loading…',
  'Syncing tournament field…',
  'Scoring roster fit vs course setup…',
  'Weighting round-by-round volatility…',
  'Running correlation passes…',
  'Stress-testing cut scenarios…',
  'Synthesizing squad projections…',
  'Almost there…',
]

const LOAD_MS = 10_000

/** First visit: full intro. Returning visitors go straight to the pool. */
export function IntroEntry() {
  if (hasCompletedIntro()) {
    return <Navigate to="/pool" replace />
  }

  return <IntroFirstVisit />
}

function IntroFirstVisit() {
  const navigate = useNavigate()

  return (
    <IntroShell
      mode="firstVisit"
      onFinish={() => {
        completeIntro()
        navigate('/pool', { replace: true })
      }}
    />
  )
}

/** Same digest without the first-visit loading sequence — open anytime from Pool. */
export function IntroReplayPage() {
  const navigate = useNavigate()

  return (
    <IntroShell
      mode="replay"
      onFinish={() => {
        navigate('/pool', { replace: true })
      }}
    />
  )
}

type IntroMode = 'firstVisit' | 'replay'

function IntroShell({ mode, onFinish }: { mode: IntroMode; onFinish: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'reveal'>(mode === 'replay' ? 'reveal' : 'loading')
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [openTeam, setOpenTeam] = useState<string | null>(null)

  useEffect(() => {
    if (mode !== 'firstVisit' || phase !== 'loading') return

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(100, (elapsed / LOAD_MS) * 100)
      setProgress(p)
      setMsgIndex(Math.floor(elapsed / 1500) % LOADING_MESSAGES.length)

      if (elapsed < LOAD_MS) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setPhase('reveal')
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode, phase])

  const toggleTeam = (name: string) => {
    setOpenTeam((prev) => (prev === name ? null : name))
  }

  if (phase === 'loading') {
    return (
      <div className={styles.shell}>
        <div className={styles.loadingInner}>
          <div className={styles.orbit} aria-hidden="true">
            <div className={styles.orbitSpin}>
              <span className={styles.orbitDot} data-i="0">
                ◆
              </span>
              <span className={styles.orbitDot} data-i="1">
                ●
              </span>
              <span className={styles.orbitDot} data-i="2">
                ▲
              </span>
            </div>
          </div>
          <p className={styles.status} role="status" aria-live="polite">
            {LOADING_MESSAGES[msgIndex]}
          </p>
          <div className={styles.barTrack} aria-hidden="true">
            <div
              className={styles.barFill}
              style={{
                transform: `scaleX(${Math.max(0, progress) / 100})`,
              }}
            />
          </div>
          <p className={styles.percent}>{Math.round(progress)}%</p>
        </div>
      </div>
    )
  }

  const ctaLabel = mode === 'firstVisit' ? 'Enter Masters Pool' : 'Back to pool'
  const teamsOrdered = poolTeamsInPredictionOrder(poolTeams)

  return (
    <div className={styles.shell}>
      <div className={styles.revealInner}>
        <header className={styles.revealHead}>
          <h1 className={styles.revealTitle}>Masters pool forecast</h1>
          <p className={styles.revealSub}>
            Teams are listed using our <strong>AI predicted finish order</strong>. Open
            any team for their breakdown.
          </p>
        </header>
        <ul className={styles.teamList}>
          {teamsOrdered.map((team, index) => {
            const paragraphs = draftDigestParagraphs[team.teamName] ?? [
              `Projection for ${team.teamName} is still compiling additional signals.`,
            ]
            const expanded = openTeam === team.teamName
            const rank = index + 1
            return (
              <li key={team.teamName} className={styles.teamItem}>
                <button
                  type="button"
                  className={styles.teamBtn}
                  aria-expanded={expanded}
                  aria-label={`Predicted place ${rank}: ${team.teamName}`}
                  onClick={() => toggleTeam(team.teamName)}
                >
                  <span className={styles.predRank} aria-hidden="true">
                    {rank}
                  </span>
                  <span className={styles.teamName}>{team.teamName}</span>
                  <span className={styles.teamChevron} aria-hidden="true">
                    {expanded ? '▾' : '▸'}
                  </span>
                </button>
                {expanded ? (
                  <div className={styles.analysis} id={`analysis-${team.teamName}`}>
                    {paragraphs.map((p, i) => (
                      <p key={i} className={styles.analysisP}>
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>

        <div className={styles.ctaWrap}>
          <button type="button" className={styles.cta} onClick={onFinish}>
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
