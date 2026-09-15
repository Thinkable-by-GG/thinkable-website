<?php

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
});

function thinkable_hero_background_style($fallback_image, $gradient)
{
    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'full');

    if (!$image_url) {
        $image_url = get_stylesheet_directory_uri() . '/' . ltrim($fallback_image, '/');
    }

    return 'background: ' . $gradient . ', url("' . esc_url($image_url) . '") center / cover no-repeat;';
}

add_action('wp_head', function () {
    $favicon_url = get_stylesheet_directory_uri() . '/favicon.svg';
    echo '<meta name="google-site-verification" content="Rze_WIYjFmcii6Ut4d18p6yvjMo8aP5KfRApCF2PiAw" />' . "\n";
    echo '<link rel="icon" type="image/svg+xml" href="' . esc_url($favicon_url) . '">' . "\n";
    echo '<link rel="shortcut icon" href="' . esc_url($favicon_url) . '">' . "\n";
}, 1);

add_action('wp_head', function () {
    ?>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-RPW89LCFYM"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-RPW89LCFYM');
    </script>
    <?php
}, 5);

function thinkable_meta_description()
{
    $path = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $descriptions = [
        '' => 'Thinkable helps clinics and mental health organizations connect with better-fit patient populations through evidence-informed digital support and partner-fit review.',
        'use-cases' => 'Explore Thinkable use cases for clinics, digital health teams, employers, medical device partners, and research organizations reviewing mental health support.',
        'science-evidence' => 'Review Thinkable evidence, published studies, research context, and partner evaluation guidance for responsible mental health implementation.',
        'resources' => 'Read Thinkable resources for partner teams evaluating audience needs, workflow fit, evidence expectations, and implementation questions before a demo.',
        'blog' => 'Read Thinkable insights for clinics, digital health teams, employers, research partners, and organizations evaluating structured mental health support.',
        'partner-demo' => 'Request a Thinkable partner demo and share your organization type, use case, audience, and implementation context for review.',
        'contact' => 'Contact Thinkable for partnership opportunities, resources, product questions, media inquiries, and general business requests.',
        'privacy-policy' => 'Read the Thinkable privacy policy for information about how website and form information is collected, used, and protected.',
        'terms' => 'Read the Thinkable terms for website use, content, partner inquiries, and related business information.',
    ];

    if (isset($descriptions[$path])) {
        return $descriptions[$path];
    }

    if (is_singular()) {
        $post = get_post();

        if ($post) {
            $source = has_excerpt($post) ? get_the_excerpt($post) : wp_strip_all_tags(strip_shortcodes((string) $post->post_content));
            $source = preg_replace('/\s+/', ' ', trim((string) $source));

            if ($source !== '') {
                return wp_trim_words($source, 26, '.');
            }
        }
    }

    $title = wp_get_document_title();
    return $title ? 'Learn more about ' . $title . ' from Thinkable.' : '';
}

add_action('wp_head', function () {
    $description = thinkable_meta_description();

    if ($description !== '') {
        echo '<meta name="description" content="' . esc_attr($description) . '">' . "\n";
    }
}, 2);

add_action('wp_head', function () {
    echo '<style id="thinkable-editor-button-overrides">.internal-content .wp-block-button__link{color:#fff!important;background:var(--button)!important;border-radius:6px!important;text-decoration:none!important}.internal-content .is-style-outline .wp-block-button__link{color:var(--button)!important;background:transparent!important;border:1px solid var(--button)!important}</style>' . "\n";
}, 100);

