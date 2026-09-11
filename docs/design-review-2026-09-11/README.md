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

## Private staging published

Native Sites deployment status reported `succeeded` on September 11, 2026. Owner-private review URL: https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site

- Source used for this build: `5bca30b7b79bd84936eb0afe008a88815415bfbc`, pushed to the canonical GitHub feature branch and the Sites deployment mirror.
- Site: `appgprj_6aa39e9ddc0881919bc64cbef445b4a3`.
- Saved version 1: `appgprj_6aa39e9ddc0881919bc64cbef445b4a3~appgver_e96eb0da17388191962421d5a19092b4`.
- Successful deployment: `appgdep_6aa3a201c92081918980fd97d990fe29`.
- Archive validated: static index and hosting manifest present; no Git or environment-file leakage.
- Browser opening was queued, not visually verified. No browser/mobile QA is claimed.
- Task-specific local Astro preview on port 5187 was stopped after successful hosting. Historical user review resources were preserved.
- Production domain/DNS remain unchanged. Theme selection is pending; full migration and production approval remain outstanding.

Exact next step: Mitch reviews Independent Practice versus Research Atelier and selects or combines their visual direction. Apply that decision across the full inventory, then complete route, content, SEO and interaction QA before requesting production release approval. This follow-up documentation commit does not change the deployed artifact or its source revision.
