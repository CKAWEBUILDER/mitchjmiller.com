# Mitchell Miller — mitchjmiller.com

**Agent entry point:** read [AGENTS.md](AGENTS.md), [PROJECT.md](PROJECT.md), and the [current handoff](handoffs/astro-migration-2026-09-11.md). Claude Code also has a root [CLAUDE.md](CLAUDE.md) entry point. The active direction is the [complete-HTML Astro migration](docs/migration-2026-09-11/README.md); the commands and React review description below are the existing implementation, not a completed Astro conversion.

Personal portfolio for enterprise search leadership, AI engineering and growth systems. The September 2026 redesign includes 17 case studies, four current resume PDFs, 25 writing/study notes and three interactive lab experiences.

## Develop and review

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run serve -- --host 127.0.0.1 --port 5186
```

The default build creates a review version with `noindex` and a disallowing robots.txt. Build output is `dist/public`. Route generation preserves direct links and supplies unique metadata, canonicals and a 54-URL sitemap.

## Production

```sh
npm run build:production
```

This explicitly enables indexing in static HTML, React metadata and robots.txt. Building does not deploy. GitHub is canonical; production is GitHub Pages from the `gh-pages` branch. Follow [deployment instructions](docs/deployment.md) only after approval of the finished release. No DNS or hosting migration is required.

## Project records

- [September 10 overhaul and verification](docs/overhaul-2026-09-10/README.md)
- [Case-study evidence and image sources](docs/overhaul-2026-09-10/content-evidence.md)
- [Interactive lab](docs/overhaul-2026-09-10/interactive-lab.md)
- [Visual asset provenance](docs/visual-assets.md)

Existing public content is approved by Mitch for promotion. The SFC work was explicitly requested for this overhaul. Future client material requires the approval Mitch said he will obtain. Preserve unpublished drafts separately from public source.
