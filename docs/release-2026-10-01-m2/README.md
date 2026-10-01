# Release 2026-10-01 — M² mark, resumes retired, /clients/ fixed, carousel staged

Mitch approved the [2026-09-25 release candidate](../release-2026-09-25-m2/README.md) on 2026-10-01 ("please ship these asap", the review artifact's "ship it"), with the handoff's defaults: no new carousel logos yet (artwork sourcing stays blocked by this environment's network policy), the M² mark in both home About cards, Stanford Health Care stays in the carousel, the four ambiguous client names and Baylor stay on hold, and production's share-card files carried over unchanged except `/og/resume.png` (its title changed).

| Item | Value |
|---|---|
| Source | `main` `956a65b`, fast-forwarded from `claude/vibrant-volta-i6e53w` (= `claude/m2-brand-carousel` tip `9ce049d` + this release's QA evidence). Built from `9ce049d` in a cloud Linux container. |
| Deploy | gh-pages `664c757` (previous `dc21cc3`). Tree hash equals the artifact hash. Deletions outside hashed `_astro/` bundles: exactly the four retired resume PDFs. |
| Artifact | sha256 `cfc77557a667284fee868d4cafc69fee4b3b52ac58f2b8c9db9122b2105d56f4` (dist after the share-card carry-over below). |
| Share cards | 83 of 84 cards in the deploy are production `dc21cc3`'s files byte-identical (the card template renders with system fonts; a Linux build would re-render all of them in a different face). Only `/og/resume.png` is newly rendered (Linux Chrome 150), because the /resume/ title changed. |
| Toolchain | npm 11 (`npx -y npm@11 ci`; npm 10 reports the lockfile out of sync), Chrome for Testing 150.0.7871.24 via `CHROME_PATH`, proxy CA in the NSS store. |

## QA (this container, against the final deploy tree)

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run build:release-candidate` | PASS: parity 57/57 routes, 21/21 added, 25/25 bodies, 4/4 retired PDFs absent and unreferenced, 74 sitemap URLs; agency 74 routes, 78 shell documents, 7 embeds; standards 86/86 documents, M² brand files 5/5, 0 headshot share images |
| [crawl.json](qa/crawl.json) | 1080/1080 over 78 routes |
| [browser.json](qa/browser.json) | 536/536 |
| [standards.json](qa/standards.json) | 813/814 over 86 documents; axe 4.13 WCAG 2.0–2.2 A/AA: 0 violations of any impact, light and dark |

The one standards failure, `/blog/studying/all-in-ai-money-stack/@390` (scrollWidth 404), is the known container-only failure: production `94016fa` failed it identically in the same kind of container ([control](../release-2026-09-25-m2/qa/standards-control-production-94016fa.json)); the suite blocks web fonts and the Linux fallback is wider than the Mac's.

## Blocked in this environment (open items)

- Live probes from the container (`mj2.pro` egress denied): spot checks ran through Claude's web fetch instead; a full `live-standards.mjs` run needs a local session or Full network access.
- IndexNow POST to `api.indexnow.org` (egress denied): **pending**; submit the full 74-URL sitemap when network allows (every page's head changed).
- Carousel logo artwork (brand sites 403): the 30 clients stay staged with `logo: null`; a follow-up release lands them.

## Rollback

In a clean gh-pages worktree: `git revert --no-edit 664c757 && git push origin gh-pages` (restores the `dc21cc3` tree). Source: revert the branch merge on `main`.
