# TURF static-host migration — production safety

Production is intentionally frozen while this branch is developed.

## Do not change during migration
- Do not point `turftrials.com` at this branch yet.
- Do not delete the current root `index.html` on `main`.
- Do not remove the current Apps Script project, spreadsheet, account mappings, or saved-progress data.
- Do not merge this branch to `main` until all cutover gates pass.

## Required cutover gates
1. Static TURF shell loads independently of Apps Script `/exec`.
2. Guest sign-in returns the same TURF guest/profile format as production.
3. Google credential verification returns the existing linked TURF profile.
4. Saved account token restore works after refresh and browser restart.
5. Existing Home/8962 visual state is reproduced without regressions.
6. Cases, Trivia Tac Toe, and 4 in a Row sidebar rows match the approved state.
7. At least one existing game reads/writes progress through the new API.
8. Shop/Locker/Collections data can be read without data loss.
9. Production spreadsheet/data is read-only during first smoke tests unless an explicit write test is selected.
10. A rollback path to the current `main` site is verified before DNS/custom-domain cutover.

## Cutover rule
No custom-domain or `main`-branch switch until every gate above is checked.
