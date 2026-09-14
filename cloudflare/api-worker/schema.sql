-- D1 schema for mitchjmiller-leads. Apply (idempotent):
--   npm_config_cache=.npm-cache npx -y wrangler d1 execute mitchjmiller-leads --remote -y \
--     --config cloudflare/api-worker/wrangler.toml --file cloudflare/api-worker/schema.sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT,
  message TEXT NOT NULL,
  source_url TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  turnstile_ok INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at);
