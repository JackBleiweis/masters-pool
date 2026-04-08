import type { LeaderboardPlayer } from '../lib/golfApi'
import { formatToPar } from './formatToPar'

/** Last token of ESPN display name (fits “First Last” and single names). */
export function displayLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return fullName.trim()
  return parts[parts.length - 1] ?? fullName
}

/** Turn `#3` / `T1` from `positionDisplayMap` into `3.` / `T1.` */
export function formatRankLabel(positionDisplay: string): string {
  const s = positionDisplay.trim()
  if (s === '' || s === '—') return ''
  if (s.startsWith('T')) return s.endsWith('.') ? s : `${s}.`
  if (s.startsWith('#')) {
    const n = s.slice(1)
    return n ? `${n}.` : ''
  }
  return s.endsWith('.') ? s : `${s}.`
}

/** Score shown in UI: numeric to-par, MC, or raw ESPN token. */
export function formatPlayerScore(p: LeaderboardPlayer): string {
  if (p.missedCut) return 'MC'
  if (p.totalToPar != null) return formatToPar(p.totalToPar)
  if (p.scoreRaw) return p.scoreRaw
  return '—'
}
