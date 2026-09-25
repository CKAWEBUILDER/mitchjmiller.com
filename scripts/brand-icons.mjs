#!/usr/bin/env node
/**
 * M² brand mark and icon files (docs/site-standards.md "Brand mark"; Mitch 2026-09-25: "you make
 * it, just make it look like the website"). Hand-set vector geometry, no raster generator:
 *
 * - The capital M and the figure 2 are the outlines of Inter Bold (700), the weight of the
 *   header's "Mitchell Miller" (Inter: SIL Open Font License 1.1). The M is navy #0f2440, the 2
 *   green #14804a.
 * - Header mark: the Roundel direction (docs/redesign-2026-09-14/m2-options.md #10): a thin ring
 *   with a gap where the raised 2 sits. Rendered inline by site/components/M2Mark.astro from
 *   site/data/m2-mark.json so CSS custom properties recolor it for the dark theme.
 * - Icons: a navy rounded square with a white M and a green 2, no ring (a ring is illegible at
 *   16 px). The 16 px frame is drawn on the pixel grid (PIXELS_16); 32/48/180 px use the outlines.
 *   On navy the 2 uses the site's green-on-dark (#6fd6a2, the dark theme's --ag-green-text);
 *   #14804a on navy is only 3.1:1.
 *
 * Writes site/data/m2-mark.json, public/images/brand/m2-roundel.svg, public/favicon.svg,
 * public/favicon.png (32), public/favicon.ico (16/32/48), public/apple-touch-icon.png (180, opaque)
 * and public/images/brand/m2-logo-512.png (Organization JSON-LD logo, roundel on white).
 * Run only when the mark changes:   CHROME_PATH=… node scripts/brand-icons.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NAVY = '#0f2440', GREEN = '#14804a', GREEN_ON_NAVY = '#6fd6a2', WHITE = '#ffffff';

// Inter Bold (700) outlines in font units (2048/em, y up; cap height 1490). Source: @fontsource/inter
// 5.3.0 inter-latin-700-normal.woff2, glyphs "M" and "two", exported with fontTools' SVGPathPen.
const INTER_M = 'M135 0V1490H603L845 806Q860 758 879.5 682Q899 606 919 518Q939 430 956.5 347Q974 264 985 203H926Q937 263 954.5 345.5Q972 428 992 516Q1012 604 1031.5 681Q1051 758 1066 806L1304 1490H1774V0H1467V702Q1467 751 1468.5 824Q1470 897 1472.5 981.5Q1475 1066 1477 1151.5Q1479 1237 1480 1313H1499Q1480 1230 1457 1141.5Q1434 1053 1410.5 970Q1387 887 1366 817.5Q1345 748 1330 702L1083 0H826L575 702Q560 748 539 816.5Q518 885 494.5 968Q471 1051 447 1139.5Q423 1228 402 1313H425Q426 1241 428 1156Q430 1071 432.5 985.5Q435 900 436.5 826.5Q438 753 438 702V0Z';
const INTER_2 = 'M124 0V220L652 715Q720 781 766.5 834.5Q813 888 837.5 939.5Q862 991 862 1051Q862 1118 832 1166Q802 1214 750 1240Q698 1266 631 1266Q562 1266 510 1238Q458 1210 430 1158Q402 1106 402 1033H110Q110 1178 176.5 1285.5Q243 1393 361 1451.5Q479 1510 633 1510Q791 1510 909 1453.5Q1027 1397 1092.5 1298Q1158 1199 1158 1070Q1158 987 1125.5 906Q1093 825 1009.5 724.5Q926 624 773 484L548 262V251H1178V0Z';
const M_BOX = { x0: 135, x1: 1774, y0: 0, y1: 1490 };
const TWO_BOX = { x0: 110, x1: 1178, y0: 0, y1: 1510 };

const r2 = n => Number(n.toFixed(2));
/** Map a font-unit path (absolute M/L/H/V/Q/Z) into a box: font box → (x, y, w, h), y flipped. */
function place(d, box, x, y, w, h) {
  const sx = w / (box.x1 - box.x0), sy = h / (box.y1 - box.y0);
  const X = v => r2(x + (v - box.x0) * sx), Y = v => r2(y + (box.y1 - v) * sy);
  const tokens = d.match(/[MLHVQZ]|-?\d+(?:\.\d+)?/g);
  let out = '', i = 0, cmd = '';
  while (i < tokens.length) {
    if (/[MLHVQZ]/.test(tokens[i])) { cmd = tokens[i++]; out += cmd; if (cmd === 'Z') continue; }
    const n = () => Number(tokens[i++]);
    if (cmd === 'H') out += `${X(n())} `;
    else if (cmd === 'V') out += `${Y(n())} `;
    else if (cmd === 'Q') { const a = X(n()), b = Y(n()), c = X(n()), e = Y(n()); out += `${a} ${b} ${c} ${e} `; }
    else { const a = X(n()), b = Y(n()); out += `${a} ${b} `; }
  }
  return out.replace(/ ([A-Z])/g, '$1').trim();
}

