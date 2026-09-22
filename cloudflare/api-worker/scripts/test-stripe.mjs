/**
 * Stripe route tests for the contact Worker — local only, no network: fetch is mocked, D1 is node:sqlite loaded with
 * schema.sql (real SQL semantics, including the payments upsert guard).
 *   node cloudflare/api-worker/scripts/test-stripe.mjs        # Node ≥ 22.13 (node:sqlite)
 */
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import worker from '../src/index.js';
import { formEncode, verifyWebhookSignature, INTEGRATION_IDENTIFIER, STRIPE_API_VERSION } from '../src/stripe.js';

const API = 'https://mitchjmiller-api.test';
const WH_SECRET = 'whsec_local_test';
const SESSION = { id: 'cs_test_1', url: 'https://checkout.stripe.com/c/pay/cs_test_1' };

let passed = 0;
async function test(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`PASS  ${name}`);
  } catch (err) {
    console.log(`FAIL  ${name}\n      ${err.message}`);
    process.exitCode = 1;
  }
}

function makeEnv(overrides = {}) {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  const LEADS = {
    prepare: (sql) => ({
      bind: (...args) => ({
        async run() {
          const r = db.prepare(sql).run(...args);
          return { success: true, meta: { changes: Number(r.changes) } };
        },
      }),
    }),
  };
  const kv = new Map();
  const RATE = {
    async get(k) {
      return kv.has(k) ? JSON.parse(kv.get(k)) : null;
    },
    async put(k, v) {
      kv.set(k, v);
    },
  };
  const env = {
    ALLOWED_ORIGINS: 'https://mj2.pro',
    STRIPE_SECRET_KEY: 'rk_test_fake',
    STRIPE_WEBHOOK_SECRET: WH_SECRET,
    STRIPE_PRICES: '{"discovery":"price_123"}',
    STRIPE_AUTOMATIC_TAX: 'false',
    CHECKOUT_SUCCESS_URL: 'https://mj2.pro/contact/?checkout=success&session_id={CHECKOUT_SESSION_ID}',
    CHECKOUT_CANCEL_URL: 'https://mj2.pro/services/',
    IP_SALT: 'salt',
    TURNSTILE_SECRET: 'x',
    LEADS,
    RATE,
    ...overrides,
  };
  return { env, db };
}

let stripeCalls = [];
let stripeReply = () => ({ status: 200, body: SESSION });
globalThis.fetch = async (url, init = {}) => {
  stripeCalls.push({ url: String(url), init, params: new URLSearchParams(init.body || '') });
  const { status, body } = stripeReply();
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
};

const post = (env, path, body, headers = {}) =>
  worker.fetch(
    new Request(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: 'https://mj2.pro', ...headers },
      body,
    }),
    env,
  );
const sig = (payload, { t = Math.floor(Date.now() / 1000), secret = WH_SECRET } = {}) =>
  `t=${t},v1=${createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex')}`;
const event = (type, object, { id = `evt_${Math.random().toString(36).slice(2)}`, created = Math.floor(Date.now() / 1000) } = {}) =>
  JSON.stringify({ id, object: 'event', type, created, data: { object } });
const webhook = (env, payload, header = sig(payload)) =>
  worker.fetch(
    new Request(`${API}/stripe/webhook`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Stripe-Signature': header }, body: payload }),
    env,
  );
const rows = (db, table) => db.prepare(`SELECT * FROM ${table}`).all();
const paidSession = (over = {}) => ({
  id: 'cs_test_paid',
  object: 'checkout.session',
  payment_status: 'paid',
  amount_total: 450000,
  currency: 'usd',
  customer: 'cus_1',
  customer_details: { email: 'client@example.com' },
  metadata: { offer: 'discovery' },
  invoice: 'in_1',
  ...over,
});

await test('POST /checkout form → 303 to hosted Checkout with best-practice params', async () => {
  const { env } = makeEnv();
  stripeCalls = [];
  const res = await post(env, '/checkout', 'offer=discovery&email=client%40example.com&ref=lead_42');
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('Location'), SESSION.url);
  assert.equal(stripeCalls.length, 1);
  const { url, init, params } = stripeCalls[0];
  assert.equal(url, 'https://api.stripe.com/v1/checkout/sessions');
  assert.equal(init.headers.Authorization, 'Bearer rk_test_fake');
  assert.equal(init.headers['Stripe-Version'], STRIPE_API_VERSION);
  assert.match(init.headers['Idempotency-Key'], /^[0-9a-f-]{36}$/);
  assert.equal(params.get('mode'), 'payment');
  assert.equal(params.get('line_items[0][price]'), 'price_123');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('automatic_tax[enabled]'), 'false');
  assert.equal(params.get('customer_creation'), 'always');
  assert.equal(params.get('invoice_creation[enabled]'), 'true');
  assert.equal(params.get('tax_id_collection[enabled]'), 'true');
  assert.equal(params.get('customer_email'), 'client@example.com');
  assert.equal(params.get('client_reference_id'), 'lead_42');
  assert.equal(params.get('metadata[offer]'), 'discovery');
  assert.equal(params.get('integration_identifier'), INTEGRATION_IDENTIFIER);
  assert.match(INTEGRATION_IDENTIFIER, /_[a-z]{8}$/);
  assert.ok(params.get('success_url').includes('{CHECKOUT_SESSION_ID}'));
  assert.equal(params.get('cancel_url'), 'https://mj2.pro/services/');
  assert.ok(![...params.keys()].some((k) => k.startsWith('payment_method_types')), 'dynamic payment methods: no payment_method_types');
});

