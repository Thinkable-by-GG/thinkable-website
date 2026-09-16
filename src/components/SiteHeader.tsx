import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { site } from '@/content';

export function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  const location = useLocation();
  useEffect(() => { if (menu.current) menu.current.open = false; }, [location]);
  const links = site.navigation.map(item => <Link key={item.path} to={item.path} className={item.style === 'button' ? 'contact-button' : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{item.label}</Link>);
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="Thinkable home"><span className="brand-mark t-brand-symbol" aria-hidden="true" />thinkable</Link>
    <nav className="nav-links" aria-label="Primary navigation">{links}</nav>
    <details className="t-mobile-nav" ref={menu} onKeyDown={e => { if (e.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}><summary>Menu</summary><nav aria-label="Mobile navigation">{links}</nav></details>
  </header>;
}
