# TURF project checkpoint — 2026-08-28

Resume keyword: **turf**

## Confirmed working state
- The direct Apps Script deployment below renders the approved Active Players visual successfully:
  https://script.google.com/macros/s/AKfycbwEEff6PG1QLNEcNE5nyr0qcn53iB-pAia8AR5MLpiouZVYeUnUGoEISGL_Z3j1gkhM2A/exec
- Direct `/exec` test proved the Active Players frontend itself works.
- Therefore the remaining problem is the outer TURF wrapper still loading the old Apps Script deployment.

## Current Apps Script files
- `Index.html`: use the new large restored frontend build based on the 8,124-line historical Index, with the approved Active Players screen embedded directly and wired to the real game DOM.
- Latest generated local handoff file in chat: `Index_ACTIVE_PLAYERS_EXACT_V2.txt` (8,366 lines).
- `Code.gs`: current uploaded file had 9,619 lines. It has two `doGet()` definitions; the later one around line 7470 wins and still serves `Index`. Do not change Code.gs for the visual issue unless needed later. The duplicate `doGet()` is cleanup debt, not the Active Players rendering bug.

## Important DOM facts from the restored Index
- `#footballGameOverlay`
- `.fg-mode[data-fg-mode="players"]`
- `#fgDailyBtn`
- `#fgUnlimitedBtn`
- `#fgSearchArea .fg-search-row`
- `#fgInput`
- `#fgGuessBtn`
- `#fgSuggestions`
- `#fgWeddleWrap`
- `#fgGrid`
- `#fgSpecialGame`
- Games cards use `data-game-open="players"`.

## Approved Active Players target
- Exact approved screenshot/art exists in conversation and was embedded into the Apps Script Index.
- Target look: stadium background, two real black football-player silhouettes with blue rim lighting, large ACTIVE PLAYERS title, left/right HUD cards, TURF header, Daily/Unlimited controls, input, guess button, table, legend.
- Do not recreate with placeholder polygon players.
- User wants the live rank card tied to the real account daily/weekly/monthly ranking, not hard-coded `#1,248`.

## GitHub wrapper status
- Repo: `FootballHQ/footballhq-assets`
- File: `turf-live-worker-parent.js`
- Old `APP_SRC` pointed to the obsolete deployment:
  `AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ`
- Updated wrapper to point at the confirmed working deployment:
  `AKfycbwEEff6PG1QLNEcNE5nyr0qcn53iB-pAia8AR5MLpiouZVYeUnUGoEISGL_Z3j1gkhM2A`
- Commit: `b243917d74720beb63877206c60463d1d59daa8c`
- At the stopping point, GitHub Pages workflow run 776 was queued for that commit.

## Earlier relevant commits
- Exact Active Players renderer against real Apps Script DOM: `45baa46419c2911db87fa53e38cc9715649ee4be`
- Wrapper pointed to working deployment: `b243917d74720beb63877206c60463d1d59daa8c`

## Critical conclusion
Do **not** resume by changing Code.gs or rebuilding the Active Players design again. The direct Apps Script `/exec` URL already proved the visual build works. First verify whether the GitHub Pages deployment for commit `b243917...` completed successfully and then test the normal TURF wrapper site. If the normal site still shows the old broken layout, inspect what wrapper/host is actually serving `turf-live-worker-parent.js` and whether it cached or overrides `APP_SRC` elsewhere (e.g. Cloudflare Worker or another wrapper file).

## Known infrastructure issue
- Cloudflare Worker deploy workflow previously failed because `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets were missing.
- Do not assume Worker changes reached production.

## Resume instruction
When user types **turf** in a new chat, pick up from this checkpoint. First check GitHub Pages deployment status for commit `b243917d74720beb63877206c60463d1d59daa8c`. Then test/trace the outer wrapper only. The Active Players Apps Script build itself is already working.
