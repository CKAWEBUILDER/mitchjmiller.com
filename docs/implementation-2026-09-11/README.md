# Production HTML parity + separate design candidate

## Published outcome — September 11, 2026, 20:29 UTC

The final browser QA and private update succeeded. [Publication evidence](publication.json) records Sites version2 and exact deployed source59d84a980dc6b99302dbecf62f62e399a93f9ea0. [Review hub](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/review/), [homepage candidate](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/design/), [full SFC candidate](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/design/case-studies/sfc-surf-school/). Public domain unchanged by this task. Browser tests and all checks passed; [QA evidence](qa-overnight.md). Earlier blockers and pending-work statements retained below are historical; root PROJECT.md and this published outcome are current.

September 11, 2026. Implementation task `01a091b4-5b45-7843-8174-bff6d23ece68`; originating task `01a091b0-6e3a-79c1-8641-14a21d028522`.

## Earlier implementation checkpoint (superseded by published outcome)

Implemented locally on `codex/html-parity-design-20260911` in `/Users/mitchellmiler/Documents/Career Coach/work/mitchjmiller-parity-20260911`. Both static build modes pass. Implementation commit `c2746011e054af777ed4ac1ba9f11dfa26c64764` is pushed to GitHub. Final browser QA and the private-stage update remain outstanding. The current public site and previous private staging are unchanged. Do not claim a fresh deployment.

## Production baseline and retained content

The baseline was independently verified against main `2745c7e20cea0a30d0dc3c5341fc609bfde4b3ea` and deployed gh-pages `923dfd85597253786da407fe78de6d0011bbfe16`. All 118 production public files matched deployed bytes. Of 31 deployed HTML files, 30 were metadata/React shells and the SFC report was complete standalone HTML. Twenty-four published URLs lacked direct HTML files.

The [manifest](route-manifest.json) retains 53 published pages: 11 general, 17 cases, four unique published articles and 21 study notes. Four previously linked Coming Soon pages remain reachable/noindex and are omitted from the sitemap. The identical duplicate multi-agent-billing-traps listing is deduplicated; its first body is retained, matching route resolution in production.

The SFC report remains at its existing URL with an unchanged body. Its original whole-file SHA256 was 545bc3fa5a29daefb2ed5fc1deb16aab1c0a6290f024c01e3c9acf16851ae705; only head-level indexing/canonical/analytics policy changes by build mode. Four production PDFs remain exact at existing URLs; hashes/lengths are in [production-files.json](production-files.json). Updated review PDFs are under `/review-assets/files/`.

## Changes

- Archived production source in baseline, with native links, native mobile details/menu, an accessible native resume dialog/fallback route, category filters and dynamic Mermaid enhancement. Article/diagram source text is present before scripts load; diagram failure does not erase source text. No React client hydration on parity pages.
- Astro generates complete initial page HTML, metadata and canonical URLs. All source images retain their original paths; source image maps are shared by the review candidate.
- Separate design homepage `/design/` and full SFC narrative `/design/case-studies/sfc-surf-school/`: quiet white header, navy portrait hero, green actions, enterprise-first work cards, large actual work images and explicit mockup/context captions. Both rejected older themes remain only as historical routes; review navigation no longer offers them as current choices.
- SFC measurement chronology states that the August12–September8 Search Console comparison precedes the September10 explorer launch. Do not attribute that gain to the later explorer.
- Existing three lab demonstrations are preserved at `/lab/` using three bounded islands. The standalone destination-intent artifact remains in review. No new simulator, CRM or client portal was built.
- Review proofs now include enterprise/SFC imagery. `/review/` is the central review entry point.

## Deliberate parity exceptions

Native document navigation replaces SPA transitions; all content is immediately readable. The mobile menu/dialog/filter behavior is implemented with smaller enhancements. All cards exist in initial HTML; JavaScript selects the original default filter. Identical blog duplicate removed. SFC is now classified under Work → Personal Builds (its absent original category hid it from filters). SFC standalone report is preserved rather than replaced by the React case template. Placeholder routes stay noindex. These are explicit decisions, not silent content loss.

