# Live crawl access — September 11, 2026

Mitch explicitly requested removal of the robots.txt crawl restriction and immediate republication of the existing public site so he can crawl it in Screaming Frog. This does not authorize deploying the proposed redesign or migrating hosting.

The live robots.txt and origin/main source both contained Disallow: / for all crawlers plus named bot groups. They are replaced by User-agent: * and Allow: /. No sitemap declaration is invented: the deployed branch has no root sitemap.xml.

Source base: 0f9e48cc9102e88edc4a8a657395add4be16d5fe. Live deployment base and rollback point: a71410b6616819072abe9e9b7ce4cb16a5b62966. Hosting was freshly verified as GitHub Pages, gh-pages at /, HTTPS enforced.

Only robots.txt changes in the deployed tree. Source public/robots.txt is updated and saved to GitHub before deployment. All existing HTML, JS, CSS, media, PDFs and CNAME must remain byte-identical to the preceding release. No full rebuild is required for this standalone static file.

Validation: Python robots parser allows Screaming Frog and the previously named bot groups on the homepage, work, resume and an existing case-study path. Git deployment diff must contain exactly robots.txt. Follow publication with GitHub Pages completion and a fresh read of the live robots response.

Existing meta noindex/nofollow directives in HTML and React are a separate audit finding. They are not removed by this crawl-access-only patch. Audit of the current live site, its active-project inventory and indexing is continuing independently.

## Publication outcome

Source fix 7d0cc82 was pushed to main and codex/allow-production-crawling-20260911 before deployment. GitHub Pages deployment commit 923dfd85597253786da407fe78de6d0011bbfe16 completed with status built and no error at 05:02 UTC on September 11. A fresh live robots response returned User-agent: * / Allow: /. The complete deployment diff from the previous release is exactly robots.txt; all other tracked site files are unchanged.

Mitch was informed immediately that crawling is allowed and to begin a fresh Screaming Frog crawl to reload the rules. The existing noindex directives remain a distinct audit finding. No redesign or hosting migration was deployed.
