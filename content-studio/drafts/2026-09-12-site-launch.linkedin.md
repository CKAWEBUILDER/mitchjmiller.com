# LinkedIn — site relaunch + population workbench (3 options)

Status: DRAFT ONLY. Not posted. Show Mitch before anything goes out — per `CLAUDE.md` house rule #6 (outward-facing = confirm, never auto-publish to LinkedIn).

Voice: first-person, direct, no hype, no emojis — matches existing published tone (`multi-agent-billing-traps.linkedin.md`).

---

## Option A — Site relaunch (complete-HTML portfolio + why crawlability matters)

*Character count: 1226*

I rebuilt mitchjmiller.com this week. Short version: it went from a client-rendered React app to complete, static HTML — every page, all the way down.

Here's why that's not a tech-stack preference. A growing share of what reads your site isn't a browser. It's GPTBot, ClaudeBot, PerplexityBot, Google's AI crawlers — and most don't reliably run JavaScript before deciding what a page says. Content that only exists after hydration is invisible to a real chunk of both search and the AI answer engines replacing it.

So I stopped treating that as theoretical and fixed my own site first. Case studies, resume paths, the lab, the blog — all of it now ships as full HTML in the first response. No stray noindex tags. Real 404s instead of a JS shell. A complete sitemap. I crawled the whole thing myself with JavaScript switched off, page by page, before calling it done.

This is the same standard I hold client AEO/GEO work to: don't just check whether AI engines cite you — check whether they technically can read you at all. Robots.txt is necessary. It was never sufficient.

Also live tonight: a free tool for people who'd rather look under the hood than take my word for it. Separate post coming.

https://mitchjmiller.com/

---

## Option B — Free population workbench (with concrete marketer example)

*Character count: 1218*

New free tool tonight: a population workbench built on real Census microdata.

It loads a 12,000-record sample of the 2019 ACS 1-Year PUMS for California — public-domain survey data, weighted so totals reproduce the actual state population (39.5M). Filter by age, income, sex, race, education, employment, and every count updates live as a weighted statistic, not a row count.

Concrete example: filter to employed women, 25–44, earning $50K–$100K. The tool returns 1,205,123 people — about 3% of California — with a weighted mean income of $69,335, read straight from Census records.

Past filtering, run two scenarios against your selection — a UBI policy model (cost, revenue, net gainers/payers) and a reach-and-adoption estimate built from your own assumptions — generate labeled synthetic persona composites, and export as interactive HTML, CSV, or JSON.

Every output is labeled for what it actually is: observed, calculated, simulated, or assumed. Nothing pretends to be a forecast.

Free on this public dataset. Calibrating it on your own customer or CRM data is a paid engagement.

https://mitchjmiller.com/lab/population-workbench/
Methodology: https://mitchjmiller.com/lab/population-workbench/methodology/

---

## Option C — Hiring-oriented (points recruiters to /resume/)

*Character count: 1145*

Note for anyone in a recruiting seat: I rebuilt my resume page this week along with the rest of the site.

Four versions of the same decade of work, each pulling different evidence forward depending on what you're hiring for — Search Direction (enterprise SEO leadership + AI-search strategy), AI Search Engineering (hands-on AEO/GEO + LLM tooling), Product Management (roadmaps, requirements, shipped AI products), and Organic Systems Architecture (programmatic SEO, entity systems, growth loops).

Background in one line: enterprise SEO at Apple and Stanford Health Care, a $15.21M-attributable-revenue program across a 1,000+ location healthcare network, and more recently AEO/GEO measurement plus applied AI systems — agent orchestration, eval pipelines, internal tools shipped end to end, not just proposed.

Open to director-level roles in SEO, AEO/GEO, AI Search, or AI Systems leadership, and advisory work. Case studies and the full portfolio sit on the same site if you want the receipts before a call — including a free Census-microdata tool I shipped tonight, if you want a live look at how I build.

https://mitchjmiller.com/resume/

---

## Posting recommendation

**Post first: Option B (population workbench).** It's the most novel and shareable — nothing comparable exists in his field — and it's the Content Studio's own standing recommendation (`PIPELINE-2026-09.md`, topic slate open question #4). **Then A** (site relaunch) 1–2 days later once B has run its course — it's the credibility/proof-of-craft piece, not the hook. **Hold C** for a specific hiring signal (a warm recruiter thread, an inbound message) rather than firing it cold, or use it as mid-week filler if the queue is otherwise empty.

**Best posting time:** Tue–Thu, 8–10am PT — before the workday fills feeds, and Mitch's own timezone (California). Avoid Monday (backlog scroll) and Friday afternoon (lowest B2B engagement).

**Not done here:** no infographic built, no post published, no LinkedIn draft saved into the platform. Pairing Option B with a screenshot of the workbench UI (filter panel + one distribution chart) would lift engagement — worth building once Mitch picks an order.
