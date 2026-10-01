import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const output=resolve('.stage-assets');
if(output!==resolve(process.cwd(),'.stage-assets')) throw new Error('Unexpected staging asset directory');
rmSync(output,{recursive:true,force:true}); mkdirSync(output,{recursive:true});
// 'viz': standalone living infographics embedded by posts (declared under "embeds" in the route manifest).
// 'audio': narrated posts (scripts/narrate.mjs, site/data/narration.json).
for(const name of ['images','files','artifacts','viz','audio','favicon.ico','favicon.png','favicon.svg','apple-touch-icon.png','opengraph.jpg','data/ca-pums-sample-2019.json','data/ca-pums-meta-2019.json','9b0893b8818bd5bce05d66051f2bc971.txt']){
 const source=resolve('public',name); if(existsSync(source)) cpSync(source,resolve(output,name),{recursive:true});
}
// The four resume PDFs were retired on 2026-09-25 (Mitch; route manifest "retired"): neither
// mode publishes them, and scripts/verify-parity.mjs fails the build if one reaches dist/.
// The archived July bytes stay in baseline/public/files as part of the production snapshot.
const release=process.env.SITE_BUILD_MODE==='release';
if(!release&&existsSync(resolve('public/review-assets/brand-options'))){
 mkdirSync(resolve(output,'review-assets'),{recursive:true});
 cpSync(resolve('public/review-assets/brand-options'),resolve(output,'review-assets/brand-options'),{recursive:true});
}
cpSync(resolve('baseline/public/case-studies'),resolve(output,'case-studies'),{recursive:true});
// Public source is an allowlist: no production CNAME, SPA rewrites or unapproved drafts.
writeFileSync(resolve(output,'robots.txt'),'User-agent: *\nAllow: /\n');
writeFileSync(resolve(output,'_headers'),'/*\n  X-Robots-Tag: noindex, follow\n  X-Content-Type-Options: nosniff\n');
console.log(release?'Prepared shared imagery, workbench data and retained standalone SFC report (resume PDFs retired).':'Prepared shared imagery, workbench data, review brand options and retained standalone SFC report (resume PDFs retired).');
