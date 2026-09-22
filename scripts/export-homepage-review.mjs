import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const target=path.join(root,'docs/redesign-2026-09-15/preview');
await mkdir(path.join(target,'brand-options'),{recursive:true});
const media={'.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
const mapped=new Map();
for(const [route,file] of [['review/homepage-mockup','homepage-mockup.html'],['review/brand-options','brand-options.html']]){
 let html=await readFile(path.join(root,'dist',route,'index.html'),'utf8');
 const refs=[...new Set([...html.matchAll(/(?:src|href)="(\/[^"\s]+)"/g)].map(m=>m[1]))];
 for(const ref of refs){
  let next;
  if(ref.startsWith('/review-assets/brand-options/')){
   next='brand-options/'+path.basename(ref);
   if(!mapped.has(ref)){await copyFile(path.join(root,'dist',ref),path.join(target,next));mapped.set(ref,next);}
  }else if(media[path.extname(ref)]){
   const bytes=await readFile(path.join(root,'dist',ref));
   next='data:'+media[path.extname(ref)]+';base64,'+bytes.toString('base64');
  }else if(ref==='/review/brand-options/') next='brand-options.html';
  else if(ref==='/' || ref==='/review/') next='homepage-mockup.html';
  else next='https://mj2.pro'+ref;
  html=html.replaceAll('="'+ref+'"','="'+next+'"');
 }
 html=html.replaceAll('"href":"/','"href":"https://mj2.pro/');
 await writeFile(path.join(target,file),html);
}
console.log('Portable review exported to '+target);
