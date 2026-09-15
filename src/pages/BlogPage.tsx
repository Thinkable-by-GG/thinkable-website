import { Link } from 'react-router-dom';
import { getPage, metaDescription, posts } from '@/content';
import { HERO_GRADIENTS, heroStyle } from '@/lib/heroStyle';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/** Port of page-blog.php. */
export function BlogPage() {
  const page = getPage('/blog');
  useDocumentMeta('Thinkable Blog', metaDescription(page, '/blog'));
  return (
    <main className="internal-page" id="main">
      <section className="internal-hero" style={heroStyle(HERO_GRADIENTS.internal, page?.featuredImage)}>
        <div>
          <p className="eyebrow">THINKABLE BLOG</p>
          <h1>Partner mental health insights</h1>
          <p>Practical articles for clinics, digital health teams, employers, research partners, and treatment organizations evaluating structured mental health support.</p>
        </div>
      </section>
      <section className="blog-shell">
        {posts.length ? (
          <div className="blog-grid">
            {posts.slice(0, 12).map((p) => (
              <article className="blog-card" key={p.id}>
                {p.featuredImage && <Link className="blog-card-image" to={p.path}><img src={encodeURI(p.featuredImage)} alt={p.featuredImageAlt || ''} loading="lazy" /></Link>}
                <p className="sidebar-kicker">{fmt(p.date)}</p>
                <h2><Link to={p.path}>{p.title}</Link></h2>
                <p>{p.excerpt}</p>
              </article>
            ))}
          </div>
        ) : <p className="lead">Articles are being prepared for publication.</p>}
      </section>
    </main>
  );
}
