# M² mark, resumes retired, client carousel — September 25, 2026

Owner: Claude Code (cloud session), sole M² deploy owner for the day. Status: **release candidate verified, waiting for Mitch's review** ("ship it"). None of it is published. Production is gh-pages `dc21cc3` (another session's 2026-09-26 audit-post release, built from `b838034` + that post, which kept the split gated for this review); DNS untouched.

## Direction (Mitch, 2026-09-25)

One mj2.pro release, one review before production: (A) remove the resumes; (B) replace his face with an M² logo ("you make it, just make it look like the website"); (C) add his client logos to the home/services carousel (list in the Google Doc "MY PROJECT NOTES", Design/Fix Notes); (D) fix the /clients/ link.

## Branch `claude/m2-brand-carousel` (from `origin/main` `524a828`)

| Commit | What |
|---|---|
| `152cc1f` | A: the four PDFs deleted; retire decision in the route manifest (`"retired"`, last published hashes); verify-parity asserts absent and unreferenced; crawl expects 404; browser checks /resume/ as a transfer page. |
| `f179715` | D: /clients/ → `https://mitchjmiller-clients.pages.dev/` (`clients.mj2.pro` never activated; the client-portal repo was last pushed 2026-09-11). |
| `71f14ea` | B: `scripts/brand-icons.mjs` (Inter Bold outlines, Roundel ring) writes `site/data/m2-mark.json`, favicon.{svg,png,ico}, apple-touch-icon.png, `images/brand/m2-roundel.svg` and `m2-logo-512.png`; inline mark in the header (`site/components/M2Mark.astro`, theme tokens) and both home About cards; Organization JSON-LD logo; verify-agency/verify-standards assert the mark, icon sizes and the logo. |
| `3c9519d` | Personal-portfolio links → LinkedIn (EN and ES), because https://mitchjmiller.com/ does not serve the portfolio (HTTPS times out, HTTP 301s back to mj2.pro). **One-line revert once it returns 200 with the portfolio: `git revert 3c9519d`.** |
| `9c69994` | C (staged): 30 clients in `site/data/brands.json`, recognizability order, evidence each; `logo: null` until official artwork, so the carousel still shows its 5 logos. HOLD list, pending list and names to confirm in `docs/redesign-2026-09-14/brand-logo-sources.json`. Marquee loop scales at 6 s per logo (42 s floor, unchanged today). |
| `8403268` | Header geometry fix (`.ag-brand{min-width:0}`), /resume/ crawl floor, QA evidence in `docs/release-2026-09-25-m2/`. |

Evidence: [docs/release-2026-09-25-m2/README.md](../docs/release-2026-09-25-m2/README.md): typecheck and release build PASS; crawl 1063/1063; browser 536/536; standards 792/793, axe 0 in both themes (the one failure also fails on production in the same container). Headshot references left in dist: 53 Person JSON-LD `image` (kept by instruction) and the /about/ portrait; none in header, favicons, share tags or logo.

## 2026-09-30: merged `main` `41bc2f7`

Merge commit on this branch (no rebase: the SHAs above stay valid). One conflict, `scripts/verify-agency.mjs`: `d19c119` had switched main's validator back to the pre-split shell (requires the resume chooser and a `/resume/` utility link) to match its `b838034`-based deploy, so main's own head (which has no chooser since `32d12eb`) fails verify-agency until this branch lands. Resolved to the retired-chooser checks here plus main's 74-route count. Merged tree: typecheck and `build:release-candidate` pass (parity 57/57 + 21/21, 4/4 retired PDFs absent and unreferenced, 74 sitemap URLs; agency 78 shell documents; standards 86/86). Crawl, browser and standards suites rerun at release (RELEASE-READY step 3); rollback base is then `dc21cc3`.

## Blocked in the cloud session

- **Logo sourcing (C).** The environment's egress policy returns 403 for brand sites, mj2.pro and mitchjmiller.com (also for server-side fetch). Needs Network access set to Full, or a local session. Method is recorded in `brand-logo-sources.json` `"pending"`.
- **Release-time probes.** `curl -sI https://mitchjmiller.com/`, the RELEASE-READY step 6 live checks and the IndexNow POST need the same access.
- **Share cards.** `scripts/share-card.html` uses system fonts (SF Pro on the Mac). A Linux build re-renders every card in a different face. Proposed for this release: publish production's card files unchanged (their titles are unchanged) except `/og/resume.png`, whose title changed.

## Waiting on Mitch

"ship it", plus: network access or local sourcing; English About card (replaced with the Spanish one for parity) OK?; which St. Luke's Health / UCSF / Insomnia Cafe / Blue Planet Adventures; keep Stanford Health Care in the carousel; which "Baylor Health"; the share-card plan; whether /services/ gets its own logo set (his note: "be specific to services pages").

Mitch (2026-09-30): "I don't know... someone will get back to you." A bare "ship it" is enough; without answers the defaults are: no new logos (C stays staged), the mark stays in both About cards, the four ambiguous names and Baylor stay on hold, Stanford stays, production's share-card files are carried over except `/og/resume.png`, and the live probes run wherever the network allows (not this environment).

## Next action

On "ship it": RELEASE-READY.md steps 1–8 from this branch (fast-forward `main`, never force), IndexNow with the full sitemap, then PROJECT.md and this handoff. Logos land in a follow-up release once artwork can be fetched and hashed.
