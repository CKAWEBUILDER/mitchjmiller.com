#!/usr/bin/env python3
"""Same-audit checker: 2015-era technical SEO checks + 2026 AI-bot policy.

One homepage fetch + robots.txt + a sitemap HEAD per domain. Stdlib only (py3.9).
Identifies itself honestly in the UA and rate-limits.
"""
import json, re, sys, subprocess
import subprocess
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser

UA = "mj2-audit/1.0 (+https://mj2.pro; technical SEO research; contact via site)"
TIMEOUT = 12
AI_BOTS = ["GPTBot", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended",
           "Applebot-Extended", "CCBot", "meta-externalagent", "Bytespider"]

CURL = ["curl", "-sSL", "--compressed", "--max-time", str(TIMEOUT),
        "--max-redirs", "5", "-A", UA, "-w", "\n__MJ2__%{http_code} %{url_effective}"]


def fetch(url, method="GET"):
    """Shell out to curl: macOS curl handles modern TLS/HTTP2 that urllib refuses,
    so fetch failures don't silently bias the sample toward easy hosts."""
    cmd = list(CURL)
    if method == "HEAD":
        cmd += ["-I", "-o", "/dev/null"]
    cmd.append(url)
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=TIMEOUT + 8)
    if r.returncode != 0:
        raise IOError(f"curl {r.returncode}: {r.stderr.strip()[:80]}")
    body, _, tail = r.stdout.rpartition("__MJ2__")
    code, _, final = tail.strip().partition(" ")
    return int(code or 0), (final or url), body[:3_000_000], {}


