import { useState } from 'react'
import styles from './TeamAvatar.module.scss'

export interface TeamAvatarProps {
  src: string | null
  teamName: string
  /** Empty alt: team name is adjacent on the row (see README). */
  alt?: string
}

function initialsFromTeamName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  const w = parts[0] ?? ''
  return w.slice(0, 2).toUpperCase() || '?'
}

export function TeamAvatar({ src, teamName, alt = '' }: TeamAvatarProps) {
  const [broken, setBroken] = useState(false)
  const showImg = src != null && src !== '' && !broken
  const initials = initialsFromTeamName(teamName)

  return (
    <span className={styles.avatar} aria-hidden={alt === '' ? true : undefined}>
      {showImg ? (
        <img src={src} alt={alt} className={styles.image} onError={() => setBroken(true)} />
      ) : (
        <span className={styles.fallback}>{initials}</span>
      )}
    </span>
  )
}
