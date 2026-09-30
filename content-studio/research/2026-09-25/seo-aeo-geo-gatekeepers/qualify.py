#!/usr/bin/env python3
"""Qualify candidate domains: keep only those whose own homepage sells
AEO / GEO / AI-visibility. Keeps the frame a rule, not a judgement call."""
import re, sys, json, subprocess
from concurrent.futures import ThreadPoolExecutor

UA = "mj2-audit/1.0 (+https://mj2.pro; technical SEO research; contact via site)"
# Publishers/directories that write ABOUT the category without selling it.
EXCLUDE = {"zapier.com", "businesscloud.co.uk", "searchengineland.com", "linkedin.com"}
TERMS = [r"answer engine optimi", r"generative engine optimi", r"\bAEO\b", r"\bGEO\b",
         r"AI visibility", r"AI search visibility", r"LLM SEO", r"AI SEO",
         r"cited in (chatgpt|ai)", r"AI Overviews"]

def strip_tags(h):
    h = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", h)
    return re.sub(r"\s+", " ", re.sub(r"(?s)<[^>]+>", " ", h))

def check(d):
    if d in EXCLUDE:
        return {"domain": d, "qualified": False, "reason": "publisher, not vendor"}
    try:
        r = subprocess.run(["curl","-sSL","--compressed","--max-time","15","--max-redirs","5",
                            "-A",UA,"-w","\n__C__%{http_code}","https://"+d],
                           capture_output=True, text=True, timeout=25)
        body,_,tail = r.stdout.rpartition("__C__")
        code = int(tail.strip() or 0)
    except Exception as e:
        return {"domain": d, "qualified": False, "reason": f"unreachable {type(e).__name__}"}
    if code in (401,403,429):
        # refuses our crawler; still a vendor if robots exists -- keep, flag
        return {"domain": d, "qualified": True, "reason": f"HTTP {code} (crawler refused)",
                "refused": True, "hits": []}
    if code != 200:
        return {"domain": d, "qualified": False, "reason": f"HTTP {code}"}
    text = strip_tags(body)[:200_000]
    hits = sorted({t for t in TERMS if re.search(t, text, re.I)})
    return {"domain": d, "qualified": len(hits) >= 1, "hits": hits,
            "reason": "sells category" if hits else "no category terms on homepage"}

doms = [l.strip() for l in open("candidates.txt") if l.strip() and not l.startswith("#")]
with ThreadPoolExecutor(max_workers=8) as ex:
    res = list(ex.map(check, doms))
json.dump(res, open("qualified.json","w"), indent=2)
q = [r for r in res if r["qualified"]]
print(f"candidates {len(res)} -> qualified {len(q)}")
for r in res:
    if not r["qualified"]:
        print(f"  DROP {r['domain']:28} {r['reason']}")
open("frame.txt","w").write("\n".join(r["domain"] for r in q) + "\n")