## Validation evidence

| Check | Result |
|---|---|
| Astro generation | Passed; 68 generated routes plus retained static documents |
| Staging raw HTML | [Passed](validation-staging.json): 57 routes, 25 full article/note bodies, 160 case fields, exact4PDFs/SFC body; 70 HTML documents; 2,387 local links/assets and56 anchors |
| Local release candidate | [Passed](validation-release.json): 58 HTML documents including404; exactly53 indexable URLs; review routes/assets excluded; one analytics loader per published route |
| Sitemap | Exactly53 canonical production URLs; four placeholders excluded |
| Production homepage desktop | Visually matched sanitized deployed fixture at1280px; [reference](evidence/production-home-desktop.png), [migration](evidence/parity-home-desktop.png) |
| Candidate homepage desktop | [Inspected](evidence/candidate-home-desktop.png); fixed the portrait caption contrast after inspection |
| Candidate homepage mobile | Browser viewport390x844, measured scrollWidth390, no horizontal overflow; native menu visible. A transient screenshot was inspected; an incorrectly scaled earlier capture was removed |
| TypeScript | Both existing source and separate parity TypeScript configurations passed |
| Local HTTP | [Passed](validation-http.json): all62 tested URLs returned expected status, including missing-page404; authorized localhost escalation resolved sandbox networking |
| Privacy/release boundaries | No staging analytics, all70 stagingHTML noindex, no CNAME/SPA fallback in staging. Public deploy scripts still gated |

The production visual fixture was exported locally with its analytics removed before browser testing. External destinations were retained; their remote health was not re-audited. Mermaid's optional client chunk triggers the build-size warning; it loads only when diagram nodes exist. This is not a whole-site React bundle.

## Historical authentication interruption (resolved)

Automatic approval review rejected the mobile menu/scroll test: “Your access token could not be refreshed because your refresh token was revoked. Please log out and sign in again.” The later read-only Sites request returned HTTP401 token_revoked. Do not bypass these gates or keep retrying the same request. Sign out of Codex and back in before resuming affected actions. User implementation/source/private-stage authorization already exists.

Pending browser checks: complete candidate case desktop/mobile, menu keyboard/touch interactions, resume dialog and downloads, filters, representative article/diagram, all three lab controls, no-JavaScript behavior with JavaScript disabled. Unknown-route404 is already verified by HTTP. A raw HTML verifier proves initial body content and native destinations, but it does not replace these interaction checks. All existing asset and local destination files resolve in both output modes.

## Reproduce the validated build

```sh
npm run typecheck
PARITY_REPORT_PATH=docs/implementation-2026-09-11/validation-staging.json npm run build
npm run build:release-candidate
SITE_BUILD_MODE=release PARITY_REPORT_PATH=docs/implementation-2026-09-11/validation-release.json node scripts/verify-parity.mjs
npm run build
node scripts/serve-review.mjs dist 5191
```

The last build must be staging before private packaging. After finishing QA: commit/push any repairs, then mirror the current implementation branch commit exactly into the existing Sites source repository, package `dist` using the Sites helper and update the same owner-private site. Existing project ID is in `.openai/hosting.json`; do not create another Site. Current private URL still serves earlier source5bca30b. Record the new source/version/deployment only after success. One integrator owns deployment; preserve Claude's original branch and coordination note.

Public promotion needs a later concrete release approval. Both prior design themes were rejected; next design review is the new candidate. The public site currently remains on its existing gh-pages commit, which is the future rollback reference.

## Questions you should be asking

- Is the production-parity release acceptable independently of the new design, or should it wait for design approval?
- Should newer resume PDFs replace the preserved production PDFs in a later approved release?
- Who owns the production release and its rollback once the private review is accepted?

## Cleanup

The browser service became unavailable during cleanup; its previously obtained tab could no longer be closed/reset through the supported browser tool. No browser profile or session-store workaround was used. Check for a surviving task-only review tab/viewport after reconnecting. Task-specific localhost servers are stopped at task completion; restart from the command above when resuming.