function thinkable_partner_form_definition()
{
    return [
        'title' => 'Thinkable Partner Demo Form',
        'form' => '<label>Full name' . "\n" .
            '[text* full-name autocomplete:name]</label>' . "\n\n" .
            '<label>Work email' . "\n" .
            '[email* work-email autocomplete:email]</label>' . "\n\n" .
            '<label>Company or organization' . "\n" .
            '[text* company-name autocomplete:organization]</label>' . "\n\n" .
            '<label>Organization type' . "\n" .
            '[select* organization-type include_blank "Clinic or care organization" "Digital health company" "Medical device company" "Employer or EAP program" "Research or academic partner" "Other partner organization"]</label>' . "\n\n" .
            '<label>Primary use case' . "\n" .
            '[select* use-case include_blank "Between-session support" "Digital product support layer" "Treatment education and follow-up" "Employee or EAP support" "Research or clinical collaboration" "Not sure yet"]</label>' . "\n\n" .
            '<label>Audience served' . "\n" .
            '[text audience placeholder "Patients, employees, members, teams"]</label>' . "\n\n" .
            '<label>What would you like to explore?' . "\n" .
            '[textarea notes placeholder "Share the support gap, current workflow, review needs, or timing."]</label>' . "\n\n" .
            '[submit "Request partner demo"]',
        'mail' => [
            'recipient' => '[_site_admin_email]',
            'sender' => '[_site_title] <wordpress@thinkable.app>',
            'subject' => 'New Thinkable partner demo request',
            'additional_headers' => 'Reply-To: [work-email]',
            'body' => "A new Thinkable partner demo request was submitted.\n\nName: [full-name]\nWork email: [work-email]\nCompany: [company-name]\nOrganization type: [organization-type]\nPrimary use case: [use-case]\nAudience served: [audience]\n\nNotes:\n[notes]\n\n--\nSubmitted from [_site_title] [_site_url]",
            'attachments' => '',
            'use_html' => 0,
            'exclude_blank' => 0,
        ],
    ];
}

function thinkable_homepage_fit_form_definition()
{
    return [
        'title' => 'Thinkable Homepage Fit Form',
        'form' => '<label>Name' . "\n" .
            '[text* full-name autocomplete:name placeholder "Name"]</label>' . "\n\n" .
            '<label>Your role' . "\n" .
            '[text role placeholder "Your role"]</label>' . "\n\n" .
            '<label>Work email' . "\n" .
            '[email* work-email autocomplete:email placeholder "Work email*"]</label>' . "\n\n" .
            '<label>Monthly patient inquiries' . "\n" .
            '[text monthly-inquiries placeholder "Monthly patient inquiries"]</label>' . "\n\n" .
            '<label>Clinic, company or organization' . "\n" .
            '[text* company-name placeholder "Clinic, company or organization"]</label>' . "\n\n" .
            '<label>Patient focus' . "\n" .
            '[text audience placeholder "Patient focus or specialty"]</label>' . "\n\n" .
            '[hidden organization-type "Clinic or care organization"]' . "\n" .
            '[hidden use-case "Not sure yet"]' . "\n\n" .
            '[submit "CHECK PATIENT FIT"]',
        'mail' => [
            'recipient' => '[_site_admin_email]',
            'sender' => '[_site_title] <wordpress@thinkable.app>',
            'subject' => 'New Thinkable homepage fit request',
            'additional_headers' => 'Reply-To: [work-email]',
            'body' => "A new Thinkable homepage fit request was submitted.\n\nName: [full-name]\nWork email: [work-email]\nRole: [role]\nCompany: [company-name]\nMonthly patient inquiries: [monthly-inquiries]\nAudience served: [audience]\nOrganization type: [organization-type]\nPrimary use case: [use-case]\n\n--\nSubmitted from [_site_title] [_site_url]",
            'attachments' => '',
            'use_html' => 0,
            'exclude_blank' => 0,
        ],
    ];
}

function thinkable_save_cf7_form($option_name, $definition, $preferred_id = 0)
{
    if (!class_exists('WPCF7_ContactForm')) {
        return 0;
    }

    $form = null;
    $existing_id = absint(get_option($option_name));

    if ($existing_id) {
        $form = WPCF7_ContactForm::get_instance($existing_id);
    }

    if (!$form && $preferred_id) {
        $form = WPCF7_ContactForm::get_instance($preferred_id);
    }

    if (!$form) {
        foreach (WPCF7_ContactForm::find(['title' => $definition['title']]) as $candidate) {
            if ($candidate->title() === $definition['title']) {
                $form = $candidate;
                break;
            }
        }
    }

    if (!$form) {
        $form = WPCF7_ContactForm::get_template(['title' => $definition['title']]);
    }

    $properties = $form->get_properties();
    $messages = $properties['messages'] ?? [];
    $messages['mail_sent_ok'] = 'Thank you. Your request was submitted.';
    $messages['mail_sent_ng'] = 'There was an error trying to send your request. Please try again later.';
    $messages['validation_error'] = 'Please complete the required fields and try again.';

    $form->set_title($definition['title']);
    $form->set_properties([
        'form' => $definition['form'],
        'mail' => $definition['mail'],
        'mail_2' => [
            'active' => false,
            'recipient' => '[work-email]',
            'sender' => '[_site_title] <wordpress@thinkable.app>',
            'subject' => 'We received your Thinkable request',
            'additional_headers' => 'Reply-To: [_site_admin_email]',
            'body' => "Thank you for contacting Thinkable. We received your request and will review the context you shared.",
            'attachments' => '',
            'use_html' => 0,
            'exclude_blank' => 0,
        ],
        'messages' => $messages,
        'additional_settings' => "skip_mail: on\nflamingo_email: [work-email]\nflamingo_name: [full-name]\nflamingo_subject: [_site_title] form submission",
    ]);

    $form_id = absint($form->save());

    if ($form_id) {
        update_option($option_name, $form_id, false);
    }

    return $form_id;
}

