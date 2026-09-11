# Portfolio and client-workspace direction — September 11, 2026

Captured from Mitch's live review. This is a requirements record, not approval to deploy, migrate hosts, publish private client material or implement authentication while he is still defining the scope.

## Portfolio purpose and inventory

- Evolve the personal portfolio toward an independent consulting/agency presence that supports inbound client opportunities while preserving the recruiting/resume path.
- Showcase approximately fifteen active projects, alongside historical work and current resumes. The existing seventeen case studies are not automatically the inventory of those fifteen active projects; reconcile both lists before claiming full coverage.
- Provide useful filters including enterprise work and small-business growth/marketing operations. Categories should express the full scope of an engagement, not just SEO.
- Give Apple, Stanford/MyHealth, Dignity/CommonSpirit and the enterprise architecture work substantial visibility alongside SFC. SFC should not define or narrow the entire portfolio.
- Explain contributions, business context, decisions, implementation and outcomes clearly.

## Private client areas

- Provide client-specific areas under a dedicated section or subfolder of Mitch’s website, accessible to Mitch and the relevant authorized client users.
- Mitch wants to issue each client sign-in access so clients can see only their authorized workspace and artifacts. The exact credential/authentication mechanism is a design decision, not yet chosen.
- Host and serve the actual interactive HTML applications and their assets under Mitch’s control, rather than making Google Drive links or PDF/CSV exports the primary client experience. Preserve freedom to code the interactions each deliverable needs.
- Cloudflare is Mitch’s likely hosting candidate for this capability; no provider selection or migration has been finalized.
- House interactive HTML experiences, reports and related assets that lose functionality when converted to PDF.
- Preserve those deliverables in durable storage with an organized inventory, stable links and versions. Open tabs and temporary files are not the archive.
- Use enforceable authentication and authorization for pages and their underlying files. A hidden path, unlisted link, noindex directive or client-side-only gate is not sufficient for confidential content.
- Existing public portfolio content is approved for promotion. Future client material requires the permission Mitch said he will obtain. No private client artifact has been uploaded as part of this review.
- Scope audience, per-client isolation, file types, access removal, backups, ownership and ongoing cost before implementation. A subfolder is a possible URL arrangement, not a security design.

## Hosting established today

A fresh GitHub Pages API check confirmed mitchjmiller.com uses GitHub Pages, legacy build mode, source gh-pages at /, built status, HTTPS enforced. It is not currently deployed to Cloudflare. The redesigned version remains a local review build. No hosting migration occurred.

## Claims raised during review to substantiate before public edits

Mitch emphasized his contribution to Stanford/MyHealth, the scale of Dignity location pages, a contribution of roughly 80% of online bookings, and the influence of Apple's AMR store-search program on global strategy. These are user-provided claims to reconcile with existing case-study sources and precise responsibility/attribution. Do not silently substitute them for already verified metrics or expand his job title.

## Exact next step

Continue collecting Mitch's requirements and feedback. Then reconcile the active-project inventory and category model, and propose a concrete client-workspace architecture with real access protection and operational costs. Do not treat this record as production approval.

During the live review, Mitch chose to open the current public site in an adjacent Chrome tab for comparison with the local redesign. Leave the review tab available and avoid competing with his navigation.
