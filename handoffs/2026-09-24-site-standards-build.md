# Site standards — build brief (2026-09-24)

- From: Claude Code session "Blog writing and social publishing skill" (`29a9fe`), acting on Mitch's 2026-09-24 instruction to make these rules and have a CLI agent push them live.
- To: the build agent it spawns, and any later agent on this site.
- Rules: [docs/site-standards.md](../docs/site-standards.md). This brief covers the first implementation only.

## Authorization
Mitch asked for these standards to be built and pushed live. Deploys 1 and 2 below are authorized once their verification passes. Not authorized: DNS or host changes, new paid tools or subscriptions, choosing a logo, publishing the unreleased `claude/agency-redesign` work, posting to social media, touching other workers' files.

## Where to build (read before any edit)
- Production is gh-pages built from `main`. See `main`'s PROJECT.md release record of 2026-09-24: gh-pages `7844899` from `main` `4fcfd6f`, built in a temporary clone.
- The canonical checkout sits on `claude/agency-redesign`, which has diverged from `main` (18 commits only there, 15 only on `main` as of 2026-09-24 18:50 EDT). Do not deploy from it and do not merge it. Record that the redesign branch must adopt these standards before it is ever released.
- Build in a temporary clone of `origin/main` (same method as the 2026-09-24 release). Never switch branches, stash, reset, clean or commit other workers' files in the canonical checkout. Delete the temporary clone when finished.
- Branch `claude/site-standards` from `origin/main`. Update `main` by fast-forward only; never force-push.
- One deploy at a time. Another session released at 18:20 EDT today. Immediately before each deploy, fetch; if `origin/main` or `origin/gh-pages` moved since you branched, rebase onto the new `main`, rebuild and re-verify before deploying.
- First commit: copy `docs/site-standards.md` and this brief onto the branch, and add the same "Site standards" pointer section to `main`'s AGENTS.md that the canonical checkout's AGENTS.md now has.

## Baseline (live crawl of the 63 sitemap URLs, 2026-09-24 18:40 EDT)
`og:image` on 62 of 63, and 39 of those point at the headshot. `twitter:card` on 62 of 63. `/case-studies/sfc-surf-school/` has neither (standalone report outside the shell: add head tags without changing its body). Real hreflang: none. Audio: none. No theme toggle or i18n in source. Favicon files: `public/favicon.{ico,png,svg}`, `public/apple-touch-icon.png`.

## Deploy 1: share cards, themes, accessibility, audio
1. **Share cards on every route**, including standalone pages and `/viz/*` embeds. Generate 1200×630 cards at build time from one HTML brand template with a headless browser (reuse the repo's existing render tooling; no new service). Card content: page title, section, `mj2.pro`, M² brand colors, no photo. Keep an existing project image only when it is relevant and meets the size rule. Zero pages may reference the headshot in any `og:`/`twitter:` tag.
2. **Themes** per the standards: system default, toggle, persistence, no flash, AA contrast in both themes on every template.
3. **Accessibility baseline** per the standards. Run axe on every template: zero serious or critical violations.
4. **Audio narration for every published post.** Add a script that renders narration with macOS `say` using the best installed voice (today only compact "Samantha" en_US and "Paulina" es_MX are installed) to mono AAC at about 48 kbps. Narrate the title and body prose, skip code, and summarize tables in one sentence. Output to a stable path per slug and add a labelled "Listen to this article (N min)" `<audio controls preload="none">` near the top. Record the voice used, so a better voice can re-render everything with one command later.
5. **Favicon and logo:** no change until Mitch supplies the final M² file; list it as blocked.

Verify: typecheck; `build:release-candidate`; the existing parity, agency, crawl and browser suites. If chrome changes break a parity baseline, update the baseline on purpose and document it; never weaken a check. Add a share-card check to the verification that fails on any missing tag, any headshot, a wrong size or a missing file. Test the theme toggle in both system schemes. Confirm every audio file returns 200 and plays. No horizontal overflow at 390 px.
Deploy per the release procedure `main`'s records use: artifact manifest, hash match, rollback line. Then live probes: re-crawl the sitemap and confirm 0 headshot share images, full tag coverage and audio on every post.

## Deploy 2: Spanish pilot
1. `/es/` versions of the core pages (home, about or services, contact, and the blog index if it exists on `main`) plus `/blog/gbp-2026-ai-grounding/` (the closest fit for US Hispanic and Latin American local businesses). Legal and privacy pages stay English.
2. The model drafts; a separate, independent review pass checks accuracy, register, kept-English terms and that no claim changed. Mark reviewed routes in the route manifest.
3. Language picker, hreflang (self, reciprocal, `x-default`), `<html lang="es">`, Spanish `og:locale` with `og:locale:alternate`, sitemap alternates, and the browser-language suggestion banner (never a redirect).
4. Spanish narration of the translated post with "Paulina".
Verify: hreflang reciprocity across every page; the banner appears for a Spanish browser, never redirects, and remembers dismissal; crawl, axe and overflow checks as in deploy 1. Deploy and probe as in deploy 1.

## Records and report
After each deploy, update `main`'s PROJECT.md release section (what shipped, evidence, rollback), add a completion note to this brief on `main`, and report back to the requesting session: what shipped, the evidence, rollback commands, and what is blocked.

Blocked on Mitch (do not wait on these): the final M² logo file; his X handle for `twitter:site`; optionally a Premium system voice for better narration (System Settings → Accessibility → Spoken Content → Manage Voices), after which the narration script re-renders; a native-speaker spot check of the Spanish pages.

Not in this run: other languages; real hero images or viz for existing posts (a content task, done per post under the blog-syndicate skill); the Meet the team page.

## Completion — deploy 1 (2026-09-24 20:19 EDT, Claude Code build agent)
Shipped as gh-pages `6edd43f` from `main` `3d2a026` (artifact `fcb3f68b675e5…`); full record, evidence and rollback in `main`'s PROJECT.md ("PUBLISHED — September 24, 2026 (20:19 EDT): site standards, deploy 1") and [docs/release-2026-09-24-standards/](../docs/release-2026-09-24-standards/). Share cards on all 70 documents (0 headshot share images live, was 39), themes, axe 0 serious/critical in both themes on every document, 5/5 posts narrated. Narration for later posts: `npm run narrate -- <slug>`. Blocked on Mitch: logo file, X handle, optional Premium voice, study-note narration scope. Deploy 2 (Spanish pilot) next.

## Completion — deploy 2 (2026-09-24 21:55 EDT, Claude Code build agent)
Shipped as gh-pages `3559667` from `main` `c04e56e` (artifact `4b76d8ad7f192…`); record, evidence and rollback in `main`'s PROJECT.md ("PUBLISHED — September 24, 2026 (21:55 EDT): site standards, deploy 2") and [docs/release-2026-09-24-spanish/](../docs/release-2026-09-24-spanish/). Spanish pilot live: `/es/`, `/es/services/`, `/es/contact/`, `/es/blog/`, `/es/blog/gbp-2026-ai-grounding/` (model draft + independent review, 32 findings applied; Paulina narration), hreflang reciprocal on all 69 sitemap pages, globe picker, suggestion banner (never redirects). Also shipped: study note `figma-shortest-course` (wired from another session's handoff). Still blocked on Mitch: logo file, X handle, optional Premium voice, study-note narration scope, native-speaker check, `og:locale` choice. The redesign branch `claude/agency-redesign` must adopt both deploys before any release.
