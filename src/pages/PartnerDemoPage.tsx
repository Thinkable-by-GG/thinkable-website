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
          <h1>See Thinkable around your clinic.</h1>
          <p>Walk through the patient journey with us: acquisition, intake coordination, support during treatment, and follow-up after care.</p>
        </div>
      </section>

      <section className="partner-intake" id="partner-form">
        <div className="partner-intake-copy">
          <p className="eyebrow">START THE CONVERSATION</p>
          <h2>Start with your clinic’s priorities.</h2>
          <p>Tell us about your clinic, patient population, and the part of the journey you want to improve. We will focus the demo on the workflows and support that matter to your team.</p>
          <div className="partner-fit-list">
            <div><strong>Good fit for</strong><span>TMS clinics, clinic groups, and device or treatment partners.</span></div>
            <div><strong>Useful context</strong><span>Your service area, current intake process, team workflow, and patient engagement priorities.</span></div>
            <div><strong>Next step</strong><span>A walkthrough of the platform and a discussion of scope, evidence, and implementation.</span></div>
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
          <h2>A clear path from demo to decision.</h2>
        </div>
        <div className="partner-after-grid">
          <article><strong>1</strong><h3>We review your context</h3><p>We review your clinic workflow and the patient population you support.</p></article>
          <article><strong>2</strong><h3>We walk through the platform</h3><p>See the clinic workspace, patient experience, and acquisition and referral workflows.</p></article>
          <article><strong>3</strong><h3>We define next steps</h3><p>Together, we define responsibilities, implementation scope, and what success should look like.</p></article>
        </div>
      </section>
    </main>
  );
}
