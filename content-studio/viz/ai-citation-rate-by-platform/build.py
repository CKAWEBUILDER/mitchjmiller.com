#!/usr/bin/env python3
"""Build the ledger (research/2026-09-18/retrieved-vs-cited/data.json) and the artifact
(index.html, from ../kit/template.html) from ONE table of figures, so the two can't drift.

Every number below was read from arXiv 2609.19244v1 (HTML), retrieved 2026-09-18T10:14Z,
parsed locally from the page source (raw parse saved beside the ledger as
arxiv-2609.19244-tables.json). No WebFetch summary was used for any number.
Run: python3 build.py
"""
import json, re, pathlib

HERE = pathlib.Path(__file__).resolve().parent
STUDIO = HERE.parent.parent
PAPER = "https://arxiv.org/abs/2609.19244"
HTML = "https://arxiv.org/html/2609.19244v1"
PUB = "2026-09-16"
RETRIEVED = "2026-09-18T10:14Z"
PUBLISHER = "arXiv 2609.19244v1 (Amani, Lee, Dash, … Zafar, Das; 12 authors)"

PLATFORMS = [("grok", "Grok"), ("chatgpt", "ChatGPT"), ("claude", "Claude")]  # Grok first: default state = headline state
SETTINGS = [("app", "real users' chats"), ("api", "the API, all 1,000 prompts"),
            ("common", "the API, prompts all models searched")]
API_MODEL = {"chatgpt": "GPT-5.3-chat", "claude": "Claude Sonnet 4.6", "grok": "Grok-4.3"}  # Table 2

# Table 8 — search-result URLs (avg per response), cited URLs (avg per response), cited search results
T8 = {
 "app":    {"chatgpt": (1196238, 28.4, 168510, 4.0, 159580, 13.3), "claude": (27162, 16.6, 5668, 3.5, 5409, 19.9),
            "grok": (110684, 40.7, 1950, 0.7, 1943, 1.8)},
 "api":    {"chatgpt": (4940, 35.3, 534, 3.8, 526, 10.6), "claude": (17086, 20.7, 6790, 8.2, 6790, 39.7),
            "grok": (17090, 22.3, 4406, 5.7, 4364, 25.5)},
 "common": {"chatgpt": (4702, 36.4, 509, 3.9, 501, 10.7), "claude": (3177, 24.6, 1009, 7.8, 1009, 31.8),
            "grok": (3156, 24.4, 795, 6.2, 771, 24.4)},
}
T8_CI = {"app": {"chatgpt": "13.1–13.6", "claude": "17.2–22.9", "grok": "1.4–2.2"},
         "api": {"chatgpt": "9.3–12.0", "claude": "37.1–42.6", "grok": "24.2–26.9"},
         "common": {"chatgpt": "9.3–12.2", "claude": "26.1–39.3", "grok": "21.4–27.8"}}
DEEPSEEK_APP = (22338, 14.4, 7610, 4.9, 7610, 34.1)  # Table 8; API rows print "–" for citations
# Table 5 (app) and Table 14 (api all / common): web queries per prompt, URLs per web query
QRY = {"app": {"chatgpt": (3.07, 14.06), "claude": (1.80, 9.19), "grok": (4.55, 8.95)},
       "api": {"chatgpt": (2.11, 17.71), "claude": (2.42, 8.54), "grok": (3.80, 5.92)},
       "common": {"chatgpt": (2.12, 17.61), "claude": (2.85, 8.63), "grok": (4.14, 6.09)}}
# Table 12 (app) / Table 13 (api All, Common): retrieved citations — valid %, hallucinated %
LINKS = {"app": {"chatgpt": (85.99, 2.00), "claude": (88.39, 1.11), "grok": (91.82, 0.26)},
         "api": {"chatgpt": (87.45, 0.19), "claude": (89.31, 1.78), "grok": (92.51, 0.11)},
         "common": {"chatgpt": (86.83, 0.20), "claude": (86.22, 2.18), "grok": (90.92, 0.00)}}
# Table 10 (app) / Table 11 (api replay, not split by all/common): claim factuality 1–5,
# claims backed by their own citation vs claims from parametric knowledge
FACT = {"app": {"chatgpt": (3.47, 2.84), "claude": (3.92, 3.31), "grok": (4.40, 3.40)},
        "api": {"chatgpt": (3.47, 2.60), "claude": (3.00, 2.66), "grok": (3.41, 2.86)}}
