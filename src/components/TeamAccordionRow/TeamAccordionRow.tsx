import { useId, useState } from 'react'
import { pickPoolDisplayCells, teamDayDisplayCells } from '../../utils/dayDisplay'
import { formatToPar } from '../../utils/formatToPar'
import type { FourRounds, PoolPickRow } from '../../utils/poolScoring'
import { DayScoreStrip } from '../DayScoreStrip/DayScoreStrip'
import { TeamAvatar } from '../TeamAvatar/TeamAvatar'
import styles from './TeamAccordionRow.module.scss'

export interface TeamAccordionRowProps {
  teamName: string
  avatarSrc: string | null
  rank: number
  teamDaily: FourRounds
  teamTotal: number
  picks: PoolPickRow[]
}

export function TeamAccordionRow({
  teamName,
  avatarSrc,
  rank,
  teamDaily,
  teamTotal,
  picks,
}: TeamAccordionRowProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const teamDayCells = teamDayDisplayCells(teamDaily, picks)

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <TeamAvatar src={avatarSrc} teamName={teamName} alt="" />
        <span className={styles.rank} aria-label={`Rank ${rank}`}>
          {rank}
        </span>
        <span className={styles.name}>{teamName}</span>
        <span className={`${styles.teamTotal} ${styles.scoreCell}`}>{formatToPar(teamTotal)}</span>
        <DayScoreStrip cells={teamDayCells} className={styles.headerDays} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-label={`${teamName} picks`}
        className={open ? styles.panel : styles.panelHidden}
        hidden={!open}
      >
        <ul className={styles.pickList}>
          {picks.map((p) => {
            const { cells: poolDayCells, mcWeekendEmphasis } = pickPoolDisplayCells(p)
            return (
            <li
              key={p.playerId}
              className={`${styles.pickRow} ${p.countsTowardPool ? '' : styles.pickRowDropped}`}
              aria-label={
                p.countsTowardPool
                  ? undefined
                  : `${p.displayName}, not counted — worst four-day pool total on this team`
              }
            >
              <div className={styles.pickMain}>
                <span className={`${styles.pickName} ${p.missedCut ? styles.pickNameMc : ''}`}>
                  {p.displayName}
                </span>
                <span className={styles.pickPos}>{p.positionDisplay}</span>
                {!p.countsTowardPool ? (
                  <span className={styles.droppedBadge}>Not counted (worst 4-day)</span>
                ) : null}
              </div>
              <DayScoreStrip
                cells={poolDayCells}
                dayEmphasis={mcWeekendEmphasis}
                className={styles.pickDays}
              />
              <div className={styles.pickTotals}>
                <span className={styles.pickPoolTotal} title="Pool: sum of daily scores">
                  {formatToPar(p.poolTotal)}
                </span>
                <span className={styles.pickTourn} title="Tournament total (ESPN)">
                  {p.scoreLabel}
                </span>
              </div>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