add_action('init', function () {
    if (!class_exists('WPCF7_ContactForm')) {
        return;
    }

    $version = '2026-06-29-forms-2';

    if (get_option('thinkable_cf7_forms_version') === $version) {
        return;
    }

    thinkable_save_cf7_form('thinkable_partner_cf7_id', thinkable_partner_form_definition(), 189);
    thinkable_save_cf7_form('thinkable_homepage_fit_cf7_id', thinkable_homepage_fit_form_definition());
    update_option('thinkable_cf7_forms_version', $version, false);
}, 30);

function thinkable_cf7_shortcode($option_name, $title)
{
    $form_id = absint(get_option($option_name));

    if (!$form_id) {
        return '<p class="form-notice form-error">The form is being configured. Please check back shortly.</p>';
    }

    return do_shortcode(sprintf('[contact-form-7 id="%d" title="%s"]', $form_id, esc_attr($title)));
}

function thinkable_studies_api_get($endpoint, $cache_key)
{
    $cached = get_transient($cache_key);

    if (is_array($cached)) {
        return $cached;
    }

    $response = wp_remote_get('https://api.ggtude.com/services/api/studies' . $endpoint, [
        'timeout' => 12,
        'headers' => [
            'Accept' => 'application/json',
        ],
    ]);

    if (is_wp_error($response)) {
        return [];
    }

    $body = json_decode((string) wp_remote_retrieve_body($response), true);

    if (!is_array($body) || empty($body['success'])) {
        return [];
    }

    set_transient($cache_key, $body, 30 * MINUTE_IN_SECONDS);

    return $body;
}

function thinkable_study_type_label($type)
{
    $labels = [
        'rct' => 'Randomized controlled trial',
        'observational' => 'Observational study',
        'case_study' => 'Case study',
        'real_world' => 'Real-world data',
        'review' => 'Review paper',
        'other' => 'Research study',
    ];

    return $labels[$type] ?? 'Research study';
}

function thinkable_study_image_url($study)
{
    $image_url = (string) ($study['image_url'] ?? '');

    if ($image_url === '') {
        return '';
    }

    if (strpos($image_url, 'http') === 0) {
        return $image_url;
    }

    return 'https://api.ggtude.com/services' . $image_url;
}

