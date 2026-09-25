// Import TypeScript site modules from Node scripts without a build step: esbuild bundles the
// named exports into one ESM string (same method as scripts/export-parity-reference.mjs).
import { build } from 'esbuild';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export async function loadTs(contents) {
  const bundled = await build({
    stdin: { contents, resolveDir: root, sourcefile: 'script-entry.ts', loader: 'ts' },
    bundle: true, write: false, platform: 'node', format: 'esm',
    define: { 'import.meta.env.BASE_URL': '"/"' }, logLevel: 'silent',
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
}
