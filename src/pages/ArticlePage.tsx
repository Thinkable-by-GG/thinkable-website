import { HtmlContent } from '@/components/HtmlContent';
import { ArticleRail } from '@/components/PartnerSidebar';
import { metaDescription } from '@/content';
import type { ContentDoc } from '@/content/types';
import { HERO_GRADIENTS, heroStyle } from '@/lib/heroStyle';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

/** Port of page-resource-article.php (resources) and single.php (blog posts). */
export function ArticlePage({ doc }: { doc: ContentDoc }) {
  useDocumentMeta(doc.title, metaDescription(doc));
  const isPost = doc.type === 'post';
  const intro = doc.excerpt || (isPost ? 'Practical guidance for partner teams evaluating structured mental health support.' : 'Practical guidance for partners evaluating structured mental health support.');
  return (
    <main className="resource-article-page" id="main">
      <section className="resource-hero" style={heroStyle(HERO_GRADIENTS.resource, doc.featuredImage)}>
        <div>
          <p className="eyebrow">{isPost ? 'THINKABLE ARTICLE' : 'THINKABLE RESOURCE'}</p>
          <h1>{doc.title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="resource-article-shell">
        <HtmlContent className="resource-article-content" html={doc.html} />
        <ArticleRail kind={isPost ? 'post' : 'resource'} />
      </section>
    </main>
  );
}
