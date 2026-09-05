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
- Early availability probabilities (for example, chance available at picks 20, 40, and 60)
- Biggest reaches, fallers, and most volatile players

Loaded league IDs:
- 71826188
- 1366438767
- 331634958

## Important sample-size note
With 3 leagues, rates and availability percentages move in roughly 33-point increments. These metrics are functional and repeat patterns are beginning to emerge, but they will become much more stable and useful as additional drafts are loaded.

## Next planned steps
As more leagues are added:
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
Raw ESPN league exports, member identifiers, and account data are intentionally **not stored in this public repository**. Only the reusable code and sanitized project checkpoint are stored here.
