#!/usr/bin/env python3
"""Build the ledger (research/2026-09-16/geo-defenses/data.json) and the artifact
(index.html, from ../kit/template.html) from ONE table of figures, so the two can't drift.

Every number below was read from arXiv 2609.02316v1 (HTML), retrieved 2026-09-16T10:16Z.
Run: python3 build.py
"""
import json, re, os, pathlib

HERE = pathlib.Path(__file__).resolve().parent
STUDIO = HERE.parent.parent
PAPER = "https://arxiv.org/abs/2609.02316"
HTML = "https://arxiv.org/html/2609.02316v1"
PUB = "2026-09-02"
RETRIEVED = "2026-09-16T10:16Z"

MODELS = [("llama4", "Llama-4-Scout"), ("gemma", "Gemma-4-31B"), ("qwen", "Qwen-3.5-35B")]
DEFENSES = [("granite", "Granite Guardian"), ("llamaguard", "Llama Guard 3"),
            ("nemo", "NeMo Self-Check"), ("cgeo", "C-GEO Guard")]

# Table 3 — attack success rate (%), ID condition, N=247
ASR = {"none": {"gemma": 56.5, "qwen": 55.9, "llama4": 54.7},
       "granite": {"gemma": 51.4, "qwen": 53.8, "llama4": 56.9},
       "llamaguard": {"gemma": 51.8, "qwen": 51.4, "llama4": 54.3},
       "nemo": {"gemma": 50.2, "qwen": 52.0, "llama4": 0.4},
       "cgeo": {"gemma": 30.6, "qwen": 29.4, "llama4": 27.5}}
# Tables 16–18 — outcome counts (Full, Partial, None) of 247
OUT = {"gemma": {"none": (70, 139, 38), "granite": (56, 142, 49), "llamaguard": (60, 136, 51),
                 "nemo": (59, 130, 58), "cgeo": (33, 85, 129)},
       "qwen": {"none": (80, 116, 51), "granite": (81, 104, 62), "llamaguard": (71, 112, 64),
                "nemo": (79, 99, 69), "cgeo": (38, 69, 140)},
       "llama4": {"none": (89, 92, 66), "granite": (120, 41, 86), "llamaguard": (85, 98, 64),
                  "nemo": (1, 0, 246), "cgeo": (40, 56, 151)}}
# Table 5 — answer accuracy (%) on the clean condition
ACC = {"none": {"gemma": 86.6, "qwen": 88.9, "llama4": 82.4},
       "granite": {"gemma": 87.2, "qwen": 89.3, "llama4": 80.6},
       "llamaguard": {"gemma": 84.0, "qwen": 87.2, "llama4": 85.6},
       "nemo": {"gemma": 82.0, "qwen": 85.6, "llama4": 1.8},
       "cgeo": {"gemma": 84.8, "qwen": 89.7, "llama4": 84.0}}
# Table 22 — composite answer quality (1–5), clean condition
QUAL = {"none": {"gemma": 4.81, "qwen": 4.75, "llama4": 4.52},
        "granite": {"gemma": 4.69, "qwen": 4.76, "llama4": 4.52},
        "llamaguard": {"gemma": 4.74, "qwen": 4.71, "llama4": 4.50},
        "nemo": {"gemma": 4.48, "qwen": 4.62, "llama4": 1.20},
        "cgeo": {"gemma": 4.72, "qwen": 4.75, "llama4": 4.55}}
# Table 4 — chunk-level block rates (%): clean, IP, ID
CHUNK = {"granite": (0.43, 0.29, 0.61), "llamaguard": (0.65, 0.47, 0.83), "cgeo": (2.30, 2.16, 10.27)}
# Table 20 — NeMo query-level block rates (%): clean, IP, ID
NEMO_Q = {"gemma": (6.4, 6.4, 6.8), "qwen": (4.9, 3.6, 3.2), "llama4": (98.4, 98.4, 98.8)}
# Table 2 — params / stage
STAGE = {"granite": ("8B", "Chunk filter"), "llamaguard": ("8B", "Chunk filter"),
         "nemo": ("uses the victim model", "Output rail"), "cgeo": ("0.18B", "Chunk filter")}

