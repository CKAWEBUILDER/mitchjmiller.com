# Release candidate 2026-09-25 — M² mark, resumes retired, carousel staged

Branch `claude/m2-brand-carousel` from `main` `524a828`. Not published: production is gh-pages `94016fa`.
Built and checked in a cloud container (Linux), not on Mitch's Mac. Record: [handoff](../../handoffs/2026-09-25-m2-brand-carousel.md).

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run build:release-candidate` | PASS: parity 57/57 routes, 20/20 added, 25/25 bodies, 4/4 retired PDFs absent and unreferenced, 73 sitemap URLs; agency 77 shell documents (inline M² mark on each); standards 84/84 documents, M² brand files 5/5, 0 headshot share images |
| [crawl.json](qa/crawl.json) | 1063/1063 over 77 routes |
| [browser.json](qa/browser.json) | 536/536 |
| [standards.json](qa/standards.json) | 792/793 over 84 documents; axe 4.13.0 WCAG 2.0–2.2 A/AA: 0 violations of any impact in light and in dark |

The one standards failure, `/blog/studying/all-in-ai-money-stack/@390` (scrollWidth 404), is not from this release: the
production build (gh-pages `94016fa`) fails it identically in this container
([standards-control-production-94016fa.json](qa/standards-control-production-94016fa.json), same 9 routes). The suite
blocks web fonts, and the Linux fallback font is wider than the Mac's; the production QA on the Mac passed it.

Environment notes, so a rerun reproduces these numbers:
- Browser: Chrome for Testing 150.0.7871.24 (`npx @puppeteer/browsers install chrome@150.0.7871.24`, the version
  puppeteer-core pins), via `CHROME_PATH`. Playwright's Chromium lacks the AAC decoder the narration checks need.
- The container's HTTPS proxy CA was added to the NSS store (`certutil -A -d sql:$HOME/.pki/nssdb -t "C,," …`) so
  Google Fonts loads where a check allows it; certificate verification stays on.
- `npm ci` needs npm 11 for this lockfile (`npx -y npm@11 ci`); npm 10 reports it out of sync.
- Header fix found by this QA: the inline SVG mark is not shrinkable the way the old `<img>` (Tailwind `max-width:100%`)
  was, which widened the desktop header by about 31 px and pushed the Spanish header 18 px past its edge with Inter
  loaded. `.ag-brand{min-width:0}` restores production's geometry (Spanish identical; English 3 px more clearance).
