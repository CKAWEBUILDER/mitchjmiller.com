#!/usr/bin/env node
/**
 * Create (and optionally send) a Stripe invoice for a client: hosted invoice page + PDF, net terms, optional Stripe Tax.
 * Dependency-free; Node ≥ 20. Reuses the Worker's REST helper, so the request shape matches production.
 *
 *   STRIPE_SECRET_KEY=rk_… node cloudflare/api-worker/scripts/stripe-invoice.mjs \
 *     --email finance@client.com --name "Client Co" \
 *     --line "Discovery sprint — research and readout|4500.00" \    # description|amount in major units (two-decimal currency)
 *     --line "price:price_123|2" \                                    # catalog price|quantity
 *     [--currency usd] [--days 30] [--memo "Net 30."] [--footer "…"] [--tax] [--draft] [--send] [--dry-run]
 *
 * --tax      automatic_tax on the invoice. Needs a saved customer address and an active registration (docs/stripe/README.md §6).
 * --draft    leave the invoice unfinalized for Dashboard review (no --send).
 * --send     email the finalized invoice through Stripe (reminders follow the Dashboard invoicing settings).
 * --dry-run  print the planned API calls as JSON and make no network request (no key needed).
 * Key: a restricted key with Customers: write, Invoices: write, Prices: read. Read from the environment, never printed.
 */
import { stripeRequest } from '../src/stripe.js';

const args = parseArgs(process.argv.slice(2));
const dryRun = args['dry-run'] === true;
const key = process.env.STRIPE_SECRET_KEY;
const lines = [].concat(args.line || []).map(parseLine);
if (typeof args.email !== 'string' || !lines.length) usage('--email and at least one --line are required');
if (!key && !dryRun) usage('STRIPE_SECRET_KEY is not set');
const currency = String(args.currency || 'usd').toLowerCase();
const days = Number(args.days || 30);
if (!Number.isInteger(days) || days < 0) usage('--days must be a non-negative integer');

const plan = [];
async function call(method, path, params) {
  plan.push({ method, path, params });
  if (dryRun) return { body: { id: `${path.split('/')[2] || 'object'}_dry`, data: [] } };
  const res = await stripeRequest(key, method, path, params);
  if (!res.ok) {
    const e = (res.body && res.body.error) || {};
    throw new Error(`${method} ${path} → ${res.status} ${e.type || ''} ${e.code || ''}: ${e.message || 'unknown error'}`);
  }
  return res;
}

try {
  // 1. Customer: exact email match, else create.
  let customer = (await call('GET', '/v1/customers', { email: args.email, limit: 1 })).body.data[0];
  if (!customer) customer = (await call('POST', '/v1/customers', { email: args.email, name: typeof args.name === 'string' ? args.name : undefined })).body;
  if (args.tax && !dryRun && !(customer.address && customer.address.country)) {
    console.warn('warning: this customer has no saved address, so automatic_tax will fail at finalize (customer_tax_location_invalid). Add the address in the Dashboard first.');
  }
  // 2. Draft invoice with net terms; pending items elsewhere on the customer are left alone.
  const invoice = (
    await call('POST', '/v1/invoices', {
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: days,
      currency,
      pending_invoice_items_behavior: 'exclude',
      automatic_tax: { enabled: args.tax === true },
      description: typeof args.memo === 'string' ? args.memo : undefined,
      footer: typeof args.footer === 'string' ? args.footer : undefined,
    })
  ).body;
  // 3. Line items attached directly to that invoice.
  for (const line of lines) await call('POST', '/v1/invoiceitems', { customer: customer.id, invoice: invoice.id, currency, ...line });
  // 4. Finalize (+ send).
  let final = invoice;
  if (!args.draft) final = (await call('POST', `/v1/invoices/${invoice.id}/finalize`, {})).body;
  if (args.send && !args.draft) final = (await call('POST', `/v1/invoices/${invoice.id}/send`, {})).body;

  if (dryRun) {
    console.log(JSON.stringify({ dry_run: true, calls: plan }, null, 2));
  } else {
    console.log(
      JSON.stringify(
        {
          customer: customer.id,
          invoice: final.id,
          status: final.status,
          total: final.total,
          tax: final.tax ?? null,
          currency: final.currency,
          hosted_invoice_url: final.hosted_invoice_url,
          invoice_pdf: final.invoice_pdf,
        },
        null,
        2,
      ),
    );
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

function parseLine(spec) {
  const [left = '', right = ''] = String(spec).split('|');
  if (left.startsWith('price:')) {
    const quantity = Number(right || 1);
    if (!left.slice(6).trim() || !Number.isInteger(quantity) || quantity < 1) usage(`bad --line "${spec}" (use "price:price_id|quantity")`);
    return { pricing: { price: left.slice(6).trim() }, quantity };
  }
  // chisle: assumes a two-decimal currency (usd); a zero-decimal currency would need the amount as-is.
  const amount = Math.round(Number(right) * 100);
  if (!left.trim() || !Number.isFinite(amount) || amount <= 0) usage(`bad --line "${spec}" (use "description|amount" or "price:price_id|quantity")`);
  return { description: left.trim(), amount };
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) usage(`unexpected argument ${a}`);
    const k = a.slice(2);
    const next = argv[i + 1];
    let v = true;
    if (next !== undefined && !next.startsWith('--')) {
      v = next;
      i += 1;
    }
    out[k] = k in out ? [].concat(out[k], v) : v;
  }
  return out;
}

function usage(msg) {
  console.error(`${msg}\nUsage is in the header of cloudflare/api-worker/scripts/stripe-invoice.mjs`);
  process.exit(2);
}
