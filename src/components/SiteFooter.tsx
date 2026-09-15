import { Link } from 'react-router-dom';
import { site } from '@/content';

export function SiteFooter({ variant = 'internal' }: { variant?: 'home' | 'internal' }) {
  const blurb = variant === 'home'
    ? 'At Thinkable, we help mental health clinics connect with better-fit patients through thoughtful technology, intelligent matching, and a more human-centered approach to care.'
    : 'Thinkable helps partners add structured mental health support around care journeys, products, employee programs, and research initiatives.';
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div>
          <h2>Thinkable</h2>
          <h3>Better-fit patients. Better care journeys.</h3>
          <p>{blurb}</p>
        </div>
        <address>
          <strong>Contact Us</strong>
          Email {site.contactEmail}
        </address>
      </div>
      <div className="footer-bottom">
        <span>&copy; {site.legalEntity}, {new Date().getFullYear()}</span>
        {site.footerLinks.map((l) => <span key={l.path}><Link to={l.path}>{l.label}</Link></span>)}
      </div>
    </footer>
  );
}
