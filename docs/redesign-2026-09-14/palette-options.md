# Palette and M² review — September 14, 2026

Implemented in the single canonical checkout on `claude/agency-redesign`. No palette or logo has been selected for the website; its current identity is unchanged. No commit, push, deployment or production action was performed by the palette contributor.

## Review artifact

- Route: `/review/brand-options/` (staging only).
- Page: `site/pages/review/brand-options.astro`.
- Palette data: `site/data/palette-options.json`.
- Logo data: `site/data/m2-options.json`, provided by the M² contributor.
- Logo assets: `/review-assets/brand-options/m2-01.png` through `m2-10.png`.

Five native radio choices each show the same small website specimen. Choosing one changes only the larger sample and its color/contrast values. No storage, cookie, network request or site-wide theme mutation is used. The specimen has centered copy, one CTA representation and simple solid icons. All options remain visible without JavaScript. The gallery reads the logo manifest at build time and offers individual native-resolution PNG downloads.

## Palettes

| # | Direction | Ink | Paper | Surface | Accent | Muted |
|---|---|---|---|---|---|---|
| 1 | Navy / Emerald | #0F2440 | #FFFFFF | #F2F5F7 | #14804A | #596675 |
| 2 | Forest / Fern | #142A22 | #FFFFFF | #F1F5F0 | #39834D | #526456 |
| 3 | Indigo / Iris | #232342 | #FFFFFF | #F3F3F8 | #6268B9 | #626277 |
| 4 | Ink / Mineral | #20292F | #FFFFFF | #F1F5F6 | #477B8E | #566871 |
| 5 | Olive / Moss | #292D20 | #FFFEFB | #F4F4EA | #707A3A | #616650 |

## Contrast evidence

Computed using WCAG sRGB relative luminance. Ratios rounded to two decimals for display; pass/fail checks use unrounded values. All primary and secondary normal text pairs, button labels and accent-on-paper pairs meet 4.5:1; accent against the dark hero meets 3:1. These checks describe the specified solid pairs, not a site-wide accessibility certification.

| Direction | Ink/paper | White/accent | Muted/surface | Accent/dark hero |
|---|---|---|---|---|
| Navy / Emerald | 15.59:1 | 4.98:1 | 5.35:1 | 3.13:1 |
| Forest / Fern | 15.17:1 | 4.64:1 | 5.75:1 | 3.27:1 |
| Indigo / Iris | 15.10:1 | 5.00:1 | 5.37:1 | 3.02:1 |
| Ink / Mineral | 14.79:1 | 4.68:1 | 5.29:1 | 3.16:1 |
| Olive / Moss | 13.97:1 | 4.63:1 | 5.38:1 | 3.04:1 |

## Validation and release boundary

- Astro compiler-rs transform passed with no diagnostics. The page emits **zero extracted CSS or JavaScript chunks**: review styling and behavior are inline.
- Independent Node calculation verified all **40** stored color-pair ratios and their thresholds.
- Lead owns combined staging/release builds and browser verification; no browser inspection is claimed by this contributor.
- Existing `scripts/finalize-parity.mjs` removes `dist/review/` and `dist/review-assets/` from release output.
- Lead must copy `public/review-assets/brand-options/` into `.stage-assets/review-assets/brand-options/` only in the non-release prepare branch. This contributor did not edit build scripts.
- Do not add this review route to the public route manifest or sitemap.

Next: finish the ten-logo manifest/assets, validate the integrated review at desktop/mobile widths, then have Mitch select a palette and logo by number or name. A selection does not itself authorize public deployment.