function thinkable_render_studies_library()
{
    $studies_response = thinkable_studies_api_get('', 'thinkable_research_studies_v2');
    $summary_response = thinkable_studies_api_get('/summary', 'thinkable_research_summary_v2');
    $studies = $studies_response['data'] ?? [];
    $summary = $summary_response['data'] ?? [];

    echo '<section class="studies-library" aria-label="Thinkable research studies">';
    echo '<div class="studies-library-inner">';
    echo '<div class="studies-library-head">';
    echo '<p class="eyebrow">RESEARCH LIBRARY</p>';
    echo '<h2>Published studies behind Thinkable.</h2>';
    echo '<p>Review the published research connected to Thinkable, GGtude, and related mobile cognitive training programs. The library is pulled from the live research API so partners can evaluate study type, population, outcomes, and evidence fit.</p>';
    echo '</div>';

    if (!empty($summary)) {
        $total_studies = absint($summary['total_studies'] ?? count($studies));
        $total_rcts = absint($summary['total_rcts'] ?? 0);
        $conditions = is_array($summary['conditions'] ?? null) ? count($summary['conditions']) : 0;

        echo '<div class="studies-stats" aria-label="Research summary">';
        echo '<div><strong>' . esc_html((string) $total_studies) . '</strong><span>Published studies</span></div>';
        echo '<div><strong>' . esc_html((string) $total_rcts) . '</strong><span>Randomized controlled trials</span></div>';
        echo '<div><strong>' . esc_html((string) $conditions) . '</strong><span>Condition and topic areas</span></div>';
        echo '</div>';
    }

    if (empty($studies) || !is_array($studies)) {
        echo '<div class="studies-empty">';
        echo '<h3>Research library temporarily unavailable</h3>';
        echo '<p>The published studies API could not be reached. Please try again shortly or discuss the evidence review in a partner demo.</p>';
        echo '</div>';
        echo '</div></section>';
        return;
    }

    echo '<div class="studies-grid">';

    foreach ($studies as $study) {
        if (!is_array($study)) {
            continue;
        }

        $title = (string) ($study['title'] ?? 'Untitled study');
        $authors = (string) ($study['authors'] ?? '');
        $journal = (string) ($study['journal'] ?? '');
        $year = (string) ($study['year'] ?? '');
        $study_type = thinkable_study_type_label((string) ($study['study_type'] ?? 'other'));
        $sample_size = absint($study['sample_size'] ?? 0);
        $findings = (string) ($study['key_findings'] ?? '');
        $doi = (string) ($study['doi'] ?? '');
        $conditions = is_array($study['conditions'] ?? null) ? array_slice($study['conditions'], 0, 4) : [];
        $image_url = thinkable_study_image_url($study);

        echo '<article class="study-card">';

        if ($image_url !== '') {
            echo '<a class="study-card-image" href="' . esc_url($doi !== '' ? 'https://doi.org/' . preg_replace('#^https?://doi.org/#', '', $doi) : '#') . '" aria-label="' . esc_attr($title) . '">';
            echo '<img src="' . esc_url($image_url) . '" alt="" loading="lazy" />';
            echo '</a>';
        }

        echo '<div class="study-card-body">';
        echo '<div class="study-meta">';
        echo '<span>' . esc_html($study_type) . '</span>';

        if ($year !== '') {
            echo '<span>' . esc_html($year) . '</span>';
        }

        if ($sample_size > 0) {
            echo '<span>N=' . esc_html((string) $sample_size) . '</span>';
        }

        echo '</div>';
        echo '<h3>' . esc_html($title) . '</h3>';

        if ($authors !== '') {
            echo '<p class="study-authors">' . esc_html($authors) . '</p>';
        }

        if ($journal !== '') {
            echo '<p class="study-journal">' . esc_html($journal) . '</p>';
        }

        if (!empty($conditions)) {
            echo '<div class="study-tags" aria-label="Conditions">';
            foreach ($conditions as $condition) {
                echo '<span>' . esc_html((string) $condition) . '</span>';
            }
            echo '</div>';
        }

        if ($findings !== '') {
            echo '<p class="study-findings">' . esc_html($findings) . '</p>';
        }

        if ($doi !== '') {
            $doi_href = 'https://doi.org/' . preg_replace('#^https?://doi.org/#', '', $doi);
            echo '<a class="study-link" href="' . esc_url($doi_href) . '" target="_blank" rel="noopener">View publication</a>';
        }

        echo '</div>';
        echo '</article>';
    }

    echo '</div>';
    echo '</div>';
    echo '</section>';
}

add_action('wp_footer', function () {
    $partner_id = absint(get_option('thinkable_partner_cf7_id'));
    $home_id = absint(get_option('thinkable_homepage_fit_cf7_id'));

    if (!$partner_id && !$home_id) {
        return;
    }
    ?>
    <script>
      document.addEventListener('wpcf7mailsent', function (event) {
        const redirectForms = [<?php echo esc_js($partner_id); ?>, <?php echo esc_js($home_id); ?>];
        if (redirectForms.includes(Number(event.detail.contactFormId))) {
          window.location.href = <?php echo wp_json_encode(home_url('/partner-demo-thank-you/')); ?>;
        }
      });
    </script>
    <?php
}, 30);

