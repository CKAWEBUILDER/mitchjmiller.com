# Focused portfolio QA — September 11, 2026

Completed 20:26 UTC against local staging output on `codex/html-parity-design-20260911`, starting from pushed commit `5a56c2f`. Browser authentication worked on this pass. No external website, private stage, production deployment, account setting or canonical Claude checkout was changed. Root remains the integration owner; this pass made no commit or push.

## Results

| Check | Evidence / result |
|---|---|
| Full SFC candidate, desktop | At 1280×900, all four chapters, two source images and evidence links present. Both images fully loaded. Document width1280, no horizontal overflow. [Viewport capture](evidence/candidate-sfc-desktop.png). |
| Full SFC candidate, mobile | At390×844, readable stacked hero/metadata, image and evidence sections. Document width390, no overflow. Chapter/evidence anchor navigation reached `#evidence`. [Hero](evidence/candidate-sfc-mobile.png), [evidence/footer](evidence/candidate-sfc-evidence-mobile.png). |
| Candidate mobile menu | Native details opens; Selected work navigates to `/design/#selected-work`. |
| Production-parity mobile menu | Native navigation opens; résumé selection closes the menu and opens the native dialog. |
| Résumé dialog | Four correct production PDF destinations present; close control receives focus; Escape dismisses dialog. Existing byte/HTTP verification covers the four downloads, so no duplicate download copies were made. |
| Selected-build filter | Mobile & Web Apps reduces nine items to Date Night and Clear Kayak Adventures; live status reports two. |
| Writing filters | Writing reports eight items (four published and four retained placeholders); Studying reports21. |
| Representative rich note | Hermes concepts note shows its complete body; Mermaid enhancement renders an SVG at358px on the390px viewport, while source remains available in Diagram text. No browser error/warning logs observed. |
| Destination-intent lab | Query and origin changes update intent/service-area explanation. “Near me” plus unknown origin correctly reports that the service area cannot be identified. |
| Growth lab | Metric selection yields previous470/current1,652 impressions. Editable zero→12 shows New activity and explains undefined percentage growth. Act on it displays the appropriate interpretation. |
| Content-architecture lab | Shared CTA edit updates all three outputs; Cardiology override changes only that output. Reporting-system selection replaces source/model/explanation and resets the shared field. Lab width390 without overflow. |
| JavaScript disabled | Homepage remains rendered and native Download Resume navigation opens `/resume/` with the four PDF options. [No-script résumé capture](evidence/parity-resume-noscript.png). Script execution restored afterward. |
| Post-fix validation | `npm run typecheck`, `npm run build` and `git diff --check` passed. Full staging verifier:57/57 routes,25/25 full article/note bodies,160 original case fields,4/4 exact PDFs. |

## Narrow repair

The historical `all-in-ai-money-stack` excerpt had been truncated inside an HTML tag. The writing index visibly printed `<div style=…` markup; metadata also retained a truncated tag. Added `baseline/src/lib/study-note-teaser.ts` to derive readable text from the complete note source when an excerpt contains markup, and reused it in the index and static metadata. Browser recheck shows actual prose instead of tags. The full note body and all other source bodies remain unchanged; this is an explicit preview-display parity exception.

Files changed: the new helper, `baseline/src/pages/blog-index.tsx`, `site/components/ParityPage.tsx`, this record and four screenshots. Full-page screenshot stitching duplicated sections, so that capture was replaced with a reliable viewport image; no malformed capture remains.

## Handoff

The prior browser-auth blocker did not recur. Sites authentication was not tested by this subtask and must not be assumed restored. Root can review this narrow repair, update shared project records, commit/push it, then perform the authorized owner-private staging update. Public release remains owned by Claude and gated by the existing release boundary. No new feature work is included.

The temporary viewport override was reset, the task-created browser tab closed, JavaScript restored and localhost server stopped. Built `dist` remains in staging mode, ready for the integrator.
