import { Cf7Form } from '@/components/Cf7Form';
import { getForm, getPage, metaDescription } from '@/content';
import { HERO_GRADIENTS, heroStyle } from '@/lib/heroStyle';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

/** Port of page-partner-demo.php. */
export function PartnerDemoPage() {
  const page = getPage('/partner-demo');
  useDocumentMeta('Partner Demo', metaDescription(page, '/partner-demo'));
  const form = getForm('Thinkable Partner Demo Form');
  return (
    <main className="partner-page" id="main">
      <section className="partner-hero" style={heroStyle(HERO_GRADIENTS.partner, page?.featuredImage)}>
        <div className="partner-hero-copy">
          <p className="eyebrow">PARTNER DEMO</p>
          <h1>Explore a Thinkable partnership</h1>
          <p>Tell us who you serve and where mental health support is needed. We will use that context to review whether Thinkable fits your care, product, benefits, treatment, or research path.</p>
        </div>
      </section>

      <section className="partner-intake" id="partner-form">
        <div className="partner-intake-copy">
          <p className="eyebrow">START THE CONVERSATION</p>
          <h2>Share the use case, not a generic contact request.</h2>
          <p>The most useful first conversation starts with your audience and the support gap you are trying to solve. Use the form to share the basics, and we will route the conversation around the right partner path.</p>
          <div className="partner-fit-list">
            <div><strong>Good fit for</strong><span>Clinics, digital health teams, medical device partners, employers, EAPs, and research teams.</span></div>
            <div><strong>Useful context</strong><span>Audience served, primary support need, current workflow, and review requirements.</span></div>
            <div><strong>Next step</strong><span>A focused discussion about fit, evidence language, implementation, and ownership.</span></div>
          </div>
        </div>
        <div className="partner-form">
          {form ? <Cf7Form form={form} onSuccess="/partner-demo-thank-you" /> : <p className="form-notice form-error">The form is being configured. Please check back shortly.</p>}
          <p className="form-footnote">This form is for partnership and B2B use-case conversations only. It is not monitored for clinical support, emergency help, or individual patient care requests.</p>
        </div>
      </section>

      <section className="partner-after">
        <div>
          <p className="eyebrow">WHAT HAPPENS NEXT</p>
          <h2>A focused review of fit.</h2>
        </div>
        <div className="partner-after-grid">
          <article><strong>1</strong><h3>We review your context</h3><p>Your organization type, audience, use case, and review needs shape the first conversation.</p></article>
          <article><strong>2</strong><h3>We discuss the partner path</h3><p>The demo focuses on where Thinkable support could fit, the evidence to review, and the rollout details to clarify.</p></article>
          <article><strong>3</strong><h3>We define next steps</h3><p>If there is a fit, the next step is a clearer scope around audience, content, review, and ownership.</p></article>
        </div>
      </section>
    </main>
  );
}
