# M² / personal portfolio split — September 25, 2026

## Direction

Mitch approved removing M²'s multi-resume experience, keeping a profile that links to LinkedIn, and restoring mitchjmiller.com as a separate personal work-history portfolio with one current PDF.

## Changes in the M² source

- Removed the resume chooser from the Astro shared shell and legacy React layout.
- Replaced the homepage's four-resume text with personal portfolio and LinkedIn links.
- Changed utility/footer destinations to mitchjmiller.com; Spanish home/contact copy also links to the personal profile.
- Changed M² /resume/ into a transfer page linking to the personal portfolio and LinkedIn.
- Removed unused four-resume chooser components/data from both React source tracks. Existing direct PDF files and paths remain for backward compatibility during transition.
- Kept person JSON-LD associated with LinkedIn and the personal site.

## Files

See git status --short on branch codex/personal-site-split-20260925. Changes include site/layouts/AgencyLayout.astro, site/lib/agency.ts, localized home/contact/design/proof pages, baseline/src/pages/{home,about,contact,resume}.tsx and legacy src/ navigation/profile/contact/resume sources.

## Release boundary

No production publication or DNS change has happened. https://mj2.pro/ responded 200 during this work. http://mitchjmiller.com/ still gives Namecheap's 301 to https://mj2.pro/; HTTPS to the old domain timed out. Preserve all five existing Namecheap MX records and current verification records when planning web hosting. Do not change nameservers.

## Next action

M² typecheck and release-candidate build passed. Parity is 57/57 routes, sitemap 73 URLs, agency shell 77/77 documents, standards 84/84 documents. Local HTTP probes returned 200 for M² home and /resume/, personal home, CSS and the PDF. The PDF hash matches the approved source. The validator was updated to require the personal portfolio link and absence of the retired chooser. No fresh crawl export was found in the project, Downloads or shared workspace.

Next: commit and push M² source, then present both local previews and the web-only DNS diff for release review. M² publication still follows RELEASE-READY.md; personal-domain publication waits on review of the preview and DNS diff.
