#!/usr/bin/env node
/**
 * Static server for release QA. Mimics GitHub Pages: /dir → 301 /dir/,
 * /dir/ → dir/index.html, missing paths → HTTP 404 with 404.html as the body.
 *
 *   node scripts/qa/serve.mjs [dist] [port]     (defaults: dist, 5193)
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || process.env.PORT || 5193);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4' };
const notFound = existsSync(join(root, '404.html')) ? readFileSync(join(root, '404.html')) : Buffer.from('Not found');

export function startServer(onReady) {
  const server = createServer((request, response) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname); } catch { pathname = '/'; }
    const target = resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(`${root}/`)) { response.writeHead(404, { 'content-type': types['.html'] }); return response.end(notFound); }
    if (existsSync(target) && statSync(target).isDirectory()) {
      if (!pathname.endsWith('/')) { response.writeHead(301, { location: `${pathname}/` }); return response.end(); }
      const index = join(target, 'index.html');
      if (existsSync(index)) { response.writeHead(200, { 'content-type': types['.html'] }); return response.end(request.method === 'HEAD' ? undefined : readFileSync(index)); }
    } else if (existsSync(target) && statSync(target).isFile()) {
      response.writeHead(200, { 'content-type': types[extname(target).toLowerCase()] || 'application/octet-stream', 'content-length': statSync(target).size });
      return response.end(request.method === 'HEAD' ? undefined : readFileSync(target));
    }
    response.writeHead(404, { 'content-type': types['.html'] });
    response.end(request.method === 'HEAD' ? undefined : notFound);
  });
  server.listen(port, '127.0.0.1', () => onReady?.(server));
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  startServer(() => console.log(`Serving ${root} at http://127.0.0.1:${port}/ (404.html for unknown routes)`));
}
