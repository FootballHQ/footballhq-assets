# TURF backend migration (isolated)

This directory is **not production**. It lives only on the `turf-static-host-migration` branch until auth and data tests pass.

## Purpose

Replace browser-only `google.script.run` calls with a normal HTTPS JSON endpoint while preserving the existing Google Sheet account data.

The first migration slice intentionally exposes only these RPC methods:

- `turfBatch1GoogleSignIn`
- `turfBatch1BContinueAsGuest`
- `turfBatch1BResolveAccountToken`

Everything else is denied by an allowlist.

## Backend

The implementation is a Cloudflare Worker because GitHub Pages cannot run server-side code. The Worker talks directly to the existing TURF Google Sheet through the Google Sheets API using a service account.

No service-account private key, Google client secret, protected-email mapping, or account token belongs in GitHub.

## One-time setup before testing

1. In Google Cloud, enable the Google Sheets API for the project used for this migration.
2. Create a service account.
3. Share the existing TURF/FootballHQ spreadsheet with the service-account email as **Editor**. Do not copy or replace the spreadsheet.
4. Create/deploy the Worker from this `turf-backend` folder.
5. Add Worker secrets/variables:

   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
   - `TURF_GOOGLE_CLIENT_ID`
   - `TURF_SPREADSHEET_ID`
   - `PROTECTED_GOOGLE_MAP_JSON` (JSON object stored as a secret, not committed)
   - `ALLOWED_ORIGINS` (comma-separated test origins; keep `https://turftrials.com` for later)

6. Verify `/health` returns `productionCutover:false`.
7. Point only the migration auth test page at the Worker URL.

## Safety rules

- Never commit service-account JSON/private keys.
- Never change the production `main` branch during migration testing.
- Never delete or rename the existing spreadsheet or account sheets.
- Never turn on production cutover until Guest, Google, saved-session restore, Home, sidebar, one game, and write/read persistence all pass.
- Keep Apps Script and the current production site available as rollback until the new backend is proven.

## Current data compatibility

The Worker reads the existing `Accounts` sheet columns A:W and `TURF_Auth` columns A:G. Guest creation uses the same 23-column account row shape as the existing Apps Script backend. Existing account tokens and stored progress are read in place; nothing is migrated to a new database in this stage.
