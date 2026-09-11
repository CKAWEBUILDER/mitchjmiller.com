import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const output=resolve('.stage-assets');
if(output!==resolve(process.cwd(),'.stage-assets')) throw new Error('Unexpected staging asset directory');
rmSync(output,{recursive:true,force:true}); mkdirSync(output,{recursive:true});
for(const name of ['images','files','artifacts','favicon.ico','favicon.png','favicon.svg','apple-touch-icon.png','opengraph.jpg','data/ca-pums-sample-2019.json','data/ca-pums-meta-2019.json']){
 const source=resolve('public',name); if(existsSync(source)) cpSync(source,resolve(output,name),{recursive:true});
}
// Public source is an allowlist: no production CNAME, SPA rewrites, drafts, or legacy SFC index.
writeFileSync(resolve(output,'robots.txt'),'User-agent: *\nAllow: /\n');
writeFileSync(resolve(output,'_headers'),'/*\n  X-Robots-Tag: noindex, follow\n  X-Content-Type-Options: nosniff\n');
console.log('Prepared staging assets; production bindings and legacy HTML excluded.');
