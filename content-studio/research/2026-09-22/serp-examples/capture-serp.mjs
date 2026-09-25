#!/usr/bin/env node
/**
 * SERP capture for Mitch Miller's "search results by intent" expanded post.
 * Uses the repo's existing puppeteer-core + local-Chrome helper — no new deps.
 * US English (hl=en&gl=us). Desktop 1280 wide full-page + mobile 390 wide full-page.
 *
 * Run: node content-studio/research/2026-09-22/serp-examples/capture-serp.mjs
 */
import { launch } from '../../../viz/kit/export/lib/browser.mjs';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;

const QUERIES = [
  { intent: 'informational', n: 1, q: 'what is answer engine optimization' },
  { intent: 'informational', n: 2, q: 'what is generative engine optimization' },
  { intent: 'commercial', n: 1, q: 'ahrefs vs semrush' },
  { intent: 'commercial', n: 2, q: 'best AEO consultant' },
  { intent: 'transactional', n: 1, q: 'hire seo consultant' },
  { intent: 'transactional', n: 2, q: 'seo audit service pricing' },
  { intent: 'navigational', n: 1, q: 'mitchjmiller.com' },
  { intent: 'navigational', n: 2, q: 'mitchell miller seo' },
  { intent: 'local', n: 1, q: 'seo consultant near me' },
  { intent: 'local', n: 2, q: 'surf lessons waikiki' },
];

const DESKTOP_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const MOBILE_UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36';

const BLOCK_RE = /unusual traffic|captcha|recaptcha|before you continue|consent\.google|our systems have detected/i;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function captureOne(browser, item) {
  const record = {
    query: item.q,
    intent: item.intent,
    n: item.n,
    retrieved_at: new Date().toISOString(),
    hl_gl: 'hl=en&gl=us',
    status: 'pending',
  };
  const url = `https://www.google.com/search?q=${encodeURIComponent(item.q)}&hl=en&gl=us&num=10`;
  record.url = url;

  const page = await browser.newPage();
  try {
    // ---- Desktop ----
    await page.setUserAgent(DESKTOP_UA);
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
    const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    await sleep(1800);

    const pageTitle = await page.title();
    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 3000));
    const blocked = BLOCK_RE.test(bodyText) || BLOCK_RE.test(pageTitle);

    record.httpStatus = resp ? resp.status() : null;
    record.pageTitle = pageTitle;
    record.blockedSignal = blocked;
    record.bodyTextSnippet = bodyText.slice(0, 400);

    const desktopFile = `${item.intent}-${item.n}-desktop.png`;
    await page.screenshot({ path: join(OUT_DIR, desktopFile), fullPage: true });
    record.desktopFile = desktopFile;

    // ---- Mobile ----
    await page.setUserAgent(MOBILE_UA);
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    await sleep(1800);
    const mobileFile = `${item.intent}-${item.n}-mobile.png`;
    await page.screenshot({ path: join(OUT_DIR, mobileFile), fullPage: true });
    record.mobileFile = mobileFile;

    record.status = blocked ? 'blocked' : 'ok';
  } catch (err) {
    record.status = 'error';
    record.error = String(err).slice(0, 500);
  } finally {
    await page.close();
  }
  return record;
}

async function main() {
  const browser = await launch();
  const results = [];
  try {
    for (const item of QUERIES) {
      const record = await captureOne(browser, item);
      results.push(record);
      console.log(`${record.status.toUpperCase()}  ${item.intent}-${item.n}  "${item.q}"`);
    }
  } finally {
    await browser.close();
  }
  writeFileSync(join(OUT_DIR, 'capture-log.json'), JSON.stringify(results, null, 2));
  console.log('\nWrote capture-log.json');
}

main().catch(e => { console.error(e); process.exit(1); });
