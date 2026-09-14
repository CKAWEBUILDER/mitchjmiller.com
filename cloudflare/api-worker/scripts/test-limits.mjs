#!/usr/bin/env node
/**
 * Request-size regression tests for the contact Worker.
 *   node cloudflare/api-worker/scripts/test-limits.mjs                       # local: imports src/index.js, no network
 *   node cloudflare/api-worker/scripts/test-limits.mjs --live <base-url>     # probes a deployed Worker
 * Key case: an 18,114-byte body sent WITHOUT Content-Length (chunked) must get 413, not 200.
 */
import assert from 'node:assert/strict';

const args = process.argv.slice(2);
const liveIdx = args.indexOf('--live');
const live = liveIdx >= 0 ? (args[liveIdx + 1] || 'https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev').replace(/\/$/, '') : null;
const BIG = 18114;
const LIMIT = 16384;

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
const streamOf = (text) =>
  new ReadableStream({
    start(controller) {
      const bytes = new TextEncoder().encode(text);
      for (let i = 0; i < bytes.length; i += 4096) controller.enqueue(bytes.slice(i, i + 4096));
      controller.close();
    },
  });
const formBody = (bytes) => `name=Probe&email=probe%40example.com&turnstileToken=x&message=${'a'.repeat(Math.max(bytes - 60, 1))}`;
const exactForm = (bytes) => {
  let body = formBody(bytes);
  while (body.length < bytes) body += 'a';
  return body.slice(0, bytes);
};

if (!live) {
  const { default: worker } = await import('../src/index.js');
  const env = { ALLOWED_ORIGINS: 'https://mitchjmiller.com' };
  const url = 'https://api.test/contact';
  const post = (headers, body, extra = {}) => worker.fetch(new Request(url, { method: 'POST', headers, body, ...extra }), env);

  await test(`${BIG}-byte form body streamed without Content-Length → 413`, async () => {
    const req = new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: streamOf(exactForm(BIG)), duplex: 'half' });
    assert.equal(req.headers.get('Content-Length'), null, 'test setup: no Content-Length');
    const res = await worker.fetch(req, env);
    assert.equal(res.status, 413);
    assert.equal((await res.json()).error, 'payload_too_large');
  });
  await test(`${BIG}-byte JSON body streamed without Content-Length → 413`, async () => {
    const body = JSON.stringify({ name: 'Probe', email: 'probe@example.com', turnstileToken: 'x', message: 'a'.repeat(BIG) });
    const res = await post({ 'Content-Type': 'application/json' }, streamOf(body), { duplex: 'half' });
    assert.equal(res.status, 413);
  });
  await test(`${BIG}-byte multipart body streamed without Content-Length → 413`, async () => {
    const boundary = 'probe-boundary';
    const body = `--${boundary}\r\nContent-Disposition: form-data; name="message"\r\n\r\n${'a'.repeat(BIG)}\r\n--${boundary}--\r\n`;
    const res = await post({ 'Content-Type': `multipart/form-data; boundary=${boundary}` }, streamOf(body), { duplex: 'half' });
    assert.equal(res.status, 413);
  });
  await test(`body of exactly ${LIMIT} bytes is read; oversized message field → 400 validation`, async () => {
    const res = await post({ 'Content-Type': 'application/x-www-form-urlencoded' }, exactForm(LIMIT));
    assert.equal(res.status, 400);
    const out = await res.json();
    assert.equal(out.error, 'validation');
    assert.match(out.fields.message, /max 4000/);
  });
  await test('normal-size body with a 4001-char message → 400 validation (field cap)', async () => {
    const res = await post({ 'Content-Type': 'application/json' }, JSON.stringify({ name: 'Probe', email: 'probe@example.com', turnstileToken: 'x', message: 'a'.repeat(4001) }));
    assert.equal(res.status, 400);
    assert.match((await res.json()).fields.message, /max 4000/);
  });
  await test('name 121 chars and topic 121 chars → field errors', async () => {
    const res = await post({ 'Content-Type': 'application/json' }, JSON.stringify({ name: 'n'.repeat(121), email: 'probe@example.com', topic: 't'.repeat(121), turnstileToken: 'x', message: 'hi' }));
    const out = await res.json();
    assert.equal(res.status, 400);
    assert.match(out.fields.name, /max 120/);
    assert.match(out.fields.topic, /max 120/);
  });
  await test('valid small body without secrets → 503 not_configured (body was parsed, limits passed)', async () => {
    const res = await post({ 'Content-Type': 'application/json' }, JSON.stringify({ name: 'Probe', email: 'probe@example.com', turnstileToken: 'x', message: 'hello' }));
    assert.equal(res.status, 503);
  });
  await test('unsupported content type → 415 before reading the body', async () => {
    const res = await post({ 'Content-Type': 'text/plain' }, 'hello');
    assert.equal(res.status, 415);
  });
  await test('GET /health → 200', async () => {
    const res = await worker.fetch(new Request('https://api.test/health'), env);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).ok, true);
  });
} else {
  const post = (headers, body, extra = {}) => fetch(`${live}/contact`, { method: 'POST', headers, body, ...extra });
  await test('GET /health → 200 ok', async () => {
    const res = await fetch(`${live}/health`);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).ok, true);
  });
  await test(`${BIG}-byte form body, chunked (no Content-Length) → 413`, async () => {
    const res = await post({ 'Content-Type': 'application/x-www-form-urlencoded' }, streamOf(exactForm(BIG)), { duplex: 'half' });
    assert.equal(res.status, 413, `got ${res.status}`);
    assert.equal((await res.json()).error, 'payload_too_large');
  });
  await test(`${BIG}-byte JSON body with Content-Length → 413`, async () => {
    const res = await post({ 'Content-Type': 'application/json' }, JSON.stringify({ name: 'Probe', email: 'probe@example.com', turnstileToken: 'x', message: 'a'.repeat(BIG) }));
    assert.equal(res.status, 413);
  });
  await test('4001-char message (under the body limit) → 400 validation, message max 4000', async () => {
    const res = await post({ 'Content-Type': 'application/json' }, JSON.stringify({ name: 'Probe', email: 'probe@example.com', turnstileToken: 'x', message: 'a'.repeat(4001) }));
    assert.equal(res.status, 400);
    assert.match((await res.json()).fields.message, /max 4000/);
  });
  await test('unsupported content type → 415', async () => {
    const res = await post({ 'Content-Type': 'text/plain' }, 'hello');
    assert.equal(res.status, 415);
  });
  await test('GET /contact → 405', async () => {
    const res = await fetch(`${live}/contact`);
    assert.equal(res.status, 405);
  });
  await test('disallowed Origin → 403', async () => {
    const res = await post({ 'Content-Type': 'application/json', Origin: 'https://evil.example' }, '{}');
    assert.equal(res.status, 403);
  });
}
console.log(`\n${passed} ${live ? 'live' : 'local'} checks passed${process.exitCode ? ', some FAILED' : ''}`);