# ---- self-check: outcome counts reproduce Table 3 ASR = (full + 0.5·partial)/247
for m, _ in MODELS:
    for d in ["none"] + [k for k, _ in DEFENSES]:
        f, p, n = OUT[m][d]
        assert f + p + n == 247, (m, d)
        assert abs(round((f + 0.5 * p) / 247 * 100, 1) - ASR[d][m]) <= 0.1, (m, d)

# ---------------------------------------------------------------- ledger
rows = []
def add(table, metric, defense, model, value, unit, note=""):
    rows.append({"metric": metric, "defense": defense, "victim_model": model, "value": value,
                 "unit": unit, "source": f"Counter-GEO-Bench, {table}", "publisher": "arXiv (Zheng, Zhao, Yang; Tsinghua SIGS / HKU), accepted EMNLP 2026 Main",
                 "date": PUB, "url": HTML, "retrieved": RETRIEVED, "confidence": "verified-on-page", "note": note})
dl = dict(DEFENSES); dl["none"] = "Undefended"; ml = dict(MODELS)
for d in ASR:
    for m in ASR[d]:
        add("Table 3", "attack success rate, ID condition", dl[d], ml[m], ASR[d][m], "%",
            "NeMo on Llama-4 is a refusal artifact (98.4% clean block rate), excluded from the paper's average" if (d, m) == ("nemo", "llama4") else "")
        add("Table 5", "answer accuracy, clean condition", dl[d], ml[m], ACC[d][m], "%")
        add("Table 22", "answer quality (1-5), clean condition", dl[d], ml[m], QUAL[d][m], "score")
        f, p, n = OUT[m][d]
        t = {"gemma": "Table 16", "qwen": "Table 17", "llama4": "Table 18"}[m]
        add(t, "full-success attacks of 247", dl[d], ml[m], f, "count")
        add(t, "partial-success attacks of 247", dl[d], ml[m], p, "count")
        add(t, "failed attacks of 247", dl[d], ml[m], n, "count")
for d, (c, i, x) in CHUNK.items():
    for lab, v in (("clean", c), ("IP", i), ("ID", x)):
        add("Table 4", f"chunk-level block rate, {lab} chunks", dl[d], "all", v, "%")
for m, (c, i, x) in NEMO_Q.items():
    for lab, v in (("clean", c), ("IP", i), ("ID", x)):
        add("Table 20", f"NeMo query-level block rate, {lab}", "NeMo Self-Check", ml[m], v, "%")

