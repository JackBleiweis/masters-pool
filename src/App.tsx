import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout/AppLayout'
import { ScoreboardProvider } from './context/ScoreboardProvider'
import { IntroEntry, IntroReplayPage } from './pages/IntroPage'
import PoolPage from './pages/PoolPage'
import TournamentPage from './pages/TournamentPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroEntry />} />
        <Route path="/intro" element={<IntroReplayPage />} />
        <Route
          element={
            <ScoreboardProvider>
              <AppLayout />
            </ScoreboardProvider>
          }
        >
          <Route path="/pool" element={<PoolPage />} />
          <Route path="/tournament" element={<TournamentPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
