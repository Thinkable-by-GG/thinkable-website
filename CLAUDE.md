# CLAUDE.md — thinkable-website

Repo for **thinkable.app**, Thinkable's partner-facing marketing site. Live site = WordPress + custom theme
`thinkable-shai` (see README). This repo mirrors it and rebuilds it in React.

## Business context (read before changing copy)
- Since September 2026 the company's focus is **supporting TMS clinics**: acquire, qualify, onboard, engage
  and retain depression patients (first pilot: MooreWays, sponsored by BrainsWay). Knowledge base:
  `thinkable-kb` MCP → `bi/business-focus.md`, `PLATFORM-DESCRIPTION.md`.
- The live site copy (June 2026) is broader "partner-fit / better-fit patients for clinics" with five
  partner types. `docs/site-vs-business-focus.md` lists the gaps and proposed changes. Do not rewrite live
  copy toward TMS without Gur's sign-off; propose in that doc or as content/ edits pushed with `--dry-run` first.
- Positioning rules from the site: Thinkable is a *support layer*, "not a replacement for care"; forms are
  B2B only, never clinical/emergency. Keep the escalation/safety language.

## Platform Knowledge Base
Cross-project docs live at `/Users/gurilany/dev/thinkable-platform-knowledge-base` (MCP server `thinkable-kb`; project id: `thinkable-website`).
- **Before adding an API client, service, or data model:** check `services-catalog.md` / `projects/*/api.md` (or MCP `search` / `services_catalog`) — it may already exist in another project (e.g. the studies library on `/science-evidence` is topic-services `GET /services/api/studies`; lead forwarding targets partner-api `POST /api/leads/ingest`).
- **After changing a public API, data model, env var, deploy step, a form, or the Terms / Privacy pages:** notify the KB — MCP `add_inbox_entry`, or write `inbox/YYYY-MM-DD-thinkable-website-<slug>.md` there (format in `inbox/README.md`). The KB folds it into the docs daily. The legal pages are cited in Twilio and funnel consent flows, so their URLs and SMS wording must stay stable — record any change.
- The KB's own copy of this project: `projects/thinkable-website/{overview,api,data,services}.md`.

## How things work
- `npm run wp:pull` is the only way content/theme enter the repo — never hand-edit `docs/content-inventory.md`
  or `src/styles/site.css` (generated). Edit `content/**.md` or `wordpress/theme/**` and push.
- Pushes go through wp-admin (theme editor) and the REST API with a cookie login. Credentials come from
  `~/dev/creds/thinkable-app-wordpress.md` or `WP_USER`/`WP_PASS`. **Never commit credentials.**
- `wp:push:theme` verifies the server copy after writing; a failed verification is a real problem — stop and
  check the file in wp-admin.
- Content HTML in `content/**.md` is the raw WordPress body (mostly `<p class="lead">`, `<h2>`, `<ul>`,
  `<a class="button">`). Keep that vocabulary so both WordPress and the React rebuild style it.
- Forms: CF7 with `skip_mail: on` → leads live in **Flamingo inbound** in wp-admin, not email.
- Research library on `/science-evidence` is fetched from `https://api.ggtude.com/services/api/studies`
  (topic-services project). Don't hardcode studies.
- React rebuild (`src/`) must stay a faithful port of the PHP templates; when the theme changes, mirror it.

## Commands
`npm run dev` · `npm run build` · `npm run lint` · `npm run wp:pull` · `npm run wp:diff` ·
`npm run wp:push:theme <file>` · `npm run wp:push:content <content/…md> [--dry-run]`

## Conventions
- TypeScript strict, React 18 function components, react-router v6, plain CSS from the theme (no UI kit).
- Paths without trailing slash internally (`/use-cases/x`); WordPress links carry a trailing slash — `normalizePath` handles both.
- Commit and push once a day when active (user rule).
