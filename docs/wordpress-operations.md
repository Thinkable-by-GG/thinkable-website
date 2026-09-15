# WordPress operations for thinkable.app

## Facts
- WordPress 7.1, theme `thinkable-shai` ("Thinkable Shai Designs", by Vince / Codex — the approved Shai design converted to WP).
- Plugins: Contact Form 7 (active), Flamingo (active, stores submissions), Akismet and Hello Dolly (inactive).
- Admin: `https://thinkable.app/wp-admin/` — login `thinkable` (password in `~/dev/creds/thinkable-app-wordpress.md`).
  No application passwords are enabled, so scripts log in with the cookie flow.
- Front page = page id 9 ("main-design", template `page-main-design.php`; the page body is empty, all copy is in the template).
- Meta descriptions for the top-level pages are hard-coded in `functions.php` (`thinkable_meta_description`).
- GA4 `G-RPW89LCFYM` and a Google Search Console verification tag are added in `functions.php`.
- Legacy redirects (dated post URLs → slug URLs, `/privacy` → `/privacy-policy`, `/main-design` → `/`) live in `functions.php`.

## Templates → what they render
| Template | Used by | React port |
|---|---|---|
| `page-main-design.php` | `/` | `src/pages/HomePage.tsx` |
| `page-internal.php` | use-cases, buyers, evidence, resources hub, contact, legal, thank-you | `src/pages/InternalPage.tsx` |
| `page-resource-article.php` | `/resources/*` | `src/pages/ArticlePage.tsx` |
| `single.php` | blog posts | `src/pages/ArticlePage.tsx` |
| `page-blog.php` | `/blog` | `src/pages/BlogPage.tsx` |
| `page-partner-demo.php` | `/partner-demo` | `src/pages/PartnerDemoPage.tsx` |
| `template-parts/site-header.php`, `site-footer.php` | all | `SiteHeader.tsx`, `SiteFooter.tsx` |

## Forms
- **Thinkable Partner Demo Form** (CF7 id 189): full-name, work-email, company-name, organization-type, use-case, audience, notes.
- **Thinkable Homepage Fit Form** (CF7 id 204): full-name, role, work-email, monthly-inquiries, company-name, audience (+ hidden organization-type/use-case).
- Both are (re)provisioned by `functions.php` on `init` when `thinkable_cf7_forms_version` changes — to change a form, edit the
  definition in `functions.php`, bump the version string, push. Editing in the CF7 UI will be overwritten on the next bump.
- `skip_mail: on` → no email is sent. Submissions are in **Flamingo → Inbound Messages** (66 messages on 2026-09-15).
  Success redirects to `/partner-demo-thank-you` via a `wpcf7mailsent` listener in the footer.

## Known issues seen while mirroring (2026-09-15)
- `images/Rectangle 1.png`, the fallback hero for resource articles and posts, returns **404** on the server. Pages with a
  featured image are unaffected (all current ones have one); a resource without a featured image would show gradient only.
  The React CSS falls back to `Top_Pg_Patient_01 1.png` instead.
- `page-internal.php` loads `styles.css?v=20260701-studies3` while the home template loads `?v=20260629-forms2` — same file, different cache keys.
- `functions.php` still contains the pre-CF7 `admin_post_thinkable_partner_demo` handler (unused since forms moved to CF7).

## Sync scripts (`scripts/wp/`)
- `lib.mjs` — `WpClient`: cookie login, REST with nonce, theme editor read/write, frontmatter helpers.
- `pull.mjs` — content/, wordpress/theme/, public/{images,uploads}, content/site.json, docs/content-inventory.md.
- `push-theme.mjs <files…|--all> [--dry-run]` — write theme files through wp-admin and verify.
- `push-content.mjs <content/…md> [--dry-run]` — update title/excerpt/body of an existing page or post by id.
Creating *new* pages/posts is not scripted yet: create them in wp-admin, then `wp:pull`.
