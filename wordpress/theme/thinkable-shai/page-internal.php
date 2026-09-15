<?php
/* Template Name: Thinkable Internal Page */
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo esc_html(get_the_title() ?: 'Thinkable Internal Page'); ?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css?v=20260701-studies3'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css?v=20260701-studies3'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Thinkable home">Thinkable</a>
      <input class="menu-toggle" type="checkbox" id="menu-toggle-internal" aria-label="Toggle navigation menu" />
      <label class="hamburger" for="menu-toggle-internal" aria-hidden="true">
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

    <main class="internal-page">
      <section class="internal-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Top_Pg_Patient_01%201.png', 'linear-gradient(90deg, rgba(0, 65, 59, 0.9), rgba(0, 109, 98, 0.76))')); ?>">
        <div>
          <p class="eyebrow">THINKABLE PARTNER RESOURCE</p>
          <h1><?php echo esc_html(get_the_title() ?: 'Clinical partner overview'); ?></h1>
          <?php
          $hero_intro = get_the_excerpt();

          if (trim((string) $hero_intro) === '') {
              $hero_intro = 'Clear partner-facing guidance for evaluating where Thinkable fits in a mental health care, product, workforce, or research journey.';
          }
          ?>
          <p><?php echo esc_html($hero_intro); ?></p>
        </div>
      </section>

      <section class="internal-shell">
        <article class="internal-content">
          <?php
          while (have_posts()) {
              the_post();

              if (trim((string) get_the_content()) !== '') {
                  the_content();
              } elseif (current_user_can('edit_pages')) {
                  echo '<p class="lead">Add page content in the WordPress editor. This template will keep the Thinkable header, hero, sidebar, and footer around your editable content.</p>';
              }
          }
          ?>
        </article>

        <aside class="internal-sidebar" aria-label="Page sidebar">
          <div class="sidebar-panel">
            <p class="sidebar-kicker">Key pages</p>
            <a href="<?php echo esc_url(home_url('/use-cases/')); ?>">Use cases</a>
            <a href="<?php echo esc_url(home_url('/science-evidence/')); ?>">Science and evidence</a>
            <a href="<?php echo esc_url(home_url('/resources/')); ?>">Resources</a>
            <a href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Partner demo</a>
          </div>

          <div class="sidebar-panel sidebar-cta">
            <p class="sidebar-kicker">Partner Demo</p>
            <h2>Check fit with Thinkable</h2>
            <p>Share your organization type and use case so the right partnership path can be reviewed.</p>
            <a class="button button-light" href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Request Demo</a>
          </div>

          <div class="sidebar-note">
            <strong>Best for</strong>
            <span>Clinics, digital health teams, medical device partners, employers, EAPs, and research teams.</span>
          </div>
        </aside>
      </section>

      <?php
      if (is_page('science-evidence')) {
          thinkable_render_studies_library();
      }
      ?>
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
