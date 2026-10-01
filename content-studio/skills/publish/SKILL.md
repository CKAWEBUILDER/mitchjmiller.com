---
name: publish
description: Ship an approved post to mitchjmiller.com (Writing) and LinkedIn. Site deploy is automatic once approved; LinkedIn requires per-post confirmation.
---

# publish

## Preconditions
- Draft passed the Stop-hook quality gate.
- **Mitchell has seen and approved the final piece.** (Outward-facing — never skip.)

## Site (mj2.pro → /blog/)

**Read `../../../RELEASE-READY.md` first — it is the authority. This is the short form.**

1. Draft body → HTML (marked, `headerIds:false`), inject the viz `<figure>` and the CTA.
2. Insert a `blogPosts` entry in `../src/lib/data.ts` with `contentHtml` (backtick-safe: no
   backticks, no `${`). A post also needs, or agency verification fails:
   - **FAQPage JSON-LD mirroring its `<h3>`question`</h3><p>`answer`</p>` pairs, at least 3.**
     Generate the JSON-LD *from the rendered pairs* so the two cannot drift.
   - a `docs/implementation-2026-09-11/route-manifest.json` **route** entry, and an **embeds**
     entry for its viz with real `anchors` that each appear exactly once as `id="…"` in the post;
   - the published-route count bumped in `scripts/verify-agency.mjs` (it is hardcoded);
   - narration: `npm run narrate -- <slug>` — **re-run it if the post text changes afterwards.**
3. The published viz under `public/viz/<slug>/` must satisfy the embed contract:
   self-contained (**no network at all — system fonts only, no Google Fonts link**), exactly one
   `noindex` robots meta, no analytics, a `postMessage({ type: 'viz-intent', … })` jump contract
   whose fallback is restricted to same-origin, a visible **"Skip animation"** button that stops
   the intro and removes itself, no button under `prefers-reduced-motion`, and declared files
   named `poster-1080x1350.png` (the post's `<noscript>` fallback is checked by that exact name).
4. Build with **`npm run build:release-candidate`** — NOT `npm run build`.
   `npm run build` is a **staging** build: every page renders `noindex` with no analytics, and its
   `dist/` contains no `CNAME`. Deploying it would deindex mj2.pro and drop the custom domain.
   Output is **`dist/`**, not `dist/public/`.
5. QA: `node scripts/qa/serve.mjs dist 5193 &`, then `crawl.mjs` and `standards.mjs`; stop the server.
6. Commit **by explicit path** (never `git add -A` in this repo — other sessions have work in the
   tree), push `main`.
7. Deploy (never `rsync --delete`): worktree from `origin/gh-pages`, wipe its contents except
   `.git`, `cp -R <repo>/dist/. .`, confirm `CNAME` `.nojekyll` `404.html` `sitemap.xml`
   `robots.txt` and the IndexNow key are all present, confirm the tree hash equals the artifact
   hash, confirm `git diff --cached` **deletes nothing outside hashed `_astro/`**, commit, push.
8. Poll the Pages build, probe live, POST IndexNow, record the release in `../PROJECT.md`.

**If `main` carries work that is gated in PROJECT.md, do not deploy `main`.** Build from the
last deployed source plus the content only, and say so in the release record.

## LinkedIn (browser — per-post confirmation REQUIRED)
1. Show Mitchell the final text + the PNG infographic. Get an explicit "post it".
2. In his logged-in Chrome (Claude-in-Chrome): compose a new post, paste the text, attach the
   PNG (or build a carousel from multiple PNGs), add the share CTA + a link to the full post.
   Password manager handles login; never handle the password text.
3. Confirm the post preview matches, then publish. Capture the live URL.
4. Add the LinkedIn URL + first-day engagement note to `../OPERATING.md` learnings.

## Never
- Never auto-post to LinkedIn without a per-post OK. Never enter credentials manually.
- Never publish a post that failed the quality gate or that Mitchell hasn't seen.