// Header mark (Roundel), viewBox 0 0 48 48, shown at 40×40 CSS px.
const V = 48, C = 24, R = 21.6, STROKE = 2.4;
const capH = 17, mW = capH * (M_BOX.x1 - M_BOX.x0) / (M_BOX.y1 - M_BOX.y0);
const mX = C - mW / 2, mY = C - capH / 2;
const twoH = 9.6, twoW = twoH * (TWO_BOX.x1 - TWO_BOX.x0) / (TWO_BOX.y1 - TWO_BOX.y0);
const twoX = mX + mW + 0.9, twoY = mY - 0.45 * twoH;
// Ring gap: every centerline angle whose stroke would pass within 1.3 units of the 2's box.
const clearance = STROKE / 2 + 1.3;
const nearTwo = a => {
  const px = C + R * Math.cos(a), py = C + R * Math.sin(a);
  const dx = Math.max(twoX - px, 0, px - (twoX + twoW)), dy = Math.max(twoY - py, 0, py - (twoY + twoH));
  return Math.hypot(dx, dy) < clearance;
};
const steps = 3600, blocked = [];
for (let s = 0; s < steps; s++) { const a = -Math.PI + (2 * Math.PI * s) / steps; if (nearTwo(a)) blocked.push(a); }
const gapStart = Math.min(...blocked), gapEnd = Math.max(...blocked);
const pt = a => `${r2(C + R * Math.cos(a))} ${r2(C + R * Math.sin(a))}`;
// Ring drawn from the gap's end, the long way round (large arc, clockwise), to the gap's start.
const ringD = `M${pt(gapEnd)}A${R} ${R} 0 1 1 ${pt(gapStart)}`;
const mark = {
  viewBox: `0 0 ${V} ${V}`,
  ring: ringD, ringStroke: STROKE,
  m: place(INTER_M, M_BOX, mX, mY, mW, capH),
  two: place(INTER_2, TWO_BOX, twoX, twoY, twoW, twoH),
  note: 'Generated by scripts/brand-icons.mjs; M and 2 are Inter Bold outlines (SIL OFL 1.1). Rendered inline by site/components/M2Mark.astro.',
};
const roundelSvg = (bg = null) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}" width="${V}" height="${V}">${bg ? `<rect width="${V}" height="${V}" fill="${bg}"/>` : ''}<title>M² — Mitchell Miller</title><path d="${mark.ring}" fill="none" stroke="${NAVY}" stroke-width="${STROKE}"/><path d="${mark.m}" fill="${NAVY}"/><path d="${mark.two}" fill="${GREEN}"/></svg>\n`;

