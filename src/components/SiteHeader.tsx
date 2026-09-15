import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '@/content';

/** Mirrors template-parts/site-header.php (checkbox-driven mobile menu). */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Thinkable home">Thinkable</Link>
      <input className="menu-toggle" type="checkbox" id="menu-toggle" aria-label="Toggle navigation menu" checked={open} onChange={(e) => setOpen(e.target.checked)} />
      <label className="hamburger" htmlFor="menu-toggle" aria-hidden="true"><span /><span /><span /></label>
      <nav className="nav-links" aria-label="Primary navigation">
        {site.navigation.map((item) => (
          <NavLink key={item.path} to={item.path} className={item.style === 'button' ? 'contact-button' : undefined} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
