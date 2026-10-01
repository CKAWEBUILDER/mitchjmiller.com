#!/usr/bin/env python3
"""Issues summary (Screaming Frog 'Issues' tab equivalent) from sf_crawl.py exports. usage: sf_issues.py <out_dir> [label]"""
import csv, collections, sys
OUT = sys.argv[1]
rows = list(csv.DictReader(open(f'{OUT}/internal_all.csv', encoding='utf-8')))
edges = list(csv.DictReader(open(f'{OUT}/all_inlinks.csv', encoding='utf-8')))
html = [r for r in rows if r['Content Type'].startswith('text/html') and r['Status Code'] == '200']
idx = [r for r in html if r['Indexability'] == 'Indexable']
P = lambda u: u.replace('https://mj2.pro', '') or '/'
lines, counts = [], []


def issue(name, items, fmt=lambda r: P(r['Address']), limit=12, note=''):
    counts.append((name, len(items)))
    if not items:
        return
    lines.append(f'### {name} ({len(items)})')
    if note:
        lines.append(note)
    lines.extend(f'- {fmt(x)}' for x in items[:limit])
    if len(items) > limit:
        lines.append(f'- … {len(items) - limit} more in `internal_all.csv`')
    lines.append('')


redir = [e for e in edges if e['Status Code'] == '301' and e['Type'] == 'Hyperlink']
by_dest = collections.Counter(e['Destination'] for e in redir)
by_src = collections.Counter(e['Source'] for e in redir)
issue('Internal links to redirects (3xx)', by_dest.most_common(), lambda kv: f'{P(kv[0])} → {P(kv[0])}/ · linked {kv[1]}×',
      note=f'Links without the trailing slash; GitHub Pages answers each with a 301. {len(redir)} links on {len(by_src)} pages. Pages linking most: '
           + ', '.join(f'{P(u)} ({n})' for u, n in by_src.most_common(5)) + '.')
issue('Internal links to 4xx', [e for e in edges if e['Status Code'] == '404'], lambda e: f'{P(e["Source"])} → {P(e["Destination"])}')
titles = collections.defaultdict(list)
for r in idx:
    titles[r['Title 1']].append(r)
issue('Titles: missing', [r for r in idx if not r['Title 1']])
issue('Titles: outside <head>', [r for r in idx if r.get('Title Outside Head') == 'Yes'], lambda r: f'{P(r["Address"])}: "{r["Title 1"]}" sits in <body>')
issue('Titles: duplicate', [g for t, g in titles.items() if t and len(g) > 1], lambda g: f'"{g[0]["Title 1"]}" on ' + ', '.join(P(x['Address']) for x in g))
issue('Titles: over 60 characters', sorted((r for r in idx if int(r['Title 1 Length']) > 60), key=lambda r: -int(r['Title 1 Length'])),
      lambda r: f'{P(r["Address"])} ({r["Title 1 Length"]}): {r["Title 1"]}')
issue('Titles: under 30 characters', [r for r in idx if 0 < int(r['Title 1 Length']) < 30], lambda r: f'{P(r["Address"])} ({r["Title 1 Length"]}): {r["Title 1"]}')
descs = collections.defaultdict(list)
for r in idx:
    descs[r['Meta Description 1']].append(r)
issue('Meta descriptions: missing', [r for r in idx if not r['Meta Description 1']])
issue('Meta descriptions: duplicate', [g for d, g in descs.items() if d and len(g) > 1], lambda g: f'{len(g)} pages: ' + ', '.join(P(x['Address']) for x in g))
issue('Meta descriptions: over 155 characters', sorted((r for r in idx if int(r['Meta Description 1 Length']) > 155), key=lambda r: -int(r['Meta Description 1 Length'])),
      lambda r: f'{P(r["Address"])} ({r["Meta Description 1 Length"]})')
