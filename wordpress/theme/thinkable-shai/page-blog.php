<?php
/* Template Name: Thinkable Blog */
$posts_query = new WP_Query([
    'post_type' => 'post',
    'post_status' => 'publish',
    'posts_per_page' => 12,
]);
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thinkable Blog</title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <?php get_template_part('template-parts/site-header'); ?>
    <main class="internal-page">
      <section class="internal-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Top_Pg_Patient_01%201.png', 'linear-gradient(90deg, rgba(0, 65, 59, 0.9), rgba(0, 109, 98, 0.76))')); ?>">
        <div>
          <p class="eyebrow">THINKABLE BLOG</p>
          <h1>Partner mental health insights</h1>
          <p>Practical articles for clinics, digital health teams, employers, research partners, and treatment organizations evaluating structured mental health support.</p>
        </div>
      </section>
      <section class="blog-shell">
        <?php if ($posts_query->have_posts()) : ?>
          <div class="blog-grid">
            <?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
              <article class="blog-card">
                <?php if (has_post_thumbnail()) : ?>
                  <a class="blog-card-image" href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail('large'); ?>
                  </a>
                <?php endif; ?>
                <p class="sidebar-kicker"><?php echo esc_html(get_the_date('M j, Y')); ?></p>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <p><?php echo esc_html(get_the_excerpt()); ?></p>
              </article>
            <?php endwhile; wp_reset_postdata(); ?>
          </div>
        <?php else : ?>
          <p class="lead">Articles are being prepared for publication.</p>
        <?php endif; ?>
      </section>
    </main>
    <?php get_template_part('template-parts/site-footer'); ?>
    <?php wp_footer(); ?>
  </body>
</html>
