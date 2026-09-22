# Span-aware arXiv (LaTeXML) table parser. Usage: curl -sL https://arxiv.org/html/<id> -o p.html; python3 parse_arxiv_tables.py  (reads p.html, writes tables.json)
import re,html,json
from html.parser import HTMLParser
s=open('p.html').read()
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.stack=[]; s.tabdepth=0; s.rows=[]; s.row=None; s.cell=None; s.skip=0
    def handle_starttag(s,t,a):
        c=dict(a).get('class','') or ''
        kind=None
        if t in('annotation','annotation-xml'): s.skip+=1; kind='skip'
        elif 'ltx_tabular' in c.split() or t=='table':
            s.tabdepth+=1; kind='tab'
        elif ('ltx_tr' in c.split() or t=='tr') and s.tabdepth==1:
            s.row=[]; kind='tr'
        elif ('ltx_td' in c.split() or t in('td','th')) and s.tabdepth==1 and s.row is not None:
            s.cell=''; kind='td'
        if t in ('br','img','input','meta','hr'): return
        s.stack.append(kind)
    def handle_endtag(s,t):
        if not s.stack: return
        k=s.stack.pop()
        if k=='skip': s.skip-=1
        elif k=='tab': s.tabdepth-=1
        elif k=='tr':
            s.rows.append(s.row); s.row=None
        elif k=='td':
            s.row.append(re.sub(r'\s+',' ',s.cell).strip()); s.cell=None
    def handle_data(s,d):
        if s.skip: return
        if s.cell is not None: s.cell+=' '+d
    def handle_startendtag(s,t,a): pass
out={}
for f in re.findall(r'(<figure[^>]*class="ltx_table"[^>]*>.*?</figure>)',s,re.S):
    cap=re.sub(r'\s+',' ',html.unescape(re.sub('<[^>]+>',' ',re.search(r'<figcaption.*?</figcaption>',f,re.S).group(0)))).strip()
    body=re.sub(r'<figcaption.*?</figcaption>','',f,flags=re.S)
    p=P(); p.feed(body)
    out[cap[:9]]={'caption':cap,'rows':p.rows}
    if cap.split(':')[0] in ('Table 3','Table 4','Table 5','Table 6','Table 7','Table 8','Table 9','Table 14'):
        print('===',cap)
        for r in p.rows: print(' | '.join(r))
json.dump(out,open('tables.json','w'),indent=1)
