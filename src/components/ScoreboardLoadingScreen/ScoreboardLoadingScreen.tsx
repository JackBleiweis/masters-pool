import { useEffect, useRef, useState } from 'react'
import { scoreboardLoadingPhotos } from '../../data/loadingPhotos'
import styles from './ScoreboardLoadingScreen.module.scss'

const MIN_DURATION_MS = 5000
const MAX_DURATION_MS = 7000

export interface ScoreboardLoadingScreenProps {
  /** When the scoreboard fetch has settled (success or error). */
  dataReady: boolean
  onComplete: () => void
}

export function ScoreboardLoadingScreen({ dataReady, onComplete }: ScoreboardLoadingScreenProps) {
  const [photoIndex] = useState(() => Math.floor(Math.random() * scoreboardLoadingPhotos.length))
  const [progress, setProgress] = useState(0)
  const [animationDone, setAnimationDone] = useState(false)
  const [durationMs] = useState(
    () => MIN_DURATION_MS + Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS)
  )

  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let alive = true
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      if (!alive) return
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 2
      setProgress(100 * eased)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setAnimationDone(true)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [durationMs])

  const firedRef = useRef(false)
  useEffect(() => {
    if (!animationDone || !dataReady || firedRef.current) return
    firedRef.current = true
    onCompleteRef.current()
  }, [animationDone, dataReady])

  const src = scoreboardLoadingPhotos[photoIndex]
  const pct = Math.min(100, Math.max(0, progress))
  /** Clip from top: 100% → 0% reveals color from the bottom upward. */
  const clipTop = 100 - pct

  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.figure}>
        <img src={src} alt="" className={styles.layerGrey} decoding="async" />
        <img
          src={src}
          alt=""
          className={styles.layerColor}
          decoding="async"
          style={{ clipPath: `inset(${clipTop}% 0 0 0)` }}
        />
      </div>
      <div className={styles.caption}>
        <p className={styles.label}>Loading…</p>
        <p className={styles.percent} aria-label={`Loading ${Math.round(progress)} percent`}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}
