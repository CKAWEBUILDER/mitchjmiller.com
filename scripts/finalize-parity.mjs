import {readFileSync,writeFileSync,readdirSync,existsSync,rmSync} from 'node:fs';
import {join} from 'node:path';
const release=process.env.SITE_BUILD_MODE==='release';
const canonicalOrigin='https://mj2.pro';
const manifest=JSON.parse(readFileSync('docs/implementation-2026-09-11/route-manifest.json','utf8'));
const eligible=new Set(manifest.routes.filter(r=>r.kind!=='placeholder').map(r=>r.path));
// Review-only output never ships. /lab/ is public since release 2026-09-12 (manifest kind 'added').
if(release) for(const p of ['review','design','proof','themes','review-assets','artifacts']) rmSync(join('dist',p),{recursive:true,force:true});
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
for(const file of walk('dist').filter(p=>p.endsWith('.html'))){
 let html=readFileSync(file,'utf8');
 html=html.replace(/<script[^>]*src=["'][^"']*googletagmanager[^"']*["'][^>]*>[\s\S]*?<\/script>/gi,'').replace(/<script[^>]*>\s*window\.dataLayer[\s\S]*?<\/script>/gi,'');
 const route='/'+file.replace(/^dist\//,'').replace(/index\.html$/,'');
 const indexable=release&&eligible.has(route);
 html=html.replace(/<meta\s+[^>]*name=["']robots["'][^>]*>/gi,'');
 html=html.replace('</head>',`<meta name="robots" content="${indexable?'index, follow':'noindex, follow'}"/></head>`);
 // Raw standalone report gets the same staging/release head policy.
 if(route==='/case-studies/sfc-surf-school/') html=html.replace(/<link\s+rel=["']canonical["'][^>]*>/i,`<link rel="canonical" href="${canonicalOrigin}/case-studies/sfc-surf-school/"/>`);
 if(indexable){html=html.replace('</head>',`<script async src="https://www.googletagmanager.com/gtag/js?id=G-HCKYWCZQ8E"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-HCKYWCZQ8E');</script></head>`);}
 writeFileSync(file,html);
}
writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...eligible].map(p=>`<url><loc>${canonicalOrigin}${p}</loc></url>`).join('')+'</urlset>');
writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${canonicalOrigin}/sitemap.xml\n`);
if(release){rmSync('dist/_headers',{force:true});writeFileSync('dist/CNAME','mj2.pro\n');writeFileSync('dist/.nojekyll','');}
console.log(`${release?'Local release candidate (not deployed)':'Private review'} finalized; ${eligible.size} published URLs (${manifest.routes.filter(r=>r.kind==='added').length} added in this release) and four preserved placeholders.`);
