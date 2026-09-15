// Push a content/ markdown file (page or post) back to WordPress via the REST API.
// Title, excerpt and the raw HTML body are updated on the existing post id from the frontmatter.
// Usage: node scripts/wp/push-content.mjs content/pages/contact.md [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import { WpClient, parseFrontmatter } from './lib.mjs';

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const files = argv.filter((a) => !a.startsWith('--'));
if (!files.length) { console.error('Pass one or more content/**.md files.'); process.exit(1); }

const wp = await new WpClient().login();
for (const file of files) {
  const { meta, body } = parseFrontmatter(fs.readFileSync(file, 'utf8'));
  if (!meta.id || !meta.type) throw new Error(`${file}: frontmatter needs id and type`);
  const route = `/wp/v2/${meta.type === 'post' ? 'posts' : 'pages'}/${meta.id}`;
  const { json: current } = await wp.rest(route, { query: { context: 'edit' } });
  const payload = {};
  if (current.title.raw !== meta.title) payload.title = meta.title;
  if ((current.excerpt.raw || '') !== (meta.excerpt || '')) payload.excerpt = meta.excerpt || '';
  if (current.content.raw.replace(/\r\n/g, '\n').trim() !== body.trim()) payload.content = body.trim();
  if (!Object.keys(payload).length) { console.log(`= ${path.basename(file)} (unchanged)`); continue; }
  console.log(`${dryRun ? '~' : '^'} ${path.basename(file)} -> ${route} fields: ${Object.keys(payload).join(', ')}${dryRun ? ' (dry run)' : ''}`);
  if (dryRun) continue;
  await wp.rest(route, { method: 'POST', body: payload });
  console.log(`  updated ${meta.type} ${meta.id} (${meta.path})`);
}
