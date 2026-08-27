# TURF Login Preservation Rule

## Status
The current TURF login/sign-in flow is approved and working.

## Hard rule
Do **not** modify the production login/sign-in flow in `index.html` while working on Batch 4, visuals, games, collections, rankings, shop, locker, or other TURF features unless the user explicitly asks for a login change.

## Preserve exactly
- Google sign-in behavior
- Guest sign-in behavior
- current account/session restore behavior
- current authenticated handoff into TURF
- current top-level wrapper behavior around the live TURF app

## Development rule
Future batches must be layered onto the existing working TURF app and must not replace the site with a reconstructed/static prototype just to add features.

## Rollback principle
If a future change causes login to regress, restore the current working login flow before continuing feature work.