SCALARS = [
  ("3-model average ASR, undefended", 55.7, "%", "Table 3", "95% CI [53.1, 58.2] (Table 14)"),
  ("3-model average ASR, Granite Guardian", 54.0, "%", "Table 3", "not significant, p=.096 (Table 15)"),
  ("3-model average ASR, Llama Guard 3", 52.5, "%", "Table 3", ""),
  ("2-model average ASR, NeMo Self-Check (Gemma+Qwen)", 51.1, "%", "Table 3", "Llama-4 excluded"),
  ("3-model average ASR, C-GEO Guard", 29.2, "%", "Table 3", "95% CI [26.5, 31.8] (Table 14)"),
  ("C-GEO Guard relative ASR reduction", 47.6, "%", "Table 3 / abstract", "26.5 pp absolute, 95% CI [23.8, 29.3] (Table 15)"),
  ("max relative ASR reduction by an off-the-shelf defense", 5.7, "%", "abstract", "Llama Guard 3"),
  ("max absolute ASR reduction by an off-the-shelf guardrail", 3.2, "pp", "Section 8 conclusion / Table 15", "Llama Guard 3, p<.001; text calls it 'operationally negligible'"),
  ("Granite Guardian average ASR reduction", 1.7, "pp", "Section 5.2 text", "Table 15 paired bootstrap shows +1.6 pp; rounding difference in the paper itself"),
  ("attacks causing at least partial belief shift, undefended (pooled 741)", 79.1, "%", "Table 19", ""),
  ("attacks causing at least partial belief shift, C-GEO Guard (pooled 741)", 43.3, "%", "Table 19", ""),
  ("full-success attacks pooled, undefended -> C-GEO Guard", "239 -> 111", "count", "Table 19 / Appendix I", "text: 54% reduction"),
  ("Granite Guardian on Llama-4: queries worsened vs improved", "74 vs 57", "count", "Section 6.2", "29 safe->partial/full, 45 partial->full"),
  ("queries with full-success attacks across all three victims", 17.2, "%", "Section 6.2", ""),
  ("queries where victim models disagree", 55.2, "%", "Section 6.2", ""),
  ("C-GEO Guard parameters", "184M (2.3% of 8B)", "params", "Section 5.2 / Table 12", ""),
  ("construction set", 1000, "queries", "Table 1", "GEO-Bench test split"),
  ("joint quality-gate pass", "25.0% (250)", "%", "Table 1", "247 after human verification"),
  ("attack classes", 8, "count", "Appendix A.2 / Table 21", "Stealth Injection, Temporal Poison, Fake Authority, Fake Citation, Structured Hijack, Review Flood, Multi-Hop GEO, Negative GEO"),
  ("highest undefended ASR by attack class: Review Flood", 62.8, "%", "Table 21", "N=13, small"),
  ("C-GEO Guard ASR on Structured Hijack", 41.2, "%", "Table 21", "smallest relative reduction (-22%)"),
  ("cross-rewriter (GPT 5.5) C-GEO Guard ASR, Qwen victim", 22.1, "%", "Table 6", "from 55.7%, -60.4% relative"),
  ("Medicine/Health share of queries", 15.0, "%", "Table 9", "37 of 247"),
  ("benchmark rewriter / judge", "Claude Sonnet 4.6 / Claude Opus 4.6", "model", "Sections 3.2, 5.1", "Anthropic models used in the method: disclosure line required"),
]
for metric, v, u, table, note in SCALARS:
    rows.append({"metric": metric, "defense": "", "victim_model": "", "value": v, "unit": u,
                 "source": f"Counter-GEO-Bench, {table}", "publisher": "arXiv 2609.02316v1", "date": PUB,
                 "url": HTML, "retrieved": RETRIEVED, "confidence": "verified-on-page", "note": note})
