import siteJson from '@content/site.json';
import type { ContentDoc, ContentMeta, SiteConfig } from './types';

export const site = siteJson as unknown as SiteConfig;

const pageFiles = import.meta.glob('/content/pages/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const postFiles = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parse(text: string): ContentDoc {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, unknown> = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i < 0) continue;
      const key = line.slice(0, i).trim();
      const raw = line.slice(i + 1).trim();
      try { meta[key] = JSON.parse(raw); } catch { meta[key] = raw; }
    }
  }
  return { ...(meta as unknown as ContentMeta), html: (m ? m[2] : text).trim() };
}

export const pages: ContentDoc[] = Object.values(pageFiles).map(parse).filter((p) => p.status === 'publish');
export const posts: ContentDoc[] = Object.values(postFiles).map(parse).filter((p) => p.status === 'publish')
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const byPath = new Map<string, ContentDoc>();
for (const doc of [...pages, ...posts]) byPath.set(doc.path, doc);

export const normalizePath = (p: string) => (p.replace(/\/+$/, '') || '/');
export const getByPath = (p: string) => byPath.get(normalizePath(p));
export const getPage = (p: string) => pages.find((x) => x.path === normalizePath(p));
export const childrenOf = (parentPath: string) =>
  pages.filter((p) => p.parentPath === normalizePath(parentPath)).sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0) || a.id - b.id);
export const frontPage = pages.find((p) => p.isFrontPage);
export const getForm = (title: string) => site.forms.find((f) => f.title === title);

/** Meta description: the theme's per-path map first, then the excerpt, then a generic fallback. */
export function metaDescription(doc?: ContentDoc, path?: string): string {
  const key = (path ?? doc?.path ?? '/').replace(/^\//, '');
  const fromTheme = site.metaDescriptions?.[key];
  if (fromTheme) return fromTheme;
  if (doc?.excerpt) return doc.excerpt;
  if (doc?.html) return doc.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').slice(0, 26).join(' ') + '.';
  return doc ? `Learn more about ${doc.title} from Thinkable.` : '';
}