await test('POST /checkout JSON body + Accept: application/json → 200 { url }', async () => {
  const { env } = makeEnv();
  const res = await post(env, '/checkout', JSON.stringify({ offer: 'discovery' }), { 'Content-Type': 'application/json', Accept: 'application/json' });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.url, SESSION.url);
});

await test('POST /checkout validation: unknown offer 404, bad slug 400, bad email 400', async () => {
  const { env } = makeEnv();
  assert.equal((await post(env, '/checkout', 'offer=nope')).status, 404);
  assert.equal((await post(env, '/checkout', 'offer=Bad%20Slug')).status, 400);
  assert.equal((await post(env, '/checkout', 'offer=discovery&email=notanemail')).status, 400);
});

await test('POST /checkout: foreign origin 403, GET 405, missing key 503, Stripe error 502 with code', async () => {
  const { env } = makeEnv();
  assert.equal((await post(env, '/checkout', 'offer=discovery', { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await worker.fetch(new Request(`${API}/checkout`), env)).status, 405);
  assert.equal((await post(makeEnv({ STRIPE_SECRET_KEY: undefined }).env, '/checkout', 'offer=discovery')).status, 503);
  stripeReply = () => ({ status: 400, body: { error: { type: 'invalid_request_error', code: 'resource_missing', message: 'No such price' } } });
  const res = await post(env, '/checkout', 'offer=discovery');
  stripeReply = () => ({ status: 200, body: SESSION });
  assert.equal(res.status, 502);
  assert.equal((await res.json()).code, 'resource_missing');
});

await test('POST /checkout: STRIPE_AUTOMATIC_TAX="true" enables automatic_tax', async () => {
  const { env } = makeEnv({ STRIPE_AUTOMATIC_TAX: 'true' });
  stripeCalls = [];
  await post(env, '/checkout', 'offer=discovery');
  assert.equal(stripeCalls[0].params.get('automatic_tax[enabled]'), 'true');
});

await test('POST /checkout: 21st request from one IP within the hour → 429', async () => {
  const { env } = makeEnv();
  for (let i = 0; i < 20; i++) {
    assert.equal((await post(env, '/checkout', 'offer=discovery', { 'CF-Connecting-IP': '203.0.113.9' })).status, 303);
  }
  const res = await post(env, '/checkout', 'offer=discovery', { 'CF-Connecting-IP': '203.0.113.9' });
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers.get('Retry-After')) > 0);
});

await test('webhook: valid signature records the event and a paid payment; replay is a no-op', async () => {
  const { env, db } = makeEnv();
  const payload = event('checkout.session.completed', paidSession(), { id: 'evt_1' });
  assert.equal((await webhook(env, payload)).status, 200);
  const p = rows(db, 'payments');
  assert.equal(p.length, 1);
  assert.equal(p[0].id, 'cs_test_paid');
  assert.equal(p[0].kind, 'checkout');
  assert.equal(p[0].status, 'paid');
  assert.equal(p[0].amount_total, 450000);
  assert.equal(p[0].currency, 'usd');
  assert.equal(p[0].customer_id, 'cus_1');
  assert.equal(p[0].customer_email, 'client@example.com');
  assert.equal(p[0].offer, 'discovery');
  assert.equal(p[0].invoice_id, 'in_1');
  assert.equal(rows(db, 'stripe_events').length, 1);
  const again = await webhook(env, payload);
  assert.equal(again.status, 200);
  assert.equal((await again.json()).duplicate, true);
  assert.equal(rows(db, 'stripe_events').length, 1);
});

