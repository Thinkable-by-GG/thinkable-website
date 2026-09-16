<?php
/* Template Name: Thinkable Partner Demo */
?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo esc_html(get_the_title() ?: 'Partner Demo'); ?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/styles.css?v=20260629-forms2'); ?>" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/internal.css?v=20260916-lifecycle'); ?>" />
    <?php wp_head(); ?>
  </head>
  <body>
    <?php get_template_part('template-parts/site-header'); ?>

    <main id="main" class="partner-page">
      <section class="partner-hero" style="<?php echo esc_attr(thinkable_hero_background_style('images/Top_Pg_Patient_01%201.png', 'linear-gradient(90deg, rgba(0, 55, 50, 0.94), rgba(0, 110, 98, 0.72))')); ?>">
        <div class="partner-hero-copy">
          <p class="eyebrow">PARTNER DEMO</p>
          <h1>See Thinkable around your clinic.</h1>
          <p>
            Walk through the patient journey with us: acquisition, intake coordination, support during treatment, and follow-up after care.
          </p>
        </div>
      </section>

      <section class="partner-intake" id="partner-form">
        <div class="partner-intake-copy">
          <p class="eyebrow">START THE CONVERSATION</p>
          <h2>Start with your clinic’s priorities.</h2>
          <p>
            Tell us about your clinic, patient population, and the part of the journey you want to improve. We will focus the demo on the workflows and support that matter to your team.
          </p>

          <div class="partner-fit-list">
            <div>
              <strong>Good fit for</strong>
              <span>TMS clinics, clinic groups, and device or treatment partners.</span>
            </div>
            <div>
              <strong>Useful context</strong>
              <span>Your service area, current intake process, team workflow, and patient engagement priorities.</span>
            </div>
            <div>
              <strong>Next step</strong>
              <span>A walkthrough of the platform and a discussion of scope, evidence, and implementation.</span>
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
          <h2>A clear path from demo to decision.</h2>
        </div>
        <div class="partner-after-grid">
          <article>
            <strong>1</strong>
            <h3>We review your context</h3>
            <p>We review your clinic workflow and the patient population you support.</p>
          </article>
          <article>
            <strong>2</strong>
            <h3>We walk through the platform</h3>
            <p>See the clinic workspace, patient experience, and acquisition and referral workflows.</p>
          </article>
          <article>
            <strong>3</strong>
            <h3>We define next steps</h3>
            <p>Together, we define responsibilities, implementation scope, and what success should look like.</p>
          </article>
        </div>
      </section>
    </main>

    <?php get_template_part('template-parts/site-footer'); ?>
    <?php wp_footer(); ?>
  </body>
</html>
