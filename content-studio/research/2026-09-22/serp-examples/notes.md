# SERP Examples — Research Notes (2026-09-22)

## Bottom line
**All 10 live Google SERP captures failed.** Two independent capture paths — headless
Chrome (puppeteer-core, local machine) and the in-app browser (separate network egress) —
were both blocked by Google's bot-check before any search-results content rendered, for
every one of the 10 queries, at both desktop and mobile viewports. Nothing in `index.json`
about AI Overview presence, ads, local pack, featured snippet, PAA, shopping, video,
organic count, or mitchjmiller.com presence is a real observation — every one of those
fields is marked `not observable` and must stay that way. None of it should be quoted as
"absent" or used as a stand-in for a real SERP.

## Root cause (confirmed with evidence, not guessed)
Both this session's local-machine internet connection and the in-app browser's separate
network path resolve, on geolocation lookup, to the same ISP: **AS10139 Smart Broadband,
Inc., Metro Manila, Philippines** — not a US IP.

- Headless Chrome egress `2407:9803:5340:3423:c4ab:73cc:1d0c:f59f` → ip-api.com: Manila, PH.
- In-app browser egress `175.158.207.7` (shown on Google's own interstitial) → ip-api.com:
  Quezon City, PH.

Google serves a 429 "Our systems have detected unusual traffic from your computer network"
page with an embedded reCAPTCHA to this network for `google.com/search` regardless of the
`&hl=en&gl=us` query parameters — those only set a language/region *preference* inside the
results Google would otherwise return; they do not override IP-based geolocation or bot-risk
scoring. **Per the assignment's explicit instruction, the reCAPTCHA was never clicked or
solved.**

This independently confirms — with hard IP/ASN evidence this time — what
`content-studio/research/2026-09-14/search-intent/notes.md` already flagged from symptoms
alone: "Google: fully blocked on every attempt" and Bing results geolocating to the
Philippines despite `&mkt=en-US&cc=US`. Same underlying cause, now diagnosed.

## What was tried
1. **Headless Chrome**, via the repo's existing `content-studio/viz/kit/export/lib/browser.mjs`
   helper (puppeteer-core + locally installed Google Chrome, no new dependency added). Script:
   `capture-serp.mjs` in this folder — reusable, run with `node capture-serp.mjs`. All 10
   queries × desktop (1280×1000) + mobile (390×844, Pixel-8 UA) = 20 attempts, all HTTP 429,
   all showing the identical "unusual traffic" interstitial (confirmed distinct captures, not
   a stale repeat — each PNG has a different md5 because the query text and `sei` param differ
   on the visible page — but all are the same block template).
2. **In-app browser** (`mcp__Claude_Browser__*`), per the assignment's fallback instruction.
   Spot-checked live on 3 of the 10 queries, chosen to span different intent families since the
   headless run already showed the block is not query-dependent:
   - `what is answer engine optimization` (informational) — desktop + mobile
   - `mitchjmiller.com` (navigational) — desktop
   - `surf lessons waikiki` (local) — desktop + mobile

   All 5 checks hit the identical reCAPTCHA/"unusual traffic" page. The remaining 7 queries
   were **not** separately re-driven through the in-app browser — the failure is demonstrably
   an IP/network-level gate that fires before Google parses the query, confirmed identically
   across informational, navigational, and local intent on two viewports each, so 7 more
   visually-identical captcha screenshots would not have added evidence. This trade-off is
   logged here rather than silently made.

## What's in this folder
- `capture-serp.mjs` — the reusable headless-capture script (rerun any time from a US IP and
  it should work as designed: `node capture-serp.mjs` from `content-studio/research/2026-09-22/serp-examples/`).
- `capture-log.json` — raw machine-generated log from the headless run (all 10 attempts).
- `index.json` — the per-query ledger the assignment asked for (query, intent, date/time,
  viewport, URL, "what appears," file names) — every SERP-content field says `not observable`
  because that is the truth, with the block evidence (status code, interstitial text, IP) filled
  in instead.
- `*-desktop.png` / `*-mobile.png` — 20 real screenshots, one per query per viewport, each
  showing Google's block page (not a Google results page). Kept as the actual capture evidence,
  not deleted, because they document a real and repeatable finding (this environment cannot
  reach live Google SERPs right now).
- **No `<intent>-desktop.png` "best example per intent" copies were made.** The assignment
  asked for one copy of "the best desktop example per intent" — there is no successful capture
  to select as best; every desktop shot per intent is the same failure state. Making a copy and
  calling it "best" would misrepresent a blocked page as a curated result. Flagging this gap
  explicitly rather than filling it with something misleading.

## What would fix this
A capture session run from a real US IP (Mitch's own connection, or a US proxy/VPN he
approves and provides) would very likely work — nothing else about the method is broken; the
kit helper, the script, and the in-app browser all function correctly and reach Google, they
just get IP-gated before content renders. Re-running `capture-serp.mjs` unchanged from a US
egress is the fastest path to the real 10 screenshots and a real `index.json`.

## What to use instead for the post, right now
Part 2 of this research pass (`../zero-click-future/`) and the existing
`content-studio/research/2026-09-14/search-intent/` ledger carry sourced, dated SERP-feature
rates by intent (AI Overview trigger rate, local pack presence, PAA presence, etc.) from
published studies — that data is real and citable today. The 10 queries chosen for this pass
(see `index.json`) are ready to re-run the moment a US-IP session is available; nothing about
the keyword list needs redoing.
