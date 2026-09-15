import { useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react';

/**
 * Renders WordPress HTML stored in content/*.md. Content is authored by the team in wp-admin,
 * so it is trusted. Internal links are routed client-side; external ones behave normally.
 */
export function HtmlContent({ html, className }: { html: string; className?: string }) {
  const navigate = useNavigate();
  const onClick = (e: MouseEvent<HTMLElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || a.target === '_blank') return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href.replace(/\/+$/, '') || '/');
    } else if (/^https?:\/\/(www\.)?thinkable\.app(\/|$)/.test(href)) {
      e.preventDefault();
      navigate(new URL(href).pathname.replace(/\/+$/, '') || '/');
    }
  };
  return <div className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
