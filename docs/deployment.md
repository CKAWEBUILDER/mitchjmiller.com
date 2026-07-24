# Deployment

This portfolio is a static Vite/React site. It does not need Replit compute to run after build.

## ⚠️ CURRENT STATE — read first (updated 2026-07-24 by Claude Code)

**Live host = GitHub Pages, deploy-from-branch `gh-pages`. HTTPS on `mitchjmiller.com` works.**

What was broken and what I changed:
- GitHub Pages had been set to **"GitHub Actions" build mode** (`build_type: workflow`) but the repo had **no workflow file** — so nothing had deployed since **2026-07-07**. Manual pushes to `gh-pages` did nothing.
- I switched Pages back to **legacy "deploy from branch" mode** (`gh-pages` / `/`) via the API. Pushing to `gh-pages` now triggers GitHub's built-in `pages-build-deployment` and publishes.

**How to deploy right now (MANUAL — one driver at a time):**
```bash
npm run build                       # outputs dist/public (base "/", includes CNAME)
git worktree add /tmp/ghp gh-pages
rsync -a --delete --exclude='.git' dist/public/ /tmp/ghp/
cd /tmp/ghp && git add -A && git commit -m "Deploy" && git push origin gh-pages
git worktree remove /tmp/ghp
```

**To restore push-to-deploy (recommended, needs Codex/Mitch — token scope):**
The proper fix is a GitHub Actions workflow, but the `gh` CLI token in the CKAWEBUILDER
keyring **lacks `workflow` scope**, so Claude Code could not push `.github/workflows/`.
With a token that has `workflow` scope, add `.github/workflows/deploy.yml` below **and**
switch Pages back to Actions mode (`gh api --method PUT repos/CKAWEBUILDER/mitchjmiller.com/pages -f build_type=workflow`):

```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist/public }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.deployment.outputs.page_url }}' }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**New feature added (2026-07-24):** a "Studying" filter on `/blog` (All/Writing/Studying) +
study-note pages at `/blog/studying/:slug`. Content is generated from a private library via
`scripts/gen-study-notes.mjs` into `src/lib/study-notes.ts`; images live in
`public/images/study/<slug>/`. Uses the `mermaid` dep (code-split, loaded only on study pages).

---


## Current Live Setup: GitHub Pages

DNS for `mitchjmiller.com` currently points at GitHub Pages, but GitHub has not
issued a valid HTTPS certificate yet. Use Cloudflare Pages as the free production
target when Cloudflare auth is available.

- Build command: `npm run build`
- Build output directory: `dist/public`
- Custom domain source: `public/CNAME`

GitHub Pages custom-domain HTTPS may need to be reissued/enforced in the repo
settings after DNS and the Pages build are healthy.

## Target Free Setup: Cloudflare Pages

- Project source: GitHub repo `CKAWEBUILDER/mitchjmiller.com`
- Build command: `npm run build`
- Build output directory: `dist/public`
- Node version: Cloudflare default is fine unless the build UI asks; use Node 22 if prompted.

CLI deploy after Cloudflare auth:

```bash
npm run cloudflare:login
npm run deploy:cloudflare
```

Cloudflare project name:

```txt
mitchjmiller-com
```

The first successful deploy will produce a `*.pages.dev` URL with working HTTPS.
After the preview is verified, add `mitchjmiller.com` and `www.mitchjmiller.com`
as custom domains in Cloudflare Pages.

For root-domain HTTPS on `mitchjmiller.com`, move DNS from Namecheap nameservers
to the two Cloudflare nameservers assigned when the domain is added to Cloudflare.
Do not point the apex domain back to Replit or leave it parked on GitHub Pages if
Cloudflare becomes the production host.

## GitHub Pages Custom Domain

When publishing to `mitchjmiller.com`, build with root paths:

```bash
npm run build
```

`public/CNAME` is copied into `dist/public/CNAME` and declares the custom domain for GitHub Pages.

Only use `npm run build:github` for the fallback project URL:

```txt
https://ckawebuilder.github.io/mitchjmiller.com/
```

## Domain

Current domain owner/DNS manager appears to be Namecheap.

Do not change DNS until a Cloudflare Pages preview URL has been verified.

After Cloudflare Pages verifies the preview:

1. Add custom domain `mitchjmiller.com` in Cloudflare Pages.
2. Add `www.mitchjmiller.com` if desired.
3. Update Namecheap nameservers to the two Cloudflare nameservers for this zone.
4. Verify:
   - `/`
   - `/about`
   - `/resume`
   - `/collab-ideas`
   - `/case-studies/commonspirit-locations-conversion-engine`
   - resume PDF downloads
   - image assets
   - `noindex` remains until final launch, unless Mitch explicitly approves indexing.

## Static Routing

`public/_redirects` provides Cloudflare Pages SPA fallback:

```txt
/* /index.html 200
```

`scripts/create-route-copies.mjs` also creates physical route copies during build for hosts that do not honor SPA fallback rules.
