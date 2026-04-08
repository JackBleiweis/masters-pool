import { useCallback, useEffect, useState } from 'react'
import { fetchPgaScoreboard, type ScoreboardResult, type TournamentSnapshot } from '../lib/golfApi'

const POLL_MS = 60_000

export interface UsePgaScoreboardState {
  data: TournamentSnapshot | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refetch: () => void
}

function applyResult(
  setData: (d: TournamentSnapshot | null) => void,
  setError: (e: string | null) => void,
  setLoading: (l: boolean) => void,
  setLastUpdated: (d: Date | null) => void,
  result: ScoreboardResult,
  endLoading: boolean,
  silent: boolean
) {
  if (result.ok) {
    setData(result.data)
    setError(null)
    setLastUpdated(new Date())
  } else if (!silent) {
    setError(result.error)
  }
  if (endLoading) setLoading(false)
}

export function usePgaScoreboard(): UsePgaScoreboardState {
  const [data, setData] = useState<TournamentSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    const silent = opts?.silent ?? false
    if (!silent) setLoading(true)
    const result = await fetchPgaScoreboard()
    applyResult(setData, setError, setLoading, setLastUpdated, result, !silent, silent)
  }, [])

  useEffect(() => {
    const boot = window.setTimeout(() => {
      void load({ silent: false })
    }, 0)
    const id = window.setInterval(() => {
      void load({ silent: true })
    }, POLL_MS)
    return () => {
      window.clearTimeout(boot)
      window.clearInterval(id)
    }
  }, [load])

  const refetch = useCallback(() => {
    void load({ silent: false })
  }, [load])

  return { data, loading, error, lastUpdated, refetch }
}
