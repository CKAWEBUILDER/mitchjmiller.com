/**
 * mitchjmiller-api — contact/lead intake for mitchjmiller.com.
 *
 * Routes
 *   GET  /health          → { ok: true, service, time }
 *   POST /contact         → validates, verifies Turnstile, rate-limits (5/IP/hour via KV), inserts into D1
 *   POST /checkout        → offer slug (server-side price allowlist) → 303 to Stripe-hosted Checkout; 20/IP/hour
 *   POST /stripe/webhook  → Stripe-Signature verified, recorded once per event id, payments upserted (src/stripe.js)
 *   OPTIONS *             → CORS preflight for allowlisted origins
 *
 * Bindings: LEADS (D1), RATE (KV). Vars: ALLOWED_ORIGINS, STRIPE_PRICES, STRIPE_AUTOMATIC_TAX, CHECKOUT_SUCCESS_URL,
 * CHECKOUT_CANCEL_URL. Secrets: TURNSTILE_SECRET, IP_SALT, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
 * Stripe contract and runbook: docs/stripe/README.md.
 * Accepts application/json, application/x-www-form-urlencoded or multipart/form-data. The body is read through a
 * byte-counting stream reader and rejected with 413 past 16,384 bytes regardless of Content-Length; every field is
 * capped server-side in validate().
 * Form contract is documented in docs/cloudflare/README.md.
 */

import { createCheckoutSession, verifyWebhookSignature, paymentFromEvent } from './stripe.js';

const LIMITS = { name: 120, email: 254, topic: 120, message: 4000, source_url: 512, token: 2048, body: 16384, offer: 64, ref: 64, webhook: 262144 };
const RATE_LIMIT = 5;
const CHECKOUT_RATE_LIMIT = 20;
const OFFER_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const REF_RE = /^[A-Za-z0-9_-]{1,64}$/;
const RATE_WINDOW_S = 3600;
const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Max-Age': '86400' } });
    }

    try {
      if (url.pathname === '/health' && request.method === 'GET') {
        return json({ ok: true, service: 'mitchjmiller-api', time: new Date().toISOString() }, 200, cors);
      }
      if (url.pathname === '/contact') {
        if (request.method !== 'POST') {
          return json({ ok: false, error: 'method_not_allowed' }, 405, { ...cors, Allow: 'POST, OPTIONS' });
        }
        if (origin && !cors['Access-Control-Allow-Origin']) {
          return json({ ok: false, error: 'origin_not_allowed' }, 403, cors);
        }
        return await handleContact(request, env, cors);
      }
      if (url.pathname === '/checkout') {
        if (request.method !== 'POST') {
          return json({ ok: false, error: 'method_not_allowed' }, 405, { ...cors, Allow: 'POST, OPTIONS' });
        }
        if (origin && !cors['Access-Control-Allow-Origin']) {
          return json({ ok: false, error: 'origin_not_allowed' }, 403, cors);
        }
        return await handleCheckout(request, env, cors);
      }
      if (url.pathname === '/stripe/webhook') {
        // Server-to-server from Stripe: no browser origin or CORS; authenticity comes from the signature, not the caller.
        if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, { Allow: 'POST' });
        return await handleStripeWebhook(request, env);
      }
      return json({ ok: false, error: 'not_found' }, 404, cors);
    } catch (err) {
      console.error('unhandled error', err && err.message);
      return json({ ok: false, error: 'server_error' }, 500, cors);
    }
  },
};

async function handleContact(request, env, cors) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > LIMITS.body) return json({ ok: false, error: 'payload_too_large' }, 413, cors);

  const type = (request.headers.get('Content-Type') || '').toLowerCase();
  if (!supportedType(type)) return json({ ok: false, error: 'unsupported_media_type' }, 415, cors);

  // Count the bytes actually received, whatever Content-Length claims (chunked bodies have none).
  const body = await readBodyBounded(request, LIMITS.body);
  if (body === null) return json({ ok: false, error: 'payload_too_large' }, 413, cors);

  const fields = await parseFields(request.headers.get('Content-Type') || '', body);

  const { data, errors } = validate(fields);
  if (Object.keys(errors).length) return json({ ok: false, error: 'validation', fields: errors }, 400, cors);

  if (!env.TURNSTILE_SECRET || !env.IP_SALT) {
    console.error('missing TURNSTILE_SECRET or IP_SALT secret');
    return json({ ok: false, error: 'not_configured' }, 503, cors);
  }

  const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = (await sha256Hex(`${env.IP_SALT}|${ip}`)).slice(0, 32);

  const limited = await rateLimit(env.RATE, `rl:${ipHash}`);
  if (limited) {
    return json({ ok: false, error: 'rate_limited', retry_after_s: limited }, 429, { ...cors, 'Retry-After': String(limited) });
  }

  const ts = await verifyTurnstile(env.TURNSTILE_SECRET, data.turnstileToken, ip);
  if (!ts.success) {
    return json({ ok: false, error: 'turnstile_failed', codes: ts['error-codes'] || [] }, 403, cors);
  }

  const id = crypto.randomUUID();
  await env.LEADS.prepare(
    'INSERT INTO leads (id, created_at, name, email, topic, message, source_url, user_agent, ip_hash, turnstile_ok) VALUES (?,?,?,?,?,?,?,?,?,?)',
  )
    .bind(
      id,
      new Date().toISOString(),
      data.name,
      data.email,
      data.topic || null,
      data.message,
      data.source_url || null,
      (request.headers.get('User-Agent') || '').slice(0, 512),
      ipHash,
      1,
    )
    .run();

  return json({ ok: true, id }, 200, cors);
}