FACT["common"] = FACT["api"]
FACT_DEEPSEEK_APP = (4.17, 3.92)
# Table 1 — users, conversations, turns, turns with web search
T1 = {"chatgpt": (310, 143730, 690754, 42273), "claude": (102, 9267, 64354, 1696),
      "grok": (100, 9005, 53840, 3004), "deepseek": (101, 9262, 36020, 1730)}
# Table 3 — of the same 1,000 prompts, how many each API model chose to search
SEARCHED = {"chatgpt": 140, "claude": 825, "grok": 766, "deepseek": 584}
# Table 9 — ChatGPT app citation rate by model (selected rows)
T9_CHATGPT = {"text-davinci-002-render-sha": 20.0, "gpt-4-1": 18.6, "gpt-4o": 17.5, "gpt-5": 14.7,
              "gpt-5-2": 7.8, "gpt-5-2-thinking": 6.0}
T9_GROK = {"grok-3": 1.3, "grok-4": 4.1, "grok-420": 0.6}

# ---- self-checks against the paper's own arithmetic
for s in T8:
    for p, (sr, _, _, _, cs, rate) in T8[s].items():
        assert abs(round(cs / sr * 100, 1) - rate) <= 0.1, (s, p, cs / sr)
sr, _, _, _, cs, rate = DEEPSEEK_APP
assert abs(round(cs / sr * 100, 1) - rate) <= 0.1
assert sum(v[0] for v in T1.values()) == 613 and sum(v[1] for v in T1.values()) == 171264  # Section 2 text
assert round(T8["app"]["grok"][0] / T8["app"]["grok"][4]) == 57  # "1 in 57" in copy

# ---------------------------------------------------------------- ledger
rows = []
def add(table, metric, platform, setting, value, unit, note=""):
    rows.append({"metric": metric, "platform": platform, "setting": setting, "value": value, "unit": unit,
                 "source": f"Characterizing Web Search by Conversational LLM Agents, {table}", "publisher": PUBLISHER,
                 "date": PUB, "url": HTML, "retrieved": RETRIEVED, "confidence": "verified-on-page", "note": note})
pl = dict(PLATFORMS); sl = dict(SETTINGS)
for s, _ in SETTINGS:
    for p, _ in PLATFORMS:
        who = pl[p] if s == "app" else API_MODEL[p]
        sr, srr, cu, cur, cs, rate = T8[s][p]
        add("Table 8", "search-result URLs", who, sl[s], sr, "count")
        add("Table 8", "search-result URLs per response", who, sl[s], srr, "avg")
        add("Table 8", "cited URLs", who, sl[s], cu, "count")
        add("Table 8", "cited URLs per response", who, sl[s], cur, "avg")
        add("Table 8", "cited search results", who, sl[s], cs, "count")
        add("Table 8", "citation rate (cited search results / search-result URLs)", who, sl[s], rate, "%", f"95% CI {T8_CI[s][p]}")
        t = "Table 5" if s == "app" else "Table 14"
        add(t, "web queries per user prompt", who, sl[s], QRY[s][p][0], "avg")
        add(t, "URLs per web query", who, sl[s], QRY[s][p][1], "avg")
        t = "Table 12" if s == "app" else "Table 13"
        add(t, "retrieved citations that resolve (valid)", who, sl[s], LINKS[s][p][0], "%")
        add(t, "retrieved citations classed hallucinated", who, sl[s], LINKS[s][p][1], "%", "likely, not definitive (Appendix F)")
        if s != "common":
            t = "Table 10" if s == "app" else "Table 11"
            add(t, "claim factuality 1-5, claims backed by their own citation", who, sl[s], FACT[s][p][0], "score", "judge: GPT-4o-mini with web search (G.1)")
            add(t, "claim factuality 1-5, claims from parametric knowledge", who, sl[s], FACT[s][p][1], "score", "judge: GPT-4o-mini with web search (G.1)")