CONTEXT = [
  {"metric": "GEO can boost visibility in generative engine responses by up to", "value": 40, "unit": "%",
   "source": "GEO: Generative Engine Optimization (Aggarwal et al.), KDD 2024", "publisher": "arXiv 2311.09735",
   "date": "2024-06-28", "url": "https://arxiv.org/abs/2311.09735", "retrieved": "2026-09-16T10:20Z", "confidence": "verified-on-page",
   "note": "abstract; v3. The benchmark Counter-GEO-Bench is built on (GEO-Bench test split)."},
  {"metric": "GEO Defender: attack success reduced from -> to", "value": "50.32% -> 6.20%", "unit": "%",
   "source": "When Optimization Becomes Manipulation (Li et al.)", "publisher": "arXiv 2609.02964",
   "date": "2026-09-02", "url": "https://arxiv.org/abs/2609.02964", "retrieved": "2026-09-16T10:21Z", "confidence": "verified-on-page",
   "note": "abstract only; different harness and attack definition — never plot on the same axis as Counter-GEO-Bench."},
  {"metric": "Counter-GEO-Bench dataset release", "value": "247 queries; 247 IP + 237 ID rewrites (10 withheld); gated; CC BY-NC 4.0", "unit": "",
   "source": "Hugging Face dataset card", "publisher": "huggingface.co/datasets/counter-geo/counter-geo-bench",
   "date": "", "url": "https://huggingface.co/datasets/counter-geo/counter-geo-bench", "retrieved": "2026-09-16T10:21Z", "confidence": "verified-on-page", "note": "fetched via summarizer; gated access"},
  {"metric": "OECD AI Incident Monitor logs GEO manipulation of AI recommendations in China", "value": "incident 2026-03-14-e431", "unit": "",
   "source": "OECD.AI incident page", "publisher": "OECD.AI (aggregating Chinese and international press)", "date": "2026-03-14",
   "url": "https://oecd.ai/en/incidents/2026-03-14-e431", "retrieved": "2026-09-16T10:22Z", "confidence": "secondary-corroborated",
   "note": "Existence of the log entry only. Its pricing/market-size figures (39.9 yuan, 2.9B yuan) are press-aggregated: needs-verification, NOT used."},
]
rows.extend(CONTEXT)
ledger = {"assignment": "Counter-GEO-Bench — do AI guardrails stop GEO-planted misinformation? (blog-research run 2026-09-16)",
          "researcher_note": "Every per-cell figure copied from the arXiv HTML tables (parsed locally from the fetched page, not a summary). build.py asserts outcome counts reproduce Table 3 ASR.",
          "stats": rows}
out = STUDIO / "research/2026-09-16/geo-defenses/data.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(ledger, indent=2, ensure_ascii=False))
print("ledger rows:", len(rows))

# ---------------------------------------------------------------- artifact data
def serp(d, m):
    f0, p0, n0 = OUT[m]["none"]; f, p, n = OUT[m][d]
    params, stage = STAGE[d]
    if d == "nemo":
        c, i, x = NEMO_Q[m]
        block = [{"kind": "organic", "label": "Caught", "text": f"Refused <em>{x}%</em> of attacked answers"},
                 {"kind": "pack", "label": "False alarms", "text": f"Refused <em>{c}%</em> of clean answers"}]
    else:
        c, i, x = CHUNK[d]
        block = [{"kind": "organic", "label": "Caught", "text": f"Blocked <em>{x}%</em> of distorting chunks"},
                 {"kind": "pack", "label": "False alarms", "text": f"Blocked <em>{c}%</em> of clean chunks"}]
    notes = {
      ("granite", "llama4"): "Worse than no filter here: it worsened 74 queries and improved 57. The authors' reading: it removed clean chunks that contradicted the lie.",
      ("nemo", "llama4"): "The 0.4% is not protection. It refused 98.4% of clean questions too, so the paper drops this cell from its average.",
      ("cgeo", "llama4"): "The largest cut in the study: attack success roughly halved, with clean accuracy up 1.6 points.",
      ("nemo", "qwen"): "Blocking here is unrelated to attacks: 12 clean queries blocked against 8 attacked ones.",
      ("llamaguard", "qwen"): "A safety-taxonomy filter. The planted pages read as ordinary, fluent information, so almost none trip it.",
    }
    generic = {
      "granite": "A safety-taxonomy filter. It blocks under 1% of chunks either way; the planted pages are topically legitimate.",
      "llamaguard": "Statistically significant across models, but a 3.2-point average cut, which the authors call operationally negligible.",
      "nemo": "An output rail that checks the answer against its retrieved context. The paper finds same-context checks insufficient for this attack.",
      "cgeo": "Trained on paired honest and distorting rewrites: 184M parameters, 2.3% the size of the 8B filters.",
    }
    return {"query": f"{dict(DEFENSES)[d]} · {stage} · {params}",
            "note": notes.get((d, m), generic[d]),
            "rows": [{"kind": "answer", "label": "Defended", "text": f"Planted-claim outcomes: <em>{f} full · {p} partial · {n} failed</em>"},
                     {"kind": "citation", "label": "Undefended", "text": f"Same attacks, no defense: {f0} full · {p0} partial · {n0} failed"}] + block}

