// Push one or more theme files from wordpress/theme/<slug>/ to the live site
// through wp-admin's theme editor, then verify the server copy matches.
// Usage: node scripts/wp/push-theme.mjs functions.php template-parts/site-footer.php
//        node scripts/wp/push-theme.mjs --all        (every text file in the theme dir)
//        add --dry-run to only show which files differ from the server
import fs from 'node:fs';
import path from 'node:path';
import { WpClient, THEME_SLUG } from './lib.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname, '..');
const dir = path.join(ROOT, 'wordpress/theme', THEME_SLUG);
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
let files = argv.filter((a) => !a.startsWith('--'));
if (argv.includes('--all')) files = walk(dir).map((f) => path.relative(dir, f)).filter((f) => /\.(php|css|js|svg|txt|json)$/i.test(f));
if (!files.length) { console.error('Nothing to push. Pass file names relative to the theme dir, or --all.'); process.exit(1); }

const wp = await new WpClient().login();
let changed = 0;
for (const f of files) {
  const local = fs.readFileSync(path.join(dir, f), 'utf8');
  const remote = await wp.getThemeFile(f);
  if (remote.replace(/^﻿/, '').replace(/\r\n/g, '\n') === local.replace(/\r\n/g, '\n')) { console.log(`= ${f} (unchanged)`); continue; }
  changed++;
  if (dryRun) { console.log(`~ ${f} differs (dry run)`); continue; }
  await wp.putThemeFile(f, local);
  console.log(`^ ${f} pushed and verified`);
}
console.log(dryRun ? `${changed} file(s) differ.` : `${changed} file(s) pushed.`);

function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])); }
