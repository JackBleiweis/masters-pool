/**
 * Family pool picks — ESPN competitor `id` strings from the Masters leaderboard JSON.
 * Draft order: row 1 left → right (Josh … Jodi), then snake through rows 2–5.
 * Profile photos: `public/photos/profiles/` (see each `avatarSrc`).
 *
 * Player names in comments are for readability; source of truth is ESPN `id` at Masters.
 * IDs for players not listed on the live scoreboard still resolve once ESPN includes them.
 */

export interface PoolTeamDefinition {
  teamName: string
  /** Public URL under `/photos/profiles/`, or null for initials fallback. */
  avatarSrc: string | null
  /** Drafted golfer ESPN ids (usually 5; fewer if the slow draft is still open). */
  espnAthleteIds: readonly string[]
}

export const poolTeams: PoolTeamDefinition[] = [
  {
    teamName: 'Josh',
    avatarSrc: '/photos/profiles/josh.png',
    espnAthleteIds: [
      '9478', // Scottie Scheffler
      '5467', // Jordan Spieth
      '4410932', // Min Woo Lee
      '5408', // Harris English
      '4901368', // Matt McCarty
    ],
  },
  {
    teamName: 'Ryan',
    avatarSrc: '/photos/profiles/ryan.png',
    espnAthleteIds: [
      '10046', // Bryson DeChambeau
      '4419142', // Akshay Bhatia
      '11250', // Nicolai Højgaard
      '9530', // Maverick McNealy
      '4589438', // Harry Hall
    ],
  },
  {
    teamName: 'Seth',
    avatarSrc: '/photos/profiles/seth.png',
    espnAthleteIds: [
      '3470', // Rory McIlroy
      '11378', // Robert MacIntyre
      '4848', // Justin Thomas
      '3351', // Marc Leishman
      '9261', // Abraham Ancer
    ],
  },
  {
    teamName: 'Kevin',
    avatarSrc: '/photos/profiles/kevin.png',
    espnAthleteIds: [
      '9780', // Jon Rahm
      '6798', // Brooks Koepka
      '5054388', // Jacob Bridgeman
      '11253', // Rasmus Højgaard
      '4585549', // Marco Penge
    ],
  },
  {
    teamName: 'Linda & Lawrence',
    avatarSrc: '/photos/profiles/linda-and-lawrence.JPG',
    espnAthleteIds: [
      '4375972', // Ludvig Åberg
      '9126', // Corey Conners
      '9131', // Cameron Smith
      '8973', // Max Homa
      '1225', // Brian Harman
    ],
  },
  {
    teamName: 'Abe',
    avatarSrc: '/photos/profiles/abe.jpeg',
    espnAthleteIds: [
      '10140', // Xander Schauffele
      '4587', // Shane Lowry
      '5409', // Russell Henley
      '9938', // Sam Burns
    ],
  },
  {
    teamName: 'Marshall',
    avatarSrc: '/photos/profiles/marshall.png',
    espnAthleteIds: [
      '4425906', // Cameron Young
      '4690755', // Chris Gotterup
      '388', // Adam Scott
      '3550', // Gary Woodland
      '91', // Fred Couples
    ],
  },
  {
    teamName: 'Alanna',
    avatarSrc: '/photos/profiles/alanna.jpeg',
    espnAthleteIds: [
      '569', // Justin Rose
      '9037', // Matt Fitzpatrick
      '1680', // Jason Day
      '3448', // Dustin Johnson
      '11119', // Wyndham Clark
    ],
  },
  {
    teamName: 'Jack',
    avatarSrc: '/photos/profiles/jack.png',
    espnAthleteIds: [
      '5539', // Tommy Fleetwood
      '5579', // Patrick Reed
      '7081', // Si Woo Kim
      '5553', // Tyrrell Hatton
      '4513', // Keegan Bradley
    ],
  },
  {
    teamName: 'Jay',
    avatarSrc: '/photos/profiles/jay.png',
    espnAthleteIds: [
      '10592', // Collin Morikawa
      '5860', // Hideki Matsuyama
      '10166', // J.J. Spaun
      '9843', // Jake Knapp
      '4426181', // Sam Stevens
    ],
  },
  {
    teamName: 'Jodi',
    avatarSrc: '/photos/profiles/jodi.JPG',
    espnAthleteIds: [
      '6007', // Patrick Cantlay
      '4364873', // Viktor Hovland
      '11382', // Sungjae Im
      '8961', // Sepp Straka
    ],
  },
]
