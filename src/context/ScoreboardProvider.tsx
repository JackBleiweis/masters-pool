import { type ReactNode } from 'react'
import { usePgaScoreboard } from '../hooks/usePgaScoreboard'
import { ScoreboardContext } from './scoreboardContext'

export function ScoreboardProvider({ children }: { children: ReactNode }) {
  const value = usePgaScoreboard()
  return <ScoreboardContext.Provider value={value}>{children}</ScoreboardContext.Provider>
}
