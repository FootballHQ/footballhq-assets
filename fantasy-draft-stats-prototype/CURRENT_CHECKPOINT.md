# Fantasy Draft Stat Machine — Current Checkpoint

Saved: 2026-09-04

## Current state

- 3 ESPN 2026 drafts loaded as the fixed observed draft sample.
- 480 total selections across the 3 leagues.
- 173 unique drafted players.
- 340 manual picks and 140 auto picks.
- Browser dashboard now has source tabs for:
  - ESPN
  - Flock
  - Yahoo
  - FantasyPros
  - DraftSharks
  - TURF
  - Compare
- Every source tab uses the SAME three observed ESPN drafts. Only the ranking baseline changes.
- ESPN comparison data comes from the uploaded ESPN league/player metadata.
- Flock ranking data is sourced from the ranking board already embedded in TURF.
- Yahoo, FantasyPros, and DraftSharks use the latest ranking imports available from the existing TURF project history; they must be labeled as imported snapshots unless refreshed.
- FantasyPros current top five were patched from the Sep. 5 current PPR page in the current dashboard build.
- TURF comparison uses the current TURF master/starter board embedded in the existing project build.

## Important ADP fix

The main player list is no longer sorted by drafted-only average.

Primary sort is now **Expected Pick**:

- If a player is drafted in a league, use the actual pick.
- If a player is undrafted in one of these 160-pick drafts, that league contributes pick 161.
- Average those values across all loaded leagues.

This prevents a one-off outlier from looking like true ADP. Example: Ray Davis was picked 1.01 in one draft but undrafted in the other two, so his Expected Pick is (1 + 161 + 161) / 3 = 107.7 rather than 1.0.

The dashboard still keeps **Drafted-only Avg**, earliest, latest, range, and volatility so outliers remain visible.

## Current dashboard behavior

For each source tab:

- Biggest reaches versus that source ranking
- Biggest fallers versus that source ranking
- Same observed draft volatility
- Master player table sorted by Expected Pick
- Source Rank and Vs Source gap change when the tab changes

Compare tab shows:

- Player
- Expected Pick
- Drafted %
- ESPN
- Flock
- Yahoo
- FantasyPros
- DraftSharks
- TURF
- Consensus
- Rank spread

## Data-safety rule

Do NOT commit raw private ESPN league JSON, member data, login credentials, or cookies to this public repository. The private league exports remain in the ChatGPT file/library workspace. Only code, methodology, and safe derived dashboard/checkpoint material belong in GitHub.

## Next step

Continue adding ESPN leagues to the same observed sample. Recalculate Expected Pick and all source comparisons after each batch. As the sample grows, add availability-at-pick probabilities, player-vs-player rates, positional runs, draft-slot tendencies, and turn-return probability.
