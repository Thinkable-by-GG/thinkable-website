# Thinkable website (thinkable.app)

Source of truth for **https://thinkable.app**, the partner-facing site of Thinkable (GGTUDE LTD).

The live site runs on **WordPress 7.1** with the custom theme `thinkable-shai` and two plugins
(Contact Form 7 for the forms, Flamingo for storing submissions). This repository:

1. **Mirrors the live site** — theme source, every page and post, forms, media — so changes are
   reviewed in git before they go live (`wordpress/`, `content/`, `public/`).
2. **Syncs with WordPress** in both directions through `scripts/wp/*` (`npm run wp:pull`,
   `npm run wp:push:theme`, `npm run wp:push:content`).
3. **Rebuilds the site as a React/Vite app** (`src/`) that renders the same content and design from
   the mirrored files. It is the path off WordPress when we want it, and a safe place to prototype
   changes (`npm run dev`).

## Layout

| Path | What it is |
|---|---|
| `wordpress/theme/thinkable-shai/` | Exact copy of the live theme (PHP templates, `styles.css`, `internal.css`, `functions.php`). Edit here, then `npm run wp:push:theme <file>`. |
| `content/pages/**.md`, `content/posts/*.md` | Raw WordPress content (HTML body) with frontmatter: id, path, title, excerpt, template, featured image. Edit here, then `npm run wp:push:content <file>`. |
| `content/site.json` | Site settings, navigation, footer, meta descriptions, Contact Form 7 form definitions, media index. |
| `public/images/`, `public/uploads/` | Theme images and media-library files (binary, pulled once). |
| `src/` | React rebuild: `pages/` are ports of the PHP templates, `components/` of the template parts, `content/` loads the markdown, `styles/site.css` is generated from the theme CSS. |
| `scripts/wp/` | WordPress client and sync scripts (see [docs/wordpress-operations.md](docs/wordpress-operations.md)). |
| `docs/` | [content-inventory.md](docs/content-inventory.md) (generated), [wordpress-operations.md](docs/wordpress-operations.md), [site-vs-business-focus.md](docs/site-vs-business-focus.md). |
| `collateral/` | One-pager PDFs (EN, JA). `logos/` — brand marks. |

## Site map (as live, September 2026)

- `/` — "Thinkable Patient Fit" home: hero, fit-check form, business problem, product path, trust, demo CTA
- `/use-cases` + 5 partner types (clinics, digital health, medical device, employer/EAP, research)
- `/buyers` + 5 buyer paths (same partner types, not in the main nav)
- `/science-evidence` — evidence framing + **research library** pulled live from `https://api.ggtude.com/services/api/studies` (22 studies, 14 RCTs)
- `/resources` + 12 resource articles
- `/blog` + 12 posts (May–June 2026)
- `/partner-demo`, `/partner-demo-thank-you`, `/contact`, `/privacy-policy`, `/terms`

Navigation: Use Cases · Evidence · Resources · Blog · Partner Demo · Contact (button).

## Working with the site

```bash
npm install
cp .env.example .env          # optional; scripts read ~/dev/creds/thinkable-app-wordpress.md by default

npm run wp:pull               # refresh content/, wordpress/theme/, public/uploads, docs/content-inventory.md
npm run wp:diff               # which local theme files differ from the server
npm run wp:push:theme functions.php            # push + verify one theme file
npm run wp:push:content content/pages/contact.md --dry-run

npm run dev                   # React rebuild at http://localhost:3000 (forms proxy to live WP)
npm run build && npm run preview
```

Workflow for a copy or design change on the live site: `wp:pull` → edit `content/` or `wordpress/theme/`
→ preview in `npm run dev` → `wp:push:*` → commit.

## Forms and leads

Both forms (home "Check patient fit", Partner Demo) are Contact Form 7 forms whose definitions are
provisioned by `functions.php` (`thinkable_partner_form_definition`, `thinkable_homepage_fit_form_definition`).
Since forms version `2026-09-15-forms-3` submissions are emailed to the address in **Settings → Thinkable Forms**
(default info@thinkable.app), stored in **Flamingo → Inbound Messages**, filtered by a honeypot + heuristics
(+ Cloudflare Turnstile when keys are configured), and optionally forwarded to partner-api's lead ingest.
Successful submissions redirect to `/partner-demo-thank-you`. Details in `docs/wordpress-operations.md`.
The React rebuild posts to the same CF7 REST endpoint (`/wp-json/contact-form-7/v1/contact-forms/<id>/feedback`).

## Hosting

DNS for `thinkable.app` points to an AWS host (63.183.1.198) that is **not** one of the servers listed in
`~/.claude/CLAUDE.md`; there is no SSH deploy — the theme is edited through wp-admin, which is what the
sync scripts automate. Google Analytics 4 property `G-RPW89LCFYM` is injected by `functions.php`.

## History

Until June 2026 this repo held a React + Payload CMS consumer site (quizzes, assessments, videos, EN/HE).
That deployment was replaced by the WordPress partner site; the old code is in git history before the
"Realign repo with live WordPress site" commit.
