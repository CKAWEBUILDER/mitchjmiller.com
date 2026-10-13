# Release 2026-10-13 — header "Contact", new headline, contained carousel, portfolio links restored

Mitch, 2026-10-13: "ship all". He also asked for these changes:
- He hates the "Let's talk" button, which wraps onto two stacked lines.
- The logos should stop at an invisible padding instead of running to the screen edges, sit closer together, and lose the pause button.
- The hero "Make the next move matter" has too much alliteration.

## What shipped

| Change | Detail |
|---|---|
| Header button | "Let’s talk" → **Contact** (ES "Hablemos" → **Contacto**). `.ag-button--sm` never wraps. |
| Hero headline | "Make the next move matter." → **Evidence first. Then we build.**<br>ES: **Primero, la evidencia. Luego, construimos.** The Spanish line was not independently reviewed; a native-speaker check is pending. |
| Logo carousel | The strip sits inside the content column (`ag-wrap`, 1200 px on home/services at desktop) with the existing edge fade, so logos stop short of the screen edges.<br>64 px between logos (28 px at ≤560 px). Before, each copy was stretched to the full screen width.<br>Three copies keep the loop seamless at any container width.<br>The Pause button is visually hidden and appears only on keyboard focus. Hover and focus already pause the strip, and reduced motion stops it, so WCAG 2.2.2 still holds. |
| Portfolio links | `3c9519d` (the LinkedIn stopgap) is reverted because mitchjmiller.com serves the portfolio. "Mitch’s portfolio" is back in the header utility links (hidden on the Spanish desktop header by the existing rule), footer, both About cards, /resume/ ("Personal portfolio \| Mitchell Miller"), /contact/, `/es/contact/` and the Person `sameAs`. The 2026-10-02 "Client portal" / "Portal de clientes" labels are kept. |
| First release of the October 12 merges | **PR #4:** Trusted-by carousel sizing, the text twin naming employers and clients, home hero button removed, home FAQ with FAQPage JSON-LD.<br>**PR #5:** the Cloudflare workflow builds the release candidate; it is still skipped because the repository has no Cloudflare secrets.<br>**`46e3b13`:** client portal link in the header and footer. |

## Source and deploy

- `main` `5c1ee29`, fast-forwarded from `claude/jolly-carson-qx254x`. That branch is `main` `fc173a6` merged, plus `074b588` (the revert) and `2538fd7` (the changes).
- Built in a cloud Linux container (Chrome for Testing 150) from the tree of `2538fd7`. The later commits change only QA evidence and records.
- gh-pages `2df12f5` (previous `d96d3f3`), pushed 06:33:37 UTC. GitHub Pages deployment `7031769694` reported **success** at 06:34:05 UTC.
- The deploy tree equals artifact `5e5d8f169d53fdc2565a2050be197a933b851f90e1253967b7a80865068dfdf1` (516 files; `sha256sum` of the sorted file list).
- Diff against `d96d3f3`:
  - 79 HTML files modified.
  - The one `AgencyLayout` stylesheet was renamed (1 added, 1 deleted).
  - `/og/resume.png` was re-rendered because its title changed. The other 83 cards are production's bytes, carried over because their titles are unchanged; a Linux render would change the face.
  - `CNAME` (`mj2.pro`), `robots.txt`, `.nojekyll` and the IndexNow key are unchanged. The sitemap lists 74 URLs.

## QA

- `npm run typecheck`: PASS.
- `build:release-candidate`: PASS.
  - Parity: 57/57 + 21/21, 25/25 bodies, 4/4 retired PDFs absent and unreferenced.
  - Agency: 78 shell documents, all with the client-portal links; 4 marquees with three copies each.
  - Standards: 86/86.
- [crawl.json](qa/crawl.json): 1080/1080 over 78 routes.
- [browser.json](qa/browser.json): 540/540. New checks at 1360 px on home and services:
  - The strip spans x 80–1280, matching the marquee heading column.
  - The largest gap is 64 px.
  - One copy is 1219 px against a 1200 px viewport.
  - The Pause button is a 1×1 px hidden element; on keyboard focus it measures 97×38 px and holds the pause.
  - The header shows "Contact" on one line.
  - /resume/ links the portfolio and LinkedIn.
- [standards.json](qa/standards.json): 780/781; axe found 0 serious or critical issues in light and dark. The one failure is the known container-only `/blog/studying/all-in-ai-money-stack/@390`; production fails it identically in a Linux container ([control](../release-2026-09-25-m2/qa/standards-control-production-94016fa.json)).

## Held: old mitchjmiller.com links

Old `mitchjmiller.com/<path>` URLs 404 on the portfolio site since the October 2 DNS switch. Forwarding them to mj2.pro conflicts with the portfolio's standing owner rule of 2026-10-02: nothing published on mitchjmiller.com may mention M² or mj2.pro. It also needs that repository's release owner. Waiting on Mitch.

## Pending (this container's egress denies mj2.pro and api.indexnow.org)

1. Live checks from a machine with network access:
   ```sh
   node scripts/qa/live-standards.mjs
   ```
   Spot-check the header "Contact", the new h1, the carousel stopping inside the column and the /resume/ portfolio link.
2. IndexNow for the full sitemap (every page's header changed):
   ```sh
   curl -s https://mj2.pro/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | python3 -c 'import sys,json;print(json.dumps({"host":"mj2.pro","key":"9b0893b8818bd5bce05d66051f2bc971","keyLocation":"https://mj2.pro/9b0893b8818bd5bce05d66051f2bc971.txt","urlList":[l.strip() for l in sys.stdin if l.strip()]}))' | curl -s -o /dev/null -w '%{http_code}\n' -H 'Content-Type: application/json; charset=utf-8' --data-binary @- https://api.indexnow.org/indexnow
   ```
   Expect 200 or 202.

Known, not changed here: on the Spanish home at 1360 px, the header tagline ends under "Servicios". The 2026-10-02 header-fit run already reported `tagOverflow=22` there.

## Rollback

- Production: in a clean gh-pages worktree, `git revert --no-edit 2df12f5 && git push origin gh-pages` (restores `d96d3f3`).
- Source: `git revert 2538fd7 074b588` on `main`. The October 12 merges were already on `main` before this release.