sr, srr, cu, cur, cs, rate = DEEPSEEK_APP
for m, v, u in (("search-result URLs", sr, "count"), ("search-result URLs per response", srr, "avg"), ("cited URLs per response", cur, "avg"),
                ("citation rate", rate, "%")):
    add("Table 8", m, "DeepSeek", sl["app"], v, u, "DeepSeek API rows print '–' for citations, so DeepSeek is outside the artifact grid")
add("Table 10", "claim factuality, own citation vs parametric", "DeepSeek", sl["app"], "4.17 vs 3.92", "score")
for p, (u, c, t, w) in T1.items():
    add("Table 1", "users / conversations / turns / turns with web search", p, sl["app"], f"{u} / {c:,} / {t:,} / {w:,}", "count")
for p, n in SEARCHED.items():
    add("Table 3", "prompts (of 1,000) where the API model chose to search", p, "API", n, "count")
for m, v in T9_CHATGPT.items():
    add("Table 9", "citation rate by deployed model", "ChatGPT: " + m, sl["app"], v, "%")
for m, v in T9_GROK.items():
    add("Table 9", "citation rate by deployed model", "Grok: " + m, sl["app"], v, "%")
SCALARS = [
  ("claims supported by searched-but-uncited URLs (ChatGPT, Claude, Grok; both settings)", "14%–53%", "%", "Section 5.2 text (Figure 10)", "range only; per-platform values are in a figure, not a table"),
  ("top-10 domains' share of returned search results, ChatGPT app (API)", "21.3% (47.8%)", "%", "Section 4.3 text", ""),
  ("top-10 domains' share of returned search results, Grok app (API)", "32.3% (29%)", "%", "Section 4.3 text", ""),
  ("reddit.com and youtube.com in Claude's search results", "Section 4.3: 'completely absent'; Appendix H.6: wikipedia/reddit/youtube dominate all four", "", "Section 4.3 vs Appendix H.6", "INTERNAL CONTRADICTION: not used. Copy uses only the H.6 claim both agree with: Claude top = coding sites (github.com, learn.microsoft.com, stackoverflow.com); ChatGPT/Grok/DeepSeek = reddit.com, youtube.com, facebook.com"),
  ("hallucinated citations, both settings", "1–2%", "%", "Section 5.1 text", "Tables 12–13"),
  ("citation-rate range in the text vs Table 6/8", "1.7–34.0% / 10.6–40.0% (text) vs 1.8–34.1% / 10.6–39.7% (tables)", "", "Section 5.1 vs Tables 6, 8", "internal rounding inconsistency; copy uses table values"),
  ("in-vivo dataset", "171,264 conversations from 613 users", "", "Section 2 / Table 1", "GDPR data donations, InvivoGPT method"),
  ("in-vitro prompt set", "1,000 first user messages sampled from ChatGPT in-vivo traces (500 triggered search, 500 did not), PII excluded", "", "Section 2 / Appendix C.1", ""),
  ("claim factuality judge", "GPT-4o-mini with web search, 5-point Likert", "", "Appendix G.1", ""),
  ("claim entailment human agreement", 93, "%", "Section 5.2", ""),
]
for metric, v, u, table, note in SCALARS:
    rows.append({"metric": metric, "platform": "", "setting": "", "value": v, "unit": u,
                 "source": f"Characterizing Web Search by Conversational LLM Agents, {table}", "publisher": PUBLISHER,
                 "date": PUB, "url": HTML, "retrieved": RETRIEVED, "confidence": "verified-on-page", "note": note})
ledger = {"assignment": "Retrieved vs cited: how often ChatGPT, Claude, Grok and DeepSeek cite the pages their web search returns (blog-research run 2026-09-18)",
          "researcher_note": "Every per-cell figure copied from the arXiv HTML tables, parsed locally from the fetched page source. build.py asserts cited/retrieved reproduces every printed citation rate, and Table 1 totals reproduce the Section 2 text.",
          "stats": rows}
out = STUDIO / "research/2026-09-18/retrieved-vs-cited/data.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(ledger, indent=2, ensure_ascii=False))
print("ledger rows:", len(rows))

