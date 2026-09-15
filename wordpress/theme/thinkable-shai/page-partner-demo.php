<?php
/* Template Name: Thinkable Partner Demo */
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo esc_html(get_the_title() ?: 'Partner Demo'); ?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css?v=20260629-forms2'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css?v=20260629-forms2'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Thinkable home">Thinkable</a>
      <input class="menu-toggle" type="checkbox" id="menu-toggle-partner" aria-label="Toggle navigation menu" />
      <label class="hamburger" for="menu-toggle-partner" aria-hidden="true">
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

    <main class="partner-page">
      <section class="partner-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Top_Pg_Patient_01%201.png', 'linear-gradient(90deg, rgba(0, 55, 50, 0.94), rgba(0, 110, 98, 0.72))')); ?>">
        <div class="partner-hero-copy">
          <p class="eyebrow">PARTNER DEMO</p>
          <h1>Explore a Thinkable partnership</h1>
          <p>
            Tell us who you serve and where mental health support is needed. We will use that context
            to review whether Thinkable fits your care, product, benefits, treatment, or research path.
          </p>
        </div>
      </section>

      <section class="partner-intake" id="partner-form">
        <div class="partner-intake-copy">
          <p class="eyebrow">START THE CONVERSATION</p>
          <h2>Share the use case, not a generic contact request.</h2>
          <p>
            The most useful first conversation starts with your audience and the support gap you are trying
            to solve. Use the form to share the basics, and we will route the conversation around the right
            partner path.
          </p>

          <div class="partner-fit-list">
            <div>
              <strong>Good fit for</strong>
              <span>Clinics, digital health teams, medical device partners, employers, EAPs, and research teams.</span>
            </div>
            <div>
              <strong>Useful context</strong>
              <span>Audience served, primary support need, current workflow, and review requirements.</span>
            </div>
            <div>
              <strong>Next step</strong>
              <span>A focused discussion about fit, evidence language, implementation, and ownership.</span>
            </div>
          </div>
        </div>

        <div class="partner-form">
          <?php echo thinkable_cf7_shortcode('thinkable_partner_cf7_id', 'Thinkable Partner Demo Form'); ?>
          <p class="form-footnote">This form is for partnership and B2B use-case conversations only. It is not monitored for clinical support, emergency help, or individual patient care requests.</p>
        </div>
      </section>

      <section class="partner-after">
        <div>
          <p class="eyebrow">WHAT HAPPENS NEXT</p>
          <h2>A focused review of fit.</h2>
        </div>
        <div class="partner-after-grid">
          <article>
            <strong>1</strong>
            <h3>We review your context</h3>
            <p>Your organization type, audience, use case, and review needs shape the first conversation.</p>
          </article>
          <article>
            <strong>2</strong>
            <h3>We discuss the partner path</h3>
            <p>The demo focuses on where Thinkable support could fit, the evidence to review, and the rollout details to clarify.</p>
          </article>
          <article>
            <strong>3</strong>
            <h3>We define next steps</h3>
            <p>If there is a fit, the next step is a clearer scope around audience, content, review, and ownership.</p>
          </article>
        </div>
      </section>
    </main>

    <footer class="site-footer" id="contact">
      <div class="footer-inner">
        <div>
          <h2>Thinkable</h2>
          <h3>Better-fit patients. Better care journeys.</h3>
          <p>
            Thinkable helps partners add structured mental health support around care journeys, products,
            employee programs, and research initiatives.
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
