import { HtmlContent } from '@/components/HtmlContent';
import footerTemplate from '../../wordpress/theme/thinkable-shai/template-parts/site-footer.php?raw';
import { templateFragment } from '@/lib/templateFragment';
const footerHtml = templateFragment(footerTemplate, 'lifecycle-footer');
export function SiteFooter() {
  return <footer className="site-footer" id="contact"><HtmlContent html={footerHtml} /></footer>;
}
