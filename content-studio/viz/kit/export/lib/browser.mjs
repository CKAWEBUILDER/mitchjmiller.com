/**
 * Chrome discovery + launch for the kit's exporters.
 *
 * Same approach as ../../../scripts/qa/browser.mjs: puppeteer-core driving the
 * Chrome that is already installed on this Mac, honouring CHROME_PATH. The kit
 * deliberately does not depend on `puppeteer` (which downloads its own browser)
 * and does not add anything to the repo's root package.json — puppeteer-core is
 * resolved from the repo root by normal Node module resolution.
 */
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { basename, dirname, join, resolve } from 'node:path';

const CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
].filter(Boolean);

export function chromePath() {
  const found = CANDIDATES.find(p => existsSync(p));
  if (!found) {
    throw new Error(
      `No Chrome found. Tried:\n  ${CANDIDATES.join('\n  ')}\nSet CHROME_PATH=/path/to/Chrome and re-run.`,
    );
  }
  return found;
}

export async function launch(extraArgs = []) {
  const puppeteer = (await import('puppeteer-core')).default;
  return puppeteer.launch({
    executablePath: chromePath(),
    headless: true,
    args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb', '--disable-lcd-text', ...extraArgs],
  });
}

/** Build a file:// URL for the template with export parameters applied. */
export function vizUrl(templateAbsPath, params = {}) {
  const url = pathToFileURL(templateAbsPath);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue;
    url.searchParams.set(k, String(v));
  }
  return url.href;
}

/**
 * Open the template, block every non-file request (the artifact must be
 * self-contained; anything reaching the network is a defect), and wait until
 * the export API reports first paint.
 */
export async function openViz(browser, url, { width, height, deviceScaleFactor = 1, reducedMotion = false } = {}) {
  const page = await browser.newPage();
  const errors = [];
  const external = [];
  page.on('pageerror', e => errors.push(`pageerror: ${String(e).slice(0, 300)}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 300)}`); });
  await page.setRequestInterception(true);
  page.on('request', req => {
    if (!req.url().startsWith('file:') && !req.url().startsWith('data:') && !req.url().startsWith('about:')) {
      external.push(req.url());
      return req.abort('blockedbyclient');
    }
    req.continue();
  });
  await page.setViewport({ width, height, deviceScaleFactor });
  if (reducedMotion) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction(() => window.VIZ && window.VIZ.ready, { timeout: 30000 });
  await page.evaluate(() => window.VIZ.ready);
  await page.waitForFunction(() => document.documentElement.dataset.ready === '1', { timeout: 30000 });
  return { page, errors, external };
}

export const ms = start => `${(Number(process.hrtime.bigint() - start) / 1e6).toFixed(0)} ms`;
export const now = () => process.hrtime.bigint();

/* ------------------------------------------------------- output naming
   An artifact normally lives at ../<slug>/index.html, so the file basename is
   useless as a name — every artifact would export index-poster-1200x1500.png.
   Rule: use the basename, unless it is "index", in which case use the folder. */
export function artifactName(templateAbsPath) {
  const base = basename(templateAbsPath).replace(/\.html?$/i, '');
  return base.toLowerCase() === 'index' ? basename(dirname(templateAbsPath)) : base;
}

/* Default output directory: exports land beside the artifact they came from, so
   running the kit against ../<slug>/index.html writes ../<slug>/exports/… and
   never overwrites the kit's own exports/. */
export function defaultOutDir(templateAbsPath, sub = '') {
  const base = join(resolve(dirname(templateAbsPath)), 'exports');
  return sub ? join(base, sub) : base;
}
