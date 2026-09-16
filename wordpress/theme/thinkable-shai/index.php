<?php
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo esc_html(get_bloginfo('name')); ?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css?v=20260916-lifecycle'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <?php get_template_part('template-parts/site-header'); ?>
    <main id="main" class="internal-page">
      <section class="internal-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Top_Pg_Patient_01%201.png', 'linear-gradient(90deg, rgba(0, 65, 59, 0.9), rgba(0, 109, 98, 0.76))')); ?>">
        <div>
          <p class="eyebrow">THINKABLE</p>
          <h1><?php echo esc_html(is_home() ? 'Thinkable Blog' : get_the_archive_title()); ?></h1>
          <p>Partner-facing mental health support insights, implementation guidance, and evidence-aware resources.</p>
        </div>
      </section>
      <section class="blog-shell">
        <?php if (have_posts()) : ?>
          <div class="blog-grid">
            <?php while (have_posts()) : the_post(); ?>
              <article class="blog-card">
                <?php if (has_post_thumbnail()) : ?>
                  <a class="blog-card-image" href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail('large'); ?>
                  </a>
                <?php endif; ?>
                <p class="sidebar-kicker"><?php echo esc_html(get_the_date('M j, Y')); ?></p>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 28)); ?></p>
              </article>
            <?php endwhile; ?>
          </div>
        <?php else : ?>
          <p class="lead">No posts are published yet.</p>
        <?php endif; ?>
      </section>
    </main>
    <?php get_template_part('template-parts/site-footer'); ?>
    <?php wp_footer(); ?>
  </body>
</html>
