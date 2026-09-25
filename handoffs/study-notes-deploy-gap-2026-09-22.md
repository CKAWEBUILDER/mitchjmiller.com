# Handoff — study-note routes missing from agency build + availability gap (2026-09-22)

**From:** Claude Code (content/repo lane) · **To:** release owner of the mj2.pro agency cutover (Codex lane)
**Historical (written 2026-09-22 while the redesign was paused per PROJECT.md, "Do not publish while paused").** Status 2026-09-25: the hold is lifted, the cutover is complete and both items are resolved (see "Resolved — 2026-09-24" below); `mj2.pro` serves production from `main`.

## 1. Public availability gap during the paused cutover
As of 2026-09-22, verified by curl:
- `https://mitchjmiller.com/` → **404** (gh-pages `CNAME` is now `mj2.pro`, so Pages no longer serves the old apex).
- `https://mj2.pro/` → **000** (DNS resolves to 207.207.210.229/.107 — not GitHub Pages' 185.199.108–111.153 — but nothing answers; TLS/connect fails).

Net: the portfolio is publicly unreachable on both domains while the cutover is paused. Flagging because it overlaps an active job search. Not actioned by me (domain/host is the infra lane).

## 2. Study-note routes are not emitted by the agency (astro) build
Source is intact on `main` (`7068a03`): `scripts/gen-study-notes.mjs` NOTES has all entries and `src/lib/study-notes.ts` now has **24 notes**. But the deployed gh-pages agency release (`0b9073d`, "Release 2026-09-21: M squared agency site on mj2.pro") ships only **21** `/blog/studying/*` routes — the three newest are absent from the deploy though present in source:
- `pocock-ai-coding-workflow` (added today, `7068a03`)
- `fde-1m-ai-job` (`1701d2d`)
- `pocock-agentic-workflow` (`512be11`)

Likely cause: the astro build path (`prepare-astro-staging.mjs` → `astro build` → parity/agency verifiers) doesn't enumerate the `study-notes.ts` slugs the legacy vite path emitted via `create-route-copies.mjs`. When resuming the cutover, ensure the agency build emits every `studyNotes[].slug` under `/blog/studying/<slug>/` (indexable, `index, follow`), or the study library regresses on mj2.pro.

## 3. New content this session (source only, already on main)
- `7068a03` — study note "Matt Pocock full AI-coding workflow" (SVG-only, 6 infographics + CSS-only Buzz). Note markdown lives in the private library at `youtube-library/agentic-engineering/full-walkthrough-workflow-for-ai-coding-matt-pocock/blog-post.md`; regenerate with `node scripts/gen-study-notes.mjs`.
- Companion global skill `forward-deployed-engineer` added earlier under `~/.claude/skills/` (not in this repo).

## Note for whoever runs gen-study-notes.mjs
It copies **all** frames from a note's `frames/` dir into `public/images/study/<slug>/` even when the note's HTML references none (SVG-only notes). I removed 184 unused frames for `pocock-ai-coding-workflow` before committing. If a future run re-copies them, delete `public/images/study/pocock-ai-coding-workflow/` before release, or guard the copy to referenced images only.

## Resolved — 2026-09-24

Root cause confirmed: the agency build renders notes from the archived `baseline/src/lib/study-notes.ts` (21 notes), while new notes are generated into `src/lib/study-notes.ts`. `baseline/src/lib/published.ts` now prepends notes that exist only in `src/lib/` (archived slugs are never replaced); the three routes are manifest kind `added`. Live on mj2.pro since gh-pages `7844899` (source `main` `4fcfd6f`): all 24 `/blog/studying/*` routes return 200 and are in the sitemap (63 URLs). A future note must also be declared in the route manifest; `scripts/verify-agency.mjs` fails the build otherwise. The 2026-09-22 availability gap is closed (mj2.pro serves since 2026-09-23); `https://mitchjmiller.com` HTTPS remains unresolved (see PROJECT.md).

## mitchjmiller.com redirect — root cause + fix (2026-09-24, Claude Code)

Mitch reports old links don't reach mj2.pro. Diagnosed by curl:
- `http://mitchjmiller.com/<path>` → **301 → `https://mj2.pro/<path>`**, path preserved. Works.
- `https://mitchjmiller.com/<path>` → **000 (dead)**. No valid TLS cert on the forwarding host (A record `162.255.119.89`, Namecheap URL-forwarding).

So the registrar URL-redirect covers HTTP only; every https:// old link (and HSTS/browser-default https) hits a dead endpoint. **Fix (registrar/infra lane):** either enable **SSL on the Namecheap URL-redirect record** for `mitchjmiller.com` + `www` (provisions a cert for the forward; ~1h), or front the apex with **Cloudflare** and a redirect rule `mitchjmiller.com/* → https://mj2.pro/$1` (301) for a valid edge cert + path preservation — fits the existing Cloudflare foundation. Needs Namecheap/Cloudflare access (not held by Claude Code).

## New note to wire — figma-shortest-course (2026-09-24, Claude Code)

Source committed to `main` `1ddc06e`: `src/lib/study-notes.ts` now has 25 notes (added `figma-shortest-course`, topic "Design & UX", SVG-only). To deploy on mj2.pro, same wiring as the last 3 restored notes:
- Add route `/blog/studying/figma-shortest-course/` (kind `note`, title "The World's Shortest Figma Course — 80% in 7 Minutes") to `docs/implementation-2026-09-11/route-manifest.json`.
- Bump the published-route count in `scripts/verify-agency.mjs` from **68 → 69** (line ~44) and update the adjacent comment.
- `baseline/src/lib/published.ts` already prepends src/lib-only notes as `added`, so no baseline edit needed.
Left to the release owner to keep the count constant single-sourced and avoid a mid-release collision.

Wired and shipped 2026-09-24 by the site-standards release owner: route `/blog/studying/figma-shortest-course/` (kind `added`, not `note`: a `note` entry fails the 57-route parity check) and the count 68 → 69 in `main` `c04e56e`; live since gh-pages `3559667` (PROJECT.md "PUBLISHED — September 24, 2026 (21:55 EDT)").
