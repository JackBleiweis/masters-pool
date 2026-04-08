import { createContext } from 'react'
import type { UsePgaScoreboardState } from '../hooks/usePgaScoreboard'

export const ScoreboardContext = createContext<UsePgaScoreboardState | null>(null)
