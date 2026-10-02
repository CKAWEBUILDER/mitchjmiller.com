# Session handoff — October 2, 2026

Owner: Claude Code (cloud session), handing off at Mitch's request ("hand off to another chat"). Read after PROJECT.md. Private project detail (the projects list, domains, hosting) went to Mitch in chat and is not recorded in this public repository.

## State (checked 2026-10-02)

- **Production unchanged.** mj2.pro is still gh-pages `664c757`, the October 1 M² release from `main` `956a65b` (GitHub's Pages deployment reported success). On October 2 this session made no deploy, DNS, billing, repository-setting or deletion change; this note is its only commit.
- **mitchjmiller.com is live** as the separate personal portfolio since about 00:20 UTC on October 2. A Codex session published it from `CKAWEBUILDER/mitchjmiller-portfolio`. The apex uses the GitHub Pages A records, `www` is a CNAME to `ckawebuilder.github.io`, and MX/TXT are unchanged. DNS was checked from here; HTTPS 200 is per that project's records. Codex owns that repository's releases.
- Cloud sessions cannot load mj2.pro, mitchjmiller.com, api.indexnow.org or brand sites. That is this container's egress policy, not the sites.

## Waiting on Mitch (do nothing until he says the word)

1. **"ship all"**: one mj2.pro release.
   - Header button "Let’s talk" → "Contact" (`site/lib/agency.ts:61`), Spanish "Hablemos" → "Contacto" (`site/i18n/es.ts:51`), with the CTA assertions at `scripts/verify-agency.mjs:65-66`. "Contact" is the only label tested that fits on one line at 1281 and 1360 px; "Get in touch" and "Start a project" run into the menu.
   - `git revert 3c9519d`: the "Mitch's portfolio" links (EN and ES) go back to https://mitchjmiller.com/. Its verify-agency checks (LinkedIn utility link, no links to the mitchjmiller.com root) revert with it.
   - Old-domain links: until October 2, Namecheap forwarded every `mitchjmiller.com/<path>` to mj2.pro. Those paths now hit GitHub's 404. Fix in the portfolio repository, coordinated with Codex: a `404.html` that sends unknown paths to `https://mj2.pro/<same path>`, plus redirect pages for the M² routes, added to `publish-pages.yml`'s file allowlist. Two archived bodies on mj2.pro link `https://mitchjmiller.com/blog/studying/claude-watermark-seo` (`baseline/src/lib/data.ts:469`, `:571`); the route exists on mj2.pro, so the redirect covers them without a parity content edit.
2. **Whitepapers and case studies**: his list of pieces (a title or one line each), or "propose". mj2.pro is his own site; only a piece that names a client or uses a client's numbers needs that client's written OK.
3. **"combine"**: the projects tab in his Google Sheet. Detail in chat.

## Blocked here (needs the Mac or a session with network access)

- Release `664c757` live checks (`node scripts/qa/live-standards.mjs` against https://mj2.pro/; spot-check the M² mark, the /resume/ transfer page, retired PDFs 404, /clients/ → pages.dev) and the IndexNow POST with the full 74-URL sitemap.
- Carousel logo artwork. Method, pending list and HOLD list: `docs/redesign-2026-09-14/brand-logo-sources.json`.

## Watch-outs

- On GitHub Free, making a Pages repository private takes its site down (mj2.pro, mitchjmiller.com, the Waikiki site). Mitch asked for all repositories private; that needs GitHub Pro or another host first.
- Every push to `main` runs `cloudflare-pages.yml` (gated on Cloudflare secrets); pushes touching `cloudflare/api-worker/**` run `cloudflare-worker.yml`. This note sits on `claude/jolly-carson-qx254x`, which triggers neither; fast-forward `main` to it with the next release.
