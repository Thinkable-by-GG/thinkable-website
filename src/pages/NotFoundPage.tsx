import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function NotFoundPage() {
  useDocumentMeta('Page not found · Thinkable', 'The page you were looking for does not exist.');
  return (
    <main className="internal-page" id="main">
      <div className="not-found">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you were looking for does not exist or has moved.</p>
        <Link className="button button-primary" to="/">Back to home</Link>
      </div>
    </main>
  );
}
