# TURF static-host migration

This branch is intentionally isolated from production.

Goal: move the TURF front end off the Google Apps Script web-app host while preserving the current approved v89.62 Home/sidebar UI and the existing Google/Guest account behavior.

## Why
The current Apps Script `/exec` deployment is returning Google's Drive-style "unable to open the file" page even when opened directly, including with a fresh deployment configured as Execute as Me / Anyone. That means the production wrapper cannot reliably reach the Apps Script page or its auth bridge.

## Migration rules
1. Do not change `main` until the replacement is proven.
2. Keep the current approved v89.62 visual stack intact.
3. Host presentation/UI as normal static files on GitHub Pages.
4. Replace every direct `google.script.run` call with a small API client layer.
5. Keep Google sign-in at the top-level TURF origin.
6. Guest and Google must resolve to the same existing TURF account/profile objects before cutover.
7. No cutover until Home, sidebar, auth, account restore, and one game have all passed a clean-browser test.

## Current blocker
The UI source is available, but the current server functions live inside Apps Script (`turfBatch1GoogleSignIn`, `turfBatch1BContinueAsGuest`, `turfBatch1BResolveAccountToken`, plus the rest of the data/game/account methods). A static host cannot call `google.script.run`; those functions need an HTTP/API replacement before the live site can leave Apps Script safely.

## Next implementation step
Create a static client bundle on this branch and introduce `window.TurfApi` as the only client-to-server interface. During migration, legacy `google.script.run` calls will be mapped to `TurfApi` one feature at a time. Once an HTTP backend endpoint is available, the API client can be pointed at it without rewriting the UI again.
