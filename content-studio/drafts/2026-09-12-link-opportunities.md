# Link & Distribution Opportunities — Site Relaunch + Population Workbench (2026-09-12)

Status: RESEARCH ONLY. No outreach performed, no accounts touched, no posts made. Every URL below is either verified live during this session (curl/WebSearch, 2026-09-12) or marked `search:` where I could not confirm a specific submission URL with high confidence — per instruction, nothing is fabricated. Confirm current rules/contacts before acting; community policies and submission flows change.

**Global constraint carried through every item:** I did not contact anyone. "Mitch does" below is not a formality — for all 20 items, the actual post/submission/pitch has to go out under Mitch's own identity and account, both because platforms expect the builder to be the poster and because the task authorized drafting only.

## Priority — do these five first
1. **Hacker News (Show HN)** — lowest effort, best audience match, biggest plausible upside. See #1.
2. **r/dataisbeautiful** — one good chart is a real shot at a large, relevant audience. See #4.
3. **FutureTools.io + AlternativeTo** — two free directory submissions, ~10 minutes each, durable backlinks. See #6–7.
4. **Indie Hackers "Show IH"** — low effort, good fit for the freemium build story, possible podcast upside. See #5.
5. **Data Elixir newsletter** — one email, strong topical fit, long-running curated audience. See #13.

Everything else is real but slower, less certain, or gated behind Mitch's own relationships (alumni/employer networks especially — see Group 3).

---

## Group 1 — Communities and forums

