export interface PastChampionEntry {
  year: number
  poolWinner: string
  mastersChampion: string
  picks: string[]
  /** Display string e.g. "−23" or "+8" */
  totalScoreDisplay: string
  youtubeWatchUrl: string
  /** Optional portrait — `public/photos/champions/` then e.g. `/photos/champions/name-year.png` */
  winnerPhotoSrc?: string
  winnerPhotoAlt?: string
}

export const pastChampions: PastChampionEntry[] = [
  {
    year: 2025,
    poolWinner: 'Josh Bleiweis',
    mastersChampion: 'Rory McIlroy',
    picks: [
      'Xander Schauffele',
      'Justin Thomas',
      'Cameron Smith (MC)',
      'Patrick Reed',
      'Justin Rose',
    ],
    totalScoreDisplay: '−23',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=pRTIOuhZkbU',
    winnerPhotoSrc: '/photos/champions/josh-bleiweis-2025.png',
    winnerPhotoAlt:
      '2025 Masters Pool winner Josh Bleiweis with a child on a golf course overlooking the water.',
  },
  {
    year: 2024,
    poolWinner: 'Seth Bleiweis',
    mastersChampion: 'Scottie Scheffler',
    picks: [
      'Xander Schauffele',
      'Ludvig Aberg',
      'Corey Conners',
      'Min Woo Lee',
      'Si Woo Kim',
    ],
    totalScoreDisplay: '+8',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=PsaymWZkWmQ',
    winnerPhotoSrc: '/photos/champions/seth-bleiweis-2024.png',
    winnerPhotoAlt:
      '2024 Masters Pool winner Seth Bleiweis on a coastal golf course tee box with water and hills behind him.',
  },
]

export function youtubeWatchToEmbed(watchUrl: string): string | null {
  try {
    const u = new URL(watchUrl)
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}`
    }
  } catch {
    /* ignore */
  }
  return null
}
