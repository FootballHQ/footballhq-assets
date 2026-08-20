# TURF — Canonical 12-Batch Roadmap

This file is the durable source of truth for the TURF rebuild. Do not delete or casually rewrite it. Make a known-good checkpoint before each major batch.

## Locked economy names
- **TURF Coins** — primary earnable currency
- **Chrome** — paid premium currency
- **REP** — progression / upgrade currency
- **TURF Marks** — pass / event-earned currency
- **TURF Pass Elite** — premium reward track

## Batch 1 — Account/sign-in + reliable saving
- Add a proper opening sign-in gate for turftrials.com.
- Preferred flow: **Continue with Google** and **Continue as Guest**.
- A signed-in user must always return to the same permanent TURF account.
- Stop silently creating a new account or reverting to an older account.
- Preserve account identity across refreshes, browser sessions, and future deployments.
- Guest accounts should have a stable guest identity and later be upgradeable/linked to a signed-in account.
- Load the authoritative account before rendering the Home page.
- Move critical progression data to reliable server-side storage where appropriate: coins, XP, cards/collection, locker items/equipment, streaks, rewards, pass progress, currencies, game progress and records.
- Keep localStorage only as a cache/convenience layer, never as the sole source of truth for permanent account ownership.
- Add clear account state UI so the player knows which TURF account is active.
- Build migration logic so an existing good account can be adopted instead of overwritten.
- Do not wipe or replace a newer server account with stale browser data.

## Batch 2 — TURF visual cleanup
- Install the real blue/silver/black TURF favicon instead of the blank/default T.
- Remove remaining FootballHQ branding from the live TURF experience.
- Fix the Rankings player-card X so the full close button fits below the top bar.
- Remove fallback/broken TURF labels appearing over images.
- Replace old FootballHQ coin art in Locker with TURF Coin art.
- Remove duplicated Locker items such as duplicate Blue Blitz Rings where caused by data/render duplication.
- Move Chameleon and Two Face into the same square casual-game grid format as the other games and remove the large/sloppy top placement.

## Batch 3 — Home 2.0
- Full professional redesign of Home.
- Replace blurry/stretched artwork with crisp assets sized for their real display area.
- Replace unreadable stat blocks and black-background stat icons with polished designed tiles.
- Hero should feature TURF branding, Play Daily, Continue, level/XP/progression.
- Daily section should clearly show challenges, leaderboard position, reward and streak.
- Add Featured area for packs, TURF Pass Elite, events/promos and limited rewards.
- Add Continue Playing and Collection preview sections.
- Overall goal: cohesive premium sports-game hub, not an admin dashboard.

## Batch 4 — Full-page game framework + Daily/Unlimited
- Move casual and competitive games away from generic popup/modal presentation.
- Each game should have its own detailed, colorful TURF page inside the same app shell; do not open a separate browser tab.
- Keep TURF navigation visible.
- Include game identity, rules, Daily/Unlimited tabs, difficulty where relevant, streaks, records and rewards.
- Preserve Daily/Unlimited for every applicable game and keep tab state authoritative after rerenders.
- Daily remains once/account/day where designed; Unlimited remains replayable.

## Batch 5 — 40-Yard Dash 2.0
- Record actual elapsed time from start to finish. If the user finishes in 13.34 seconds, display **13.34 seconds**.
- Remove fake/random fixed finish-time ranges.
- Make the field/race substantially longer so average play is roughly 10–15 seconds rather than a few seconds.
- Performance should reflect both card quality and click performance.
- Show the entire card catalog in selection: owned cards full-color/selectable; unowned cards visible but locked/dimmed.
- Stop showing only the same six random common/uncommon cards.
- Future H2H can use a five-card event lineup and random events, but that is not part of this batch.

## Batch 6 — Card system rebuild
- Rebuild cards to one exact standardized canvas/frame size and safe-zone system.
- Remove FootballHQ logos and legacy branding.
- Fix clipping, inconsistent sizing, black boxes and blurry artwork.
- Create a coherent TURF rarity visual system from Common through Signature/Special.
- Collection views and card art must feel intentionally designed, not patched.

## Batch 7 — Pack/shop rebuild
- Fix Shop pack loading so packs do not zoom/glitch close then far away while rendering.
- Give pack containers fixed dimensions before art loads.
- Rebuild pack art to TURF-only branding and standardized sizing.
- Rebuild opening animations: stable pack entrance, open/tear, card reveal, rarity effects, duplicate/collection information.
- Make avatars purchasable in Shop instead of only appearing in Locker.
- Long-term Shop structure: Featured, Packs, Promo sections, REP section, TURF Marks/season section, cosmetics.

## Batch 8 — Economy 2.0 + Coins/XP/REP/Chrome
- Scale the coin economy upward so rewards feel meaningful without changing purchasing power arbitrarily.
- Example target scale: level-ups in the thousands, stronger packs in the tens of thousands, large bundles around hundreds of thousands.
- High-end packs can be around ~80K Coins; large bundles around ~225K where balanced.
- Unlimited games should grant modest Coins + XP so they are worth playing, but materially less than Daily rewards to prevent farming abuse.
- Packs and overall rewards should be worth more Coins in proportion to the new economy.
- Add Chrome as the premium paid currency.
- REP is the progression/upgrade currency; do not call it Training.

## Batch 9 — TURF Pass Elite + TURF Marks
- Free reward path + paid **TURF Pass Elite** path.
- Elite purchased using Chrome.
- Rewards can include Coins, packs, cosmetics, cards, REP, TURF Marks and special items.
- TURF Marks are earned through passes/events and spent in a dedicated Marks Store.
- Use this system as a core grind/reward loop.

## Batch 10 — Unique daily/weekly collectibles and cosmetics
- Daily/weekly rewards should rotate and feel unique rather than repeating the same item every week.
- Use limited serialized collectibles (for example #184/5000) to create scarcity and desirability.
- Reserve true 1-of-1 items for genuinely special events rather than every normal reward.
- Potential items: rings, banners, titles, avatars, limited cards, packs and event cosmetics.

## Batch 11 — H2H five-card lineup
- Future competitive mode lets a player choose five cards they own.
- Events are selected from the competitive event pool and use the chosen lineup.
- Build only after account identity, inventory ownership and core game systems are stable.

## Batch 12 — Auction House / Trade Block
- Auction House for cards/cosmetics with bids, buy-now and recent-sales information.
- Trade Block for offers/requests with protected confirmation and trade history.
- Only build after account saving and inventory ownership are trustworthy.

## Other locked product direction
- Keep turftrials.com GitHub root wrapper stable; do not casually edit production shell after the recovery incident.
- If turftrials.com breaks while the direct Apps Script web-app works, inspect the custom-domain wrapper before rolling back the whole app.
- Save a known-good checkpoint before every major batch.
