# Masters Pool

Family pool app: live **Masters** leaderboard from ESPN (no API key) plus a **pool** page that scores each team **by day** (four rounds), then totals.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build   # production bundle
npm run lint
npm run format  # Prettier
```

## Data & picks

- **Tournament data**: Masters only — `GET https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard/{MASTERS_EVENT_ID}` (`MASTERS_EVENT_ID` in [`src/lib/golfApi.ts`](src/lib/golfApi.ts); update yearly when ESPN assigns a new Masters event id).
- **Pool teams**: Edit [`src/data/poolTeams.ts`](src/data/poolTeams.ts). Each pick is an ESPN **competitor `id`** from the Masters leaderboard (`competitions[0].competitors[].id`).

## Team photos

1. Add images under [`src/assets/team-avatars/`](src/assets/team-avatars/) (e.g. `jack.jpg`).
2. At the top of `poolTeams.ts`, add: `import jackImg from '../assets/team-avatars/jack.jpg'` and set `avatarSrc: jackImg` for that team.

**Accessibility**: `TeamAvatar` uses `alt=""` when the team name is already in the same control (decorative). If you use a meaningful `alt`, pass it from the component later.

## Scoring rules

- **Daily**: For each round (1–4), each pick’s score is their **strokes vs par** that day from ESPN (`linescores`). If they have no posted score yet for that round, that day counts as **0** for the pool (shown as **-** in the UI).
- **Drop worst**: Each team excludes the pick with the **highest** four-day pool total (sum of those daily numbers). Ties: the **later-listed** pick in `poolTeams` is dropped. Single-pick teams do not drop anyone.
- **Team day** = sum of the **counting** picks’ daily numbers (missing picks or missing rounds = 0).
- **Team pool total** = **D1 + D2 + D3 + D4** over counting picks only. Lower is better. The **Σ** on each row matches those daily cells: **-** is treated as 0 when you add mentally.

## Refresh

The app **polls ESPN every 60 seconds**. Use **Refresh** on either page for an immediate reload. Background polls do not clear the UI on failure; a banner may show if a manual load fails while older data is still shown.

## Stack

Vite, React 19, TypeScript, React Router, Sass (CSS modules + shared design tokens in [`src/styles/_design-system.scss`](src/styles/_design-system.scss)).
