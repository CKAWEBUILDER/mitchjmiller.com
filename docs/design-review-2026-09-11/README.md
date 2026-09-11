# HTML staging and theme review — September 11, 2026

Mitch explicitly authorized the collaborative theme/design work, real HTML/CSS/Astro build and a separate staging environment. Production publication still waits for review. This supersedes the planning-only status in older records.

## Current slice

Two self-contained HTML/CSS theme references (Independent Practice and Research Atelier) share truthful portfolio content and embedded existing images. Native HTML controls expand lab notes. No React or JavaScript builds either theme's content.

Astro builds a review index, the two theme routes, a content-proof index, complete Apple and SFC case bodies, one complete published article, a current-resume page and a genuine 404 artifact. Core content is in the HTML response. These are review routes, not the final migrated public URL inventory.

The source remains the canonical GitHub repository on `codex/astro-html-staging-20260911`. A separate owner-private Sites deployment serves as the review environment; it does not replace the production domain. Its source remote is a deployment mirror, not the canonical project repository.

## Build and assets

`npm run build` creates the Astro staging output in `dist`; `npm run dev` or `npm run serve` serves it on port 5187. The former React commands are retained with `:legacy` suffixes for reference. Production-named build/deploy commands are deliberately blocked until the final reviewed migration has a release procedure.

`prepare-astro-staging.mjs` copies an allowlist of public images, PDFs, icons and artifacts to an ignored staging asset directory. It excludes the production CNAME, old SPA redirects and the separate legacy SFC HTML report. Staging allows authorized crawling and includes noindex; private hosting supplies access control. The production site's robots remain unchanged.

`verify-astro-staging.mjs` checks representative route output, headings, complete case bodies, metadata, four PDF downloads and exclusion of production bindings/legacy HTML. It is a static-output check, not a claim of mobile/browser testing.

## Next

Review the two themes, agree the visual direction, then apply the chosen tokens and template structure to the full content inventory. Keep theme selection and production approval separate. Complete route/SEO/interaction/visual QA before public release. Record the verified staging URL and deployment state after publication.

## Verification before staging publication

Astro 7.3.2 static build succeeded and generated nine pages. The output verifier passed full case-body checks, headings, noindex metadata, four PDF paths and exclusion of production CNAME/legacy SFC HTML. Local root readiness returned HTTP 200 at `http://127.0.0.1:5187/`. Visual/browser QA is not claimed. Astro preview is a task-specific background process managed by `astro preview stop`; the review remains available through publication.
