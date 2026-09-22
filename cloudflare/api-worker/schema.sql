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

-- Stripe (docs/stripe/README.md). stripe_events records every verified webhook delivery once by event id (idempotency);
-- payments is one row per Checkout Session (cs_…) or Invoice (in_…), upserted from the newest event by event.created.
CREATE TABLE IF NOT EXISTS stripe_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  created INTEGER NOT NULL,
  object_id TEXT,
  received_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,            -- cs_… (Checkout Session) or in_… (Invoice)
  kind TEXT NOT NULL,             -- checkout | invoice
  status TEXT NOT NULL,           -- pending | paid | failed
  amount_total INTEGER,           -- minor units (cents for USD)
  currency TEXT,
  customer_id TEXT,
  customer_email TEXT,
  offer TEXT,                     -- STRIPE_PRICES key for Checkout payments
  invoice_id TEXT,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  updated_at TEXT NOT NULL        -- ISO time of event.created; out-of-order redeliveries never regress status
);
CREATE INDEX IF NOT EXISTS payments_updated_at_idx ON payments (updated_at);
