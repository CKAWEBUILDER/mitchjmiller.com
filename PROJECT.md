# Mitchell Miller portfolio — current project state

Updated September 11, 2026. Owner: Mitchell Miller. Canonical public domain: `https://mitchjmiller.com/`.

## Purpose

Build a public, complete-HTML portfolio that attracts qualified inbound work and shows the range of Mitch's practice: data science, creativity, UX/UI, engineering/backend systems, content, enterprise search and growth/CRO. Preserve the recruiting/resume path. Use reusable templates so the identity and work can develop over time.

## Canonical locations

| Record | Location |
|---|---|
| Source repository | `https://github.com/CKAWEBUILDER/mitchjmiller.com.git` |
| Active persistent checkout | `/Users/mitchellmiler/Documents/mitchjmiller-html-migration` |
| Current planning/review branch | `codex/portfolio-overhaul-20260910` |
| Original user checkout, preserve drafts | `/Users/mitchellmiler/Documents/mitchjmiller.com` |
| Historical local review checkout | `/private/tmp/mitchjmiller-overhaul-20260910` |
| Latest roadmap before this handoff | `b33e28c` on the planning branch |
| Production host/source | GitHub Pages, legacy branch deployment from `gh-pages` |
| Verified robots-only production fix | `923dfd85597253786da407fe78de6d0011bbfe16` |
| Main source after robots fix/docs | `2745c7e` as verified during the session; fetch before implementation |

GitHub is canonical. The persistent checkout is the designated continuation folder. The temporary preview remains a reference and may still serve the old React review on port 5186; it is not the new Astro site. Do not depend on temporary files or prior agent memory to continue.

## What is done

- Current live-site audit: 53 unique published routes defined; 29 published HTML route files plus one draft; 24 published routes lack direct files; no deployed sitemap; React pages contain noindex; four live PDFs are outdated. Robots observation in the original audit is superseded by the following fix.
- Robots-only fix deployed and verified live: `User-agent: *` / `Allow: /`. All other deployed files were unchanged. This allows crawling; it does not remove noindex or establish indexing.
- September React review build is committed, not deployed: expanded 17 case studies, four current two-page PDFs, 25 writing/study items, improved visuals and three interactive lab experiences. Its 54 route files are metadata shells, not complete content HTML.
- HTML migration roadmap completed with three specialist reviews: content/template inventory, architecture/private-library options, and SEO/release/rollback. Saved to GitHub and opened in Chrome.
- User's expanded positioning and future product directions recorded, including UBI, Date Night, DomainSignal, SearchForge, ClarityPulse and the simulation-workbench concept.

## What is not done

- No Astro implementation, new full-HTML site, production redesign, Cloudflare migration or client authentication exists from this planning task.
- The approximately fifteen active projects have not been reconciled. Seventeen cases and nine existing Selected Builds are different inventories.
- The UBI source/functionality and verified app-store/demo destinations still need discovery.
- No new simulation model, CRM importer, community platform, client upload system or private deliverable library has been built.
- Search Console submission, indexing and GA4 migration measurements for the new site are not complete. No follow-up automation was scheduled by the plan.

## Agreed sequence and decisions

1. Inventory current public URLs, projects, evidence, assets and exclusions.
2. Build and review three Astro pages with complete initial HTML: homepage, case study, writing; include one functioning interactive island.
3. Reuse approved design/content and convert the rest through shared templates, preserving URLs and PDFs.
4. Independently verify HTML-only discovery, content/status/SEO, interactions, accessibility, analytics and public/private exclusions.
5. Present a concrete release for approval and publish on existing GitHub Pages first. Keep the output portable. Cloudflare is a later controlled cutover, not prerequisite work.
6. Future client product: authenticated dated library of interactive deliverables, immutable versions, per-client authorization, retention/export and backups. Interaction does not mean editing originals.
7. Future lab flagship: build a simulated population from suitable data and compare scenarios; public-data demonstration first, authorized CRM data later. Validate model claims; no invented predictive performance.

The public lab can share constructive ideas and unfinished demonstrations, invite collaboration and create useful value without open-sourcing proprietary repositories. DomainSignal may later have its own analogous web/mobile lab; changing that product is separate scope. Public browser-delivered code is inspectable even when backend source remains private.

## Exact next task

On an instruction to proceed with implementation, fetch current source; preserve user drafts; reconcile main's robots hotfix with the useful review branch; create the dedicated implementation branch; prepare the route/project register and three-page Astro proof. Agree on the shared content schema before dividing page conversion among agents. Verify actual raw body HTML and JavaScript-disabled behavior before scaling.

Do not ask Mitch to restate the context. Present a prefilled project register when missing project identities need confirmation. Existing public-material permission does not need repeating. The latest request for this handoff is not a production/DNS approval.

## Estimates and measurement

The consolidated full public-release allowance is 32–51 focused human-equivalent hours, approximately 3–5 working days with parallel work and timely review. This is a planning range, not billed model time or a guarantee. Re-estimate after the pilot using actual throughput/usage. Future products and hosting/auth costs are separately described in the roadmap. Do not add specialist appendix estimates to the consolidated total.

## Key records

- [Roadmap and current requirements](docs/migration-2026-09-11/README.md)
- [Formatted roadmap](docs/migration-2026-09-11/roadmap.html)
- [Technical audit](docs/migration-2026-09-11/live-audit.md)
- [Content/template plan](docs/migration-2026-09-11/content-plan.md)
- [Architecture and client-library plan](docs/migration-2026-09-11/architecture-plan.md)
- [SEO/release/rollback plan](docs/migration-2026-09-11/release-plan.md)
- [Simulation workbench concept](docs/migration-2026-09-11/simulation-workbench-concept.md)
- [Prior review build and verification](docs/overhaul-2026-09-10/README.md)
- [Evidence rules](docs/overhaul-2026-09-10/content-evidence.md)
- [Resume source and QA](docs/overhaul-2026-09-10/resumes/README.md)
- [Existing deployment procedure](docs/deployment.md), applicable to the React build only until replaced by the Astro release procedure

## Operating notes

The original checkout has two untracked drafts: `content-studio/drafts/assets/gbp-2026-ai-grounding.png` and `content-studio/drafts/gbp-2026-ai-grounding.linkedin.md`. Leave them untouched. Existing npm scripts still build React/Vite; do not describe them as Astro commands. No credentials belong in these records.

SFC is a separate project. Mitch requested a week for Kathy/Scott to respond before follow-up; focus on the personal site meanwhile. That preference is recorded, not scheduled as an automated email or reminder. Preserve user-open browser tabs. The GitHub roadmap was left open for review; a source push did not deploy the website.