values, serps = {}, {}
for d, _ in DEFENSES:
    values[d], serps[d] = {}, {}
    for m, _ in MODELS:
        values[d][m] = {"asr": [ASR[d][m], ASR["none"][m]],
                        "full": [OUT[m][d][0], OUT[m]["none"][0]],
                        "failed": [OUT[m][d][2], OUT[m]["none"][2]],
                        "acc": [ACC[d][m], ACC["none"][m]],
                        "qual": [QUAL[d][m], QUAL["none"][m]]}
        serps[d][m] = serp(d, m)

src = lambda i, label, detail, short: {"id": i, "label": label, "detail": detail, "asOf": PUB, "url": HTML, "short": short}
data = {
 "meta": {
  "sample": False, "seed": 20260916, "palette": "ember",
  "eyebrow": "Living infographic · AI search security",
  "title": "Three off-the-shelf AI guardrails leave GEO misinformation attacks {lit}above 50% success{/lit}",
  "deck": "Researchers rewrote one of five retrieved web pages to push a false claim, using ordinary GEO tactics: fake authority, fake citations, fresh-looking dates. Then they put four defenses in front of three open-weight models. Pick a defense and a model and watch what changes.",
  "askPrefix": "What does", "askMiddle": "do to a planted lie when the answer comes from", "askSuffix": "?",
  "columns": {"cited": {"name": "With this defense", "sub": "Same 247 attacks, filter on"},
              "absent": {"name": "No defense", "sub": "Undefended pipeline"}},
  "hero": "asr",
  "byline": "Mitchell Miller · mitchjmiller.com",
  "liveUrl": "mitchjmiller.com/viz/ai-search-poisoning-guardrails/",
  "gifNote": "Rudimentary GIF of a living artifact.",
  "gifNoteSub": "All four defenses, all three models and every source are in the interactive version."
 },
 "dimensions": {
  "vertical": {"label": "defense", "options": [{"id": k, "label": v} for k, v in DEFENSES]},
  "intent": {"label": "victim model", "options": [{"id": k, "label": v} for k, v in MODELS]}
 },
 "prompts": [
  {"label": "Where did a guardrail make it worse?", "set": {"vertical": "granite", "intent": "llama4"}},
  {"label": "Which 0.4% was really a refusal?", "set": {"vertical": "nemo", "intent": "llama4"}},
  {"label": "What does the purpose-built detector change?", "set": {"vertical": "cgeo", "intent": "llama4"}},
  {"label": "How much does Llama Guard 3 help on Qwen?", "set": {"vertical": "llamaguard", "intent": "qwen"}}
 ],
 "metrics": [
  {"id": "asr", "label": "Attack success rate", "note": "Judge score per answer: 1 = asserts the false claim, 0.5 = hedged, 0 = correct. N=247.", "unit": "%", "decimals": 1, "better": "lower", "source": "s-asr"},
  {"id": "full", "label": "Answers that fully repeat the lie", "note": "Of 247 attacked questions.", "unit": "", "decimals": 0, "better": "lower", "source": "s-outcomes"},
  {"id": "failed", "label": "Attacks that fail outright", "note": "Of 247 attacked questions.", "unit": "", "decimals": 0, "better": "higher", "source": "s-outcomes"},
  {"id": "acc", "label": "Accuracy on clean questions", "note": "No attack present. Correct + half credit for partial.", "unit": "%", "decimals": 1, "better": "higher", "source": "s-accuracy"},
  {"id": "qual", "label": "Answer quality, clean questions (1–5)", "note": "Mean of relevance, completeness, clarity.", "unit": "", "decimals": 2, "better": "higher", "source": "s-quality"}
 ],
 "values": values,
 "serp": serps,
 "sources": [
  src("s-asr", "Counter-GEO-Bench, Table 3 (arXiv 2609.02316)", "ASR by defense and model. EMNLP 2026.", "arXiv 2609.02316 T3"),
  src("s-outcomes", "Counter-GEO-Bench, Tables 16–18", "Full / partial / failed counts per model.", "arXiv 2609.02316 T16–18"),
  src("s-accuracy", "Counter-GEO-Bench, Table 5", "Clean-condition answer accuracy.", "arXiv 2609.02316 T5"),
  src("s-quality", "Counter-GEO-Bench, Table 22", "Clean-condition answer quality.", "arXiv 2609.02316 T22"),
  src("s-blocks", "Counter-GEO-Bench, Tables 2, 4, 20", "Stage, size, chunk and refusal block rates.", "arXiv 2609.02316 T4/T20")
 ]
}

