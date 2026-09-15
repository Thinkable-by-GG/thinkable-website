import { useEffect } from 'react';

/** Sets <title> and <meta name="description"> for the current route (SPA equivalent of wp_head). */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.name = 'description'; document.head.appendChild(tag); }
    tag.content = description ?? '';
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.origin + window.location.pathname.replace(/\/?$/, '/');
  }, [title, description]);
}
