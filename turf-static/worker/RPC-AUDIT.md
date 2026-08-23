# TURF static migration — RPC production audit

Source-of-truth audit started 2026-08-23 against the current TURF Index and latest Code.gs.

## Current production blocker

The deployed Cloudflare Worker currently enables only these three auth RPCs:

- `turfBatch1GoogleSignIn`
- `turfBatch1BContinueAsGuest`
- `turfBatch1BResolveAccountToken`

The static frontend can render most of TURF because the legacy browser runtime is preserved, but any server-backed feature outside those three methods will fail until its Apps Script implementation is ported to the Worker.

## Group 1 — core account/economy/persistence

Worker V2 implementation drafted and locally tested for:

- `getFootballHQAccount`
- `getFootballHQShop`
- `getFootballHQDailyRewards`
- `claimFootballHQDailyReward`
- `getFootballHQCollections`
- `purchaseFootballHQShopItem`
- `openFootballHQPack`
- `updateFootballHQCosmetic`
- `acknowledgeFootballHQWelcome`
- `submitFootballHQDailyResult`
- `getFootballHQLeaderboard`
- `getFootballHQLeaderboardPeriods`
- `submitFootballHQAchievementAwards`
- `updateFootballHQTitle`
- `updateFootballHQAvatar`

Local mocked-Sheets tests passed for account restore, Daily Gift idempotency, Shop purchase, both card sets, Daily result points/coins/streak, duplicate Daily protection, leaderboard-period response shape, and pack opening.

Important parity fixes included in V2 draft:

- Worker level formula changed to current Code.gs formula.
- Account object includes current `welcomePending` behavior.
- Current 7-pack catalog is used rather than the older five-pack catalog.
- Set 001 rarity correction is preserved (`tg011`–`tg014` uncommon, `tg015` rare).
- Set 002 — The Sideline is included with all 40 cards.
- Current Primetime pack restored to 5 cards / 850 coins / normal slot plan.
- Card packs preserve the current balanced 001/002 set selection behavior.

## Group 2 — game records/profile details

Still to port and test:

- `submitFootballHQUnlimitedReward`
- `submitFootballHQGameBest`
- `getFootballHQWorldBests`
- `getFootballHQGameLeaderboard`
- `getFootballHQProfileSummary`
- `getFootballHQPlacementRewards`

## Group 3 — Draft Simulator multiplayer

Still to port and test:

- `createDraftRoom`
- `joinDraftRoom`
- `getDraftRoom`
- `startDraftRoom`
- `submitDraftPick`
- `submitCpuDraftPick`
- `submitTimedAutoPick`
- `postDraftChat`

The associated `DraftRooms` sheet semantics, room TTL, turn ownership, CPU/autopick behavior, and chat filtering need to be kept compatible with the current frontend.

## Group 4 — H2H / competitive

Still to port and test:

- `turfH2HJoinOrPoll`
- `turfH2HCancel`
- `turfH2HGameInit`
- `turfH2HGamePoll`
- `turfH2HGameChooseMove`
- `turfH2HGameAnswer`
- `turfH2HCasesAction`

These back Trials/Cases/Trivia Tac Toe/4 in a Row competitive flows and must be functional before root cutover.

## Group 5 — Trials / historical data bridge

Still to port and test:

- Trial world-record read/write behavior from `TURF_TrialRecords`
- Trial inventory route introduced in V89.05
- `turfV8944GridSearch`
- related historical-grid index/status behavior if the current UI invokes it

## Cutover rule

Do **not** replace the root `turftrials.com` wrapper until:

1. Google + Guest login/restore pass.
2. Group 1 persistence writes pass against the real migration Worker.
3. Daily games save points/coins/streak exactly once.
4. Shop, rewards, packs, Locker and Collections persist after refresh.
5. Rankings/leaderboards pass.
6. Draft Simulator multiplayer passes.
7. Trials/Cases/Trivia Tac Toe/4 in a Row launch and their required online state works.
8. Safari and Chrome both pass the short production smoke test.
9. The old root remains available as an immediate rollback checkpoint until the new root is verified.
