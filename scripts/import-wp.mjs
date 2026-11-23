// Imports service pages from the live WordPress site (wellgen-health.com) into this project.
//
// For each service it creates:
//   src/content/services/<service>.md          the overview page text + FAQs
//   src/content/topics/<service>/<guide>.md    one file per detail page ("guide")
//   src/assets/images/topics/<service>/<guide>.png   the guide's banner photo, copied from your originals folder
//   src/data/seo.json                          draft SEO entries (only for pages that have none yet)
//
// Files that already exist are left alone, so your edits are safe. Add --force to overwrite.
//
// Run (from C:\wellgen-site):
//   npm install --save-dev linkedom        (once)
//   node scripts/import-wp.mjs specialized-medical-services
//
// Options:
//   --media "C:\wellgen-media\originals"   where your WordPress photos are (this is the default)
//   --force                                 overwrite existing files

import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const SITE = 'https://wellgen-health.com';

// Service slug in the new site → [WordPress overview page, ...detail pages in reading order]
const CATEGORIES = {
  'specialized-medical-services': {
    'weight-loss-management': ['/weight-loss-management/', '/causes-of-obesity-hormones-genetics-stress-diet/', '/diagnosing-obesity-metabolic-hormone-testing/', '/managing-treating-obesity-medical-weight-loss-program/', '/start-your-personalized-medical-weight-loss-journey/'],
    'personal-injury': ['/personal-injury/', '/comprehensive-personal-injury-evaluations/', '/injuries-from-various-incidents/', '/personalized-recovery-plans/', '/diagnostic-testing-and-expert-care/', '/compassionate-injury-recovery-support/', '/return-to-everyday-life/'],
    'dot-physicals': ['/specialized-medical-services/pre-employment-and-dot-physicals/', '/what-are-pre-employment-and-dot-physicals/', '/components-of-a-pre-employment-physical/', '/understanding-dot-physicals/', '/why-choose-wellgen-health/', '/schedule-your-physical-today/'],
    'sleep-disorder-management': ['/sleep-disorder-management/', '/understanding-sleep-disorders-insomnia-apnea-rls/', '/causes-risk-factors-sleep-disorders-stress-apnea/', '/diagnosing-sleep-disorders-polysomnography-hst-cbt/', '/treatment-management-sleep-disorders-cbti-cpap-rls/', '/get-the-rest-you-deserve/'],
    'surgical-clearance': ['/surgical-clearance-risk-assessment-preoperative-health/', '/what-is-surgical-clearance-preoperative-medical-evaluation/', '/importance-of-surgical-clearance-patient-safety-risk/', '/surgical-clearance-process-steps-preoperative-exam/', '/benefits-considerations-surgical-clearance-risk-assessment/', '/schedule-your-surgical-clearance-today/'],
    'nutrition-wellness-counselling': ['/nutrition-wellness-counselling/', '/the-role-of-nutrition-in-health-preventive-medicine/', '/common-nutrition-related-health-issues-obesity-diabetes/', '/comprehensive-nutritional-assessment-personalized-plan/', '/personalized-nutrition-plans-support-coaching/'],
    'hormone-replacement-therapy': ['/hormone-replacement-therapy/', '/what-is-hormone-replacement-therapy-hrt-bhrt/', '/causes-hormonal-imbalance-menopause-low-t-stress/', '/diagnosing-hormonal-imbalance-blood-saliva-testing/', '/hormone-replacement-therapy-treatment-pellets-injections/', '/find-balance-hormone-replacement-therapy-men-women/'],
    'telemedicine': ['/telemedicine-services/', '/how-telemedicine-works-virtual-doctor-visit-guide/', '/benefits-of-telemedicine-access-flexibility-cost-safety/', '/when-to-use-telemedicine-follow-ups-infections-medication/', '/experience-convenience-of-telemedicine-virtual-care/'],
  },
  'diagnostic-testing': {
    'womens-health': ['/womens-health-services/', '/comprehensive-womens-health-care/', '/gynecological-exams-and-screenings/', '/family-planning-and-reproductive-health/', '/hormone-therapy-and-menopause-management/', '/prioritize-your-health-with-our-womens-services/'],
    // WordPress has no separate detail pages for allergy testing, so this one is an overview page only
    'allergy-testing': ['/allergy-testing-and-treatment/'],
  },
};