// Icon (rounded square) on a 16-unit grid: the SVG favicon and the 32/48/180 px renders.
const I = 16;
const iconM = { x: 1.5, y: 5, w: 9, h: 8.5 };
const iconTwo = { h: 5.6 }; iconTwo.w = iconTwo.h * (TWO_BOX.x1 - TWO_BOX.x0) / (TWO_BOX.y1 - TWO_BOX.y0);
iconTwo.x = iconM.x + iconM.w + 0.55; iconTwo.y = 1.9;
const iconSvg = ({ rounded = true } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${I} ${I}" width="${I}" height="${I}"><rect width="${I}" height="${I}"${rounded ? ' rx="3"' : ''} fill="${NAVY}"/><path d="${place(INTER_M, M_BOX, iconM.x, iconM.y, iconM.w, iconM.h)}" fill="${WHITE}"/><path d="${place(INTER_2, TWO_BOX, iconTwo.x, iconTwo.y, iconTwo.w, iconTwo.h)}" fill="${GREEN_ON_NAVY}"/></svg>\n`;

// 16 px frame: drawn by hand on the pixel grid ('#' white M, 'g' green 2). At 16 px the outline M's
// V and the outline 2 blur to grey; this keeps 2 px stems, a mid-height V and a 4×5 px 2.
const PIXELS_16 = [
  '................',
  '................',
  '...........gg...',
  '..........g..g..',
  '............g...',
  '...........g....',
  '.##.....##gggg..',
  '.###...###......',
  '.####.####......',
  '.##.###.##......',
  '.##..#..##......',
  '.##.....##......',
  '.##.....##......',
  '.##.....##......',
  '................',
  '................',
];
const pixelSvg = () => {
  const cells = PIXELS_16.flatMap((row, y) => [...row].map((c, x) => c === '#' ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${WHITE}"/>` : c === 'g' ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${GREEN_ON_NAVY}"/>` : '')).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${I} ${I}" width="${I}" height="${I}"><rect width="${I}" height="${I}" rx="3" fill="${NAVY}"/><g shape-rendering="crispEdges">${cells}</g></svg>\n`;
};

const puppeteer = (await import('puppeteer-core')).default;
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'] });
const render = async (svg, size, { opaque = false } = {}) => {
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const sized = svg.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`);
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;padding:0;background:transparent}svg{display:block}</style></head><body>${sized}</body></html>`);
  const png = await page.screenshot({ type: 'png', omitBackground: !opaque, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
  return Buffer.from(png);
};
/** ICO container holding PNG images (supported by every current browser). */
const ico = images => {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, index) => {
    const at = 6 + 16 * index;
    header.writeUInt8(size >= 256 ? 0 : size, at); header.writeUInt8(size >= 256 ? 0 : size, at + 1);
    header.writeUInt8(0, at + 2); header.writeUInt8(0, at + 3); header.writeUInt16LE(1, at + 4); header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(png.length, at + 8); header.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map(image => image.png)]);
};

const outputs = {};
const write = (path, bytes) => { const file = join(root, path); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, bytes); outputs[path] = bytes; };
try {
  write('site/data/m2-mark.json', `${JSON.stringify(mark, null, 2)}\n`);
  write('public/images/brand/m2-roundel.svg', roundelSvg());
  write('public/favicon.svg', iconSvg());
  const icon = { 16: await render(pixelSvg(), 16), 32: await render(iconSvg(), 32), 48: await render(iconSvg(), 48) };
  write('public/favicon.png', icon[32]);
  write('public/favicon.ico', ico([16, 32, 48].map(size => ({ size, png: icon[size] }))));
  write('public/apple-touch-icon.png', await render(iconSvg({ rounded: false }), 180, { opaque: true }));
  write('public/images/brand/m2-logo-512.png', await render(roundelSvg(WHITE).replace(`viewBox="${mark.viewBox}"`, 'viewBox="-4 -4 56 56"'), 512, { opaque: true }));
} finally {
  await browser.close();
}
for (const [path, bytes] of Object.entries(outputs)) console.log(`${path}  ${bytes.length} bytes  sha256 ${createHash('sha256').update(bytes).digest('hex').slice(0, 16)}…`);