/**
 * POST /checkout — form or JSON { offer, email?, ref? } → 303 to Stripe-hosted Checkout, or 200 { url } when the client sends
 * Accept: application/json. `offer` must be a key of the STRIPE_PRICES var; the amount is never taken from the request.
 */
async function handleCheckout(request, env, cors) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > LIMITS.body) return json({ ok: false, error: 'payload_too_large' }, 413, cors);
  const rawType = request.headers.get('Content-Type') || '';
  if (!supportedType(rawType.toLowerCase())) return json({ ok: false, error: 'unsupported_media_type' }, 415, cors);
  const body = await readBodyBounded(request, LIMITS.body);
  if (body === null) return json({ ok: false, error: 'payload_too_large' }, 413, cors);
  const fields = await parseFields(rawType, body);

  const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max + 1) : '');
  const offer = str(fields.offer, LIMITS.offer);
  const email = str(fields.email, LIMITS.email);
  const ref = str(fields.ref, LIMITS.ref);
  const errors = {};
  if (!OFFER_RE.test(offer)) errors.offer = 'required';
  if (email && (email.length > LIMITS.email || !EMAIL_RE.test(email))) errors.email = 'invalid';
  if (ref && !REF_RE.test(ref)) errors.ref = 'invalid';
  if (Object.keys(errors).length) return json({ ok: false, error: 'validation', fields: errors }, 400, cors);

  const priceId = parsePrices(env.STRIPE_PRICES)[offer];
  if (!priceId) return json({ ok: false, error: 'unknown_offer' }, 404, cors);
  if (!env.STRIPE_SECRET_KEY || !env.IP_SALT || !env.CHECKOUT_SUCCESS_URL || !env.CHECKOUT_CANCEL_URL) {
    console.error('missing STRIPE_SECRET_KEY / IP_SALT secret or CHECKOUT_*_URL var');
    return json({ ok: false, error: 'not_configured' }, 503, cors);
  }

  const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = (await sha256Hex(`${env.IP_SALT}|${ip}`)).slice(0, 32);
  const limited = await rateLimit(env.RATE, `co:${ipHash}`, CHECKOUT_RATE_LIMIT);
  if (limited) {
    return json({ ok: false, error: 'rate_limited', retry_after_s: limited }, 429, { ...cors, 'Retry-After': String(limited) });
  }

  const res = await createCheckoutSession(env, {
    priceId,
    offer,
    email: email || undefined,
    clientReferenceId: ref || undefined,
    successUrl: env.CHECKOUT_SUCCESS_URL,
    cancelUrl: env.CHECKOUT_CANCEL_URL,
  });
  if (!res.ok || !res.body || typeof res.body.url !== 'string') {
    const e = (res.body && res.body.error) || {};
    console.error('stripe checkout.sessions.create failed', res.status, e.type, e.code, e.message);
    return json({ ok: false, error: 'stripe_error', code: e.code || null }, 502, cors);
  }
  if ((request.headers.get('Accept') || '').includes('application/json')) {
    return json({ ok: true, url: res.body.url, id: res.body.id }, 200, cors);
  }
  return new Response(null, { status: 303, headers: { ...cors, Location: res.body.url, 'Cache-Control': 'no-store' } });
}

