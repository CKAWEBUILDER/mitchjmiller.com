# Deployment

This portfolio is a static Vite/React site. It does not need Replit compute to run after build.

## Free Cloudflare Pages Setup

- Project source: GitHub repo `CKAWEBUILDER/mitchjmiller.com`
- Build command: `npm run build`
- Build output directory: `dist/public`
- Node version: Cloudflare default is fine unless the build UI asks; use Node 22 if prompted.

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
3. Update Namecheap DNS only to the records Cloudflare provides.
4. Verify:
   - `/`
   - `/about`
   - `/resume`
   - `/collab-ideas`
   - `/case-studies/commonspirit-locations-conversion-engine`
   - resume PDF downloads
   - image assets
   - `noindex` remains until final launch.

## Static Routing

`public/_redirects` provides Cloudflare Pages SPA fallback:

```txt
/* /index.html 200
```

`scripts/create-route-copies.mjs` also creates physical route copies during build for hosts that do not honor SPA fallback rules.
