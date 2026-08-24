# TURF login architecture

The production TURF site remains the existing v89.62 application and visual stack. Do not reconstruct Home, logos, topbar, sidebar, Collections, Games, or other presentation in a parallel static app.

The GitHub Pages root `index.html` owns sign-in only:

1. Google or Guest authenticates against the Cloudflare Worker via `turf-api.js`, `turf-config.js`, and `turf-auth.js`.
2. The returned TURF profile/token is cached by the wrapper.
3. The existing TURF v89.62 app is loaded unchanged in the production iframe.
4. The wrapper repeatedly sends `turf-auth-worker-profile` to the app so the existing account receiver can adopt the authenticated profile.
5. The wrapper must never strand the user on `Opening your TURF account…`; once the real app iframe has loaded, it is revealed immediately while the profile handoff continues.

Batch work must be applied to the existing TURF app after login is stable. The static prototype is not the production visual source of truth.