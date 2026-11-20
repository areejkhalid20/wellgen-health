// Keyword check, like the All in One SEO analysis.
// Run: npm run seo:check   (builds the site, then checks every page listed in src/data/seo.json)
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const seo = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const pass = (ok) => (ok ? '\x1b[32m✔\x1b[0m' : '\x1b[31m✘\x1b[0m');
const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .toLowerCase();
const count = (text, phrase) => text.split(phrase.toLowerCase()).length - 1;

let problems = 0;
for (const [path, page] of Object.entries(seo)) {
  if (path.startsWith('_')) continue;
  const file = join('dist', path, 'index.html');
  if (!existsSync(file)) { console.log(`\n${path}\n  ${pass(false)} page not built`); problems++; continue; }
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const title = page.title ?? '';
  const desc = page.description ?? '';
  const h1 = strip(main.match(/<h1[\s\S]*?<\/h1>/i)?.[0] ?? '');
  const firstP = strip(main.match(/<p[^>]*>[\s\S]*?<\/p>/gi)?.find((p) => strip(p).length > 60) ?? '');
  const text = strip(main);
  const focus = (page.focusKeyword ?? '').toLowerCase();
  const focusWords = focus.split(' ').filter((w) => w.length > 3);
  // Exact phrase, or all of its main words (like "Diabetes Doctor in Dallas")
  const has = (t) => t.includes(focus) || focusWords.every((w) => t.includes(w));
  const inUrl = focusWords.some((w) => path.includes(w.replace(/[^a-z0-9]/g, '')));

  const checks = [
    [`Title length ${title.length} (max 60)`, title.length > 0 && title.length <= 60],
    [`Description length ${desc.length} (120-160)`, desc.length >= 120 && desc.length <= 160],
    ['Focus keyword in title', has(title.toLowerCase())],
    ['Focus keyword in description', has(desc.toLowerCase())],
    ['Focus keyword (or its main words) in H1', has(h1)],
    ['Focus keyword words in URL', inUrl],
    ['Focus keyword (or its main words) in first paragraph', has(firstP)],
  ];

  console.log(`\n\x1b[1m${path}\x1b[0m  focus: "${page.focusKeyword}"`);
  for (const [label, ok] of checks) { console.log(`  ${pass(ok)} ${label}`); if (!ok) problems++; }
  console.log('  Keywords used in page text:');
  for (const kw of page.keywords ?? []) {
    const n = count(text, kw);
    console.log(`    ${pass(n > 0)} ${kw}${n ? `  (${n}x)` : '  (not used yet)'}`);
  }
}
console.log(`\n${problems ? `\x1b[33m${problems} focus keyword check(s) to look at.\x1b[0m` : '\x1b[32mAll focus keyword checks pass.\x1b[0m'}\n`);
