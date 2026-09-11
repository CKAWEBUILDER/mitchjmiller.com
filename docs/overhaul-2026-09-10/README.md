# Portfolio overhaul — September 10, 2026

## September 11 direction supersedes the old release step

Mitch requested a complete-HTML Astro migration roadmap, public crawlability/indexability and broader inbound positioning across data science, design, engineering, search/growth and independent projects. The prior React review build must not be published as the final answer to that request. The consolidated [HTML migration roadmap](../migration-2026-09-11/README.md) and [formatted review](../migration-2026-09-11/roadmap.html) preserve scope, estimates, sources, agent responsibilities and release gates. Initial public release is planned on existing GitHub Pages; Cloudflare and the future authenticated, dated client-deliverable library are separate phases. UBI, Date Night and DomainSignal are explicit inventory priorities. This planning task has not implemented Astro or changed hosting.

The September 11 robots-only fix is already live from main; the new implementation must reconcile it with this feature branch rather than replacing main with an older snapshot. The original files and design below remain reusable reference work. The exact next step is the project/URL register and three-page Astro proof described in the migration roadmap.

## Outcome

Complete review build on `codex/portfolio-overhaul-20260910`, based on `0f9e48cc9102e88edc4a8a657395add4be16d5fe`. GitHub repository: `CKAWEBUILDER/mitchjmiller.com`. Production uses GitHub Pages from `gh-pages`, verified through the GitHub API. No production deployment, DNS or host change was performed.

The redesign uses a cream, ink, vermilion and sage visual system, clear client/hiring paths, current experience and source-backed proof. It includes:

- Rebuilt homepage, navigation, about, contact, resume, work, methodology and selected-build pages.
- 17 expanded case studies preserving existing slugs. SFC is prominent, with the released interactive map, actual Insights image and dated growth evidence.
- Four current two-page resume PDFs using the approved format and original download URLs.
- Three working interactive lab experiences: destination intent, growth interpretation and shared content architecture. The destination-intent experience also has an offline HTML download.
- 25 notes: four published articles and 21 study notes, with filters, readable excerpts and preserved article content.
- Original social-preview artwork, accessible focus states, reduced-motion behavior and responsive layouts.
- 54 physical page routes with metadata, canonicals and sitemap entries. Default review builds block indexing; `npm run build:production` explicitly enables it. Local previews do not load production GA4.

## Permission and evidence

Mitch explicitly approved promotion of existing public website material and requested recent SFC work. No blanket reapproval is required for these materials. Future client material requires the approval he said he will obtain. No emails, Drive links, recipient details or private employer records were copied into the website.

SFC growth: Aug 12–Sep 8 versus Jul 15–Aug 11, 2026; 5 to 54 clicks (+980%) and 470 to 1,652 impressions (+251% rounded). The map launched Sep 10, after that measurement window, and is not credited with the earlier increase. Destination-qualified service searches are treated as clear destination intent; no invented visitor percentages or exact-match volumes are asserted.

## Verification

- TypeScript and optimized Vite builds passed.
- Both production and review build modes checked; all 54 production route robot tags permit indexing and review mode restores noindex.
- Independent audit: 54 routes and sitemap entries, all 17 case-study routes, canonical links, referenced local links/assets and new SFC shell passed.
- All eight resume pages rendered and visually checked by the resume agent; sources, hashes and QA records are in `resumes/`.
- Desktop browser review: homepage, SFC story, resume paths, writing list and filters; case-study search and category filters; lab navigation and interactions.
- Lab checks: location changes retain destination intent; growth math, zero baseline and reset work; shared CTA changes propagate while an override stays local. Independent focused harness also covered all 12 destination scenarios and offline artifact export.
- Mobile layouts were visually checked at 390px through the local iframe review harness. This is responsive layout evidence, not a claim of physical-device testing.
- Original social card visually inspected at 1200×630. Full-page browser stitching was unreliable, so viewport captures were used.
- Contact fields accept an inquiry and retain the selected project type; the submit action was not invoked during QA.
- Repeated route generation verified to retain one canonical per route and clean article descriptions.
- Contact form composes an email for the visitor to review and send; it is not a server submission or lead database.

## Source changes and continuity

Root integrated layout/theme/main pages/metadata/build and review. Three agents completed case studies, resume PDFs/writing pages, and interactive experiences. Detailed records: `content-evidence.md`, `interactive-lab.md`, `resumes/`.

The isolated checkout is `/private/tmp/mitchjmiller-overhaul-20260910`. The original user checkout at `/Users/mitchellmiler/Documents/mitchjmiller.com` and its two unpublished content-studio drafts were left untouched. Existing SFC browser tabs were preserved. A local preview at `http://127.0.0.1:5186/` remains available for Mitch’s review; stop it when that review no longer needs it.

## Exact next step

Review the finished redesign. After approval, publish the same source version using `docs/deployment.md` and verify production. Do not push `gh-pages` or change DNS before that approval. The separate SFC staged logo marker and homepage work are not part of this portfolio deployment.

## September 11 client-style walkthrough

Mitch requested a live, agenda-led presentation in a separate Chrome window, with visible follow-along notes. `presentation-notes.html` records the six-stop script: positioning, proof, live tools, resumes/writing, inquiry path and next phase. It is available locally as the temporary `_presentation-notes.html` review page and was linked visibly in the conversation. It is not a public production asset.

The walkthrough exercised the homepage stages; the 17-project/9-enterprise filters and SFC narrative; destination query/location changes; the clicks/impressions chart; shared call-to-action propagation with a Cardiology override; four resume options; 4-writing/21-studying filters; and the contact project selector. No email was sent from the demonstration form. The Chrome website tab was marked to remain available for review. The user moved the first native Chrome window to the extended display; Chrome subsequently relaunched during an update, requiring reconnection to the available profile. Native window-control inspection was blocked by automatic approval review, so presentation actions used the scoped website browser interface.

New direction discussed: attracting more inbound client opportunities and eventually providing authenticated client workspaces for interactive HTML deliverables, including EDC material. This was exploratory planning, not authorization to upload client files, build authentication, migrate hosts or deploy the redesign. Existing production remains GitHub Pages; private-client storage/access controls need separate design. Browser tabs and temporary HTML are not the long-term archive for client deliverables.

Further September 11 feedback is captured in [next-phase requirements](next-phase-requirements-2026-09-11.md): approximately fifteen active projects must be reconciled with the historical case studies; enterprise work should have substantial visibility; authenticated per-client artifact areas are planned but not implemented. Fresh GitHub API check reconfirmed GitHub Pages hosting.
