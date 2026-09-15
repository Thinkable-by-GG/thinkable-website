import { HtmlContent } from '@/components/HtmlContent';
import { InternalSidebar } from '@/components/PartnerSidebar';
import { StudiesLibrary } from '@/components/StudiesLibrary';
import { metaDescription } from '@/content';
import type { ContentDoc } from '@/content/types';
import { HERO_GRADIENTS, heroStyle } from '@/lib/heroStyle';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

/** Port of page-internal.php: hero from featured image + excerpt, editor content, sidebar. */
export function InternalPage({ doc }: { doc: ContentDoc }) {
  useDocumentMeta(doc.title, metaDescription(doc));
  const intro = doc.excerpt || 'Clear partner-facing guidance for evaluating where Thinkable fits in a mental health care, product, workforce, or research journey.';
  return (
    <main className="internal-page" id="main">
      <section className="internal-hero" style={heroStyle(HERO_GRADIENTS.internal, doc.featuredImage)}>
        <div>
          <p className="eyebrow">THINKABLE PARTNER RESOURCE</p>
          <h1>{doc.title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="internal-shell">
        <HtmlContent className="internal-content" html={doc.html} />
        <InternalSidebar />
      </section>
      {doc.path === '/science-evidence' && <StudiesLibrary />}
    </main>
  );
}
