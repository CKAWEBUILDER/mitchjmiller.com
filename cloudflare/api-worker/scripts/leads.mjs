#!/usr/bin/env node
// List the latest leads from the remote D1 database (mitchjmiller-leads).
// Usage (from anywhere): node cloudflare/api-worker/scripts/leads.mjs [limit=20]
// Requires a working wrangler session (npm_config_cache=.npm-cache npx -y wrangler whoami).
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const workerDir = path.resolve(here, '..');
const repoRoot = path.resolve(workerDir, '..', '..');
const limit = Math.min(Math.max(parseInt(process.argv[2] || '20', 10) || 20, 1), 200);
const sql =
  `SELECT id, created_at, name, email, topic, substr(message, 1, 160) AS message, source_url, turnstile_ok ` +
  `FROM leads ORDER BY created_at DESC LIMIT ${limit};`;

const env = { ...process.env, npm_config_cache: process.env.npm_config_cache || path.join(repoRoot, '.npm-cache') };
const args = ['-y', 'wrangler', 'd1', 'execute', 'mitchjmiller-leads', '--remote', '--json',
  '--config', path.join(workerDir, 'wrangler.toml'), '--command', sql];
const run = spawnSync('npx', args, { cwd: repoRoot, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
if (run.status !== 0) {
  process.stderr.write(run.stderr || '');
  process.exit(run.status || 1);
}
const start = run.stdout.indexOf('[');
let rows = [];
try {
  const parsed = JSON.parse(run.stdout.slice(start));
  rows = parsed[0]?.results || [];
} catch (err) {
  console.error('Could not parse wrangler output:', err.message);
  console.error(run.stdout.slice(0, 2000));
  process.exit(1);
}
if (!rows.length) {
  console.log('No leads yet.');
  process.exit(0);
}
for (const r of rows) {
  console.log(`${r.created_at}  ${r.name} <${r.email}>  topic=${r.topic ?? '-'}  turnstile=${r.turnstile_ok}`);
  console.log(`  ${String(r.message).replace(/\s+/g, ' ')}`);
  if (r.source_url) console.log(`  from ${r.source_url}`);
  console.log(`  id ${r.id}`);
}
console.log(`\n${rows.length} lead(s), newest first.`);