# ---------------------------------------------------------------- artifact data
NOTES = {
 ("chatgpt", "app"): "Newer ChatGPT models cite less of what they read: gpt-4-1 cited 18.6% of its search results, gpt-5-2-thinking 6.0%.",
 ("claude", "app"): "Claude's top search-result domains were coding sites (github.com, stackoverflow.com). ChatGPT and Grok skewed to reddit.com and youtube.com.",
 ("grok", "app"): "The widest gap in the study. Across grok-3, grok-4 and grok-420 the rate stays between 0.6% and 4.1%.",
 ("chatgpt", "api"): "GPT-5.3-chat chose to search on 140 of the 1,000 prompts. Claude Sonnet 4.6 searched on 825.",
 ("claude", "api"): "The highest citation rate in the grid: about 2 of every 5 retrieved pages became a link.",
 ("grok", "api"): "25.5% here against the app's 1.8%. Models, prompts and setting all differ, so read it as a gap, not a cause.",
}
GENERIC = {
 "common": "Only prompts where every model searched, so the three columns answer the same questions.",
 "app": "Donated real-user chat exports. Rates vary with the models users had at the time.",
 "api": "1,000 prompts sampled from ChatGPT users' chats, sent to each API. Only prompts it chose to search count.",
}
def serp(p, s):
    q, u = QRY[s][p]; v, h = LINKS[s][p]; fc, fp = FACT[s][p]
    rate = T8[s][p][5]
    who = f"{pl[p]} app · {T1[p][0]} users · {T1[p][3]:,} search turns" if s == "app" else f"{API_MODEL[p]} · API · {'common prompts' if s == 'common' else '1,000 prompts'}"
    return {"query": who,
            "note": NOTES.get((p, s), GENERIC[s]),
            "rows": [{"kind": "organic", "label": "Searched", "text": f"<em>{q:.2f}</em> web queries per prompt · {u:.2f} URLs per query"},
                     {"kind": "citation", "label": "Cited", "text": f"<em>{rate}%</em> of retrieved pages linked (95% CI {T8_CI[s][p]})"},
                     {"kind": "answer", "label": "Links", "text": f"{v:.2f}% of cited links resolve · {h:.2f}% likely hallucinated"},
                     {"kind": "pack", "label": "Claims", "text": f"Factuality {fc:.2f} with own citation vs <em>{fp:.2f}</em> from memory (1–5)"}]}

values, serps = {}, {}
for p, _ in PLATFORMS:
    values[p], serps[p] = {}, {}
    for s, _ in SETTINGS:
        sr, srr, cu, cur, cs, rate = T8[s][p]
        values[p][s] = {"perresp": [cur, srr], "total": [cs, sr]}
        serps[p][s] = serp(p, s)

src = lambda i, label, detail: {"id": i, "label": label, "detail": detail, "asOf": PUB, "url": HTML}
data = {
 "meta": {
  "sample": False, "seed": 20260918, "palette": "aurora",
  "eyebrow": "Living infographic · AI search citations",
  "title": "Grok's app read 40.7 pages per answer and linked {lit}fewer than one{/lit}",
  "deck": "A new study logged 171,264 real chats from 613 users, then replayed 1,000 prompts through each model's API. Pick a platform and a setting to see how many retrieved pages become a link. DeepSeek's app cited 34.1%; its API run reported no citations, so it sits outside the grid.",
  "askPrefix": "How many retrieved pages does", "askMiddle": "cite in", "askSuffix": "?",
  "columns": {"cited": {"name": "Cited", "sub": "Linked in the answer"},
              "absent": {"name": "Retrieved", "sub": "Returned by its web search"}},
  "hero": "perresp",
  "byline": "Mitchell Miller · mitchjmiller.com",
  "liveUrl": "mitchjmiller.com/viz/ai-citation-rate-by-platform/",
  "gifNote": "Rudimentary GIF of a living artifact.",
  "gifNoteSub": "All platforms, both settings and every source are in the interactive version."
 },
 "dimensions": {
  "vertical": {"label": "platform", "options": [{"id": k, "label": v} for k, v in PLATFORMS]},
  "intent": {"label": "setting", "options": [{"id": k, "label": v} for k, v in SETTINGS]}
 },
 "prompts": [
  {"label": "Where does a retrieved page become a link least often?", "set": {"vertical": "grok", "intent": "app"}},
  {"label": "Does the same company cite more through its API?", "set": {"vertical": "grok", "intent": "api"}},
  {"label": "Which setup links the most of what it reads?", "set": {"vertical": "claude", "intent": "api"}},
  {"label": "How does ChatGPT compare on identical prompts?", "set": {"vertical": "chatgpt", "intent": "common"}}
 ],
 "metrics": [
  {"id": "perresp", "label": "Pages per answer", "note": "Average URLs per response: cited vs returned by search.", "unit": "", "decimals": 1, "better": "higher", "source": "s-t8"},
  {"id": "total", "label": "Pages in the sample", "note": "Cited search results vs all search-result URLs. The ratio is the citation rate.", "unit": "", "decimals": 0, "better": "higher", "source": "s-t8"}
 ],
 "values": values,
 "serp": serps,
 "sources": [
  src("s-t8", "arXiv 2609.19244, Table 8", "Retrieved and cited URLs."),
  src("s-t5", "arXiv 2609.19244, Tables 5, 14", "Queries and URLs per prompt."),
  src("s-t12", "arXiv 2609.19244, Tables 12, 13", "Cited-link validity."),
  src("s-t10", "arXiv 2609.19244, Tables 10, 11", "Claim factuality, 1–5.")
 ]
}

