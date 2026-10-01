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

M² source commit 32d12eb was pushed to the codex branch and fast-forwarded to main; GitHub Pages gh-pages remains at 94016fa. Personal repo main is 777bee6 with site content from e34696d. The two untracked content-studio/research/2026-09-25 and content-studio/viz/ai-search-agents-skip-search folders appeared during this work; they were preserved and excluded from this commit.

Next: review both local previews and the DNS change plan. It replaces only the registrar root forwarding A record with GitHub Pages A records 185.199.108.153, .109.153, .110.153, .111.153 and adds www CNAME ckawebuilder.github.io, while retaining Namecheap nameservers, all five MX records, Replit verification TXT and SPF TXT. No production deployment or DNS change has occurred. M² publication still follows RELEASE-READY.md; personal-domain publication waits on review of the preview and DNS diff.
