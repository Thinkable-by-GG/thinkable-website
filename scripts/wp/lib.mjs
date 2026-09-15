// Shared WordPress client for thinkable.app.
// Auth: cookie login against wp-login.php (the site has no application passwords),
// then REST calls carry the cookies + an X-WP-Nonce, and theme files go through
// wp-admin/theme-editor.php (the theme has no git deploy; the editor is the only write path).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const WP_URL = (process.env.WP_URL || 'https://thinkable.app').replace(/\/$/, '');
export const THEME_SLUG = process.env.WP_THEME || 'thinkable-shai';

export function loadCredentials() {
  if (process.env.WP_USER && process.env.WP_PASS) {
    return { user: process.env.WP_USER, pass: process.env.WP_PASS };
  }
  const file = process.env.WP_CREDS_FILE || path.join(os.homedir(), 'dev/creds/thinkable-app-wordpress.md');
  if (!fs.existsSync(file)) {
    throw new Error(`No WP credentials. Set WP_USER/WP_PASS or create ${file} (format: "username\\n<user>\\n\\npassword\\n<pass>").`);
  }
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const user = lines[lines.findIndex((l) => /^username$/i.test(l)) + 1];
  const pass = lines[lines.findIndex((l) => /^password$/i.test(l)) + 1];
  if (!user || !pass) throw new Error(`Could not parse credentials from ${file}`);
  return { user, pass };
}

export class WpClient {
  constructor({ baseUrl = WP_URL } = {}) {
    this.baseUrl = baseUrl;
    this.cookies = new Map();
    this.nonce = null;
  }

  cookieHeader() {
    return [...this.cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
  }

  absorbCookies(res) {
    const set = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
    for (const c of set) {
      const [pair] = c.split(';');
      const idx = pair.indexOf('=');
      if (idx > 0) this.cookies.set(pair.slice(0, idx).trim(), pair.slice(idx + 1).trim());
    }
  }

  async fetch(url, init = {}) {
    const headers = { ...(init.headers || {}) };
    if (this.cookies.size) headers.cookie = this.cookieHeader();
    const res = await fetch(url.startsWith('http') ? url : this.baseUrl + url, { ...init, headers, redirect: init.redirect || 'manual' });
    this.absorbCookies(res);
    return res;
  }

  async login() {
    const { user, pass } = loadCredentials();
    await this.fetch('/wp-login.php');
    this.cookies.set('wordpress_test_cookie', 'WP%20Cookie%20check');
    const body = new URLSearchParams({ log: user, pwd: pass, 'wp-submit': 'Log In', redirect_to: `${this.baseUrl}/wp-admin/`, testcookie: '1' });
    const res = await this.fetch('/wp-login.php', { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    if (![...this.cookies.keys()].some((k) => k.startsWith('wordpress_logged_in'))) {
      throw new Error(`WordPress login failed (HTTP ${res.status}). Check credentials.`);
    }
    await this.refreshNonce();
    return this;
  }

  async refreshNonce() {
    for (const page of ['/wp-admin/post-new.php', '/wp-admin/']) {
      const html = await (await this.fetch(page)).text();
      const m = html.match(/wpApiSettings\s*=\s*\{[^}]*"nonce":"([a-f0-9]+)"/) || html.match(/"nonce":"([a-f0-9]{10})"/);
      if (m) { this.nonce = m[1]; return this.nonce; }
    }
    throw new Error('Could not obtain a REST nonce from wp-admin.');
  }

  async rest(route, { method = 'GET', body, query } = {}) {
    const qs = query ? '?' + new URLSearchParams(query).toString() : '';
    const res = await this.fetch(`/wp-json${route}${qs}`, {
      method,
      headers: { 'X-WP-Nonce': this.nonce || '', accept: 'application/json', ...(body ? { 'content-type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      redirect: 'follow',
    });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { throw new Error(`Non-JSON response from ${route} (HTTP ${res.status}): ${text.slice(0, 200)}`); }
    if (!res.ok) throw new Error(`${method} ${route} -> HTTP ${res.status}: ${json.message || text.slice(0, 200)}`);
    return { json, res };
  }

  async restAll(route, query = {}) {
    const out = [];
    for (let page = 1; ; page++) {
      const { json, res } = await this.rest(route, { query: { per_page: 100, page, ...query } });
      out.push(...json);
      const total = Number(res.headers.get('x-wp-totalpages') || 1);
      if (page >= total) break;
    }
    return out;
  }

  // --- theme editor -------------------------------------------------------
  async themeFiles(theme = THEME_SLUG) {
    const html = await (await this.fetch(`/wp-admin/theme-editor.php?theme=${theme}`)).text();
    const files = new Set();
    for (const m of html.matchAll(/theme-editor\.php\?file=([^&"]+)(?:&amp;|&#038;|&)theme=/g)) files.add(decodeURIComponent(m[1]));
    return [...files].sort();
  }

  async themeEditorPage(file, theme = THEME_SLUG) {
    const html = await (await this.fetch(`/wp-admin/theme-editor.php?file=${encodeURIComponent(file)}&theme=${theme}`)).text();
    const ta = html.match(/<textarea[^>]*id="newcontent"[^>]*>([\s\S]*?)<\/textarea>/);
    const nonce = html.match(/id="nonce"[^>]*value="([^"]+)"/);
    if (!ta) throw new Error(`Theme editor did not return ${file}. Is file editing disabled (DISALLOW_FILE_EDIT)?`);
    return { content: decodeEntities(ta[1]), nonce: nonce ? nonce[1] : null };
  }

  async getThemeFile(file, theme = THEME_SLUG) {
    return (await this.themeEditorPage(file, theme)).content;
  }

  async putThemeFile(file, content, theme = THEME_SLUG) {
    const { nonce } = await this.themeEditorPage(file, theme);
    if (!nonce) throw new Error('Theme editor form nonce not found.');
    const body = new URLSearchParams({
      nonce,
      _wp_http_referer: `/wp-admin/theme-editor.php?file=${file}&theme=${theme}`,
      action: 'update',
      file,
      theme,
      newcontent: content,
      submit: 'Update File',
    });
    const res = await this.fetch('/wp-admin/theme-editor.php', { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    if (res.status >= 400) throw new Error(`Theme editor update failed: HTTP ${res.status}`);
    const after = await this.getThemeFile(file, theme);
    if (after.replace(/\r\n/g, '\n') !== content.replace(/\r\n/g, '\n')) {
      throw new Error(`Verification failed: ${file} on the server does not match what was pushed.`);
    }
    return true;
  }
}

export function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&amp;/g, '&');
}

// --- markdown-with-frontmatter helpers (content/ files) ---------------------
export function stringifyFrontmatter(meta, body) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(meta)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) lines.push(`${k}: ${JSON.stringify(v)}`);
    else if (typeof v === 'number' || typeof v === 'boolean') lines.push(`${k}: ${v}`);
    else lines.push(`${k}: ${JSON.stringify(String(v))}`);
  }
  lines.push('---', '');
  return lines.join('\n') + body.replace(/\r\n/g, '\n').trim() + '\n';
}

export function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    const raw = line.slice(i + 1).trim();
    try { meta[k] = JSON.parse(raw); } catch { meta[k] = raw; }
  }
  return { meta, body: m[2] };
}

export function pathFromLink(link) {
  const u = new URL(link);
  return u.pathname.replace(/\/+$/, '') || '/';
}