// Service names for SEO titles (same as src/data/services.ts)
const NAMES = {
  'weight-loss-management': 'Weight Loss Management', 'personal-injury': 'Personal Injury Care', 'dot-physicals': 'Pre-Employment and DOT Physicals',
  'sleep-disorder-management': 'Sleep Disorder Management', 'surgical-clearance': 'Surgical Clearance', 'nutrition-wellness-counselling': 'Nutrition and Wellness Counseling',
  'hormone-replacement-therapy': 'Hormone Replacement Therapy', 'telemedicine': 'Telemedicine',
  'womens-health': "Women's Health Services", 'allergy-testing': 'Allergy Testing and Treatment',
};

// ---------------------------------------------------------------- text helpers
const clean = (t = '') => t
  .replace(/Musceloskeletal/g, 'Musculoskeletal').replace(/\bWellgen\b/g, 'WellGen')
  .replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\u00a0/g, ' ')
  .replace(/\s*;\s*(?=[a-z])/g, '; ').replace(/\s+/g, ' ').trim();

const sentences = (t, n) => (clean(t).match(/[^.!?]+(?:[.!?]+["')]?|$)(?:\s+|$)/g) || [clean(t)]).slice(0, n).join('').trim();
const countSentences = (t) => (clean(t).match(/[^.!?]+(?:[.!?]+["')]?|$)(?:\s+|$)/g) || []).length;
const slugify = (t) => clean(t).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stripNum = (t) => clean(t).replace(/^(\d+|[A-Z])[.)]\s+/, '');
const yamlList = (key, items) => (items.length ? `${key}:\n` + items.map((x) => `  - ${yamlStr(x)}\n`).join('') : `${key}: []\n`);
const yamlStr = (s) => '"' + clean(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

const KEEP = /^(WellGen|Texas|Dallas|DOT|HRT|BHRT|CPAP|CBT|CBT-I|BMI|PCOS|FMCSA|ECG|EKG|COVID|RLS|HST|I)$/;
function sentenceCase(t) {
  const words = stripNum(t).split(' ').filter(Boolean);
  return words.map((w, i) => {
    const core = w.replace(/[^A-Za-z-]/g, '');
    if (i === 0) return w[0].toUpperCase() + w.slice(1);
    if (KEEP.test(core) || (core.length > 1 && core === core.toUpperCase())) return w;
    if (core === 'Health' && /WellGen/.test(words[i - 1])) return w;
    return /^[A-Z][a-z]/.test(core) ? w.toLowerCase() : w;
  }).join(' ');
}

// ---------------------------------------------------------------- extraction
const JUNK_START = /^(related resources|faq'?s|got any questions|everything you need to know about wellgen)/i;
const PHONE = /\+?1?\s*\(\d{3}\)\s*\d{3}-\d{4}/;

export function extract(document, url) {
  const txt = (e) => clean(e?.textContent || '');
  const root = document.querySelector('[data-elementor-type="wp-page"], [data-elementor-type="single-page"], [data-elementor-type="single-post"]') || document.querySelector('main') || document.body;
  // the SEO keyword boxes: long comma lists of short phrases, or long runs of lowercase words
  const isKeywordDump = (t) => {
    const parts = t.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
    const avgWords = parts.reduce((n, s) => n + s.split(' ').length, 0) / parts.length;
    if (parts.length > 8 && avgWords < 4.5 && (t.match(/\. /g) || []).length < 2) return true;
    return t.split(' ').length > 25 && t.split(' ').filter((x) => /^[a-z]/.test(x)).length / t.split(' ').length > 0.85 && !/[.!?]/.test(t.slice(0, 200));
  };
  const blocks = [], faqs = [], seen = new Set();
  let h1 = txt(root.querySelector('h1')) || txt(document.querySelector('h1'));
  const push = (t, x) => {
    if (!x || isKeywordDump(x)) return;
    if ((t === 'p' || t === 'li') && seen.has(x)) return; // WordPress pages sometimes repeat a whole section
    seen.add(x); blocks.push({ t, x });
  };

  for (const w of root.querySelectorAll('.elementor-widget')) {
    if (w.parentElement?.closest('.elementor-widget')) continue;
    const cls = w.getAttribute('class') || '';
    if (/accordion|toggle|faq/i.test(cls)) {
      for (const it of w.querySelectorAll('.elementskit-card, .elementor-accordion-item, .elementor-toggle-item, details, .e-n-accordion-item')) {
        const q = txt(it.querySelector('.elementskit-btn-link, .elementor-tab-title, summary, .e-n-accordion-item-title') || it).replace(/^[+-]\s*/, '');
        const body = it.querySelector('.elementskit-card-body, .elementor-tab-content, [role=region], .e-con');
        const a = txt(body);
        if (!q || !a) continue;
        if (!/n-accordion/.test(cls) || /\?$/.test(q)) { faqs.push({ q, a }); continue; }
        // an accordion of page sections (not questions): keep it as normal content
        push('h2', q);
        const els = [...body.querySelectorAll('p, li')].filter((e) => !e.parentElement.closest('li'));
        if (els.length) for (const e of els) push(e.tagName.toLowerCase() === 'li' ? 'li' : 'p', txt(e));
        else push('p', a);
      }
    } else if (/widget-heading/.test(cls)) {
      const h = w.querySelector('h1,h2,h3,h4,h5,h6,.elementor-heading-title');
      const x = txt(h); if (!x) continue;
      const tag = h.tagName.toLowerCase();
      if (tag === 'h1') { h1 = h1 || x; continue; }
      push(tag === 'h2' ? 'h2' : 'h3', x);
    } else if (/widget-text-editor|widget-theme-post-content/.test(cls)) {
      const c = w.querySelector('.elementor-widget-container') || w;
      const els = [...c.querySelectorAll('p, li, h2, h3, h4')].filter((e) => !e.parentElement.closest('li'));
      if (els.length) for (const e of els) { const tg = e.tagName.toLowerCase(); push(tg === 'li' ? 'li' : tg === 'p' ? 'p' : tg === 'h2' ? 'h2' : 'h3', txt(e)); }
      else push('p', txt(c));
    } else if (/widget-icon-list/.test(cls)) {
      for (const li of w.querySelectorAll('li')) { const x = txt(li); if (x.length > 3) push('li', x); }
    }
  }
  const cut = blocks.findIndex((b) => JUNK_START.test(b.x));
  if (cut >= 0) blocks.length = cut;
  const kept = blocks.filter((b) => !(b.t === 'p' && PHONE.test(b.x)));

  const imgs = [...root.querySelectorAll('img')]
    .map((i) => i.getAttribute('data-lazy-src') || i.getAttribute('data-src') || i.getAttribute('src') || '')
    .filter((s) => s && !s.startsWith('data:') && /wp-content\/uploads/.test(s) && !/logo|icon/i.test(s))
    .map((s) => decodeURIComponent(s.split('?')[0].split('/').pop()));
  const meta = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  return { url, desc: clean(meta), h1, blocks: kept, faqs, imgs };
}

// ---------------------------------------------------------------- markdown
function blocksMd(blocks) {
  const out = []; let prev = null;
  for (const { t, x } of blocks) {
    if (t === 'h2' || t === 'h3') out.push('', `${t === 'h2' ? '##' : '###'} ${sentenceCase(x)}`, '');
    else if (t === 'li') {
      if (prev !== 'li') out.push('');
      const m = x.match(/^([^:]{2,60}):\s+(.*)$/);
      out.push(m ? `- **${m[1]}:** ${m[2]}` : `- ${x}`);
    } else out.push('', x, '');
    prev = t;
  }
  // drop headings with nothing under them (an ## followed by ### is fine)
  const lines = out.join('\n').replace(/\n{3,}/g, '\n\n').trim().split('\n');
  const level = (l) => (/^### /.test(l) ? 3 : /^## /.test(l) ? 2 : 0);
  const keep = lines.filter((l, i) => {
    if (!level(l)) return true;
    const next = lines.slice(i + 1).find((x) => x.trim());
    return next && (!level(next) || level(next) > level(l));
  });
  return keep.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function cleanQ(q) {
  return clean(q).replace(/\s*(according to|as described by|as explained by|offered by|provided by) WellGen Health/gi, '')
    .replace(/\bat WellGen Health\b/g, '').replace(/\s+\?/g, '?').replace(/\s{2,}/g, ' ');
}
function faqsYaml(faqs, n) {
  const list = [];
  for (const f of faqs) {
    if (/located|contact details|pricing|insurance|operating hours|phone/i.test(f.q)) continue;
    let a = sentences(f.a, 3);
    if (a.length > 420) a = sentences(f.a, 2);
    if (a.length > 420) a = sentences(f.a, 1);
    list.push([cleanQ(f.q), a]);
    if (list.length === n) break;
  }
  if (!list.length) return 'faqs: []\n';
  return 'faqs:\n' + list.map(([q, a]) => `  - q: ${yamlStr(q)}\n    a: ${yamlStr(a)}\n`).join('');
}

function points(blocks) {
  const heads = blocks.filter((b, i) => b.t !== 'p' && b.t !== 'li' && b.x.length > 3 && b.x.length < 70 && blocks[i + 1] && /^(p|li)$/.test(blocks[i + 1].t)).map((b) => stripNum(b.x))
    .filter((h) => !/[:?]$/.test(h) && !/^(understanding|why|the |a |an |our |take|taking|conclusion|how |what |empower|your |living|beyond|expert|compassionate|begin|start|schedule)/i.test(h));
  const lis = blocks.filter((b) => b.t === 'li').map((b) => (b.x.match(/^([^:]{2,60}):/) || [])[1]).filter(Boolean);
  const out = [];
  for (const h of [...heads, ...lis].map(sentenceCase)) if (!out.some((o) => o.toLowerCase() === h.toLowerCase())) out.push(h);
  return out.slice(0, 3);
}

function splitSections(blocks) {
  const secs = []; let cur = null;
  for (const b of blocks) {
    if (b.t === 'h2') { cur = { title: b.x, blocks: [] }; secs.push(cur); }
    else if (cur) cur.blocks.push(b);
  }
  return secs;
}

export function generate(svc, pages) {
  const [main, ...topics] = pages;
  const files = {}; const report = [];
  const secs = splitSections(main.blocks);
  const intro = secs.length > topics.length ? secs[0] : null;
  const rest = intro ? secs.slice(1) : secs;
  const overviewBlocks = topics.length
    ? (intro ? [{ t: 'h2', x: intro.title }, ...intro.blocks] : main.blocks.slice(0, main.blocks.findIndex((b, i) => i > 0 && b.t === 'h2') >>> 0))
    : main.blocks;
  const firstP = main.blocks.find((b) => b.t === 'p')?.x || '';
  const lead = sentences(main.desc.length > 60 ? main.desc : firstP, 2);
  const highlights = (topics.length ? rest : secs).slice(0, 3).map((s) => sentenceCase(s.title));
  files[`src/content/services/${svc}.md`] = '---\n' +
    `lead: ${yamlStr(lead)}\n` +
    `heroAlt: ${yamlStr(sentenceCase(main.h1 || NAMES[svc]) + ' at WellGen Health')}\n` +
    yamlList('highlights', highlights) +
    faqsYaml(main.faqs.length ? main.faqs : topics.flatMap((t) => t.faqs.slice(0, 2)), 8) +
    '---\n\n' + blocksMd(overviewBlocks);
  report.push(`${svc}: overview`);

  const guides = [];
  topics.forEach((p, i) => {
    const title = sentenceCase(p.h1 || rest[i]?.title || p.url);
    const slug = slugify(stripNum(p.h1 || rest[i]?.title || p.url));
    const firstIdx = p.blocks.findIndex((b) => b.t === 'p');
    let tlead, body;
    if (firstIdx === 0) {
      const fp = p.blocks[0].x;
      const k = fp.length <= 460 ? countSentences(fp) : 2;
      tlead = sentences(fp, k);
      const leftover = fp.slice(tlead.length).trim();
      body = (leftover ? [{ t: 'p', x: leftover }] : []).concat(p.blocks.slice(1));
    } else {
      tlead = sentences(p.desc || p.blocks.find((b) => b.t === 'p')?.x || title, 2);
      body = p.blocks;
    }
    const summary = sentences(p.desc.length > 60 ? p.desc : (rest[i]?.blocks.find((b) => b.t === 'p')?.x || tlead), 2);
    files[`src/content/topics/${svc}/${slug}.md`] = '---\n' +
      `title: ${yamlStr(title)}\norder: ${i + 1}\n` +
      `summary: ${yamlStr(summary)}\n` +
      yamlList('points', points(p.blocks)) +
      `lead: ${yamlStr(tlead)}\noldPath: ${p.url.replace(/\/$/, '')}\n` +
      faqsYaml(p.faqs, 3) +
      '---\n\n' + blocksMd(body);
    guides.push({ slug, title, page: p });
    report.push(`   ${i + 1}. ${slug}   (from ${p.url})`);
  });
  return { files, guides, report };
}

// ---------------------------------------------------------------- SEO drafts
function keywordsFrom(blocks, focus) {
  const out = [];
  for (const b of blocks) {
    if (b.t !== 'h2' && b.t !== 'h3') continue;
    const h = stripNum(b.x).toLowerCase().replace(/\s*\(.*?\)/g, '').replace(/[:?]+$/, '').trim();
    if (h.split(' ').length >= 2 && h.split(' ').length <= 5 && h !== focus && !out.includes(h) && !/^(why|how|what|the|a|an|our|your|take|taking)\b/.test(h)) out.push(h);
  }
  return out.slice(0, 9);
}
const fitDesc = (t) => (clean(t).length <= 160 ? clean(t) : clean(t).slice(0, 157).replace(/\s+\S*$/, '').replace(/[,;]$/, '') + '.');

// ---------------------------------------------------------------- run
async function main() {
  const args = process.argv.slice(2);
  const category = args.find((a) => !a.startsWith('--'));
  const force = args.includes('--force');
  const mi = args.indexOf('--media');
  const media = mi >= 0 ? args[mi + 1] : 'C:\\wellgen-media\\originals';
  if (!CATEGORIES[category]) {
    console.log(`Usage: node scripts/import-wp.mjs <category>\nCategories: ${Object.keys(CATEGORIES).join(', ')}`);
    process.exit(1);
  }
  const mediaFiles = fs.existsSync(media) ? new Map(fs.readdirSync(media).map((f) => [f.toLowerCase(), f])) : null;
  if (!mediaFiles) console.log(`Note: photo folder not found (${media}), so no banner photos will be copied.`);

  const seoPath = 'src/data/seo.json';
  const seo = JSON.parse(fs.readFileSync(seoPath, 'utf8'));
  let written = 0, skipped = 0, seoAdded = 0, photos = 0;
  const missingPhotos = [];

  for (const [svc, urls] of Object.entries(CATEGORIES[category])) {
    const pages = [];
    for (const u of urls) {
      const res = await fetch(SITE + u, { headers: { 'User-Agent': 'Mozilla/5.0 (WellGen site import)' } });
      if (!res.ok) { console.log(`  ! ${u} returned ${res.status}, skipped`); continue; }
      const { document } = parseHTML(await res.text());
      pages.push(extract(document, u));
    }
    if (!pages.length) continue;
    const { files, guides, report } = generate(svc, pages);
    console.log(report.join('\n'));

    for (const [file, text] of Object.entries(files)) {
      if (fs.existsSync(file) && !force) { skipped++; continue; }
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, text);
      written++;
    }

    // banner photos for the guides
    for (const g of guides) {
      const dir = `src/assets/images/topics/${svc}`;
      if (fs.existsSync(dir) && fs.readdirSync(dir).some((f) => f.replace(/\.[^.]+$/, '') === g.slug) && !force) continue;
      const wanted = g.page.imgs.map((n) => n.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '').replace(/-r[a-z0-9]{40,}(?=\.[a-z]+$)/i, '').replace(/\.webp$/i, ''));
      const candidates = wanted.flatMap((n) => { const ext = path.extname(n); const stem = n.slice(0, -ext.length); return [n, `${stem}-scaled${ext}`, `${stem}-1${ext}`]; });
      const found = mediaFiles && candidates.map((n) => mediaFiles.get(n.toLowerCase())).find(Boolean);
      if (!found) { missingPhotos.push(`${dir}/${g.slug}.jpg   (WordPress used: ${wanted[0] || 'no photo'})`); continue; }
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(path.join(media, found), `${dir}/${g.slug}${path.extname(found).toLowerCase()}`);
      photos++;
    }

    // SEO drafts
    const base = `/services/${category}/${svc}/`;
    const main = pages[0];
    if (!seo[base]) {
      const name = NAMES[svc];
      const t = `${name} in Dallas, TX`;
      seo[base] = { title: t.length <= 60 ? t : name, description: fitDesc(main.desc), focusKeyword: name.toLowerCase(), keywords: keywordsFrom(main.blocks, name.toLowerCase()) };
      seoAdded++;
    }
    for (const g of guides) {
      const u = `${base}${g.slug}/`;
      if (seo[u]) continue;
      seo[u] = { title: g.title.slice(0, 60), description: fitDesc(g.page.desc), focusKeyword: g.title.toLowerCase().replace(/[?]$/, ''), keywords: keywordsFrom(g.page.blocks, g.title.toLowerCase()) };
      seoAdded++;
    }
  }
  fs.writeFileSync(seoPath, JSON.stringify(seo, null, 2) + '\n');

  console.log(`\nDone: ${written} page files written, ${skipped} already existed (kept), ${photos} banner photos copied, ${seoAdded} SEO drafts added.`);
  if (missingPhotos.length) console.log('\nNo photo found for these (add them yourself, any of .jpg/.png/.webp):\n  ' + missingPhotos.join('\n  '));
}

if (process.argv[1] && process.argv[1].endsWith('import-wp.mjs')) main();
