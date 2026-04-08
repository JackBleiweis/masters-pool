import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LeaderboardBanner } from '../LeaderboardBanner/LeaderboardBanner'
import { PastChampionsModal } from '../PastChampionsModal/PastChampionsModal'
import styles from './AppLayout.module.scss'

export function AppLayout() {
  const [pastChampionsOpen, setPastChampionsOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <LeaderboardBanner />
      <header className={styles.top}>
        <div className={styles.brandRow}>
          <p className={styles.brand}>Masters Pool</p>
          <button
            type="button"
            className={styles.championsBtn}
            onClick={() => setPastChampionsOpen(true)}
          >
            Past champions →
          </button>
        </div>
        <nav className={styles.nav} aria-label="Main">
          <NavLink
            to="/pool"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Pool
          </NavLink>
          <NavLink
            to="/tournament"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Masters
          </NavLink>
        </nav>
        <PastChampionsModal isOpen={pastChampionsOpen} onClose={() => setPastChampionsOpen(false)} />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
