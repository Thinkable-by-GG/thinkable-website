import { HtmlContent } from '@/components/HtmlContent';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import homeTemplate from '../../wordpress/theme/thinkable-shai/page-main-design.php?raw';
import { templateFragment } from '@/lib/templateFragment';
const homeHtml = templateFragment(homeTemplate, 'lifecycle-home');

/** Shared markup keeps the preview and WordPress homepage identical. */
export function HomePage() {
  useDocumentMeta('Thinkable | The connected platform for TMS clinics', 'Connect patient acquisition, clinic workflows, and digital support across the TMS patient journey. Explore Thinkable for clinics and treatment partners.');
  return <main id="main"><HtmlContent html={homeHtml} /></main>;
}
