# TURF Approved Visual Preservation — 8962

## Source of truth

Approved visual checkpoint: **8962**

Reference commit: `2f2c62c8818edcb389e9e652a3be10f59e3a4ca4`

Reference entrypoint: `v88-36/js/47-turf-batch2-visual-v8897.js`

## Must remain visually preserved

- Approved TURF hero artwork and sizing
- Approved TURF sidebar logo/brand block
- Approved top utility bar and profile treatment
- Home layout and spacing
- New Game panel, including Depth Chart presentation
- Featured Challenges panel
- Competitive navigation rows:
  - Trials
  - Cases
  - Trivia Tac Toe
  - 4 in a Row
- Shop / Locker / Collections navigation
- Collection 001 — The Gridiron
- Collection 002 — The Sideline
- Existing approved responsive/mobile behavior

## Batch rule

Batch 4 and later may add or change game-page functionality, Daily/Unlimited state, results, rewards, Trials, Draft, H2H, backend transport, and future features.

They must **not** replace, restyle, rename, resize, hide, or restructure approved 8962 Home/sidebar/topbar/brand/collection presentation unless a later visual checkpoint is explicitly approved.

## Migration rule

Static-host/backend migration code must not clear authentication tokens as a side effect of loading presentation code.

Static compatibility/regression layers must never substitute generic TURF wordmarks or placeholder artwork for the approved 8962 raster assets.

`static-approved-8962-lock.js` is presentation-only and contains no account/storage writes.
