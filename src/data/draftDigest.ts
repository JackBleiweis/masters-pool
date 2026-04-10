import type { PoolTeamDefinition } from './poolTeams'

/**
 * How teams are ordered on the digest screen = model projected pool finish (first → last).
 * Edit this list to change the predicted standings ladder; must match `teamName` in poolTeams.
 */
export const predictedFinishOrder: readonly string[] = [
  'Jack',
  'Jay',
  'Marshall',
  'Josh',
  'Kevin',
  'Ryan',
  'Seth',
  'Linda & Lawrence',
  'Alanna',
  'Abe',
  'Jodi',
] as const

/** Per-team scouting notes for the digest (order on screen comes from predictedFinishOrder). */
export const draftDigestParagraphs: Record<string, string[]> = {
  Jack: [
    'Fleetwood grades out as a high-floor, neutral-variance opener: the data you want behind Augusta’s second-shot emphasis is steady approach proximity and above-field putting from mid-range, and he’s historically lived in that band when the iron swing is on. I’m not looking for 2016-level Sunday fireworks from him every year, but he’s the kind of card holder who can stack two or three under-par moving days without needing to lean on a single outlier round.',
    'Reed is your volatility chip in the opposite direction—when the event compresses to wedge-and-putt, his short-game profile and competitive scoring history show up in the model as legitimate upside. The forecast weights a slightly wider dispersion band on him than on Fleetwood, which is intentional: you’re paying for weekend variance with a realistic path to a deep leaderboard charge if the long game finds enough fairways.',
    'Si Woo Kim reads as wind and long-par-4 insurance. Ball-speed tier is only part of the story here—what tends to separate players on this course under a breeze is mid-iron proximity and avoiding the compounding mistakes around the green. The projection likes his ability to limit damage when the golf course plays more defensively Thursday–Friday.',
    'Hatton gives you an aggressive scoring pulse; the analytical read is that he trades some directional risk off the tee for putter-adjacent recovery when he’s converting. In a pool format where you’re aggregating four days across five names, having one player whose putting curve can swing hard (in either direction) is a structural feature, not a bug—he’s the tail risk that can move the team total materially.',
    'Bradley rounds the roster with a steadier, PGA Tour–veteran arc: not always the flashiest strokes-gained profile in any one category, but historically less prone to the kind of multi-day wipeout that kills pool totals. The model treats him as a stabilizer behind the higher-variance names—think of him as trimming the downside while the top of the card chases ceiling.',
  ],
  Jay: [
    'Morikawa is the analytical anchor and it’s not close: when you map PGA Tour–level approach data to what Augusta rewards—long irons, precise distance control, avoiding the fat misses into the wrong tiers—he’s almost always in the discussion. The projection leans on his iron play as the primary driver of this team’s mean outcome; everything else is trying to hold serve around him.',
    'Matsuyama is the classic “course IQ plus ballstriking” combo the model refuses to discount at this event. Green jacket aside, what shows up in multi-year samples is a player who can execute the demanding approach lines and manage the places where the margin for error disappears. I’d call him a top-quartile fit when you’re stress-testing major-quality fields.',
    'Spaun is the positional, fairways-and-angles pick. In raw ceiling terms he’s not the same class as the first two names, but the forecast likes his tendency to keep crooked numbers off the card—you’re buying process and error rate more than peak ball speed. That matters more than people think in a total-to-par pool.',
    'Knapp injects power and form-based upside. The model flags him as one of the wider-interval players on this roster: driving distance and short-game creativity can absolutely spike the weekly number, but you should expect a little more round-to-round variance than with the anchors. I’m pricing that honestly in the simulation passes.',
    'Stevens is the roster’s live underdog slot—smaller major sample, but the indicators we track on tee-to-green efficiency and recent scoring clusters suggest he’s not a pure lottery ticket. The digest treats him as a legitimate fifth who can outperform his public perception if the putter cooperates for a full week.',
  ],
  Marshall: [
    'Young is the raw-tools play Augusta analysts always argue about: the ball speed and carry numbers are real, and when the driver is neutral-to-solid the approach advantage can show up in big chunks. The model hedges that with higher conditional variance—fairway percentage is the gating statistic in most of our scenario runs.',
    'Gotterup profiles similarly in structure—big driver, developmental short-game samples—so you’re effectively doubling down on a modern power archetype with two different handoffs. I like the construction philosophically if you believe the course sets up for fewer penalty scenarios this year; the math says you accept more tail risk for a better monster-week ceiling.',
    'Scott is where experience and long-iron competence enter the picture. His historical major scoring band is easy to underestimate because it isn’t always flashy, but the strokes-gained decomposition typically shows a steadier iron week than the field average when he’s in form. I’m giving him credit for Augusta-style shot demands even at this stage of his career.',
    'Woodland is another power-with-pedigree name; the analytical question is always wedge proximity after driving advantage. When that piece clicks, he can still post the kind of weekend that moves a family pool—your downside case is dispersion and short-game variance, which we model explicitly.',
    'Couples is a limited-minutes, experience-weighted line in the forecast. We cap expected contribution relative to a full-schedule PGA regular because the sample is what it is, but we don’t zero him out—there’s still signal in course comfort and knowing where not to miss. Think of his projection as a discounted veteran curve with a “Sunday storyline” weekend still on the table.',
  ],
  Josh: [
    'Owner context matters when we’ve got history: Josh won this pool in 2025, and the read from that isn’t mystical—it’s that repeat champions in these formats tend to draft with conviction once they’ve seen how four-day volatility propagates through five-player totals. This year’s card opens with the most defensible “catch the world No. 1” structural pick on the board.',
    'Scheffler is the engine. Across every major-quality field simulation we run, his ballstriking cluster separates early; the putting distribution is the swing factor everyone talks about because it’s the least stable week-to-week, but the tee-to-green baseline is so high that you’re almost always buying a top-decile floor if health is normal.',
    'Spieth is your structured chaos: the statistical signature is still elite recovery and short game with more driver variance than the truly elite tier. When the long game is playable, the model moves his distribution meaningfully upward; when it isn’t, you see the double-bogey clusters. I’m pricing that honestly—he’s variance with a green jacket–shaped upside case.',
    'Min Woo Lee is offense-first: driving distance, scoring bursts, and a ceiling tied to iron-plus-wedge conversion. I’m watching accuracy thresholds—this course punishes loose lines more than a resort setup—but the upside case is absolutely real if he keeps the ball in playable surfaces Thursday and Friday.',
    'English is the quiet stabilizer—steady approach and putting competence without needing a career week. McCarty closes as the long-tail upside: lighter weight in the mean projection, but not deleted from the tail scenarios where form clicks and he outruns seed. That’s standard roster math at the five-hole.',
  ],
  Kevin: [
    'Rahm is a major-anchor archetype in the purest sense: power to shorten holes, touch when the hole location demands it, and enough course-management maturity to survive the mid-tournament reset. The model treats his week-to-week floor as one of the highest in the field when he’s tournament sharp.',
    'Koepka is the “conditions get firm and the story turns serious” profile. Historically his weekend scoring band in majors tightens relative to Thursday when the test resembles a U.S. Open–style examination, and Augusta can give you slices of that if the wind blows. I’m not selling him as one-dimensional—the upside is real when iron dispersion cooperates.',
    'Bridgeman is a rookie-variance slot by construction. Recent-form indicators and speed numbers get him in the field conversation; the model widens confidence intervals because major sampling is thin. That’s not a knock—it’s how honest projections behave.',
    'Rasmus Højgaard brings athletic speed and iron heat with a younger-player dispersion shape. The forecast likes the ceiling case when timing is right; the caution flag is left-miss patterns under pressure—Augusta converts those into big numbers faster than a regular tour stop.',
    'Penge is your late-card bet on trajectory. Smaller public footprint, but the model tracks short-window form and quality-of-contact proxies; he’s flagged as live if the draw and conditions line up, with appropriately conservative weight at the mean.',
  ],
  Ryan: [
    'DeChambeau is the classic Augusta analytics debate in one player. The driver curvature and speed can yield enormous approach advantages; the trade is penalty risk when the corridor shrinks. Our scenario engine spends a lot of time on fairway-acquired outcomes here—if you land in the “fairway-adjacent, not in lumber” bucket, the team total moves a lot.',
    'Bhatia is a creative scorer with a short-game spine that can bail out driver volatility. That combination tends to look better in pool formats than in pure pick-the-winner markets because you’re summing daily outputs. I’m giving him credit for scrambling and mid-iron precision when weeks turn messy.',
    'Nicolai Højgaard matches the Nordic power-and-irons template. Weekend projection hinges on ball flight in wind—the data treatment is similar to his brother’s class of player with a touch more emphasis on iron apex control when greens firm.',
    'McNealy reads neutral-to-positive in error rate versus tour average: not always the flashiest, but the kind of player who can slide into red figures without needing a putting heater. I call that middle-board insurance in these digests—valuable in totals.',
    'Hall closes with steady-state scoring—a profile built on approach consistency and limiting disaster holes. If you’re building a balanced aggregate roster, this is how you land the plane after taking earlier positional risks.',
  ],
  Seth: [
    'Seth won this pool in 2024, and that’s not trivia—it’s a signal about how you behave after you’ve won once: you usually stop treating the draft like a lottery ticket and start optimizing for correlated upside without torching your floor. The model bumps “repeat-builder” behavior slightly before we even open the player file.',
    'McIlroy is still one of the pure ceiling names in any major field when the short game is tour-average or better. Multi-year Augusta samples show repeated high finishes with a narrow set of historic “what-if” weekends; the projection treats him as a legitimate trophy-tier outcome when putting converts the looks his iron play tends to create.',
    'MacIntyre brings lefty shot-shaping plus a gritty scoring profile that ages well in wind and stress. I like his archetype when the course plays more like a ballstriking test than a putting contest—his week often lives and dies on whether he avoids the one big swing-miss off the tee at the wrong moment.',
    'Thomas is high-skill irons plus putting variance. When the putter is neutral or positive, the model shifts the distribution hard right; when it’s cold, you see it in the daily totals immediately. That’s priced—he’s not miscast as a safe-floor player.',
    'Gerard is a younger-tour profile where the forecast leans on recent trajectory and ball-striking indicators more than a deep major sample—think live ceiling with a wider confidence band until the major starts pile up. The upside case is real if the iron dispersion tightens under stress.',
    'Griffin closes the card with a steady-earner archetype: not always the headline name in draft rooms, but the kind of tee-to-green baseline that can keep a pool total respectable when the putter cooperates. I’m treating him as a floor-and-sneaky-weekend contributor behind the bigger names.',
  ],
  'Linda & Lawrence': [
    'Åberg is the swing-speed and iron-quality centerpiece on this card. In terms of pure ballstriking proxies among younger players, he grades in the elite tier; the Augusta question is the same as always—can you pair that with enough start-line control when the corridors narrow? The projection assumes a meaningful share of upside outcomes when he’s swinging freely.',
    'Conners is textbook fairway-and-green reliability: not always the birdie fountain, but historically strong at keeping the train on the tracks when conditions get sour. I value that highly in a four-day sum format where one 78 can bury you.',
    'Smith gives you short-game sorcery and trajectory versatility around the greens where this tournament is often decided. The model treats his week as more sensitive to putting feel than driving distance—when the flatstick cooperates, the daily numbers can stack quickly.',
    'Homa is an all-around scoring package: stress irons, solid pace, and putter weeks that can carry stretches. His statistical footprint in strong fields is usually above median across categories rather than one mega-skill, which plays well in aggregate projections.',
    'Harman is the lefty grind profile—accuracy tendencies, competitive intensity, and a real history of hanging around leaderboards without needing insane driver numbers. I like the fit when you’re trying to pair stars with a player whose dispersion profile shrinks in the wind.',
  ],
  Alanna: [
    'First year in the pool for Alanna, so the owner-side projection carries a wider confidence band—nothing personal, it’s how the model treats newcomers until we have scoring history in this exact format. The player card itself is veteran-heavy and reads like someone who studied where Augusta punishes mistakes.',
    'Rose opens with a classic iron-and-touch profile. When his body cooperates, his approach distribution still looks like a player who belongs in major conversation; the model keys on mid-iron proximity more than length for him, which lines up with what this course asks.',
    'Fitzpatrick is a grit-and-precision archetype—smaller swing, high execution demands, historically comfortable when the test is shotmaking over speed. Saturday stress scenarios move his median up relative to a generic tour average.',
    'Day remains an upside-ceiling player if the driver week is clean—availability and health matter for mean projection, but the iron peaks are still in the data. I’m not writing off a hot week when timing aligns.',
    'Johnson is power optionality: the long-game ceiling is obvious; the variance lives in wedge proximity and short-game consistency. Clark closes as an aggressive driver with a conversion profile that can move if the putter gets hot—think volatility with real Sunday equity.',
  ],
  Abe: [
    'Abe is another first-time entrant in this pool; we apply the same rookie-owner spread on uncertainty, then lean entirely on the player-level distributions. The roster itself doesn’t read like a novelty stack—it’s anchored by one of the steadiest major performers on tour.',
    'Schauffele is the natural 1A: balanced across driving, approach, and putting in elite fields, with a weekend scoring pattern that typically holds under pressure. The model treats his mean outcome as top handful when healthy—this is how you buy real equity without reaching for gimmicks.',
    'Lowry brings wind-play savvy and short-game creativity; the statistical read is above-average scrambling and tactical shot selection when conditions get unpleasant. That’s a meaningful hedge in a tournament where one bad weather wave reshuffles the cut line and the weekend totals.',
    'Henley is fairway-first, iron-steady, and built to avoid the catastrophe round. I like him as a pool stabilizer next to higher-variance stars—he’s not always the name that wins the draft room, but he’s often the name that keeps your sum alive.',
    'Burns adds pop off the tee and iron-adjacent firepower with a putter that can run hot in bursts. Noren rounds with iron-driven control and an approach profile historically tied to precision-driven golf—good fit for second-shot scoring if he’s sharp from 150 and in.',
  ],
  Jodi: [
    'First pool for Jodi as an owner, so the forecast isolates player talent and intentionally avoids overfitting “feel.” The construction still reads coherent: you’re starting with one of the best pace-and-approach players in the world and building around complementary skill sets.',
    'Cantlay is the engine—elite approach metrics, disciplined targeting, and a tempo that tends to travel. In simulation passes he’s frequently the median driver of this team’s total because his error-rate and iron-proximity clusters are both favorable versus field average.',
    'Hovland brings massive driving and iron upside with short-game variance flagged as the watch stat. When he chips and pitches at tour baseline, the distribution shifts sharply higher; the model doesn’t pretend the downside case doesn’t exist, but the ceiling case is absolutely in play.',
    'Im is the volume and consistency name: high floor in four-day aggregation because he minimizes blow-up holes and keeps giving himself mid-length looks. That’s less flashy in draft chatter but it’s gold in a summed-score format.',
    'Straka gives you a balanced U.S.-based profile with improving major finishes—the kind of player whose baseline has crept up over the last few seasons. Berger closes with athletic power and a bounce-back trajectory if the driver and wedges synchronize; we weight him as high-upside with a slightly wider band than the anchors.',
  ],
}

export function poolTeamsInPredictionOrder(teams: readonly PoolTeamDefinition[]): PoolTeamDefinition[] {
  const map = new Map(teams.map((t) => [t.teamName, t]))
  const seen = new Set<string>()
  const out: PoolTeamDefinition[] = []
  for (const name of predictedFinishOrder) {
    const row = map.get(name)
    if (row) {
      out.push(row)
      seen.add(name)
    }
  }
  for (const t of teams) {
    if (!seen.has(t.teamName)) out.push(t)
  }
  return out
}
