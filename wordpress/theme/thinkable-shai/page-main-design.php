<?php
/* Template Name: Thinkable Main Design */
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thinkable Patient Fit</title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css?v=20260629-forms2'); ?>" />
    <?php wp_head(); ?>
    <style id="thinkable-home-form-critical">
      .fit-form form,
      .fit-form .wpcf7-form {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 31px 36px !important;
      }

      .fit-form form p,
      .fit-form .wpcf7-form p {
        display: contents !important;
        margin: 0 !important;
      }

      .fit-form form label,
      .fit-form .wpcf7-form label {
        display: block !important;
        overflow: hidden !important;
        color: transparent !important;
        font-size: 0 !important;
        line-height: 0 !important;
      }

      .fit-form form input:not([type="submit"]):not([type="hidden"]),
      .fit-form .wpcf7-form input:not([type="submit"]):not([type="hidden"]) {
        width: 100% !important;
        height: 51px !important;
        box-sizing: border-box !important;
        padding: 0 16px !important;
        color: #111827 !important;
        background: #f8fcfb !important;
        border: 1px solid #b8c8c4 !important;
        border-radius: 7px !important;
        font: 700 15px "Inter", "Segoe UI", Arial, sans-serif !important;
      }

      .fit-form form input::placeholder,
      .fit-form .wpcf7-form input::placeholder {
        color: #7a8797 !important;
        opacity: 1 !important;
        font-weight: 700 !important;
      }

      .fit-form form input[type="submit"],
      .fit-form .wpcf7-submit {
        grid-column: 1 / -1 !important;
        width: 100% !important;
        height: 64px !important;
        margin-top: 3px !important;
        color: #fff !important;
        background: #075d55 !important;
        border: 0 !important;
        border-radius: 7px !important;
        font: 900 17px "Inter", "Segoe UI", Arial, sans-serif !important;
        letter-spacing: 0.04em !important;
        cursor: pointer !important;
        appearance: none !important;
      }

      @media (max-width: 820px) {
        .fit-form form,
        .fit-form .wpcf7-form {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }

        .fit-form form input:not([type="submit"]):not([type="hidden"]),
        .fit-form .wpcf7-form input:not([type="submit"]):not([type="hidden"]) {
          height: 54px !important;
        }
      }
    </style>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Thinkable home">Thinkable</a>
      <input class="menu-toggle" type="checkbox" id="menu-toggle" aria-label="Toggle navigation menu" />
      <label class="hamburger" for="menu-toggle" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <nav class="nav-links" aria-label="Primary navigation">
        <a href="<?php echo esc_url(home_url('/use-cases/')); ?>">Use Cases</a>
        <a href="<?php echo esc_url(home_url('/science-evidence/')); ?>">Evidence</a>
        <a href="<?php echo esc_url(home_url('/resources/')); ?>">Resources</a>
        <a href="<?php echo esc_url(home_url('/blog/')); ?>">Blog</a>
        <a href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Partner Demo</a>
        <a class="contact-button" href="<?php echo esc_url(home_url('/contact/')); ?>">Contact</a>
      </nav>
    </header>

    <main>
      <section class="hero" aria-label="Thinkable patient correction">
        <img
          class="hero-image"
          src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full') ?: get_stylesheet_directory_uri() . '/images/Top_Pg_Patient_01%201.png'); ?>"
          alt="A woman standing outside a clinic while clinicians talk in the background"
        />
        <div class="hero-panel">
          <p class="eyebrow">THINKABLE PATIENT CORRECTION</p>
          <h1>Thinkable brings clinics better-fit mental health patients.</h1>
          <p class="hero-copy">
            Thinkable helps clinics and mental health organizations connect with better-fitting patient
            populations to improve care and business.
          </p>
          <div class="hero-actions" aria-label="Hero actions">
            <a class="button button-primary" href="#demo">Request Demo</a>
            <a class="button button-outline" href="#fit">Get Fit Feedback</a>
          </div>
        </div>
      </section>

      <section class="fit-section" id="fit">
        <h2>Check partnership fit</h2>
        <div class="fit-form" aria-label="Partnership fit form">
          <p>
            We'll check if we're set up for success in any format,<br />
            as we offer only the right fit for you.
          </p>
          <?php echo thinkable_cf7_shortcode('thinkable_homepage_fit_cf7_id', 'Thinkable Homepage Fit Form'); ?>
        </div>
      </section>

      <section class="illustration-band" aria-label="Lead quality comparison">
        <div class="illustration-copy">
          <p class="section-kicker">THE BUSINESS PROBLEM</p>
          <h2>More leads are meaningless if they are the wrong patients.</h2>
          <p>
            Clinics do not need more anonymous traffic. They need patients whose needs, timing,
            and expectations match the clinic's expertise.
          </p>
        </div>
        <img
          src="<?php echo esc_url(get_stylesheet_directory_uri() . '/images/Wrong_Patients_01%201.png'); ?>"
          alt="Comparison showing that more leads are meaningless if they are the wrong patients"
        />
      </section>

      <section class="quote-section">
        <blockquote>
          We get hundreds of inquiries a month but most aren't a fit for our specialty. We need intent signals, not volume.
        </blockquote>
        <p>Clinical operations perspective</p>
        <div class="dots" aria-hidden="true">
          <span class="active"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section class="image-feature" aria-label="Product image slider">
        <div class="slider" tabindex="0">
          <figure class="slide" id="slide-1">
            <img
              src="<?php echo esc_url(get_stylesheet_directory_uri() . '/images/image%202.png'); ?>"
              alt="Clinician and patient reviewing a care dashboard on a laptop"
            />
          </figure>
          <figure class="slide" id="slide-2">
            <img
              src="<?php echo esc_url(get_stylesheet_directory_uri() . '/images/slider-clinic-consultation.png'); ?>"
              alt="Clinician reviewing patient-fit insights with a clinic partner"
            />
          </figure>
          <figure class="slide" id="slide-3">
            <img
              src="<?php echo esc_url(get_stylesheet_directory_uri() . '/images/slider-operations-dashboard.png'); ?>"
              alt="Clinic professionals reviewing patient-fit analytics on a display"
            />
          </figure>
        </div>
        <div class="slider-dots" aria-label="Slider navigation">
          <a href="#slide-1" aria-label="Show slide 1"></a>
          <a href="#slide-2" aria-label="Show slide 2"></a>
          <a href="#slide-3" aria-label="Show slide 3"></a>
        </div>
      </section>

      <section class="product-path" id="product">
        <p class="section-kicker">THE PRODUCT PATH</p>
        <h2>From support experience<br />to clinic-ready opportunity.</h2>
        <p class="section-copy">
          Thinkable captures intent through the product experience, organizes fit signals,<br />
          then gives clinics a clearer reason to talk.
        </p>

        <div class="path-icons" aria-label="Product path steps">
          <div class="path-step">
            <span class="icon users-icon"></span>
            <p>Patient engages</p>
          </div>
          <span class="path-arrow">-&gt;</span>
          <div class="path-step">
            <span class="icon target-icon"></span>
            <p>Thinkable qualifies</p>
          </div>
          <span class="path-arrow">-&gt;</span>
          <div class="path-step">
            <span class="icon growth-icon"></span>
            <p>Clinic receives</p>
          </div>
        </div>

        <div class="process-cards">
          <article>
            <strong>01</strong>
            <h3>Patient engages</h3>
            <p>Users interact with Thinkable's mental health support experience, building engagement signals over time.</p>
          </article>
          <article>
            <strong>02</strong>
            <h3>Thinkable qualifies fit</h3>
            <p>Engagement and need signals help identify the right care path and match patients to clinic expertise.</p>
          </article>
          <article>
            <strong>03</strong>
            <h3>Clinic receives context</h3>
            <p>The clinic gets a clearer opportunity with real intent context, not just another anonymous lead.</p>
          </article>
        </div>
      </section>

      <section class="trust-section" id="evidence">
        <p class="section-kicker">WHY TRUST THINKABLE</p>
        <h2>Why clinics trust<br />our model</h2>
        <div class="trust-cards">
          <article>
            <span class="trust-icon ring"></span>
            <h3>Evidence-backed</h3>
            <p>
              Built from a digital mental health product with research credibility. The clinical foundation is real,
              not a marketing layer.
            </p>
          </article>
          <article>
            <span class="trust-icon dots-icon"></span>
            <h3>Engagement-led</h3>
            <p>
              Patients are not coming from cold traffic alone. They interact with the product first, building real
              engagement signals.
            </p>
          </article>
          <article>
            <span class="trust-icon users-icon"></span>
            <h3>Partner-fit focused</h3>
            <p>
              The goal is not inflated volume. It is better alignment between patient need and clinic expertise.
            </p>
          </article>
        </div>
      </section>

      <section class="final-cta" id="demo">
        <p class="section-kicker">PARTNER DEMO</p>
        <h2>Check whether Thinkable is the right patient-fit channel for your clinic.</h2>
        <p>
          Share your patient focus and we will help confirm whether the partnership fit is strong
          before you spend time on a full demo.
        </p>
        <div class="cta-actions">
          <a class="button button-primary" href="#fit">Request Demo</a>
          <a class="button button-outline" href="#fit">Get Fit Feedback</a>
        </div>
      </section>
    </main>

    <footer class="site-footer" id="contact">
      <div class="footer-inner">
        <div>
          <h2>Thinkable</h2>
          <h3>Better-fit patients. Better care journeys.</h3>
          <p>
            At Thinkable, we help mental health clinics connect with better-fit patients through thoughtful
            technology, intelligent matching, and a more human-centered approach to care.
          </p>
        </div>
        <address>
          <strong>Contact Us</strong>
          Email info@thinkable.app
        </address>
      </div>
      <div class="footer-bottom">
        <span>&copy; GGTUDE LTD, doing business as Thinkable, 2026</span>
        <span><a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>">Privacy Policy</a></span>
        <span><a href="<?php echo esc_url(home_url('/terms/')); ?>">Terms</a></span>
      </div>
    </footer>
      <?php wp_footer(); ?>
  </body>
</html>

