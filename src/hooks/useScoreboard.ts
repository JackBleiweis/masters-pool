import { useContext } from 'react'
import { ScoreboardContext } from '../context/scoreboardContext'
import type { UsePgaScoreboardState } from './usePgaScoreboard'

export function useScoreboard(): UsePgaScoreboardState {
  const ctx = useContext(ScoreboardContext)
  if (ctx == null) {
    throw new Error('useScoreboard must be used within ScoreboardProvider')
  }
  return ctx
}
