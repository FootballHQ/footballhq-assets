# TURF v89.62 Preservation Audit

Status: PRESERVATION BASELINE LOCKED

Approved visual source of truth:
- Version: v89.62 / 8962
- Commit: `2f2c62c8818edcb389e9e652a3be10f59e3a4ca4`
- Commit message: `Restore v89.60 Home and fix competitive sidebar rows`

## Audit result

A comparison from the approved checkpoint to current `main` confirms that the original approved visual source files were not modified after 8962. The visible drift in the static migration build was caused by additional static migration layers loaded after the approved stack, not by loss of the approved source files.

## Approved presentation that must remain unchanged

- Exact TURF raster brand artwork / logos
- Sidebar brand block and sizing
- Home hero composition and width
- Top utility bar presentation
- Profile button treatment
- Home page spacing and balance
- New Game panel and featured Depth Chart presentation
- Featured Challenges panel
- Daily Rewards placement
- Competitive sidebar order and labels:
  - Trials
  - Cases
  - Trivia Tac Toe
  - 4 in a Row
- Shop / Locker / Collections navigation
- Collection 001 and Collection 002 availability
- Desktop/mobile responsive behavior approved at 8962

## Original approved visual stack

The static migration build retains the approved visual files, including:

- `v88-36/js/88-turf-home2-v8918.js`
- `v88-36/js/89-turf-home2b-v8919.js`
- `v88-36/js/90-turf-favicon-v8920.js`
- `v88-36/js/96-turf-coin-ui-cleanup-v8928.js`
- `v88-36/js/97-turf-visual-polish-v8929.js`
- `v88-36/js/98-turf-visual-polish-v8930.js`
- `v88-36/js/99-turf-visual-cleanup-v8931.js`
- `v88-36/js/102-turf-approved-brand-v8937.js`
- `v88-36/js/103-turf-final-fixes-v8939.js`
- `v88-36/js/108-turf-layout-balance-v8954.js`
- `v88-36/js/109-turf-home3-polish-v8961.js`

The approved brand authority (`102-turf-approved-brand-v8937.js`) still contains the exact approved raster artwork.

## Static migration preservation fixes

### Disabled legacy Home-rewriting layer

`turf-static/js/static-current-turf-shell.js`

This file previously rebuilt/reformatted the Home page, topbar, brand block, New Game and Featured Challenges after the approved visual scripts had loaded. It is now intentionally a no-op.

Disable commit: `2b47ca461cee03a2e58cbf4fc02286ebd1e51f63`

### Disabled legacy final-parity layer

`turf-static/js/static-final-parity.js`

This file previously changed the hero and injected alternate competitive navigation after the approved visual scripts. It is now intentionally a no-op.

Disable commit: `788f5d007502da2705601b0244c5f88bd995b120`

### Approved 8962 lock

`turf-static/js/static-approved-8962-lock.js`

Presentation-only guard derived from the approved checkpoint. It preserves hero sizing, sidebar logo sizing, profile treatment and competitive row presentation without performing the auth/storage clearing that existed in the historical visual entrypoint.

### Set 002 safety guard

`turf-static/js/static-regression-fixes.js`

This file no longer changes Home or branding. It is limited to ensuring `The Sideline` / Set 002 remains available when account collection data is present and loading the approved 8962 lock.

## Batch 4 isolation audit

`static-batch4-game-pages.js` is scoped to the open game state / `#footballGameOverlay`.

`static-batch4-game-state.js` is scoped to:
- `#footballGameOverlay`
- `#fgResultOverlay`
- Batch 4 header/status elements
- `body.turf-b4-game-open`
- `body.turf-b4-result-open`

It does not mutate `#fhqHome`, `#fhqBrandHome`, `#turfTopbar`, the standard sidebar presentation, or Collections.

Therefore Batch 4 can continue without intentionally changing the approved Home presentation.

## Production root audit

The public `index.html` changed after 8962 for authentication/bridge reliability. It still uses the approved `turf-app-icon-v8953.png` branding for favicon, Apple touch icon and sign-in card. These auth wrapper improvements should not be blindly rolled back because they are separate from the inner TURF Home visual stack.

## Rules for Batch 4+

1. New batch CSS must be scoped to the feature being added.
2. Do not add broad selectors against `#fhqHome`, `#fhqBrandHome`, `#turfTopbar`, or generic sidebar structure unless a new visual revision is explicitly approved.
3. Do not replace approved raster TURF artwork with generic SVG/text fallbacks.
4. Do not rebuild Home DOM after the 8962 visual stack loads.
5. Do not load deprecated static parity/home/shell files into the primary migration route.
6. Preserve both Collections sets and their existing card-art/open logic.
7. Keep checkpoint commit `2f2c62c8818edcb389e9e652a3be10f59e3a4ca4` as the rollback/reference point.
8. Any future intentional Home redesign must get a new approved visual checkpoint instead of silently changing 8962.

## Deprecated static migration layers

The following older experimental files are not part of the approved primary visual path and must not be newly loaded without a deliberate review:

- `static-home-parity.js`
- `static-shell-parity.js`
- `static-final-stabilizer.js`
- `static-full-runtime.js`
- `current-parity-v12.js`

They remain in the repository as historical migration work only.

## Preservation conclusion

The approved 8962 visual source remains recoverable and intact. The known post-8962 Home-rewriting migration layers have been neutralized. Batch 4 can proceed as a game-only enhancement while the approved Home/brand/navigation presentation remains the baseline.
