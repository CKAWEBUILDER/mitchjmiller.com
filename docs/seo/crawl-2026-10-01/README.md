# mj2.pro crawl — 2026-10-01

A Screaming Frog-format crawl of https://mj2.pro as it is served after the October 1 release (`gh-pages` `664c757`). The exports use Screaming Frog's column names, so they open the same way in a spreadsheet.

## How it was made

Neither the Screaming Frog download site nor mj2.pro can be reached from the cloud session, because the egress policy denies both. The crawl therefore reads the exact files GitHub Pages serves for mj2.pro, the `gh-pages` tree, and applies GitHub Pages' URL rules:

- A folder URL serves its `index.html`.
- A folder address without the trailing slash gets a 301 to the slashed address.
- A missing path is a 404.

The crawl starts from `/`, every sitemap URL, `robots.txt` and `sitemap.xml`. It follows every internal reference: links, canonicals, hreflang, scripts, styles, images, iframes, audio and `og:image`. The scripts use the Python standard library only:

```sh
git archive origin/gh-pages | tar -x -C /tmp/site
python3 scripts/seo/sf_crawl.py /tmp/site https://mj2.pro docs/seo/crawl-<date>
python3 scripts/seo/sf_issues.py docs/seo/crawl-<date> "mj2.pro crawl, <date>"
```

Not covered: live HTTP headers and response times, the `www` and HTTPS redirects on the live host, the status of the 128 external URLs (`external_links.csv` lists them, unchecked), and anything a browser adds with JavaScript. The pages are complete HTML, so the content crawl is not affected. A native Screaming Frog `.seospider` file needs Screaming Frog on the Mac.

## Files

| File | Screaming Frog equivalent |
|---|---|
| `internal_all.csv` | Internal → All (368 rows). Adds: Title Outside Head, H1 Count, Language, Hreflang Count, OG Image, Twitter Card, JSON-LD Types, Images Missing Alt, In Sitemap, Unique Hyperlink Inlinks |
| `all_inlinks.csv` | Bulk Export → All Inlinks (6,847 link references with anchor text and target status) |
| `external_links.csv` | External → All (status not checked) |
| `images_missing_alt.csv` | Images → Missing Alt Text (empty: 0) |
| `issues.md` | Issues tab, with counts and examples |
| `site-tree.json` | Site structure data behind the site-tree visual |

## Findings

1. **144 internal links point to the no-slash version of a page** (`/blog`, `/case-studies/apple-seasonal-search`, …). Each one costs a 301 on GitHub Pages. They sit on 35 pages, mostly `/blog/`, `/work/` and `/case-studies/`. Twenty-seven pages, mainly the study-note library, are reached only through these redirects. Fix by linking the slashed URLs directly.
2. **`/case-studies/sfc-surf-school/` has its `<title>` inside `<body>`**, so the document head has no title. The standalone report keeps its original body under the parity rule, so fixing this needs that rule relaxed for the head.
3. **40 titles run over 60 characters.** The cause is mostly the " | Signals & Systems" and " | Studying — Mitchell Miller" suffixes, and the study-note suffix still names Mitchell Miller rather than M².
4. **33 meta descriptions run over 155 characters**, because the study-note template writes 220. **14 run under 70**, mostly the case studies.
5. **`/resume/` is in the sitemap, but no other page links to it.**
6. **14 indexable pages carry no structured data**, including About, Contact and the case-study index.
7. **Clean:** 0 broken internal links, 0 missing alt attributes, 0 missing or duplicate meta descriptions, one H1 on every page, every indexable page canonical to itself and in the sitemap. The 11 non-indexable pages are the 4 Coming Soon placeholders and the 7 `/viz/` embeds, all `noindex` by design.