### 1. Hacker News — Show HN
- **Where:** https://news.ycombinator.com/submit
- **Why it fits:** HN's audience skews data/ML/technical and rewards exactly this tool's actual substance — real weighted microdata, a verified simulation model, disclosed provenance labeling — over polish or marketing framing.
- **Suggested title:** `Show HN: A browser tool to filter and simulate California's 2019 Census microdata (PUMS)`
- **Pitch line (first comment, not the title):** "Built this against a 12,000-record weighted sample of the 2019 ACS PUMS for California — filters run client-side, and every output is labeled observed/calculated/simulated/assumed so it's clear what's real Census data versus a typed-in assumption. Methodology + verification notes: [methodology URL]. Happy to answer questions on the weighting or the UBI model."
- **Effort:** Low
- **Mitch does:** Submit from his own HN account (builder-as-submitter is the norm and gets noticed if it isn't true), then be online to answer technical questions in the first 1–2 hours — HN threads live or die fast.

### 2. r/datascience
- **Where:** https://www.reddit.com/r/datascience/
- **Why it fits:** Direct technical match — PUMS microdata, survey weighting, weighted persona sampling are squarely this subreddit's territory.
- **Pitch line:** "I built a browser tool that filters weighted Census PUMS microdata and labels every output by provenance (observed/calculated/simulated/assumed) — sharing the weighting and sampling approach for feedback, not just the link."
- **Effort:** Med — the subreddit restricts service/tool promotion; framing this as a technical write-up rather than a launch is required, and it may need to go through a "Show and Tell"-style weekly thread rather than a standalone post. Check the current sidebar rules immediately before posting; they change.
- **Mitch does:** Post personally from an account with some sub history if possible; verify the current self-promo rule/weekly-thread situation same-day, since search couldn't confirm a standing "Show and Tell" thread exists right now.

### 3. r/SEO
- **Where:** https://www.reddit.com/r/SEO/
- **Why it fits:** The FAQPage-schema/"honest AI-output labeling" angle is genuinely relevant to an AEO/GEO-minded SEO audience, and it's a natural extension of Mitch's own lane.
- **Pitch line:** "How I labeled every output on a data tool for AI-citability (observed/calculated/simulated/assumed) — writeup + the tool it's built for." Lead with the methodology, not the tool.
- **Effort:** High — r/SEO explicitly removes tool-drops and treats indirect promotion as spam; mods are reportedly good at spotting it. Low probability of survival as a link post.
- **Mitch does:** Treat as a discussion-first post if he does it at all; expect possible removal and don't rely on this as a primary channel.

### 4. r/dataisbeautiful
- **Where:** https://www.reddit.com/r/dataisbeautiful/
- **Why it fits:** A single well-formatted chart pulled from the tool (e.g., weighted income distribution by education for California adults) is legitimate OC if sourced correctly — this subreddit is large and genuinely receptive to Census-data visualizations.
- **Pitch line (as a title, their format):** `[OC] Weighted income distribution by education, California adults 25+ (2019 ACS PUMS, n=12,000)` — link to the tool in the first comment, source cited in the title per their rules.
- **Effort:** Med — requires exporting/designing one clean static chart image, not just linking the live tool, and following their strict OC/sourcing format.
- **Mitch does:** Pick and export the specific chart, confirm it satisfies their "self-made OC" bar, post from his own account.

### 5. Indie Hackers — "Show IH"
- **Where:** https://www.indiehackers.com/
- **Why it fits:** IH's audience likes transparent build stories and freemium-with-a-paid-upsell models — "free on public data, paid to calibrate on your CRM data" is exactly their milieu. A strong post can get pulled onto their podcast.
- **Pitch line:** "Show IH: I shipped a free Census-microdata simulation tool as part of a portfolio relaunch during a job search — here's the free/paid split and why I built the provenance-labeling system the way I did."
- **Effort:** Low
- **Mitch does:** Post in his own voice — the story sells better first-person than summarized.

---

## Group 2 — Directories and tool lists

### 6. FutureTools.io
- **Where:** https://futuretools.io/submit-a-tool
- **Why it fits:** AI/tool directory with a marketer-adjacent audience; the persona-generation and scenario-modeling features are the clearest "AI tool" angle for their categorization.
- **Pitch line (one-line submission):** "Build Your Own Simulated Population — filter real Census microdata, run policy and reach-adoption scenarios, generate labeled synthetic personas. Free on public data."
- **Effort:** Low
- **Mitch does:** Submit via his own account; category fit (whether reviewers count it as "AI enough") isn't guaranteed.

### 7. AlternativeTo
- **Where:** https://alternativeto.net/ (submit via "Suggest new application" after signing in)
- **Why it fits:** Positions the workbench as a free alternative to paid synthetic-population/persona-generation tools — topical, durable directory backlink.
- **Pitch line:** List as a free alternative to paid audience-simulation/synthetic-persona tools; tag Census, open-data, marketing-research, data-visualization.
- **Effort:** Low
- **Mitch does:** Sign up, submit, and pick 2–3 real comparison tools for the "alternative to" field (a few minutes of research).

### 8. "Awesome" open-data / Census GitHub lists
- **Where:** https://github.com/brandonhimpfen/awesome-open-data (confirmed live listing repo) — also search: `awesome census data github` for adjacent lists (e.g., official-statistics-software, data-engineering) that may or may not accept an applied-tool entry rather than a raw dataset/library.
- **Why it fits:** Curated GitHub "awesome" lists rank well themselves and a merged PR is a durable, high-relevance backlink.
- **Pitch line (as a PR):** `+ [Population Workbench](https://mitchjmiller.com/lab/population-workbench/) — browser tool to filter, simulate, and export California 2019 ACS PUMS microdata (free)`
- **Effort:** Low–Med — needs a GitHub account, a small PR, and maintainer review; check each list's `CONTRIBUTING.md` for scope/format first (some are libraries/datasets only, not applied tools).
- **Mitch does:** Open the PR under his own GitHub account; attribution matters for these lists.

### 9. "Free tools for marketers" roundup posts
- **Where:** search: `free marketing tools roundup 2026` / search: `best free data tools for marketers list`
- **Why it fits:** Evergreen roundup posts rank for exactly the queries a freemium, no-login, Census-backed tool should show up for, and many accept reader/tool suggestions.
- **Pitch line:** "I built a free browser tool that filters real Census microdata and exports interactive reports — no login required. Thought it might fit your [free marketing tools] roundup: [URL]."
- **Effort:** Med — this is a category, not a single destination; it takes identifying 5–10 specific ranking posts and each author's contact method.
- **Mitch does:** All of it — build the short list of target posts and send the emails himself (or hand me the list later for a drafting pass; I did not identify specific posts/authors this session).

---

## Group 3 — Alumni and institutional
**Do not contact any of these without Mitch's explicit go-ahead — per instruction, these are listed for his decision only, not acted on.**

### 10. UC Berkeley MIDS / I School alumni network
- **Where:** https://www.ischool.berkeley.edu/alumni · Berkeley I School LinkedIn Group (~1,200+ members per public listings)
- **Why it fits:** If Mitch holds this credential, data-science alumni are a high-trust, high-relevance audience for a Census-microdata tool with disclosed methodology.
- **Pitch line:** "Built a free tool on 2019 ACS PUMS data — sharing in case the methodology (weighting, provenance labeling) is interesting to this group. Feedback welcome."
- **Effort:** Low, once access is confirmed
- **Mitch does:** Everything. I did not verify whether Mitch holds a Berkeley MIDS credential or has current access to this network — confirm that first, then decide whether and how to post, personally.

### 11. Past-employer alumni networks (Apple, Stanford Health Care, CommonSpirit/Dignity Health)
- **Where:** none listed — these are typically private Slack/LinkedIn/intranet groups specific to each employer, not public URLs.
- **Why it fits:** Former colleagues are a warm, high-trust channel for both traffic and referral leads into the paid-calibration offer.
- **Pitch line:** "Relaunched my site and shipped a free Census-data tool — sharing in case it's useful to anyone here." (Personal note, not a pitch.)
- **Effort:** Low, access-gated
- **Mitch does:** Everything — identify which networks he still has access to and post personally, in his own words.

### 12. Clarity Digital (current advisory relationship) internal/partner channels
- **Where:** none — internal to that relationship
- **Why it fits:** If Clarity Digital runs a partner newsletter or case-study/showcase program, the launch is a live proof point of Mitch's applied-AI capability.
- **Pitch line:** "Wanted to flag this in case it's useful context for client conversations — a free Census tool I built independently."
- **Effort:** Low, but a professional-relationship judgment call
- **Mitch does:** Everything — this touches a paid client relationship; only Mitch should decide what's appropriate to share there.

---

## Group 4 — Newsletters and podcasts covering marketing analytics

### 13. Data Elixir (data science newsletter)
- **Where:** https://dataelixir.com/ · exact submission route unconfirmed — search: `Data Elixir submit a link`
- **Why it fits:** Long-running (since 2015) curated weekly newsletter explicitly covering tools and tutorials for data scientists/analysts — direct fit.
- **Pitch line:** "A free browser tool for filtering/simulating 2019 ACS PUMS microdata with disclosed provenance labeling on every output — thought it might fit a tools roundup."
- **Effort:** Low
- **Mitch does:** Find the actual submission method on the site and send the email himself (or greenlight a drafted email for me to prep next session).

### 14. TLDR Marketing (daily newsletter, ~330K subscribers)
- **Where:** https://tldr.tech/marketing · submit/suggest route unconfirmed — search: `TLDR tech submit a story`
- **Why it fits:** Daily 5-minute marketing-tools-and-trends digest; a free, no-login analytical tool fits their tools segment well.
- **Pitch line:** "Free tool: filter real Census microdata, run policy/reach scenarios, export interactive reports — could be useful for readers doing audience sizing."
- **Effort:** Low to send, low odds of inclusion (editorial, unpredictable)
- **Mitch does:** Find and use the submit form himself; treat as a cheap long-shot, not a plan.

### 15. Moneyball for Marketing (podcast, host Glenn Gow)
- **Where:** search: `Moneyball for Marketing podcast Glenn Gow guest pitch`
- **Why it fits:** Confirmed active podcast at the intersection of marketing, data, and technology — strong topical and guest-format fit for "how to use real microdata for audience sizing without lying to yourself."
- **Pitch line:** "I built a free tool that runs real Census microdata through policy and reach scenarios with disclosed provenance on every number — could talk through the build and the broader synthetic-data-honesty angle for your audience."
- **Effort:** Med — needs the host's current booking process, not found this session.
- **Mitch does:** Pitch under his own name/bio (Apple, Stanford Health Care, CommonSpirit) — podcast guest slots convert on personal credibility.

### 16. Marketing O'Clock (SEO/marketing podcast)
- **Where:** search: `Marketing O'Clock podcast guest pitch`
- **Why it fits:** Well-known weekly SEO/marketing-news podcast with a practitioner audience that overlaps directly with Mitch's AEO/GEO lane.
- **Pitch line:** "Two things that might interest your audience: rebuilding a portfolio for AI-crawler visibility, and a free Census tool built around honest observed/simulated/assumed labeling."
- **Effort:** Med
- **Mitch does:** Confirm current hosts/booking process (lineups change) and pitch personally.

### 17. Trend-spotting marketing/tech newsletters (e.g., Exploding Topics-type)
- **Where:** search: `Exploding Topics newsletter submit a tool`
- **Why it fits:** These outlets cover novel tools and data products; "a tool that refuses to blur real data and typed-in guesses" is a distinctive angle against synthetic-data hype.
- **Pitch line:** "A counter-trend to synthetic-data hype: a free tool that labels every output by whether it's observed, calculated, simulated, or assumed."
- **Effort:** Med — cold pitch, no existing relationship
- **Mitch does:** Research current submission process and send personally; expect low odds.

---

## Group 5 — Partner/collab angles

### 18. Semrush community / blog contributor path
- **Where:** Could not confirm a specific community/contributor-submission URL this session (searched; no verified `community.semrush.com` or contributor page found) — search: `Semrush community contributor program` / `Semrush blog write for us`. Known-real: https://www.semrush.com/blog/
- **Why it fits:** Mitch is already a working Semrush user (it's wired into this Content Studio's own research workflow) — a piece on provenance-labeling for AI/data-tool outputs ties the free tool to a platform his audience trusts.
- **Pitch line:** "I'm a working Semrush user building free applied-data tools — would a piece on labeling AI/data-tool outputs by provenance (observed/calculated/simulated/assumed) fit the Semrush blog or community?"
- **Effort:** High — cold pitch to a large brand, no confirmed intake path, uncertain acceptance.
- **Mitch does:** Everything — find the actual current path and pitch under his own account.

### 19. Cloudflare Developer Spotlight
- **Where:** Program described here: https://community.cloudflare.com/t/developer-spotlight-program-cloudflare-developer-spotlight/725786 · examples: https://blog.cloudflare.com/tag/developer-spotlight/ · exact application form unconfirmed — search: `Cloudflare Developer Spotlight apply`
- **Why it fits:** The site's contact form runs on a Cloudflare Worker (per the release's own QA notes) and there's an in-progress Cloudflare mirror for the domain — a genuine "built with Cloudflare" story, not a stretch.
- **Pitch line:** "I built a free Census-microdata analysis tool with a Cloudflare Worker-backed contact/lead pipeline — would it fit the Developer Spotlight program?"
- **Effort:** Med–High — application/acceptance process, timeline uncertain.
- **Mitch does:** Confirm the Cloudflare-Worker technical story is accurate and still live before pitching it, find the current application path, submit personally.

### 20. Census Bureau / data.census.gov data-user community
- **Where:** No specific stable URL confirmed this session — search: `Census Bureau data user community showcase` / `Census Academy external tools`
- **Why it fits:** The Census Bureau sometimes highlights third-party tools built on its public data; a citation from Census.gov itself would be an unusually high-authority, high-trust backlink and directly validates the "public-domain Census microdata" framing.
- **Pitch line:** "Built a free browser tool on the 2019 ACS 1-Year PUMS California file, with a published methodology page showing sample-vs-full-file benchmarks — flagging it in case it's useful to highlight for data users."
- **Effort:** High — government outreach, slow, no confirmed contact, long odds.
- **Mitch does:** Everything — research the correct current contact and send personally. Treat as a long-shot swing, not a near-term plan.

---

## What I did not do
- No accounts created, no posts made, no emails sent, no PRs opened, no DMs sent.
- No alumni or employer network was contacted (Group 3 is listed for Mitch's decision only, per instruction).
- Every "search:" line means I could not confirm a specific URL with high confidence this session — verify before using, don't treat it as a dead end.
