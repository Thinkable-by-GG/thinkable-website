import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const theme = path.join(root, 'wordpress/theme/thinkable-shai');
const css = ['styles.css', 'internal.css'].map(file => fs.readFileSync(path.join(theme, file), 'utf8')).join('\n')
  .replace(/^@import[^\n]*\n/gm, '')
  .replace(/url\(["']?\.\/images\//g, 'url("/images/');
fs.writeFileSync(path.join(root, 'src/styles/site.css'), '/* Generated from the WordPress theme by scripts/wp/build-styles.mjs. Do not edit directly. */\n' + css);
console.log('Built preview styles from the local WordPress theme.');