issue('Meta descriptions: under 70 characters', [r for r in idx if 0 < int(r['Meta Description 1 Length']) < 70], lambda r: f'{P(r["Address"])} ({r["Meta Description 1 Length"]}): {r["Meta Description 1"]}')
issue('H1: missing', [r for r in idx if r['H1 Count'] == '0'])
issue('H1: multiple', [r for r in idx if int(r['H1 Count'] or 0) > 1], lambda r: f'{P(r["Address"])}: "{r["H1-1"]}" + "{r["H1-2"]}"')
h1s = collections.defaultdict(list)
for r in idx:
    h1s[r['H1-1']].append(r)
issue('H1: duplicate', [g for h, g in h1s.items() if h and len(g) > 1], lambda g: f'"{g[0]["H1-1"]}" on ' + ', '.join(P(x['Address']) for x in g))
issue('Canonical: missing (indexable)', [r for r in idx if not r['Canonical Link Element 1']])
issue('Non-indexable pages', [r for r in html if r['Indexability'] != 'Indexable'], lambda r: f'{P(r["Address"])}: {r["Indexability Status"]}')
issue('Indexable pages not in sitemap', [r for r in idx if r['In Sitemap'] == 'No'])
issue('Sitemap URLs that are not indexable', [r for r in html if r['In Sitemap'] == 'Yes' and r['Indexability'] != 'Indexable'])
final = {r['Address']: r['Redirect URL'] for r in rows if r['Redirect URL']}
linked = collections.defaultdict(set)
for e in edges:
    if e['Type'] == 'Hyperlink':
        f = final.get(e['Destination'], e['Destination'])
        if f != e['Source']:
            linked[f].add(e['Source'])
only_redirect = [r for r in idx if r['Unique Hyperlink Inlinks'] == '0' and linked[r['Address']]]
issue('Orphans (indexable, not linked from any other page, even via redirect)', [r for r in idx if not linked[r['Address']]],
      note='Listed in the sitemap but no other page links to it.')
issue('Linked only through redirecting addresses', only_redirect,
      note='Every link to these pages points at the no-slash address and goes through a 301 (fixing the trailing-slash links fixes these).')
issue('Low content (indexable, under 300 words)', sorted((r for r in idx if int(r['Word Count']) < 300), key=lambda r: int(r['Word Count'])),
      lambda r: f'{P(r["Address"])}: {r["Word Count"]} words')
issue('Deep pages (crawl depth over 3)', [r for r in idx if r['Crawl Depth'] and int(r['Crawl Depth']) > 3], lambda r: f'{P(r["Address"])}: depth {r["Crawl Depth"]}')
issue('No structured data (indexable)', [r for r in idx if not r['JSON-LD Types']])
issue('Images missing alt attribute', [r for r in html if int(r['Images Missing Alt'] or 0) > 0], lambda r: f'{P(r["Address"])}: {r["Images Missing Alt"]}')

depths = collections.Counter(r['Crawl Depth'] for r in idx)
types = collections.Counter(r['Content Type'].split(';')[0] for r in rows if r['Status Code'] == '200')
LABEL = sys.argv[2] if len(sys.argv) > 2 else 'mj2.pro crawl'
head = [f'# Issues: {LABEL}', '',
        f'{len(rows)} URLs crawled: {len(html)} HTML pages (200), {len(idx)} indexable; '
        f'{sum(1 for r in rows if r["Status Code"] == "301")} redirecting addresses, {sum(1 for r in rows if r["Status Code"] == "404")} not found; '
        f'{len(edges)} internal link references. Content types: ' + ', '.join(f'{k} {v}' for k, v in types.most_common()) + '.',
        'Indexable pages by crawl depth: ' + ', '.join(f'{k}: {v}' for k, v in sorted(depths.items(), key=lambda kv: int(kv[0] or 99))) + '.', '',
        '| Check | Count |', '|---|---|'] + [f'| {n} | {c} |' for n, c in counts] + ['']
open(f'{OUT}/issues.md', 'w', encoding='utf-8').write('\n'.join(head + lines))
print('\n'.join(head))
