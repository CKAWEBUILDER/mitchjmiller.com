import {createServer} from 'node:http';
import {readFileSync,statSync,existsSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.argv[2]||'dist');
const port=Number(process.argv[3]||5191);
const reference=process.argv.includes('--reference');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain','.woff2':'font/woff2'};
createServer((req,res)=>{
 let path;try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 let file=resolve(root,'.'+path);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
 if(existsSync(file)&&statSync(file).isDirectory()){
  if(!path.endsWith('/')){res.writeHead(301,{Location:path+'/'}).end();return;}
  file=resolve(file,'index.html');
 }
 let status=200;
 if(!existsSync(file)||!statSync(file).isFile()){status=reference?200:404;file=resolve(root,reference?'index.html':'404.html');}
 if(!existsSync(file)){res.writeHead(404).end('Not found');return;}
 res.writeHead(status,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Robots-Tag':'noindex, follow','Cache-Control':'no-store'});res.end(readFileSync(file));
}).listen(port,'127.0.0.1',()=>console.log(`Review server http://127.0.0.1:${port}/`));