class Head(HTMLParser):
    """Pull the 2015 checklist out of the served HTML."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None; self._in_title = False
        self.meta_desc = None; self.canonical = None; self.viewport = False
        self.lang = None; self.h1 = 0; self._in_h1 = False; self.h1_text = []
        self.jsonld = []; self._in_ld = False; self._ld_buf = []
        self.microdata = False

    def handle_starttag(self, tag, attrs):
        a = dict((k.lower(), (v or "")) for k, v in attrs)
        if tag == "html" and "lang" in a:
            self.lang = a["lang"].strip() or None
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            n = a.get("name", "").lower()
            if n == "description" and a.get("content"):
                self.meta_desc = a["content"].strip()
            if n == "viewport":
                self.viewport = True
        elif tag == "link" and "canonical" in a.get("rel", "").lower():
            self.canonical = a.get("href")
        elif tag == "h1":
            self.h1 += 1; self._in_h1 = True
        elif tag == "script" and a.get("type", "").lower() == "application/ld+json":
            self._in_ld = True; self._ld_buf = []
        if "itemscope" in a or "itemtype" in a:
            self.microdata = True

    def handle_endtag(self, tag):
        if tag == "title": self._in_title = False
        elif tag == "h1": self._in_h1 = False
        elif tag == "script" and self._in_ld:
            self._in_ld = False
            self.jsonld.append("".join(self._ld_buf))

    def handle_data(self, d):
        if self._in_title:
            self.title = ((self.title or "") + d).strip()
        if self._in_h1:
            self.h1_text.append(d.strip())
        if self._in_ld:
            self._ld_buf.append(d)


def ld_types(blobs):
    out = set()
    for b in blobs:
        try:
            data = json.loads(b)
        except Exception:
            out.update(re.findall(r'"@type"\s*:\s*"([^"]+)"', b))
            continue
        stack = [data]
        while stack:
            n = stack.pop()
            if isinstance(n, dict):
                t = n.get("@type")
                if isinstance(t, str): out.add(t)
                elif isinstance(t, list): out.update(x for x in t if isinstance(x, str))
                stack.extend(n.values())
            elif isinstance(n, list):
                stack.extend(n)
    return sorted(out)


def parse_robots(txt):
    """Return {bot: 'allowed'|'blocked'} for AI bots, plus sitemap refs.

    A bot is 'blocked' when its own group, or a wildcard group, disallows /.
    """
    groups, cur, star_blocks_root = [], None, False
    sitemaps = []
    for line in txt.splitlines():
        line = line.split("#", 1)[0].strip()
        if not line or ":" not in line:
            continue
        k, v = line.split(":", 1)
        k = k.strip().lower(); v = v.strip()
        if k == "user-agent":
            if cur is None or cur["rules"]:
                cur = {"agents": [], "rules": []}; groups.append(cur)
            cur["agents"].append(v.lower())
        elif k in ("disallow", "allow") and cur is not None:
            cur["rules"].append((k, v))
        elif k == "sitemap":
            sitemaps.append(v)

    def blocks_root(g):
        for k, v in g["rules"]:
            if k == "disallow" and v in ("/", "/*"):
                return True
        return False

    for g in groups:
        if "*" in g["agents"] and blocks_root(g):
            star_blocks_root = True

    status = {}
    for bot in AI_BOTS:
        named = [g for g in groups if bot.lower() in g["agents"]]
        if named:
            status[bot] = "blocked" if any(blocks_root(g) for g in named) else "allowed"
        else:
            status[bot] = "blocked-by-wildcard" if star_blocks_root else "allowed"
    named_any = any(b.lower() in g["agents"] for g in groups for b in AI_BOTS)
    return status, sitemaps, named_any


def audit(domain):
    rec = {"domain": domain, "ok": False, "error": None, "crawler_refused": False}
    base = domain if domain.startswith("http") else "https://" + domain
    try:
        st, final, html, hdrs = fetch(base)
        rec["status"] = st
        if st in (401, 403, 429) or st == 0:
            # Refusing an identified research crawler is a finding, not a fetch error:
            # keep the row so the sample isn't biased toward permissive hosts.
            rec["error"] = f"HTTP {st}"
            rec["crawler_refused"] = True
            try:
                _, _, rtxt, _ = fetch(base.rstrip("/") + "/robots.txt")
                if "<html" not in rtxt[:400].lower():
                    bots, sm, named = parse_robots(rtxt)
                    rec["robots_txt"] = True
                    rec["ai_bots"] = bots
                    rec["ai_bots_named"] = named
                    rec["sitemap_in_robots"] = bool(sm)
            except Exception:
                rec["robots_txt"] = False
            return rec
        if st >= 400:
            rec["error"] = f"HTTP {st}"
            return rec
        rec["final_url"] = final
        rec["https"] = final.startswith("https://")
    except Exception as e:
        rec["error"] = f"{type(e).__name__}: {e}"
        return rec

    p = Head()
    try:
        p.feed(html)
    except Exception:
        pass

    types = ld_types(p.jsonld)
    rec.update({
        "ok": True,
        "html_bytes": len(html),
        # --- the 2015 checklist ---
        "title": bool(p.title), "title_len": len(p.title or ""),
        "meta_description": bool(p.meta_desc), "meta_desc_len": len(p.meta_desc or ""),
        "h1_count": p.h1,
        "canonical": bool(p.canonical),
        "lang_attr": bool(p.lang),
        "viewport": p.viewport,
        "schema_jsonld": bool(types), "schema_types": types,
        "schema_microdata": p.microdata,
    })

    # robots.txt + AI bot policy (the 2026 addition)
    try:
        _, _, rtxt, _ = fetch(base.rstrip("/") + "/robots.txt")
        if "<html" in rtxt[:400].lower():
            raise ValueError("robots.txt served HTML")
        rec["robots_txt"] = True
        bots, sitemaps, named_any = parse_robots(rtxt)
        rec["ai_bots"] = bots
        rec["ai_bots_named"] = named_any
        rec["sitemap_in_robots"] = bool(sitemaps)
        rec["robots_bytes"] = len(rtxt)
    except Exception as e:
        rec["robots_txt"] = False
        rec["ai_bots"] = {b: "no-robots-txt" for b in AI_BOTS}
        rec["ai_bots_named"] = False
        rec["sitemap_in_robots"] = False
        rec["robots_error"] = f"{type(e).__name__}"

    try:
        st2, _, _, _ = fetch(base.rstrip("/") + "/sitemap.xml", method="HEAD")
        rec["sitemap_xml"] = st2 == 200
    except Exception:
        rec["sitemap_xml"] = False
    return rec


def main():
    domains = [l.strip() for l in open(sys.argv[1]) if l.strip() and not l.startswith("#")]
    out = sys.argv[2]
    results = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        for i, r in enumerate(ex.map(audit, domains), 1):
            results.append(r)
            print(f"[{i}/{len(domains)}] {r['domain']:38} "
                  f"{'ok' if r['ok'] else 'ERR ' + str(r['error'])[:40]}", flush=True)
    with open(out, "w") as f:
        json.dump(results, f, indent=2)
    ok = [r for r in results if r["ok"]]
    refused = [r for r in results if r.get("crawler_refused")]
    dead = [r for r in results if not r["ok"] and not r.get("crawler_refused")]
    print(f"\nfetched {len(ok)}/{len(results)} | refused crawler {len(refused)} | unreachable {len(dead)}")


if __name__ == "__main__":
    main()
