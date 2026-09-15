import { Cf7Form } from '@/components/Cf7Form';
import { frontPage, getForm, metaDescription } from '@/content';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

/** Port of page-main-design.php ("Thinkable Patient Fit" home). */
export function HomePage() {
  useDocumentMeta('Thinkable Patient Fit', metaDescription(frontPage, '/'));
  const fitForm = getForm('Thinkable Homepage Fit Form');
  const heroImage = frontPage?.featuredImage || '/images/Top_Pg_Patient_01 1.png';

  return (
    <main id="main">
      <section className="hero" aria-label="Thinkable patient correction">
        <img className="hero-image" src={encodeURI(heroImage)} alt="A woman standing outside a clinic while clinicians talk in the background" />
        <div className="hero-panel">
          <p className="eyebrow">THINKABLE PATIENT CORRECTION</p>
          <h1>Thinkable brings clinics better-fit mental health patients.</h1>
          <p className="hero-copy">Thinkable helps clinics and mental health organizations connect with better-fitting patient populations to improve care and business.</p>
          <div className="hero-actions" aria-label="Hero actions">
            <a className="button button-primary" href="#demo">Request Demo</a>
            <a className="button button-outline" href="#fit">Get Fit Feedback</a>
          </div>
        </div>
      </section>

      <section className="fit-section" id="fit">
        <h2>Check partnership fit</h2>
        <div className="fit-form" aria-label="Partnership fit form">
          <p>We'll check if we're set up for success in any format,<br />as we offer only the right fit for you.</p>
          {fitForm ? <Cf7Form form={fitForm} onSuccess="/partner-demo-thank-you" className="wpcf7-form" /> : <p className="form-notice form-error">The form is being configured. Please check back shortly.</p>}
        </div>
      </section>

      <section className="illustration-band" aria-label="Lead quality comparison">
        <div className="illustration-copy">
          <p className="section-kicker">THE BUSINESS PROBLEM</p>
          <h2>More leads are meaningless if they are the wrong patients.</h2>
          <p>Clinics do not need more anonymous traffic. They need patients whose needs, timing, and expectations match the clinic's expertise.</p>
        </div>
        <img src="/images/Wrong_Patients_01%201.png" alt="Comparison showing that more leads are meaningless if they are the wrong patients" />
      </section>

      <section className="quote-section">
        <blockquote>We get hundreds of inquiries a month but most aren't a fit for our specialty. We need intent signals, not volume.</blockquote>
        <p>Clinical operations perspective</p>
        <div className="dots" aria-hidden="true"><span className="active" /><span /><span /><span /></div>
      </section>

      <section className="image-feature" aria-label="Product image slider">
        <div className="slider" tabIndex={0}>
          <figure className="slide" id="slide-1"><img src="/images/image%202.png" alt="Clinician and patient reviewing a care dashboard on a laptop" /></figure>
          <figure className="slide" id="slide-2"><img src="/images/slider-clinic-consultation.png" alt="Clinician reviewing patient-fit insights with a clinic partner" /></figure>
          <figure className="slide" id="slide-3"><img src="/images/slider-operations-dashboard.png" alt="Clinic professionals reviewing patient-fit analytics on a display" /></figure>
        </div>
        <div className="slider-dots" aria-label="Slider navigation">
          <a href="#slide-1" aria-label="Show slide 1" /><a href="#slide-2" aria-label="Show slide 2" /><a href="#slide-3" aria-label="Show slide 3" />
        </div>
      </section>

      <section className="product-path" id="product">
        <p className="section-kicker">THE PRODUCT PATH</p>
        <h2>From support experience<br />to clinic-ready opportunity.</h2>
        <p className="section-copy">Thinkable captures intent through the product experience, organizes fit signals,<br />then gives clinics a clearer reason to talk.</p>
        <div className="path-icons" aria-label="Product path steps">
          <div className="path-step"><span className="icon users-icon" /><p>Patient engages</p></div>
          <span className="path-arrow">-&gt;</span>
          <div className="path-step"><span className="icon target-icon" /><p>Thinkable qualifies</p></div>
          <span className="path-arrow">-&gt;</span>
          <div className="path-step"><span className="icon growth-icon" /><p>Clinic receives</p></div>
        </div>
        <div className="process-cards">
          <article><strong>01</strong><h3>Patient engages</h3><p>Users interact with Thinkable's mental health support experience, building engagement signals over time.</p></article>
          <article><strong>02</strong><h3>Thinkable qualifies fit</h3><p>Engagement and need signals help identify the right care path and match patients to clinic expertise.</p></article>
          <article><strong>03</strong><h3>Clinic receives context</h3><p>The clinic gets a clearer opportunity with real intent context, not just another anonymous lead.</p></article>
        </div>
      </section>

      <section className="trust-section" id="evidence">
        <p className="section-kicker">WHY TRUST THINKABLE</p>
        <h2>Why clinics trust<br />our model</h2>
        <div className="trust-cards">
          <article><span className="trust-icon ring" /><h3>Evidence-backed</h3><p>Built from a digital mental health product with research credibility. The clinical foundation is real, not a marketing layer.</p></article>
          <article><span className="trust-icon dots-icon" /><h3>Engagement-led</h3><p>Patients are not coming from cold traffic alone. They interact with the product first, building real engagement signals.</p></article>
          <article><span className="trust-icon users-icon" /><h3>Partner-fit focused</h3><p>The goal is not inflated volume. It is better alignment between patient need and clinic expertise.</p></article>
        </div>
      </section>

      <section className="final-cta" id="demo">
        <p className="section-kicker">PARTNER DEMO</p>
        <h2>Check whether Thinkable is the right patient-fit channel for your clinic.</h2>
        <p>Share your patient focus and we will help confirm whether the partnership fit is strong before you spend time on a full demo.</p>
        <div className="cta-actions">
          <a className="button button-primary" href="#fit">Request Demo</a>
          <a className="button button-outline" href="#fit">Get Fit Feedback</a>
        </div>
      </section>
    </main>
  );
}
