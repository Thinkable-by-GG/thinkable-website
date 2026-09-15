import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BlogPage } from '@/pages/BlogPage';
import { ContentRouter } from '@/pages/ContentRouter';
import { HomePage } from '@/pages/HomePage';
import { PartnerDemoPage } from '@/pages/PartnerDemoPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const isHome = useLocation().pathname === '/';
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/partner-demo" element={<PartnerDemoPage />} />
        <Route path="*" element={<ContentRouter />} />
      </Routes>
      <SiteFooter variant={isHome ? 'home' : 'internal'} />
    </>
  );
}
