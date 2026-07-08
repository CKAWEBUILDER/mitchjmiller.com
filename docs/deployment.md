# Deployment

This portfolio is a static Vite/React site. It does not need Replit compute to run after build.

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
