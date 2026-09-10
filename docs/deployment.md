# Deployment

## Verified September 10, 2026

GitHub repository: `CKAWEBUILDER/mitchjmiller.com`.
Production: https://mitchjmiller.com/ on GitHub Pages, with HTTPS enforced.
GitHub Pages API returned `build_type: legacy`, source branch `gh-pages`, path `/`, status `built`.

Source changes belong in GitHub before deployment. A feature-branch push does not deploy this site. Publishing requires an approved release and a deliberate push of built files to `gh-pages`. Do not change Pages mode, DNS or hosts as part of the redesign.

## Build modes

- `npm run build`: review build, noindex/nofollow and disallowing robots.txt.
- `npm run build:production`: approved production build, index/follow metadata and sitemap declaration in robots.txt.
- Output: `dist/public`. The build copies `public/CNAME` and creates `.nojekyll`, a 404 shell, 54 route copies with unique metadata, and `sitemap.xml`.
- Existing GA4 measurement ID is retained. The analytics script loads only on the production hostname or www hostname, so local review does not pollute reports.

## Publish an approved version

1. Ensure the reviewed source commit is pushed to GitHub and record it in the release notes. Use one deploy driver.
2. Run `npm run typecheck` and `npm run build:production` from that commit.
3. Check `dist/public/robots.txt`, sitemap, CNAME, key page metadata, PDFs and image assets. Never copy the temporary `_responsive-review.html` QA harness to production.
4. Fetch `origin/gh-pages` and create a separate clean deploy worktree from it. Confirm that worktree path before replacing its contents. Copy only `dist/public/` into that worktree while preserving `.git`.
5. Review the complete deploy diff, commit it and push only `gh-pages`. Record the previous deploy commit for rollback.
6. Verify the Pages deployment, HTTPS, direct loading of homepage, SFC case study, lab, a writing/study route and resume PDFs. Confirm production allows indexing. Then inspect sitemap submission separately; generating a sitemap does not submit it to Search Console.
7. Remove the deploy worktree and stop temporary QA servers once no longer needed.

## Historical context

The July 24 recovery switched Pages from an Actions configuration without a workflow to its working branch-based deployment. Older Cloudflare migration notes were superseded by the verified GitHub Pages setup. Existing Cloudflare CLI scripts are legacy utilities, not the current deployment path; do not invoke them for this release. The fallback `build:github` command is also unrelated to the custom-domain release.

The September 10 redesign is a review build on `codex/portfolio-overhaul-20260910`. Production remains unchanged pending approval of this finished version.
