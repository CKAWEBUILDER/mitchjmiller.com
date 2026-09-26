# Frame + method — "I audited 54 companies selling AI visibility"

Run date: **2026-09-25/26**. All figures in the post come from `audit-results.json`,
`llms-txt.json` and `qualified.json` in this directory. Re-runnable: `python3 qualify.py`
then `python3 audit.py frame.txt audit-results.json` then `python3 llms.py`.

## How the sample was built (not cherry-picked)

1. **Four searches**, 2026-09-25, first page of results each:
   - `best generative engine optimization GEO agencies list 2026`
   - `top answer engine optimization AEO agencies companies list`
   - `best AI search visibility tracking tools platforms 2026 comparison`
   - `LLM SEO agency "AI visibility" services company`
2. **Candidates** = every domain that appeared as a result URL, plus every vendor named
   in those results. 62 candidates, listed in `candidates.txt`.
3. **Qualification is automatic** (`qualify.py`): a domain enters the frame only if its own
   homepage matches at least one category term (answer engine optimi*, generative engine
   optimi*, AEO, GEO, AI visibility, AI search visibility, LLM SEO, AI SEO, "cited in
   ChatGPT/AI", AI Overviews). Four known publishers that cover the category without
   selling it were excluded by name and are listed in `qualify.py` (`EXCLUDE`).
4. 62 candidates → **54 qualified**. 8 dropped: 6 had no category terms on their homepage,
   2 were unreachable. Drops are logged in `qualified.json`.

## What was measured

One homepage GET, one `robots.txt` GET, one `sitemap.xml` HEAD, and `llms.txt` /
`llms-full.txt` GETs per domain. Crawler identifies itself as
`mj2-audit/1.0 (+https://mj2.pro; technical SEO research; contact via site)`, six workers.

**2015-era checks:** title, meta description, exactly one H1, canonical, html lang,
viewport meta, robots.txt present, sitemap reachable (file or referenced in robots),
HTTPS, Schema.org JSON-LD.

**2026 checks:** whether robots.txt names any of GPTBot, ClaudeBot, Claude-Web,
PerplexityBot, Google-Extended, Applebot-Extended, CCBot, meta-externalagent, Bytespider;
whether each is allowed or disallowed at root; whether llms.txt exists.

## Results

- 54 in frame. 44 homepages fetched. **10 (19%) returned 401/403/429 to an identified crawler.**
  Those 10 stay in the frame — dropping them would bias the sample toward permissive hosts.
  Their robots.txt was still read where served.
- 2015 checks, n=44: title 0% fail, viewport 0%, HTTPS 0%, robots.txt 0%, meta description 2%,
  lang 2%, sitemap 2%, canonical 5%, one-H1 7%, **JSON-LD 18% fail (8/44)**.
- **30/44 (68%) pass all ten.** 12 fail one check, 2 fail two.
- AI bot policy, n=51 readable robots.txt: **7 (14%) name any AI crawler; 44 (86%) name none.**
- **No vendor blocks GPTBot, ClaudeBot, PerplexityBot or Google-Extended.** One blocks CCBot.
- **llms.txt present on 25/54 (46%).**

## Limitations — state these in the post

- **Homepage only.** Not a full-site crawl. A missing canonical or JSON-LD on the homepage
  does not mean the whole site lacks it.
- **n=54**, one snapshot, one day. Not a census; a sample of who ranks for these terms.
- **Silence in robots.txt is not blocking.** Unnamed = allowed by default, which is the
  outcome an AI-visibility vendor wants. The 86% figure is about explicit deliberateness,
  not misconfiguration. Do not sell it as a gotcha.
- **The 19% refusal rate is about our crawler**, not about GPTBot. Edge rules (Cloudflare
  and similar) commonly challenge unknown agents while allowing named AI crawlers.
- **llms.txt is a proposal, not a standard**, and no major AI system has confirmed it as a
  ranking or retrieval input. Presence indicates adoption of a trend, not effectiveness.
- Vendors are reported **in aggregate and unnamed**, by deliberate choice.
