<?php
/* Template Name: Thinkable Resource Article */
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo esc_html(get_the_title() ?: 'Thinkable Resource'); ?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Thinkable home">Thinkable</a>
      <input class="menu-toggle" type="checkbox" id="menu-toggle-resource" aria-label="Toggle navigation menu" />
      <label class="hamburger" for="menu-toggle-resource" aria-hidden="true">
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

    <main class="resource-article-page">
      <section class="resource-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Rectangle 1.png', 'linear-gradient(90deg, rgba(0, 55, 50, 0.94), rgba(0, 103, 94, 0.84))')); ?>">
        <div>
          <p class="eyebrow">THINKABLE RESOURCE</p>
          <h1><?php echo esc_html(get_the_title() ?: 'Resource'); ?></h1>
          <?php
          $resource_intro = get_the_excerpt();

          if (trim((string) $resource_intro) === '') {
              $resource_intro = 'Practical guidance for partners evaluating structured mental health support.';
          }
          ?>
          <p><?php echo esc_html($resource_intro); ?></p>
        </div>
      </section>

      <section class="resource-article-shell">
        <article class="resource-article-content">
          <?php
          while (have_posts()) {
              the_post();
              the_content();
          }
          ?>
        </article>

        <aside class="resource-article-rail" aria-label="Related resource links">
          <div>
            <p class="sidebar-kicker">Related paths</p>
            <a href="<?php echo esc_url(home_url('/use-cases/')); ?>">Use cases</a>
            <a href="<?php echo esc_url(home_url('/science-evidence/')); ?>">Science and evidence</a>
            <a href="<?php echo esc_url(home_url('/resources/')); ?>">Resource hub</a>
            <a href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Partner demo</a>
          </div>
          <div class="resource-demo-box">
            <p class="sidebar-kicker">Partner Demo</p>
            <h2>Discuss this use case</h2>
            <p>Share your audience, support gap, and review needs so the right partner path can be evaluated.</p>
            <a class="button button-light" href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Request Demo</a>
          </div>
        </aside>
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
