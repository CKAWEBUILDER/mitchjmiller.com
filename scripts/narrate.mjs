#!/usr/bin/env node
/**
 * Narrated audio for posts (docs/site-standards.md "Accessibility"), macOS only.
 * Renders the post's title and body prose (scripts/lib/narration.mjs) with `say` using the best
 * installed voice for the language, encodes mono AAC at 48 kbps constant bit rate with
 * `afconvert`, writes public/audio/[es/]blog/<slug>.m4a and records voice, duration, size and the
 * text hash in site/data/narration.json. The post page renders "Listen to this article (N min)"
 * from that record; scripts/verify-standards.mjs fails on a missing or stale narration.
 *
 *   npm run narrate -- <slug> [<slug> …]          English posts by slug
 *   npm run narrate -- --lang es <slug>           the Spanish translation of a post
 *   npm run narrate -- --missing                  every post without current narration
 *   npm run narrate -- --all                      re-render everything (for example after
 *                                                 installing a Premium voice: System Settings →
 *                                                 Accessibility → Spoken Content → Manage Voices)
 *   npm run narrate -- --list-voices              show the voice each language would use
 *   options: --voice "<name>" to force a voice; --dry-run to print the narration text only.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { root } from './lib/load-ts.mjs';
import { audioPathFor, loadPosts, manifestPath, narrationText, readManifest, routeFor, sha256 } from './lib/narration.mjs';

const argv = process.argv.slice(2);
const flag = name => argv.includes(`--${name}`);
const option = name => { const index = argv.indexOf(`--${name}`); return index >= 0 ? argv[index + 1] : undefined; };
const optionValues = new Set(['--lang', '--voice'].flatMap(name => { const index = argv.indexOf(name); return index >= 0 ? [argv[index + 1]] : []; }));
const slugs = argv.filter(value => !value.startsWith('--') && !optionValues.has(value));
const langOption = option('lang');
const BITRATE = 48000;

// Voice choice: a Premium or Enhanced voice for the language beats everything; otherwise the
// natural-sounding defaults in order. Novelty and Eloquence voices are never used.
const preferred = {
  en: { locales: ['en_US', 'en_GB', 'en_AU', 'en_CA', 'en_IE', 'en_IN'], names: ['Ava', 'Zoe', 'Allison', 'Susan', 'Evan', 'Nathan', 'Tom', 'Samantha', 'Alex', 'Daniel', 'Karen', 'Moira', 'Tessa'] },
  es: { locales: ['es_MX', 'es_US', 'es_419', 'es_CO', 'es_AR', 'es_ES'], names: ['Paulina', 'Juan', 'Marisol', 'Angélica', 'Mónica', 'Jorge'] },
};
function installedVoices() {
  return execFileSync('say', ['-v', '?'], { encoding: 'utf8' }).split('\n').map(line => line.match(/^(.+?)\s{2,}([a-z]{2}_[A-Z0-9]{2,3})\s+#/)).filter(Boolean).map(match => ({ name: match[1].trim(), locale: match[2] }));
}
function bestVoice(lang, voices = installedVoices()) {
  const forced = option('voice');
  if (forced) {
    const hit = voices.find(voice => voice.name === forced);
    if (!hit) throw new Error(`Voice "${forced}" is not installed (say -v '?').`);
    return hit;
  }
  const { locales, names } = preferred[lang];
  const base = name => name.replace(/\s*\((Premium|Enhanced)\)$/, '');
  const candidates = voices.filter(voice => locales.includes(voice.locale) && names.includes(base(voice.name)));
  const score = voice => (/\(Premium\)/.test(voice.name) ? 0 : /\(Enhanced\)/.test(voice.name) ? 100 : 200) + locales.indexOf(voice.locale) * 10 + names.indexOf(base(voice.name)) * 0.1;
  const best = candidates.sort((a, b) => score(a) - score(b))[0];
  if (!best) throw new Error(`No natural ${lang} voice installed; install one in System Settings → Accessibility → Spoken Content → Manage Voices.`);
  return best;
}

const posts = await loadPosts();
if (flag('list-voices')) {
  for (const lang of ['en', 'es']) { try { const voice = bestVoice(lang); console.log(`${lang}: ${voice.name} (${voice.locale})`); } catch (error) { console.log(`${lang}: ${error.message}`); } }
  process.exit(0);
}

const manifest = readManifest();
const jobs = [];
for (const lang of langOption ? [langOption] : ['en', 'es']) {
  for (const post of posts[lang] || []) {
    const route = routeFor(lang, post.slug);
    const text = narrationText({ title: post.title, html: post.html, lang });
    const current = manifest.items[route];
    const wanted = flag('all') || slugs.includes(post.slug) || (flag('missing') && (!current || current.textSha256 !== sha256(text)));
    if (wanted) jobs.push({ lang, post, route, text });
  }
}
const unknown = slugs.filter(slug => !jobs.some(job => job.post.slug === slug));
if (unknown.length) { console.error(`Not a published ${langOption || 'en/es'} post: ${unknown.join(', ')}`); process.exit(1); }
if (!jobs.length) { console.log('Nothing to narrate (use <slug>, --missing or --all).'); process.exit(0); }

const work = mkdtempSync(join(tmpdir(), 'mj2-narration-'));
try {
  for (const { lang, post, route, text } of jobs) {
    if (flag('dry-run')) { console.log(`--- ${route}\n${text}`); continue; }
    const voice = bestVoice(lang);
    const textFile = join(work, `${lang}-${post.slug}.txt`), aiff = join(work, `${lang}-${post.slug}.aiff`);
    writeFileSync(textFile, text);
    execFileSync('say', ['-v', voice.name, '-f', textFile, '-o', aiff]);
    const src = audioPathFor(lang, post.slug);
    const out = join(root, 'public', src);
    mkdirSync(dirname(out), { recursive: true });
    execFileSync('afconvert', [aiff, out, '-f', 'm4af', '-d', 'aac', '-b', String(BITRATE), '-s', '0', '-q', '127', '-c', '1']);
    const info = execFileSync('afinfo', [out], { encoding: 'utf8' });
    const seconds = Number(info.match(/estimated duration: ([\d.]+) sec/)?.[1]);
    const measured = Number(info.match(/bit rate: (\d+) bits per second/)?.[1]);
    if (!seconds || !/1 ch,/.test(info) || !/aac/.test(info)) throw new Error(`${out}: unexpected encoding\n${info}`);
    manifest.items[route] = {
      src, lang, voice: voice.name, voiceLocale: voice.locale, seconds: Math.round(seconds * 10) / 10, minutes: Math.max(1, Math.round(seconds / 60)),
      bytes: statSync(out).size, bitRate: measured, channels: 1, textSha256: sha256(text), words: text.split(/\s+/).length, rendered: new Date().toISOString().slice(0, 10),
    };
    console.log(`${route} → ${src}: ${voice.name} (${voice.locale}), ${(seconds / 60).toFixed(1)} min, ${(statSync(out).size / 1e6).toFixed(2)} MB, ${Math.round(measured / 1000)} kbps`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
if (!flag('dry-run')) {
  manifest.items = Object.fromEntries(Object.entries(manifest.items).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
