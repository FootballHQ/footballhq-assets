# Fantasy Draft Statistics Stat Machine

Checkpoint updated September 4, 2026.

## Current progress
- 3 ESPN 2026 leagues loaded
- 480 total draft selections
- 173 unique drafted players in the current sample
- 340 manual picks and 140 auto-drafted picks
- Browser-based analytics dashboard plus Excel workbook
- Player headshots and NFL team logos
- Per-league draft boards
- Master player table across all loaded leagues
- ESPN ADP comparison
- Observed average pick and median pick
- Earliest and latest selection
- Draft range and standard deviation / volatility
- Drafted percentage across loaded leagues
- Manual-vs-auto average draft position
- Reach and fall rates
- Early availability probabilities
- Biggest reaches, fallers, and most volatile players

## New multi-source ranking design
The browser stat machine now has source tabs for:
- ESPN
- Flock
- Yahoo
- FantasyPros
- DraftSharks
- TURF
- Compare

Every source tab uses the exact same observed ESPN draft sample. Switching tabs changes only the ranking baseline used to calculate reaches, fallers, and rank gaps.

Current ranking-source coverage comes from the existing TURF project data/imports. ESPN is taken from the uploaded ESPN league metadata; Flock is loaded from TURF's embedded Flock board; Yahoo, FantasyPros, and DraftSharks use the latest imported TURF snapshots available in project history; TURF uses the embedded TURF master/starter board. Do not describe an imported snapshot as live unless it has been refreshed from that source.

## Expected Pick / ADP sorting fix
The master table is now sorted by **Expected Pick**, not drafted-only average pick. For a 160-pick league, an undrafted player contributes pick 161. This prevents a one-off outlier (for example, Ray Davis being selected 1.01 in one league but undrafted in the other two) from appearing as the most likely first overall pick.

The dashboard still displays **Drafted-only Avg** separately so unusual selections remain visible and analyzable.

## Compare view
Planned/current comparison columns:
- Player
- Expected Pick
- Drafted %
- ESPN
- Flock
- Yahoo
- FantasyPros
- DraftSharks
- TURF
- Cross-source consensus
- Source spread / disagreement

## Important sample-size note
With 3 leagues, rates and availability percentages move in roughly 33-point increments. These metrics are functional and repeat patterns are beginning to emerge, but they will become much more stable and useful as additional drafts are loaded.

## Next planned steps
As more leagues are added:
- Refresh all source ranking snapshots and attach freshness timestamps
- Larger availability-probability curve at many future picks
- “Will this player make it back to me?” probability by snake draft slot
- Player-vs-player draft rates
- Round and pick distributions
- Positional-run detection
- Draft-slot tendencies
- League-setting segmentation (team count, scoring, format)
- Manual-only / auto-only filtering throughout the dashboard
- Better interactive filtering and sorting in the browser view

## Privacy
Raw ESPN league exports, member identifiers, and account data are intentionally **not stored in this public repository**. Only reusable code and sanitized project checkpoints are stored here.