add_action('template_redirect', function () {
    if (is_admin()) {
        return;
    }

    $path = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $dated_post_redirects = [
        '2026/06/24/therapy-tools-psychoeducation-partner-programs' => 'therapy-tools-psychoeducation-partner-programs',
        '2026/06/21/research-clinical-collaboration-mental-health-support' => 'research-clinical-collaboration-mental-health-support',
        '2026/06/18/partner-mental-health-support-implementation-guide' => 'partner-mental-health-support-implementation-guide',
        '2026/06/14/ocd-anxiety-support-partner-programs' => 'ocd-anxiety-support-partner-programs',
        '2026/06/11/behavioral-health-engagement-between-care-touchpoints' => 'behavioral-health-engagement-between-care-touchpoints',
        '2026/06/07/choosing-digital-health-content-partner' => 'choosing-digital-health-content-partner',
        '2026/06/03/improving-eap-utilization-guided-support' => 'improving-eap-utilization-guided-support',
        '2026/05/30/clinic-digital-mental-health-support-questions' => 'clinic-digital-mental-health-support-questions',
        '2026/05/26/evidence-review-mental-health-partnerships' => 'evidence-review-mental-health-partnerships',
        '2026/05/22/medical-device-treatment-mental-health-support' => 'medical-device-treatment-mental-health-support',
        '2026/05/18/digital-health-mental-health-support-layer' => 'digital-health-mental-health-support-layer',
        '2026/05/14/between-session-mental-health-support-partner-review' => 'between-session-mental-health-support-partner-review',
    ];

    if (isset($dated_post_redirects[$path])) {
        wp_safe_redirect(home_url('/' . $dated_post_redirects[$path] . '/'), 301);
        exit;
    }

    if ($path === 'main-design') {
        wp_safe_redirect(home_url('/'), 301);
        exit;
    }

    if ($path === 'privacy' || $path === 'privacy-policy-2') {
        wp_safe_redirect(home_url('/privacy-policy/'), 301);
        exit;
    }

    if ($path === 'index.html') {
        wp_safe_redirect(home_url('/'), 301);
        exit;
    }

});

function thinkable_clean_form_value($key)
{
    return sanitize_text_field(wp_unslash($_POST[$key] ?? ''));
}

add_action('admin_post_nopriv_thinkable_partner_demo', 'thinkable_handle_partner_demo_form');
add_action('admin_post_thinkable_partner_demo', 'thinkable_handle_partner_demo_form');

function thinkable_handle_partner_demo_form()
{
    $redirect = home_url('/partner-demo/');
    $thank_you = home_url('/partner-demo-thank-you/');

    if (!isset($_POST['thinkable_partner_demo_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['thinkable_partner_demo_nonce'])), 'thinkable_partner_demo')) {
        wp_safe_redirect(add_query_arg('form_error', 'security', $redirect) . '#partner-form');
        exit;
    }

    if (trim((string) ($_POST['company_website'] ?? '')) !== '') {
        wp_safe_redirect($redirect);
        exit;
    }

    $name = thinkable_clean_form_value('full_name');
    $email = sanitize_email(wp_unslash($_POST['work_email'] ?? ''));
    $company = thinkable_clean_form_value('company_name');
    $company_type = thinkable_clean_form_value('company_type');
    $use_case = thinkable_clean_form_value('use_case');
    $audience = thinkable_clean_form_value('audience');
    $role = thinkable_clean_form_value('role');
    $monthly_inquiries = thinkable_clean_form_value('monthly_inquiries');
    $notes = sanitize_textarea_field(wp_unslash($_POST['notes'] ?? ''));

    if ($name === '' || $company === '' || $company_type === '' || $use_case === '' || !is_email($email)) {
        wp_safe_redirect(add_query_arg('form_error', 'required', $redirect) . '#partner-form');
        exit;
    }

    $to = get_option('admin_email');
    $subject = 'New Thinkable partner demo request';
    $message = implode("\n\n", [
        'A new partner demo request was submitted from thinkable.app.',
        'Name: ' . $name,
        'Work email: ' . $email,
        'Company: ' . $company,
        'Role: ' . ($role !== '' ? $role : 'Not provided'),
        'Company type: ' . $company_type,
        'Primary use case: ' . $use_case,
        'Monthly patient inquiries: ' . ($monthly_inquiries !== '' ? $monthly_inquiries : 'Not provided'),
        'Audience served: ' . ($audience !== '' ? $audience : 'Not provided'),
        "Notes:\n" . ($notes !== '' ? $notes : 'Not provided'),
    ]);
    $headers = ['Reply-To: ' . $name . ' <' . $email . '>'];

    wp_mail($to, $subject, $message, $headers);

    wp_safe_redirect($thank_you);
    exit;
}
