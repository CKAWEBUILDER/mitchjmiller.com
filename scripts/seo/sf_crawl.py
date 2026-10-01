#!/usr/bin/env python3
"""Screaming Frog-style crawl of a static site directory served the way GitHub Pages serves it.

usage: sf_crawl.py <site_dir> <origin e.g. https://mj2.pro> <out_dir>
Writes internal_all.csv, all_inlinks.csv, external_links.csv, images_missing_alt.csv,
site-tree.json and summary.json. Standard library only.
"""
import csv, hashlib, json, os, re, sys
from collections import defaultdict, deque
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, urlunsplit, unquote

SITE, ORIGIN, OUT = sys.argv[1], sys.argv[2].rstrip('/'), sys.argv[3]
HOSTS = {urlsplit(ORIGIN).netloc, 'www.' + urlsplit(ORIGIN).netloc}
TYPES = {'.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.mjs': 'application/javascript',
         '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
         '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.m4a': 'audio/mp4', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.xml': 'application/xml',
         '.txt': 'text/plain', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.webmanifest': 'application/manifest+json'}


def resolve(path):
    """GitHub Pages: (status, file, redirect_location)."""
    p = unquote(path) or '/'
    fs = os.path.join(SITE, p.lstrip('/'))
    if p.endswith('/'):
        f = os.path.join(fs, 'index.html')
        return (200, f, None) if os.path.isfile(f) else (404, None, None)
    if os.path.isfile(fs):
        return 200, fs, None
    if os.path.isfile(os.path.join(fs, 'index.html')):
        return 301, None, p + '/'
    if os.path.isfile(fs + '.html'):
        return 200, fs + '.html', None
    return 404, None, None


class Page(HTMLParser):
    LINK_ATTRS = {'a': 'href', 'area': 'href', 'link': 'href', 'script': 'src', 'img': 'src', 'iframe': 'src', 'source': 'src',
                  'audio': 'src', 'video': 'src', 'track': 'src', 'embed': 'src'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_head = self.in_body = False
        self.stack, self.title, self.capture = [], None, None
        self.metas, self.links, self.h, self.text, self.imgs, self.jsonld = {}, [], defaultdict(list), [], [], []
        self.lang, self.canonical, self.hreflang, self.skip = None, None, [], 0
        self._buf, self._jsonld_on = [], False
        self.title_in_body, self._svg = False, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('br', 'p', 'div', 'li', 'td', 'th', 'section', 'article', 'header', 'footer', 'nav', 'span'):
            if self.capture and tag == 'br':
                self._buf.append(' ')
            if self.in_body and not self.skip:
                self.text.append(' ')
        if tag == 'svg':
            self._svg += 1
        if tag == 'html':
            self.lang = a.get('lang')
        elif tag == 'head':
            self.in_head = True
        elif tag == 'body':
            self.in_head, self.in_body = False, True
        if tag in ('script', 'style', 'noscript', 'template'):
            self.skip += 1
            if tag == 'script' and (a.get('type') or '').lower() == 'application/ld+json':
                self._jsonld_on, self._buf = True, []
        if tag == 'title' and self.title is None and not getattr(self, '_svg', 0):
            self.capture, self._buf = 'title', []
            self.title_in_body = self.in_body
        if tag in ('h1', 'h2') and self.in_body:
            self.capture, self._buf = tag, []
        if tag == 'meta':
            key = (a.get('name') or a.get('property') or '').lower()
            if key and 'content' in a:
                self.metas.setdefault(key, a['content'])
        if tag == 'link':
            rel = (a.get('rel') or '').lower().split()
            if 'canonical' in rel and self.canonical is None:
                self.canonical = a.get('href')
            if 'alternate' in rel and a.get('hreflang'):
                self.hreflang.append((a['hreflang'], a.get('href')))
        if tag == 'img':
            self.imgs.append((a.get('src'), 'alt' in a, a.get('alt')))
        attr = self.LINK_ATTRS.get(tag)
        if attr and a.get(attr):
            kind = 'Hyperlink' if tag in ('a', 'area') else ('Canonical' if tag == 'link' and 'canonical' in (a.get('rel') or '') else tag.capitalize())
            if tag == 'link' and 'alternate' in (a.get('rel') or '') and a.get('hreflang'):
                kind = 'Hreflang'
            anchor_slot = len(self.links)
            self.links.append({'type': kind, 'href': a[attr], 'anchor': '', 'alt': a.get('alt', ''), 'rel': a.get('rel', ''), 'slot': anchor_slot})
            if tag == 'a':
                self.stack.append(anchor_slot)
        if tag == 'meta' and (a.get('property') or a.get('name') or '').lower() in ('og:image', 'twitter:image') and a.get('content'):
            self.links.append({'type': 'Meta image', 'href': a['content'], 'anchor': '', 'alt': '', 'rel': '', 'slot': len(self.links)})

    def handle_endtag(self, tag):
        if tag == 'svg':
            self._svg = max(0, self._svg - 1)
        if self.in_body and not self.skip:
            self.text.append(' ')
        if tag in ('script', 'style', 'noscript', 'template'):
            self.skip = max(0, self.skip - 1)
            if tag == 'script' and self._jsonld_on:
                self.jsonld.append(''.join(self._buf)); self._jsonld_on = False
        if tag == 'title' and self.capture == 'title':
            self.title = ' '.join(''.join(self._buf).split()); self.capture = None
        if tag in ('h1', 'h2') and self.capture == tag:
            self.h[tag].append(' '.join(''.join(self._buf).split())); self.capture = None
        if tag == 'a' and self.stack:
            self.stack.pop()
        if tag == 'head':
            self.in_head = False

    def handle_data(self, data):
        if self._jsonld_on:
            self._buf.append(data); return
        if self.capture:
            self._buf.append(data)
        if self.stack and not self.skip:
            self.links[self.stack[-1]]['anchor'] += data
        if self.in_body and not self.skip:
            self.text.append(data)


def norm(base, href):
    """Absolute internal URL without fragment/query, or None for non-http; returns (url, internal, raw_abs)."""
    href = href.strip()
    if not href or href.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:', 'blob:')):
        return None
    absu = urljoin(base, href)
    s = urlsplit(absu)
    if s.scheme not in ('http', 'https'):
        return None
    internal = s.netloc in HOSTS
    clean = urlunsplit((s.scheme, s.netloc, s.path or '/', '', ''))
    return clean, internal, absu


def jsonld_types(blocks):
    out = []
    for b in blocks:
        try:
            data = json.loads(b)
        except Exception:
            out.append('INVALID'); continue
        items = data if isinstance(data, list) else data.get('@graph', [data]) if isinstance(data, dict) else []
        for it in items:
            if isinstance(it, dict):
                t = it.get('@type'); out += t if isinstance(t, list) else [t] if t else []
    return sorted(set(map(str, out)))


sitemap = []
with open(os.path.join(SITE, 'sitemap.xml'), encoding='utf-8') as fh:
    sitemap = re.findall(r'<loc>([^<]+)</loc>', fh.read())
start = [ORIGIN + '/'] + sitemap + [ORIGIN + '/robots.txt', ORIGIN + '/sitemap.xml']

rows, edges, externals = {}, [], defaultdict(lambda: {'inlinks': 0, 'sources': set(), 'types': set()})
depth = {}
queue = deque()
for u in start:
    if u not in depth:
        depth[u] = 0 if u == ORIGIN + '/' else None
        queue.append(u)
missing_alt = []
while queue:
    url = queue.popleft()
    if url in rows:
        continue
    path = urlsplit(url).path or '/'
    status, f, loc = resolve(path)
    ext = os.path.splitext(f or path)[1].lower() if (f or '.' in path.rsplit('/', 1)[-1]) else '.html'
    ctype = TYPES.get(ext, 'application/octet-stream') if status == 200 else ('text/html; charset=utf-8' if status == 404 else '')
    row = {'Address': url, 'Content Type': ctype, 'Status Code': status, 'Status': {200: 'OK', 301: 'Moved Permanently', 404: 'Not Found'}[status],
           'Indexability': 'Indexable', 'Indexability Status': '', 'Redirect URL': (ORIGIN + loc) if loc else '', 'Crawl Depth': depth.get(url),
           'In Sitemap': 'Yes' if url in sitemap else 'No', 'Size (bytes)': os.path.getsize(f) if f else 0}
    if status != 200:
        row['Indexability'], row['Indexability Status'] = 'Non-Indexable', 'Redirected' if status == 301 else 'Client Error'
    if loc:
        tgt = ORIGIN + loc
        edges.append({'Type': 'Redirect', 'Source': url, 'Destination': tgt, 'Anchor': '', 'Alt Text': '', 'Status Code': ''})
        if tgt not in depth or depth[tgt] is None:
            depth[tgt] = (depth.get(url) or 0)
        queue.append(tgt)
    if status == 200 and ctype.startswith('text/html'):
        raw = open(f, 'rb').read()
        row['Hash'] = hashlib.md5(raw).hexdigest()
        p = Page(); p.feed(raw.decode('utf-8', 'replace'))
        robots = p.metas.get('robots', '')
        title, desc = p.title or '', p.metas.get('description', '')
        words = len(re.findall(r"[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’\-]*", ' '.join(p.text)))
        canon = urljoin(url, p.canonical) if p.canonical else ''
        row.update({'Title 1': title, 'Title 1 Length': len(title), 'Title Outside Head': 'Yes' if p.title_in_body else '', 'Meta Description 1': desc, 'Meta Description 1 Length': len(desc),
                    'H1-1': (p.h['h1'] + [''])[0], 'H1-1 Length': len((p.h['h1'] + [''])[0]), 'H1-2': (p.h['h1'] + ['', ''])[1], 'H1 Count': len(p.h['h1']),
                    'H2-1': (p.h['h2'] + [''])[0], 'H2-2': (p.h['h2'] + ['', ''])[1], 'Meta Robots 1': robots, 'Canonical Link Element 1': canon,
                    'Word Count': words, 'Language': p.lang or '', 'Hreflang Count': len(p.hreflang), 'OG Image': p.metas.get('og:image', ''),
                    'Twitter Card': p.metas.get('twitter:card', ''), 'JSON-LD Types': ' | '.join(jsonld_types(p.jsonld)),
                    'Images': len(p.imgs), 'Images Missing Alt': sum(1 for _, has, _ in p.imgs if not has)})
        if 'noindex' in robots.lower():
            row['Indexability'], row['Indexability Status'] = 'Non-Indexable', 'noindex'
        elif canon and canon.rstrip('/') != url.rstrip('/'):
            row['Indexability'], row['Indexability Status'] = 'Non-Indexable', 'Canonicalised'
        for src, has, _ in p.imgs:
            if not has:
                missing_alt.append({'Page': url, 'Image': urljoin(url, src or '')})
        out_int, out_ext = [], []
        for l in p.links:
            n = norm(url, l['href'])
            if not n:
                continue
            target, internal, _ = n
            if internal:
                out_int.append(target)
                edges.append({'Type': l['type'], 'Source': url, 'Destination': target, 'Anchor': ' '.join(l['anchor'].split())[:200],
                              'Alt Text': l['alt'], 'Status Code': ''})
                if target not in depth or depth[target] is None:
                    depth[target] = (depth.get(url) or 0) + 1 if l['type'] == 'Hyperlink' else (depth.get(url) or 0) + 1
                if target not in rows:
                    queue.append(target)
            else:
                out_ext.append(target)
                e = externals[target]; e['inlinks'] += 1; e['sources'].add(url); e['types'].add(l['type'])
        row.update({'Outlinks': len(out_int), 'Unique Outlinks': len(set(out_int)), 'External Outlinks': len(out_ext), 'Unique External Outlinks': len(set(out_ext))})
    elif status == 200 and f:
        row['Hash'] = hashlib.md5(open(f, 'rb').read()).hexdigest()
    rows[url] = row

adj = defaultdict(set)
for e in edges:
    if e['Type'] in ('Hyperlink', 'Redirect'):
        adj[e['Source']].add(e['Destination'])
bfs, dq = {ORIGIN + '/': 0}, deque([ORIGIN + '/'])
while dq:
    u = dq.popleft()
    for v in adj[u]:
        if v not in bfs:
            bfs[v] = bfs[u] + 1; dq.append(v)
for u, r in rows.items():
    r['Crawl Depth'] = bfs.get(u, '')
inl, uinl, hyper = defaultdict(int), defaultdict(set), defaultdict(set)
for e in edges:
    inl[e['Destination']] += 1; uinl[e['Destination']].add(e['Source'])
    if e['Type'] == 'Hyperlink' and e['Source'] != e['Destination']:
        hyper[e['Destination']].add(e['Source'])
for e in edges:
    e['Status Code'] = rows.get(e['Destination'], {}).get('Status Code', '')
for u, r in rows.items():
    r['Inlinks'], r['Unique Inlinks'], r['Unique Hyperlink Inlinks'] = inl[u], len(uinl[u]), len(hyper[u])
    fp = urlsplit(u).path.strip('/')
    r['Folder Depth'] = 0 if not fp else fp.count('/') + 1

cols = ['Address', 'Content Type', 'Status Code', 'Status', 'Indexability', 'Indexability Status', 'Redirect URL', 'Title 1', 'Title 1 Length', 'Title Outside Head',
        'Meta Description 1', 'Meta Description 1 Length', 'H1-1', 'H1-1 Length', 'H1-2', 'H1 Count', 'H2-1', 'H2-2', 'Meta Robots 1',
        'Canonical Link Element 1', 'Language', 'Hreflang Count', 'OG Image', 'Twitter Card', 'JSON-LD Types', 'Size (bytes)', 'Word Count',
        'Images', 'Images Missing Alt', 'Crawl Depth', 'Folder Depth', 'In Sitemap', 'Inlinks', 'Unique Inlinks', 'Unique Hyperlink Inlinks',
        'Outlinks', 'Unique Outlinks', 'External Outlinks', 'Unique External Outlinks', 'Hash']
os.makedirs(OUT, exist_ok=True)
order = sorted(rows.values(), key=lambda r: (0 if r['Content Type'].startswith('text/html') else 1, r['Address']))
with open(os.path.join(OUT, 'internal_all.csv'), 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fieldnames=cols, extrasaction='ignore'); w.writeheader(); w.writerows(order)
with open(os.path.join(OUT, 'all_inlinks.csv'), 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fieldnames=['Type', 'Source', 'Destination', 'Anchor', 'Alt Text', 'Status Code']); w.writeheader(); w.writerows(edges)
with open(os.path.join(OUT, 'external_links.csv'), 'w', newline='', encoding='utf-8') as fh:
    w = csv.writer(fh); w.writerow(['Address', 'Inlinks', 'Unique Inlinks', 'Link Types', 'Status Code'])
    for u, e in sorted(externals.items(), key=lambda kv: -kv[1]['inlinks']):
        w.writerow([u, e['inlinks'], len(e['sources']), ' | '.join(sorted(e['types'])), 'not checked'])
with open(os.path.join(OUT, 'images_missing_alt.csv'), 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fieldnames=['Page', 'Image']); w.writeheader(); w.writerows(missing_alt)

html = [r for r in rows.values() if r['Content Type'].startswith('text/html') and r['Status Code'] == 200]
tree = {'name': '/', 'url': ORIGIN + '/', 'children': {}}
for r in html:
    parts = [x for x in urlsplit(r['Address']).path.split('/') if x]
    node = tree
    for i, part in enumerate(parts):
        node = node['children'].setdefault(part, {'name': part, 'url': ORIGIN + '/' + '/'.join(parts[:i + 1]) + '/', 'children': {}})
    node.update({'title': r.get('Title 1', ''), 'indexable': r['Indexability'] == 'Indexable', 'status': r['Indexability Status'], 'words': r.get('Word Count', 0),
                 'inlinks': len(hyper[r['Address']]), 'depth': bfs.get(r['Address'], ''), 'sitemap': r['In Sitemap'] == 'Yes', 'lang': r.get('Language', '')})


def plain(n):
    n = dict(n); n['children'] = [plain(c) for c in sorted(n['children'].values(), key=lambda c: c['name'])]; return n


with open(os.path.join(OUT, 'site-tree.json'), 'w', encoding='utf-8') as fh:
    json.dump(plain(tree), fh, ensure_ascii=False, indent=1)
summary = {'urls': len(rows), 'html_200': len(html), 'indexable_html': sum(1 for r in html if r['Indexability'] == 'Indexable'),
           'status': {str(k): sum(1 for r in rows.values() if r['Status Code'] == k) for k in (200, 301, 404)}, 'edges': len(edges),
           'external_urls': len(externals), 'sitemap_urls': len(sitemap), 'images_missing_alt': len(missing_alt)}
json.dump(summary, open(os.path.join(OUT, 'summary.json'), 'w'), indent=1)
print(json.dumps(summary))
