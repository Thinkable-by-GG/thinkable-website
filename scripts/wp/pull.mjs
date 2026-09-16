// Pull the live thinkable.app WordPress site into this repo:
//   content/pages/**.md   raw page content + frontmatter (id, path, template, excerpt, ...)
//   content/posts/*.md    raw blog posts
//   content/site.json     site settings, navigation, CF7 forms, media index
//   wordpress/theme/<slug>/   every text file of the active theme (via wp-admin theme editor)
//   public/images, public/uploads   theme images and media library files (binary, downloaded once)
// Usage: node scripts/wp/pull.mjs [--no-media] [--no-theme]
import fs from 'node:fs';
import path from 'node:path';
import { WpClient, THEME_SLUG, stringifyFrontmatter, pathFromLink } from './lib.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname, '..');
const args = new Set(process.argv.slice(2));
const wp = await new WpClient().login();
console.log(`Logged in to ${wp.baseUrl}`);

// --- site settings ---------------------------------------------------------
const { json: settings } = await wp.rest('/wp/v2/settings');
const { json: root } = await wp.rest('/');

// --- media ----------------------------------------------------------------
const media = await wp.restAll('/wp/v2/media', { _fields: 'id,source_url,alt_text,title,mime_type,media_details' });
const mediaById = Object.fromEntries(media.map((m) => [m.id, m]));
const localMedia = (m) => (m ? `/uploads/${path.basename(new URL(m.source_url).pathname)}` : undefined);

// --- pages & posts (context=edit gives the raw, un-rendered content) ---------
const pages = await wp.restAll('/wp/v2/pages', { context: 'edit', status: 'publish,draft,private' });
const posts = await wp.restAll('/wp/v2/posts', { context: 'edit', status: 'publish,draft,private' });
const pageById = Object.fromEntries(pages.map((p) => [p.id, p]));

rmDir(path.join(ROOT, 'content/pages'));
rmDir(path.join(ROOT, 'content/posts'));

for (const p of pages) {
  const isFront = p.id === settings.page_on_front;
  const pagePath = isFront ? '/' : pathFromLink(p.link);
  const file = path.join(ROOT, 'content/pages', isFront ? 'home.md' : pagePath.slice(1) + '.md');
  const fm = mediaById[p.featured_media];
  write(file, stringifyFrontmatter({
    id: p.id,
    type: 'page',
    path: pagePath,
    slug: p.slug,
    title: p.title.raw,
    excerpt: p.excerpt.raw,
    template: p.template || 'default',
    parent: p.parent || undefined,
    parentPath: p.parent ? pathFromLink(pageById[p.parent].link) : undefined,
    menuOrder: p.menu_order || undefined,
    status: p.status,
    featuredImage: localMedia(fm),
    featuredImageAlt: fm?.alt_text || undefined,
    date: p.date_gmt + 'Z',
    modified: p.modified_gmt + 'Z',
    isFrontPage: isFront || undefined,
  }, p.content.raw));
}
for (const p of posts) {
  const fm = mediaById[p.featured_media];
  write(path.join(ROOT, 'content/posts', `${p.date.slice(0, 10)}-${p.slug}.md`), stringifyFrontmatter({
    id: p.id,
    type: 'post',
    path: pathFromLink(p.link),
    slug: p.slug,
    title: p.title.raw,
    excerpt: p.excerpt.raw,
    status: p.status,
    featuredImage: localMedia(fm),
    featuredImageAlt: fm?.alt_text || undefined,
    date: p.date_gmt + 'Z',
    modified: p.modified_gmt + 'Z',
    categories: p.categories,
  }, p.content.raw));
}
console.log(`Wrote ${pages.length} pages and ${posts.length} posts to content/`);

// --- Contact Form 7 -----------------------------------------------------------
let forms = [];
try {
  const { json } = await wp.rest('/contact-form-7/v1/contact-forms');
  for (const f of json) {
    const { json: full } = await wp.rest(`/contact-form-7/v1/contact-forms/${f.id}`);
    forms.push({ id: f.id, title: f.title, slug: f.slug, form: full.properties?.form, mail: full.properties?.mail, messages: full.properties?.messages });
  }
} catch (e) { console.warn('CF7 not readable:', e.message); }

// --- theme --------------------------------------------------------------------
let themeFiles = [];
if (!args.has('--no-theme')) {
  themeFiles = await wp.themeFiles();
  const dir = path.join(ROOT, 'wordpress/theme', THEME_SLUG);
  for (const f of themeFiles) {
    const content = await wp.getThemeFile(f);
    write(path.join(dir, f), content.replace(/^﻿/, ''));
  }
  console.log(`Wrote ${themeFiles.length} theme files to wordpress/theme/${THEME_SLUG}/`);
}

