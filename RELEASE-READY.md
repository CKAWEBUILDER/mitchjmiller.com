# RELEASE-READY — mitchjmiller.com public release candidate 2026-09-12

Prepared 2026-09-11 17:12 EDT by the Claude integration/QA worker. **PUBLISHED 2026-09-11 17:14 EDT as gh-pages `1b2d2a6`; probes passed (see PROJECT.md).** Originally: the lead (release owner) publishes after reading [docs/release-2026-09-12/qa-report.md](docs/release-2026-09-12/qa-report.md).

## What this is

The production-parity complete-HTML site (53 archived routes, exact content), plus the public lab (`/lab/`), the population workbench (`/lab/population-workbench/` and `/methodology/`), the `/clients/` sign-in entrance, the contact form wired to the Cloudflare Worker, the corrected September 10 resume PDFs at the existing four paths, real 404, sitemap of 57 URLs, GA4 `G-HCKYWCZQ8E`, no `noindex` on public pages. The new design candidate is **not** included.

| Item | Value |
|---|---|
| Branch | `claude/release-2026-09-12` (pushed to `origin`) |
| Release source commit | `c422377` — later commits on the branch are documentation only; a rebuild must reproduce the artifact hash below |
| Build | `npm ci` (if `~/.npm` is unwritable: `npm_config_cache=/private/tmp/claude-501/npm-cache npm ci`) then `npm run build:release-candidate` |
| Output directory | `dist/` (301 files, 62 HTML documents, 17 MB) |
| Artifact hash | sha256 of [docs/release-2026-09-12/artifact-manifest.txt](docs/release-2026-09-12/artifact-manifest.txt) = `18b6093162b76fddff62aa088013eff67090eb2779c4746fd438a00f6ac7f6d7` (reproduced by two builds). Recompute: `(cd dist && find . -type f \| LC_ALL=C sort \| xargs shasum -a 256) \| shasum -a 256` |
| Local tarball | `.release-candidate/mitchjmiller-release-2026-09-12.tar.gz` sha256 `e2f0d0be52e9de3ed880c2ca0d4d8ba830191699132a708f2950f55297664e06` (not committed; contains mtimes) |
| QA | verify-parity PASS · verify-workbench 58/58 · typecheck PASS · crawl 757/757 · browser 203/203 |
| Rollback reference | `gh-pages` `923dfd85597253786da407fe78de6d0011bbfe16` (current public deployment) |

## Publish procedure (lead only)

```sh
cd /Users/mitchellmiler/Documents/mitchjmiller-release
git fetch origin
git log --oneline -1 origin/gh-pages            # expect 923dfd8; stop if it moved
git log --oneline -1                            # release branch head (c422377 or a later docs commit)
npm run build:release-candidate                 # rebuild from this checkout
(cd dist && find . -type f | LC_ALL=C sort | xargs shasum -a 256) | shasum -a 256   # must print 18b6093162b76…

# Clean deploy worktree from the current gh-pages commit
git worktree add --detach /Users/mitchellmiler/Documents/mitchjmiller-deploy 923dfd85597253786da407fe78de6d0011bbfe16
cd /Users/mitchellmiler/Documents/mitchjmiller-deploy
git checkout -B gh-pages 923dfd85597253786da407fe78de6d0011bbfe16
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +      # replace contents, keep .git
cp -R /Users/mitchellmiler/Documents/mitchjmiller-release/dist/. .
ls -a | grep -E '^(CNAME|\.nojekyll|404\.html|sitemap\.xml|robots\.txt)$' | wc -l   # expect 5
(find . -path ./.git -prune -o -type f -print | LC_ALL=C sort | xargs shasum -a 256) | shasum -a 256   # must print 18b6093162b76…
git add -A
git commit -m "Release 2026-09-12: complete HTML site from claude/release-2026-09-12 c422377 (artifact 18b6093162b76)"
git log --oneline -2                            # new commit on top of 923dfd8
git push origin gh-pages                        # fast-forward; no force
```

GitHub Pages builds from the `gh-pages` root (legacy branch deploy, custom domain `mitchjmiller.com`, HTTPS enforced). The `CNAME` file keeps the domain; `.nojekyll` keeps `_astro/` from being dropped. The Pages CDN caches for up to ten minutes; retry probes if the first response is stale.

## Post-publish probes

```sh
curl -sI https://mitchjmiller.com/ | head -1                                              # HTTP/2 200
curl -s  https://mitchjmiller.com/ | grep -c '<h1'                                        # 1
curl -s  https://mitchjmiller.com/ | grep -c 'noindex'                                    # 0
curl -s  https://mitchjmiller.com/robots.txt                                              # Allow: / + Sitemap line
curl -s  https://mitchjmiller.com/sitemap.xml | grep -o '<loc>' | wc -l                   # 57
curl -s  https://mitchjmiller.com/files/Mitchell-Miller-Search-Systems-Background-2026.pdf | shasum -a 256   # 8f48d7d786880c3a…
curl -sI https://mitchjmiller.com/blog/gbp-2026-ai-grounding/ | head -1                  # 200 (was the 404 shell)
curl -sI https://mitchjmiller.com/blog/studying/hermes-concepts-field-guide/ | head -1   # 200
curl -sI https://mitchjmiller.com/lab/population-workbench/ | head -1                    # 200
curl -sI https://mitchjmiller.com/no-such-page/ | head -1                                 # 404
curl -s  https://mitchjmiller.com/no-such-page/ | grep -c 'Page not found'               # 1
curl -s  https://mitchjmiller.com/contact/ | grep -c 'challenges.cloudflare.com/turnstile' # 1
```

Then in a browser: open `/contact/?topic=population-simulation`, confirm Turnstile renders and the topic is pre-filled, send one test message, and read it back from the cloud worktree with `node cloudflare/api-worker/scripts/leads.mjs 5` (see `/Users/mitchellmiler/Documents/mitchjmiller-cloud/docs/cloudflare/README.md`).

## Rollback

Preferred (no force push): in the deploy worktree, `git revert --no-edit HEAD && git push origin gh-pages` — restores the 923dfd8 tree as a new commit.
Alternative: `git reset --hard 923dfd85597253786da407fe78de6d0011bbfe16 && git push --force-with-lease origin gh-pages`.
Either way the live site returns to the previous React deployment within the CDN cache window.

## Morning items

1. Search Console: submit `https://mitchjmiller.com/sitemap.xml`; request indexing for `/`, `/work/`, `/lab/`, `/resume/`, one case study. If the property shows unverified, re-verify (GA4-based verification is inferred).
2. GA4 realtime: open the live site and confirm hits for `G-HCKYWCZQ8E` (QA blocked analytics, so nothing was sent overnight).
3. Live contact test as above; confirm the lead lands in D1.
4. Merge `claude/release-2026-09-12` into `main` after publication so source and deployment match (the branch is already pushed; main still holds the robots-only hotfix baseline `2745c7e`).
5. Decisions listed in the QA report §8: keep `/lab/` public and the footer Lab link; workbench reuse statement and "UBI on the filtered selection".
6. Cloudflare mirror: only after the release build is deployed to `mitchjmiller-com` should its custom domain be activated (lane 3 README).
