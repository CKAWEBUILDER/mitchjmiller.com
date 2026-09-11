/**
 * mitchjmiller-api — contact/lead intake for mitchjmiller.com.
 *
 * Routes
 *   GET  /health   → { ok: true, service, time }
 *   POST /contact  → validates, verifies Turnstile, rate-limits (5/IP/hour via KV), inserts into D1
 *   OPTIONS *      → CORS preflight for allowlisted origins
 *
 * Bindings: LEADS (D1), RATE (KV). Vars: ALLOWED_ORIGINS. Secrets: TURNSTILE_SECRET, IP_SALT.
 * Accepts application/json, application/x-www-form-urlencoded or multipart/form-data.
 * Form contract is documented in docs/cloudflare/README.md.
 */

const LIMITS = { name: 120, email: 254, topic: 120, message: 4000, source_url: 512, token: 2048, body: 16384 };
const RATE_LIMIT = 5;
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

  const fields = await readFields(request);
  if (!fields) return json({ ok: false, error: 'unsupported_media_type' }, 415, cors);

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

async function readFields(request) {
  const type = (request.headers.get('Content-Type') || '').toLowerCase();
  if (type.includes('application/json')) {
    const text = await request.text();
    if (text.length > LIMITS.body) return null;
    try {
      const parsed = JSON.parse(text);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    const form = await request.formData();
    const out = {};
    for (const [k, v] of form.entries()) if (typeof v === 'string') out[k] = v;
    return out;
  }
  return null;
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
async function rateLimit(kv, key) {
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
  if (state.count >= RATE_LIMIT) return Math.max(state.resetAt - now, 1);
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