tpl = (STUDIO / "viz/kit/template.html").read_text()
blob = json.dumps(data, ensure_ascii=False, indent=1).replace("</", "<\\/")
html, n = re.subn(r'(<script type="application/json" id="viz-data">)(.*?)(</script>)',
                  lambda mm: mm.group(1) + "\n" + blob + "\n" + mm.group(3), tpl, count=1, flags=re.S)
assert n == 1
REPL = [
 (r"<title>.*?</title>", "<title>How often AI answers cite what they read — living infographic</title>"),
 (r'<meta name="description" content=".*?">', '<meta name="description" content="Retrieved vs cited pages for ChatGPT, Claude and Grok in real-user chats and API replays (arXiv 2609.19244). Every number sourced to its table.">'),
 (r'aria-label="Industry vertical"', 'aria-label="Platform"'),
 (r'aria-label="Search intent"', 'aria-label="Setting"'),
 (r"What the result surface looks like at this intent", "How this platform searched, cited and grounded claims"),
 (r"\$\{labelOf\('intent', state\.intent\)\} intent\. `", "${labelOf('intent', state.intent)}. `"),
 (r"in the answer versus \$\{fmt\(hero, a\)\}\$\{unitSuffix\(hero\)\} not in the answer",
  "cited versus ${fmt(hero, a)}${unitSuffix(hero)} retrieved"),
 # ratios within 10% of parity print two decimals (kit back-port candidate, from the 2026-09-16 fork)
 (r"const txt = x >= 1 \? `\$\{x\.toFixed\(x >= 10 \? 0 : 1\)\}×` : `\$\{\(1 / x\)\.toFixed\(1 / x >= 10 \? 0 : 1\)\}×",
  "const dp = v => (v >= 10 ? 0 : v < 1.1 ? 2 : 1);\n  const txt = x >= 1 ? `${x.toFixed(dp(x))}×${m.better === 'lower' && x > 1 ? ' higher' : ''}` : `${(1 / x).toFixed(dp(1 / x))}×"),
 # row-kind tags carry this artifact's own labels instead of search-page terms
 (r'<span class="sr-kind">\$\{esc\(r\.kind\)\}</span>', '<span class="sr-kind">${esc(r.label || r.kind)}</span>'),
 # the payoff badge takes the same good/bad colour as ledger rows
 (r'\.row-delta\[data-dir="bad"\]\{color:var\(--a3\)\}', '.row-delta[data-dir="bad"]{color:var(--a3)}\n.delta-x[data-dir="bad"]{color:var(--a3)}'),
 (r"const \{ txt \} = deltaOf\(hero, hc, ha\);\n    dx\.textContent = txt;",
  "const { txt, dir } = deltaOf(hero, hc, ha);\n    dx.textContent = txt; dx.dataset.dir = dir;"),
]
for pat, rep in REPL:
    html, k = re.subn(pat, lambda _m, r=rep: r, html, count=1, flags=re.S)
    assert k == 1, pat
(HERE / "index.html").write_text(html)
print("artifact written", len(html), "bytes")
