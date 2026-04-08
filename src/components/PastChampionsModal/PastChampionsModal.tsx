import { useEffect, useId, useRef } from 'react'
import { pastChampions, youtubeWatchToEmbed } from '../../data/pastChampions'
import styles from './PastChampionsModal.module.scss'

export interface PastChampionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PastChampionsModal({ isOpen, onClose }: PastChampionsModalProps) {
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
            Past champions
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close past champions"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          {pastChampions.map((entry) => {
            const embed = youtubeWatchToEmbed(entry.youtubeWatchUrl)
            const photoAlt = entry.winnerPhotoAlt ?? `${entry.poolWinner}, ${entry.year} pool champion`
            return (
              <article key={entry.year} className={styles.card}>
                <div className={styles.cardGrid}>
                  <div className={styles.details}>
                    <h3 className={styles.yearLine}>
                      <span className={styles.yearNum}>{entry.year}</span>{' '}
                      {entry.poolWinner}
                      <span className={styles.scorePart}>
                        Score:{' '}
                        <span className={styles.scoreValue}>{entry.totalScoreDisplay}</span>
                      </span>
                    </h3>
                    <dl className={styles.meta}>
                      <div className={styles.metaRow}>
                        <dt>Masters champion</dt>
                        <dd>{entry.mastersChampion}</dd>
                      </div>
                    </dl>
                    <p className={styles.picksLabel}>Team</p>
                    <ul className={styles.picks}>
                      {entry.picks.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                    {embed ? (
                      <div className={styles.videoWrap}>
                        <iframe
                          className={styles.video}
                          src={embed}
                          title={`${entry.year} Masters — winning moment`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.photoColumn}>
                    {entry.winnerPhotoSrc ? (
                      <div className={styles.photoFrame}>
                        <img
                          src={entry.winnerPhotoSrc}
                          alt={photoAlt}
                          className={styles.photoImg}
                        />
                      </div>
                    ) : (
                      <div className={styles.photoFrame}>
                        <div className={styles.photoPlaceholder} aria-label="Champion photo — add image in data">
                          <span className={styles.photoPlaceholderMark} aria-hidden="true" />
                          <span className={styles.photoPlaceholderText}>Champion photo</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
