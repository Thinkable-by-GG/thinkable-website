<?php
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo esc_html(get_the_title() ?: 'Thinkable Article'); ?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css?v=20260916-lifecycle'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <?php get_template_part('template-parts/site-header'); ?>
    <main id="main" class="resource-article-page">
      <section class="resource-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Rectangle 1.png', 'linear-gradient(90deg, rgba(0, 55, 50, 0.94), rgba(0, 103, 94, 0.84))')); ?>">
        <div>
          <p class="eyebrow">THINKABLE ARTICLE</p>
          <h1><?php echo esc_html(get_the_title() ?: 'Article'); ?></h1>
          <p><?php echo esc_html(get_the_excerpt() ?: 'Practical guidance for partner teams evaluating structured mental health support.'); ?></p>
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
        <aside class="resource-article-rail" aria-label="Article sidebar">
          <div>
            <p class="sidebar-kicker">Related paths</p>
            <a href="<?php echo esc_url(home_url('/blog/')); ?>">Blog</a>
            <a href="<?php echo esc_url(home_url('/resources/')); ?>">Resources</a>
            <a href="<?php echo esc_url(home_url('/use-cases/')); ?>">Use cases</a>
            <a href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Partner demo</a>
          </div>
          <div class="resource-demo-box">
            <p class="sidebar-kicker">Partner Demo</p>
            <h2>Discuss partner fit</h2>
            <p>Share the audience and support path your organization is evaluating.</p>
            <a class="button button-light" href="<?php echo esc_url(home_url('/partner-demo/')); ?>">Request Demo</a>
          </div>
        </aside>
      </section>
    </main>
    <?php get_template_part('template-parts/site-footer'); ?>
    <?php wp_footer(); ?>
  </body>
</html>
