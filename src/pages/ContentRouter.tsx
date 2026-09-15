import { Navigate, useLocation } from 'react-router-dom';
import { getByPath, normalizePath, posts } from '@/content';
import { ArticlePage } from './ArticlePage';
import { InternalPage } from './InternalPage';
import { NotFoundPage } from './NotFoundPage';

/** Legacy redirects kept from functions.php (template_redirect). */
const REDIRECTS: Record<string, string> = { '/main-design': '/', '/privacy': '/privacy-policy', '/privacy-policy-2': '/privacy-policy', '/index.html': '/' };

/** Resolves any path against content/pages + content/posts and picks the matching template. */
export function ContentRouter() {
  const path = normalizePath(useLocation().pathname);
  if (REDIRECTS[path]) return <Navigate to={REDIRECTS[path]} replace />;
  const dated = path.match(/^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)$/);
  if (dated && posts.some((p) => p.slug === dated[1])) return <Navigate to={`/${dated[1]}`} replace />;

  const doc = getByPath(path);
  if (!doc) return <NotFoundPage />;
  if (doc.type === 'post' || doc.template === 'page-resource-article.php') return <ArticlePage doc={doc} />;
  return <InternalPage doc={doc} />;
}