/** STRIPE_PRICES var: JSON object { "<offer-slug>": "price_…" }. Anything else counts as an empty catalog. */
function parsePrices(raw) {
  try {
    const parsed = JSON.parse(raw || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * POST /stripe/webhook — verify Stripe-Signature over the raw body, record the event once (stripe_events primary key), then
 * upsert the payment row. Any thrown error becomes a 500 from the outer handler, and Stripe retries the delivery.
 */
async function handleStripeWebhook(request, env) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error('missing STRIPE_WEBHOOK_SECRET secret');
    return json({ ok: false, error: 'not_configured' }, 503);
  }
  const bytes = await readBodyBounded(request, LIMITS.webhook);
  if (bytes === null) return json({ ok: false, error: 'payload_too_large' }, 413);
  const payload = new TextDecoder().decode(bytes);
  const verified = await verifyWebhookSignature(payload, request.headers.get('Stripe-Signature'), env.STRIPE_WEBHOOK_SECRET);
  if (!verified) return json({ ok: false, error: 'bad_signature' }, 400);

  let event = null;
  try {
    event = JSON.parse(payload);
  } catch {
    event = null;
  }
  if (!event || typeof event.id !== 'string' || typeof event.type !== 'string') return json({ ok: false, error: 'bad_event' }, 400);

  const objectId = event.data && event.data.object && typeof event.data.object.id === 'string' ? event.data.object.id : null;
  const inserted = await env.LEADS.prepare('INSERT OR IGNORE INTO stripe_events (id, type, created, object_id, received_at) VALUES (?,?,?,?,?)')
    .bind(event.id, event.type, Number(event.created) || 0, objectId, new Date().toISOString())
    .run();
  if (!inserted.meta || inserted.meta.changes === 0) return json({ ok: true, duplicate: true }, 200);

  const payment = paymentFromEvent(event);
  if (payment) {
    await env.LEADS.prepare(
      `INSERT INTO payments (id, kind, status, amount_total, currency, customer_id, customer_email, offer, invoice_id, event_id, event_type, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
       ON CONFLICT(id) DO UPDATE SET status = excluded.status, amount_total = excluded.amount_total, currency = excluded.currency,
         customer_id = excluded.customer_id, customer_email = excluded.customer_email, invoice_id = excluded.invoice_id,
         event_id = excluded.event_id, event_type = excluded.event_type, updated_at = excluded.updated_at
       WHERE excluded.updated_at >= payments.updated_at`,
    )
      .bind(
        payment.id,
        payment.kind,
        payment.status,
        payment.amount_total,
        payment.currency,
        payment.customer_id,
        payment.customer_email,
        payment.offer,
        payment.invoice_id,
        payment.event_id,
        payment.event_type,
        payment.updated_at,
      )
      .run();
    console.log('stripe payment', payment.kind, payment.id, payment.status, payment.amount_total, payment.currency);
  }
  return json({ ok: true }, 200);
}

function supportedType(type) {
  return type.includes('application/json') || type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data');
}

/**
 * Read the body through a stream reader with a byte counter. Returns a Uint8Array, or null as soon as more than
 * `limit` bytes have arrived (the rest is never read), regardless of any Content-Length header.
 */
async function readBodyBounded(request, limit) {
  if (!request.body) return new Uint8Array(0);
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) {
        try {
          await reader.cancel();
        } catch {
          /* ignore */
        }
        return null;
      }
      chunks.push(value);
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      /* ignore */
    }
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.byteLength;
  }
  return out;
}

/** Parse an already-bounded body. Unparseable input yields {} so validation reports the missing fields. */
async function parseFields(rawType, bytes) {
  const type = rawType.toLowerCase();
  if (type.includes('application/json')) {
    try {
      const parsed = JSON.parse(new TextDecoder().decode(bytes));
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  try {
    const form = await new Response(bytes, { headers: { 'Content-Type': rawType } }).formData();
    const out = {};
    for (const [k, v] of form.entries()) if (typeof v === 'string') out[k] = v;
    return out;
  } catch {
    return {};
  }
}

function validate(fields) {
  const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max + 1) : '');
  const data = {
    name: str(fields.name, LIMITS.name),
    email: str(fields.email, LIMITS.email),
    topic: str(fields.topic, LIMITS.topic),
    message: str(fields.message, LIMITS.message),
    source_url: str(fields.source_url, LIMITS.source_url),
    turnstileToken: str(fields.turnstileToken || fields['cf-turnstile-response'], LIMITS.token),
  };
  const errors = {};
  if (!data.name) errors.name = 'required';
  else if (data.name.length > LIMITS.name) errors.name = `max ${LIMITS.name} characters`;
  if (!data.email) errors.email = 'required';
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = 'invalid';
  if (data.topic.length > LIMITS.topic) errors.topic = `max ${LIMITS.topic} characters`;
  if (!data.message) errors.message = 'required';
  else if (data.message.length > LIMITS.message) errors.message = `max ${LIMITS.message} characters`;
  if (data.source_url && (data.source_url.length > LIMITS.source_url || !/^https?:\/\//i.test(data.source_url))) {
    errors.source_url = 'must be an http(s) URL';
  }
  if (!data.turnstileToken) errors.turnstileToken = 'required';
  else if (data.turnstileToken.length > LIMITS.token) errors.turnstileToken = 'invalid';
  return { data, errors };
}

/** Fixed-window counter in KV. Returns seconds until reset when over the limit, else 0. */
async function rateLimit(kv, key, limit = RATE_LIMIT) {
  const now = Math.floor(Date.now() / 1000);
  let state = null;
  try {
    state = await kv.get(key, 'json');
  } catch {
    state = null;
  }
  if (!state || typeof state.resetAt !== 'number' || state.resetAt <= now) {
    state = { count: 0, resetAt: now + RATE_WINDOW_S };
  }
  if (state.count >= limit) return Math.max(state.resetAt - now, 1);
  state.count += 1;
  await kv.put(key, JSON.stringify(state), { expiration: state.resetAt + 60 });
  return 0;
}

async function verifyTurnstile(secret, token, ip) {
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body });
    return await res.json();
  } catch (err) {
    console.error('turnstile verify failed', err && err.message);
    return { success: false, 'error-codes': ['verify_unavailable'] };
  }
}

async function sha256Hex(input) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function corsHeaders(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const headers = { Vary: 'Origin' };
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept';
  }
  return headers;
}

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}