await test('webhook: bad signature 400, stale timestamp 400, wrong secret 400, tampered body 400, no secret 503, non-event 400', async () => {
  const { env, db } = makeEnv();
  const payload = event('checkout.session.completed', paidSession());
  assert.equal((await webhook(env, payload, 't=1,v1=deadbeef')).status, 400);
  assert.equal((await webhook(env, payload, sig(payload, { t: Math.floor(Date.now() / 1000) - 600 }))).status, 400);
  assert.equal((await webhook(env, payload, sig(payload, { secret: 'whsec_other' }))).status, 400);
  assert.equal((await webhook(env, payload, sig(`${payload} `))).status, 400);
  assert.equal((await webhook(makeEnv({ STRIPE_WEBHOOK_SECRET: undefined }).env, payload)).status, 503);
  assert.equal((await webhook(env, 'not json')).status, 400);
  assert.equal(rows(db, 'stripe_events').length, 0);
  assert.equal(rows(db, 'payments').length, 0);
});

await test('webhook: unpaid completed → pending; async_payment_succeeded → paid; a redelivered older state never regresses', async () => {
  const { env, db } = makeEnv();
  const t0 = 1800000000;
  await webhook(env, event('checkout.session.completed', paidSession({ payment_status: 'unpaid' }), { id: 'evt_a', created: t0 }));
  assert.equal(rows(db, 'payments')[0].status, 'pending');
  await webhook(env, event('checkout.session.async_payment_succeeded', paidSession(), { id: 'evt_b', created: t0 + 3600 }));
  assert.equal(rows(db, 'payments')[0].status, 'paid');
  await webhook(env, event('checkout.session.completed', paidSession({ payment_status: 'unpaid' }), { id: 'evt_c', created: t0 }));
  assert.equal(rows(db, 'payments')[0].status, 'paid');
  await webhook(env, event('checkout.session.async_payment_failed', paidSession({ payment_status: 'unpaid' }), { id: 'evt_d', created: t0 + 7200 }));
  assert.equal(rows(db, 'payments')[0].status, 'failed');
  assert.equal(rows(db, 'payments').length, 1);
  assert.equal(rows(db, 'stripe_events').length, 4);
});

await test('webhook: invoice.paid / invoice.payment_failed recorded as invoice payments', async () => {
  const { env, db } = makeEnv();
  const inv = { id: 'in_9', object: 'invoice', customer: 'cus_1', customer_email: 'finance@client.com', amount_paid: 900000, amount_due: 900000, total: 900000, currency: 'usd' };
  await webhook(env, event('invoice.paid', inv, { created: 1800000100 }));
  let p = rows(db, 'payments');
  assert.equal(p.length, 1);
  assert.equal(p[0].kind, 'invoice');
  assert.equal(p[0].status, 'paid');
  assert.equal(p[0].amount_total, 900000);
  assert.equal(p[0].customer_email, 'finance@client.com');
  assert.equal(p[0].invoice_id, 'in_9');
  await webhook(env, event('invoice.payment_failed', { ...inv, amount_paid: 0 }, { created: 1800000200 }));
  p = rows(db, 'payments');
  assert.equal(p.length, 1);
  assert.equal(p[0].status, 'failed');
  assert.equal(p[0].amount_total, 900000);
});

await test('webhook: unrelated event type is recorded but creates no payment; > 256 KB body → 413', async () => {
  const { env, db } = makeEnv();
  assert.equal((await webhook(env, event('customer.created', { id: 'cus_2', object: 'customer' }))).status, 200);
  assert.equal(rows(db, 'stripe_events').length, 1);
  assert.equal(rows(db, 'payments').length, 0);
  const big = JSON.stringify({ id: 'evt_big', type: 'x', created: 1, data: { object: { pad: 'a'.repeat(262144) } } });
  assert.equal((await webhook(env, big)).status, 413);
});

await test('unit: verifyWebhookSignature accepts any matching v1 and nothing else; formEncode nests Stripe-style', async () => {
  const payload = '{"id":"evt_x"}';
  const t = Math.floor(Date.now() / 1000);
  const good = createHmac('sha256', WH_SECRET).update(`${t}.${payload}`).digest('hex');
  assert.equal(await verifyWebhookSignature(payload, `t=${t},v1=${'0'.repeat(64)},v1=${good}`, WH_SECRET), true);
  assert.equal(await verifyWebhookSignature(payload, `t=${t},v1=${good}`, 'whsec_other'), false);
  assert.equal(await verifyWebhookSignature(payload, `t=${t},v0=${good}`, WH_SECRET), false);
  assert.equal(await verifyWebhookSignature(payload, `v1=${good}`, WH_SECRET), false);
  assert.equal(formEncode({ a: { b: [{ c: 1 }, 'x'] }, d: true, e: null }).toString(), 'a%5Bb%5D%5B0%5D%5Bc%5D=1&a%5Bb%5D%5B1%5D=x&d=true');
});

console.log(`\n${passed} passed${process.exitCode ? ', some FAILED' : ''}`);