// --- binaries: theme images + media library -------------------------------------
if (!args.has('--no-media')) {
  const themeImages = new Set();
  const dir = path.join(ROOT, 'wordpress/theme', THEME_SLUG);
  if (fs.existsSync(dir)) {
    for (const f of walk(dir)) {
      const txt = fs.readFileSync(f, 'utf8');
      for (const m of txt.matchAll(/images\/([^"')\s]+\.(?:png|jpe?g|webp|svg))/gi)) themeImages.add(decodeURIComponent(m[1]));
    }
  }
  for (const img of themeImages) {
    await download(`${wp.baseUrl}/wp-content/themes/${THEME_SLUG}/images/${encodeURIComponent(img)}`, path.join(ROOT, 'public/images', img));
  }
  for (const m of media) {
    await download(m.source_url, path.join(ROOT, 'public/uploads', path.basename(new URL(m.source_url).pathname)));
  }
}

// --- meta descriptions (the theme hard-codes them in functions.php) -------------------
const metaDescriptions = {};
const fnFile = path.join(ROOT, 'wordpress/theme', THEME_SLUG, 'functions.php');
if (fs.existsSync(fnFile)) {
  const block = fs.readFileSync(fnFile, 'utf8').match(/\$descriptions = \[([\s\S]*?)\];/);
  for (const m of (block ? block[1] : '').matchAll(/'([^']*)'\s*=>\s*'((?:[^'\\]|\\.)*)'/g)) metaDescriptions[m[1]] = m[2].replace(/\\'/g, "'");
}

// --- site.json ---------------------------------------------------------------------
write(path.join(ROOT, 'content/site.json'), JSON.stringify({
  pulledAt: new Date().toISOString(),
  url: settings.url,
  title: settings.title,
  tagline: settings.description,
  adminEmail: settings.email,
  language: settings.language,
  wordpress: { generator: root.description || undefined, namespaces: root.namespaces },
  theme: { slug: THEME_SLUG, files: themeFiles },
  frontPageId: settings.page_on_front,
  navigation: [
  {
    "label": "Platform",
    "path": "/#platform"
  },
  {
    "label": "For clinics",
    "path": "/use-cases/clinics-mental-health-organizations"
  },
  {
    "label": "For partners",
    "path": "/use-cases/medical-device-treatment-partners"
  },
  {
    "label": "Science & team",
    "path": "/science-evidence"
  },
  {
    "label": "Book a demo \u2197",
    "path": "/partner-demo",
    "style": "button"
  }
],
  footerLinks: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms', path: '/terms' },
  ],
  contactEmail: 'info@thinkable.app',
  legalEntity: 'GGTUDE LTD, doing business as Thinkable',
  analytics: { ga4: 'G-RPW89LCFYM' },
  studiesApi: 'https://api.ggtude.com/services/api/studies',
  metaDescriptions,
  forms,
  media: media.map((m) => ({ id: m.id, url: m.source_url, local: localMedia(m), alt: m.alt_text, title: m.title?.rendered, mime: m.mime_type, width: m.media_details?.width, height: m.media_details?.height })),
}, null, 2) + '\n');
console.log('Wrote content/site.json');

// --- docs/content-inventory.md --------------------------------------------------------
const inv = ['# Content inventory (generated by `npm run wp:pull`)', '', `Pulled ${new Date().toISOString().slice(0, 10)} from ${settings.url}. ${pages.length} pages, ${posts.length} posts, ${media.length} media files, ${forms.length} forms, ${themeFiles.length} theme files.`, '', '## Pages', '', '| Path | Title | Template | Modified | Words |', '|---|---|---|---|---|'];
const words = (html) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
for (const p of [...pages].sort((a, b) => pathFromLink(a.link).localeCompare(pathFromLink(b.link)))) {
  const pth = p.id === settings.page_on_front ? '/' : pathFromLink(p.link);
  inv.push(`| ${pth} | ${p.title.raw} | ${p.template || 'default'} | ${p.modified_gmt.slice(0, 10)} | ${words(p.content.raw)} |`);
}
inv.push('', '## Posts', '', '| Date | Path | Title |', '|---|---|---|');
for (const p of [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))) inv.push(`| ${p.date.slice(0, 10)} | ${pathFromLink(p.link)} | ${p.title.raw} |`);
inv.push('', '## Forms (Contact Form 7)', '', '| ID | Title | Fields |', '|---|---|---|');
for (const f of forms) inv.push(`| ${f.id} | ${f.title} | ${[...(f.form?.content || '').matchAll(/\[(\w+\*?) ([\w-]+)/g)].map((m) => m[2]).join(', ')} |`);
inv.push('', '## Media', '', '| ID | File | Alt |', '|---|---|---|');
for (const m of media) inv.push(`| ${m.id} | ${path.basename(new URL(m.source_url).pathname)} | ${m.alt_text || ''} |`);
inv.push('', '## Theme files', '', ...themeFiles.map((f) => `- \`${f}\``), '');
write(path.join(ROOT, 'docs/content-inventory.md'), inv.join('\n'));
console.log('Wrote docs/content-inventory.md');

// ---------------------------------------------------------------------------------------
function write(file, data) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, data); }
function rmDir(dir) { if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true }); }
function* walk(dir) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) yield* walk(p); else yield p; } }
async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  const res = await fetch(url);
  if (!res.ok) { console.warn(`  skip ${url} (HTTP ${res.status})`); return; }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`  downloaded ${path.relative(ROOT, dest)}`);
}
