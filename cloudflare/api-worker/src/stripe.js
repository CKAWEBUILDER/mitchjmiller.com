/**
 * Stripe helpers for the mitchjmiller-api Worker: a thin REST client (form-encoded over fetch), hosted Checkout Session
 * creation, webhook signature verification and event → payment mapping. No SDK: the Worker is dependency-free, Stripe's
 * API is plain HTTPS, and signature verification is one WebCrypto HMAC.
 * Docs: https://docs.stripe.com/api/checkout/sessions/create.md · https://docs.stripe.com/webhooks.md#verify-events
 * Runbook and contract: docs/stripe/README.md
 */

export const STRIPE_API_VERSION = '2026-08-26.dahlia';
const STRIPE_API = 'https://api.stripe.com';
/** Fixed label (+ 8 random letters, per Stripe guidance) that groups these sessions in the Dashboard's checkout-flow view. */
export const INTEGRATION_IDENTIFIER = 'mj2_hosted_checkout_ktqzrvwm';
const enc = (s) => new TextEncoder().encode(s);

/** Flatten nested params into Stripe's form encoding: { a: { b: [x] } } → a[b][0]=x. null/undefined values are omitted. */
export function formEncode(params, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item === undefined || item === null) return;
        if (typeof item === 'object') formEncode(item, `${key}[${i}]`, out);
        else out.append(`${key}[${i}]`, String(item));
      });
    } else if (typeof v === 'object') formEncode(v, key, out);
    else out.append(key, String(v));
  }
  return out;
}

/** One Stripe API call. Resolves { ok, status, body } (body = parsed JSON or null). The key is never logged. */
export async function stripeRequest(secretKey, method, path, params = {}, { idempotencyKey } = {}) {
  const headers = { Authorization: `Bearer ${secretKey}`, 'Stripe-Version': STRIPE_API_VERSION };
  let url = `${STRIPE_API}${path}`;
  let body;
  if (method === 'GET') {
    const qs = formEncode(params).toString();
    if (qs) url += `?${qs}`;
  } else {
    body = formEncode(params).toString();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
  }
  const res = await fetch(url, { method, headers, body });
  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, body: json };
}

/**
 * Stripe-hosted Checkout for a one-time engagement payment. `priceId` comes from the server-side STRIPE_PRICES allowlist,
 * never from the browser. No payment_method_types (dynamic payment methods from the Dashboard). automatic_tax is on only
 * when STRIPE_AUTOMATIC_TAX="true" — flip it after Tax Settings show an active registration (docs/stripe/README.md §6),
 * otherwise Stripe silently collects nothing.
 */
export async function createCheckoutSession(env, { priceId, offer, email, clientReferenceId, successUrl, cancelUrl, quantity = 1 }) {
  const params = {
    mode: 'payment',
    line_items: [{ price: priceId, quantity }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_creation: 'always', // one Customer per payer, so later invoices attach to the same record
    invoice_creation: { enabled: true }, // post-payment invoice + PDF for business clients
    tax_id_collection: { enabled: true }, // business tax IDs → B2B / reverse-charge treatment under Stripe Tax
    automatic_tax: { enabled: env.STRIPE_AUTOMATIC_TAX === 'true' },
    integration_identifier: INTEGRATION_IDENTIFIER,
    metadata: { offer },
    customer_email: email,
    client_reference_id: clientReferenceId,
  };
  return stripeRequest(env.STRIPE_SECRET_KEY, 'POST', '/v1/checkout/sessions', params, { idempotencyKey: crypto.randomUUID() });
}

/**
 * Verify a `Stripe-Signature` header: HMAC-SHA256(secret, `${t}.${payload}`) must match one of the v1 signatures and t must
 * be within `toleranceS` of now. `payload` is the raw request body, byte for byte. Comparison runs inside crypto.subtle.verify.
 */
export async function verifyWebhookSignature(payload, header, secret, { toleranceS = 300, now = Date.now() / 1000 } = {}) {
  if (!header || !secret) return false;
  let t = NaN;
  const sigs = [];
  for (const part of header.split(',')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k === 't') t = Number(v);
    else if (k === 'v1' && /^[0-9a-f]{64}$/i.test(v)) sigs.push(v);
  }
  if (!Number.isFinite(t) || !sigs.length || Math.abs(now - t) > toleranceS) return false;
  const key = await crypto.subtle.importKey('raw', enc(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const data = enc(`${t}.${payload}`);
  for (const s of sigs) {
    if (await crypto.subtle.verify('HMAC', key, hexToBytes(s), data)) return true;
  }
  return false;
}

function hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

/**
 * Map a verified event to a `payments` row, or null when the event carries nothing to record. A Checkout Session counts as
 * paid only when payment_status !== 'unpaid': delayed-notification methods complete the session before the money arrives,
 * then send async_payment_succeeded / async_payment_failed. updated_at is event.created so redeliveries never regress state.
 */
export function paymentFromEvent(event) {
  const o = event && event.data && event.data.object;
  if (!o || typeof o.id !== 'string') return null;
  const base = {
    event_id: event.id,
    event_type: event.type,
    updated_at: new Date((Number(event.created) || 0) * 1000).toISOString(),
    customer_id: typeof o.customer === 'string' ? o.customer : null,
    currency: typeof o.currency === 'string' ? o.currency : null,
  };
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
    case 'checkout.session.async_payment_failed':
      return {
        ...base,
        id: o.id,
        kind: 'checkout',
        status: event.type.endsWith('failed') ? 'failed' : o.payment_status === 'unpaid' ? 'pending' : 'paid',
        amount_total: Number.isFinite(o.amount_total) ? o.amount_total : null,
        customer_email: (o.customer_details && o.customer_details.email) || o.customer_email || null,
        offer: (o.metadata && o.metadata.offer) || null,
        invoice_id: typeof o.invoice === 'string' ? o.invoice : null,
      };
    case 'invoice.paid':
    case 'invoice.payment_failed':
      return {
        ...base,
        id: o.id,
        kind: 'invoice',
        status: event.type === 'invoice.paid' ? 'paid' : 'failed',
        amount_total: Number.isFinite(o.total) ? o.total : Number.isFinite(o.amount_paid) ? o.amount_paid : null,
        customer_email: o.customer_email || null,
        offer: null,
        invoice_id: o.id,
      };
    default:
      return null;
  }
}
