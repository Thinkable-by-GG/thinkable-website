export type ContentType = 'page' | 'post';

export interface ContentMeta {
  id: number;
  type: ContentType;
  /** URL path without trailing slash, e.g. "/use-cases/digital-health-partners". "/" for the front page. */
  path: string;
  slug: string;
  title: string;
  excerpt?: string;
  /** WordPress page template file name (pages only). */
  template?: string;
  parent?: number;
  parentPath?: string;
  menuOrder?: number;
  status: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  date: string;
  modified: string;
  isFrontPage?: boolean;
  categories?: number[];
}

export interface ContentDoc extends ContentMeta {
  /** Raw WordPress HTML body (what the editor stores, before the_content filters). */
  html: string;
}

export interface NavItem { label: string; path: string; style?: 'button' }

export interface Cf7Form {
  id: number;
  title: string;
  slug: string;
  form?: { content: string };
  messages?: Record<string, string>;
}

export interface SiteConfig {
  pulledAt: string;
  url: string;
  title: string;
  tagline: string;
  navigation: NavItem[];
  footerLinks: NavItem[];
  contactEmail: string;
  legalEntity: string;
  analytics: { ga4: string };
  studiesApi: string;
  metaDescriptions?: Record<string, string>;
  forms: Cf7Form[];
  media: { id: number; url: string; local?: string; alt?: string }[];
}