tpl = (STUDIO / "viz/kit/template.html").read_text()
blob = json.dumps(data, ensure_ascii=False, indent=1).replace("</", "<\\/")
html, n = re.subn(r'(<script type="application/json" id="viz-data">)(.*?)(</script>)',
                  lambda mm: mm.group(1) + "\n" + blob + "\n" + mm.group(3), tpl, count=1, flags=re.S)
assert n == 1
REPL = [
 (r"<title>.*?</title>", "<title>Do AI guardrails stop GEO-planted misinformation? — living infographic</title>"),
 (r'<meta name="description" content=".*?">', '<meta name="description" content="Counter-GEO-Bench (arXiv 2609.02316): attack success, accuracy and answer quality for four defenses across three open-weight models. Every number sourced.">'),
 (r'aria-label="Industry vertical"', 'aria-label="Defense"'),
 (r'aria-label="Search intent"', 'aria-label="Victim model"'),
 (r"What the result surface looks like at this intent", "How this defense works, and what it caught"),
 (r"\$\{labelOf\('intent', state\.intent\)\} intent\. `", "${labelOf('intent', state.intent)}. `"),
 (r"in the answer versus \$\{fmt\(hero, a\)\}\$\{unitSuffix\(hero\)\} not in the answer",
  "with this defense versus ${fmt(hero, a)}${unitSuffix(hero)} with no defense"),
 # ratios within 10% of parity print two decimals, so a 4% change is not flattened to "1.0×"
 (r"const txt = x >= 1 \? `\$\{x\.toFixed\(x >= 10 \? 0 : 1\)\}×` : `\$\{\(1 / x\)\.toFixed\(1 / x >= 10 \? 0 : 1\)\}×",
  "const dp = v => (v >= 10 ? 0 : v < 1.1 ? 2 : 1);\n  const txt = x >= 1 ? `${x.toFixed(dp(x))}×${m.better === 'lower' && x > 1 ? ' higher' : ''}` : `${(1 / x).toFixed(dp(1 / x))}×"),
 # row-kind tags carry this artifact's own labels instead of search-page terms
 (r'<span class="sr-kind">\$\{esc\(r\.kind\)\}</span>', '<span class="sr-kind">${esc(r.label || r.kind)}</span>'),
 # the payoff badge takes the same good/bad colour as ledger rows, so a worse result never reads green
 (r'\.row-delta\[data-dir="bad"\]\{color:var\(--a3\)\}', '.row-delta[data-dir="bad"]{color:var(--a3)}\n.delta-x[data-dir="bad"]{color:var(--a3)}'),
 (r"const \{ txt \} = deltaOf\(hero, hc, ha\);\n    dx\.textContent = txt;",
  "const { txt, dir } = deltaOf(hero, hc, ha);\n    dx.textContent = txt; dx.dataset.dir = dir;"),
]
for pat, rep in REPL:
    html, k = re.subn(pat, lambda _m, r=rep: r, html, count=1, flags=re.S)
    assert k == 1, pat
(HERE / "index.html").write_text(html)
print("artifact written", len(html), "bytes")
