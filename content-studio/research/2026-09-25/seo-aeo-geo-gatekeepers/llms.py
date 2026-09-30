import subprocess, json
from concurrent.futures import ThreadPoolExecutor
UA="mj2-audit/1.0 (+https://mj2.pro; technical SEO research; contact via site)"
def chk(d):
    out={"domain":d}
    for path in ("/llms.txt","/llms-full.txt"):
        try:
            r=subprocess.run(["curl","-sSL","--compressed","--max-time","12","--max-redirs","4",
                              "-A",UA,"-w","\n__C__%{http_code}","https://"+d+path],
                             capture_output=True,text=True,timeout=20)
            body,_,tail=r.stdout.rpartition("__C__"); code=int(tail.strip() or 0)
            # a 200 that is actually an HTML soft-404 doesn't count
            ok = code==200 and "<html" not in body[:300].lower() and len(body.strip())>20
            out[path]=ok
        except Exception:
            out[path]=False
    return out
doms=[l.strip() for l in open("frame.txt") if l.strip()]
with ThreadPoolExecutor(max_workers=8) as ex: res=list(ex.map(chk,doms))
json.dump(res,open("llms-txt.json","w"),indent=2)
has=[r for r in res if r["/llms.txt"] or r["/llms-full.txt"]]
print(f"llms.txt present: {len(has)}/{len(res)}  ({len(has)/len(res):.0%})")
for r in has: print("   ",r["domain"])
