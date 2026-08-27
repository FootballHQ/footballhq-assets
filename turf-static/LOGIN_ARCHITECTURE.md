# TURF login architecture

## Production rule

The production TURF site remains the existing TURF application and its exact visual stack. **Do not reconstruct, restyle, or replace the production Home, logos, topbar, sidebar, Collections, Games, Rankings, Draft Sim, or other presentation in a parallel static app.**

The GitHub Pages root and Cloudflare Worker own authentication/backend transport only.

## Login flow

1. `turftrials.com/index.html` shows the Google / Guest login gate.
2. Google or Guest authenticates against the Cloudflare Worker through `turf-api.js`, `turf-config.js`, and `turf-auth.js`.
3. The Worker returns the verified TURF account profile/token.
4. The wrapper loads the **existing current TURF app**, unchanged visually.
5. The Worker app proxy may inject only auth/API bridge scripts (`worker-gas-bridge.js` and `110-turf-worker-auth-profile-v8968.js`). It must not rewrite TURF presentation.
6. `turf-live-worker-parent.js` sends `turf-auth-worker-profile` to the existing app. For compatibility with an older inner auth bridge it may also send `turf-auth-resume` using the already Worker-verified token.
7. The inner app adopts the profile and emits `turf-auth-ready`; the wrapper reveals the real TURF iframe.
8. If acknowledgement is delayed after the verified app is loaded, the wrapper may reveal the real app rather than strand the user behind a loading screen. It must never substitute a reconstructed UI.

## Visual preservation

Production visual source of truth = the existing TURF app itself.

- Exact existing logos remain owned by the existing app.
- Exact existing topbar remains owned by the existing app.
- Exact existing Home layout remains owned by the existing app.
- Exact existing Collections, Games, competitive navigation, Rankings, Draft Sim and responsive behavior remain owned by the existing app.
- Login/backend work must not load static parity, prototype, visual-authority, Batch 4 destination, or other reconstruction layers into production.

## Batch work

Batch 4 and later feature work resumes only after production login is stable. Batch changes must be applied to the existing TURF application, not to the old static prototype.
