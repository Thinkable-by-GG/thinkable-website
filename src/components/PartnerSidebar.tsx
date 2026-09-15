import { Link } from 'react-router-dom';

/** Sidebar used by page-internal.php. */
export function InternalSidebar() {
  return (
    <aside className="internal-sidebar" aria-label="Page sidebar">
      <div className="sidebar-panel">
        <p className="sidebar-kicker">Key pages</p>
        <Link to="/use-cases">Use cases</Link>
        <Link to="/science-evidence">Science and evidence</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/partner-demo">Partner demo</Link>
      </div>
      <div className="sidebar-panel sidebar-cta">
        <p className="sidebar-kicker">Partner Demo</p>
        <h2>Check fit with Thinkable</h2>
        <p>Share your organization type and use case so the right partnership path can be reviewed.</p>
        <Link className="button button-light" to="/partner-demo">Request Demo</Link>
      </div>
      <div className="sidebar-note">
        <strong>Best for</strong>
        <span>Clinics, digital health teams, medical device partners, employers, EAPs, and research teams.</span>
      </div>
    </aside>
  );
}

/** Rail used by page-resource-article.php and single.php. */
export function ArticleRail({ kind }: { kind: 'resource' | 'post' }) {
  return (
    <aside className="resource-article-rail" aria-label={kind === 'post' ? 'Article sidebar' : 'Related resource links'}>
      <div>
        <p className="sidebar-kicker">Related paths</p>
        {kind === 'post' ? <Link to="/blog">Blog</Link> : <Link to="/use-cases">Use cases</Link>}
        {kind === 'post' ? <Link to="/resources">Resources</Link> : <Link to="/science-evidence">Science and evidence</Link>}
        {kind === 'post' ? <Link to="/use-cases">Use cases</Link> : <Link to="/resources">Resource hub</Link>}
        <Link to="/partner-demo">Partner demo</Link>
      </div>
      <div className="resource-demo-box">
        <p className="sidebar-kicker">Partner Demo</p>
        <h2>{kind === 'post' ? 'Discuss partner fit' : 'Discuss this use case'}</h2>
        <p>{kind === 'post' ? 'Share the audience and support path your organization is evaluating.' : 'Share your audience, support gap, and review needs so the right partner path can be evaluated.'}</p>
        <Link className="button button-light" to="/partner-demo">Request Demo</Link>
      </div>
    </aside>
  );
}
