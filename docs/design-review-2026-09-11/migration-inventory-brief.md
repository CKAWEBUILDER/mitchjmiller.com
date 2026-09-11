# Astro content migration inventory

Read-only source snapshot from `/Users/mitchellmiler/Documents/mitchjmiller-html-migration`, revision `d050e18b51ec78b8ab2b01d51b58b37f08a960bc`. This describes reusable source, not a fresh production crawl or a deployment.

- **[migration-inventory.json](migration-inventory.json):** routes, selectors, field schemas, image provenance, file hashes, PDF paths, browser/environment references and 11 migration risks.
- **[content-exports.json](content-exports.json):** resolved public content exports, including complete HTML and chapter text, extracted with `/` as the base URL. Contains four explicitly marked draft metadata records; filter them out rather than publishing this JSON wholesale.
- **[build-migration-inventory.py](build-migration-inventory.py):** regenerates the manifest from that snapshot and the source checkout. No package installation was needed.

## Verified inventory

| Material | Count |
|---|---:|
| Intended review routes | 54 |
| Existing public URL baseline | 53, plus the review-only `/lab/` addition |
| General pages | 12 |
| Case studies with matching full editorials and images | 17 |
| Published writing | 4: three HTML bodies, one Markdown body |
| Excluded writing drafts | 4 |
| Study notes | 21 |
| Mermaid diagrams | 55 across 20 notes |
| Selected Builds | 10: nine data records plus the SFC page override |
| Stable downloadable PDFs | 4 |
| Public assets/configuration files inventoried | 123 |
| Missing referenced local assets | 0 |

Route, case, writing and study-note slugs are all unique in this snapshot. The old duplicate-writing issue is already resolved; keep the defensive listing deduplication. Every case has an editorial and a resolved image.

## Convert through the existing data, preserving the full body

Case details combine `caseStudies[slug]`, `studyEditorial[slug]` and `getStudyImage(slug)`. The full story lives in editorial chapter/paragraph arrays, not the short `problem/system/proof` fields alone. The SFC Insights image and CommonSpirit before/after pair are extra figures currently authored in `case-study-detail.tsx`; the manifest records them.

Published writing selects `status === "published"`, renders `contentHtml`, or parses the journey article's `content` Markdown at build time. Preserve its headings and paragraphs. Study notes already contain complete authored HTML, citations, images and Mermaid source. Do not run `gen-study-notes.mjs`: it depends on an absolute private Desktop library. The checked-in published export and public images are sufficient.

The two notes `hermes-concepts-field-guide` and `claude-watermark-seo` contain CSS/radio filtering interfaces. `all-in-ai-money-stack` has 13 inline style attributes, and its excerpt includes HTML. Preserve article markup and interactions, but derive metadata/list excerpts as clean text. Published writing also includes five inline SVGs and three tables across its three HTML articles. Prefer diagrams rendered to SVG at build time, with an accessible text alternative; optional browser enhancement must not hide the article.

## Explicit route and asset conflicts

`public/case-studies/sfc-surf-school/index.html` is an older **29,022-byte “SFC Search Visibility” report** with three inline SVGs and two style blocks. It shares the canonical case URL. The existing Vite route-copy script overwrites that copied file with a React shell. Give the Astro editorial route one explicit output owner; preserve the old report source for reference or reviewed archival reuse rather than allowing a public-file collision.

Keep `/artifacts/destination-intent-explorer.html` as the existing standalone downloadable interactive artifact. It is separate from the 54 page-route inventory. Keep the four `/files/Mitchell-Miller-…-Background-2026.pdf` paths and their bytes unchanged; hashes are in the manifest.

## Engineering handoff

- `publicPath()` reads `import.meta.env.BASE_URL`; Astro can provide a build-time base, but plain Node imports need an explicit definition. Rich HTML image paths are root-relative. Avoid mixed or doubled prefixes.
- Replace the React route-copy shell and DOM-effect SEO with actual Astro page bodies and head metadata. Keep review output noindex; use native links and a real 404.
- Exclude the legacy `/* /index.html 200` rule in `public/_redirects` from static output.
- Convert Wouter navigation, layout scroll resets and resume dialogs to native HTML patterns. Scope browser code to clipboard, filters and the three lab controls/hash links. Do not carry the whole unused UI dependency set forward.
- Use resolved images/alt/provenance; obsolete `placeholder` production notes remain in base data and should not appear in client-facing templates.
- Nine base builds, ten displayed cards and approximately fifteen active projects are different inventories. No UBI source or public app-store destinations appear in these inspected files.

All checks above were performed without editing canonical source, starting a server/browser, using Sites, deploying, or changing an account.
