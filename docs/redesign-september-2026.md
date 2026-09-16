# September 2026 website redesign

Status: published to https://thinkable.app on 2026-09-16.

## Positioning and design

Thinkable is the connected platform around the full TMS patient lifecycle. The website follows the ABCD sequence in the September clinic one-pager: acquire and qualify; onboard and coordinate; engage in treatment; retain after care. Clinics are the primary audience and device/treatment partners the secondary audience. Other partnership URLs remain available.

The visual system uses clean sans-serif type, warm neutral surfaces, green accents, clear product diagrams, illustrative clinic/patient views, and a single primary demo path. Research leadership and the founding team appear on the homepage. No stock people are represented as actual staff.

## Source and claim decisions

- User-provided `Thinkable - BrainsWay - ABCD platform- One-Pager - Sep 2026.pptx`: full lifecycle and two acquisition routes.
- Knowledge base `bi/business-focus.md`, `PLATFORM-DESCRIPTION.md`, and current pilot handbook: scope and maturity.
- https://ggtude.com/about/ (reviewed 2026-09-16): Prof. Guy Doron, research lead; Gur Ilany, product lead; Guy Bino, operations and partnerships.
- User explicitly approved naming BrainsWay only. No clinic partner is named. BrainsWay is described as pilot sponsor, with no invented testimonial or endorsement.
- Product views use fictional patient data and are labeled illustrative.
- No acquisition, retention, treatment efficacy, certification, or revenue numbers are invented. Digital intervention research is distinguished from outcomes of the TMS workflow pilot. Research studies remain fetched from the existing API.
- Legal pages and patient-facing safety/consent flows were not changed.

## Implementation

React extracts marked static fragments from the existing WordPress homepage/footer PHP templates. These fragments contain no PHP. This keeps public copy identical without introducing files that the WordPress theme editor cannot create. Shared CSS is appended to the existing `internal.css`; `npm run styles:build` generates the preview CSS from local theme source and runs automatically before dev/build. Do not hand-edit generated `src/styles/site.css`.

Existing page URLs are retained. Updated content: home metadata, clinic page, device-partner page, use-case index, science/evidence, demo and thank-you. Shared navigation/footer and conversion styles apply throughout the site. Archived resource/blog copy is retained.

The demo form now has four required fields (name, work email, company, organization type) and one optional note. Existing API names and CF7 endpoint are retained. `use-case` defaults to `Not sure yet`; `audience` is empty. CF7 provisioning version is bumped so the live form can update with the theme. The React preview adds native required/email validation. Spam controls, Flamingo storage, forwarding, and mail settings are unchanged.

## Rollout

Do not run `wp:pull` before reviewing or saving these changes: it replaces local work with the current live site. All deployment assets use existing WordPress files. The theme and changed content must be deployed together, using the existing wp push scripts. Push shared header/footer and styles before templates, and push `functions.php` to provision the new demo form. Review `--dry-run` output first. Production smoke testing must verify the CF7 form, navigation, evidence API, mobile layout, and cache invalidation. No production submission was made during local checks.

## Validation

- `npm run build`, `npm run lint`, and `git diff --check`: passed.
- Browser: desktop and 390px/320px mobile checks; no horizontal overflow on homepage or demo page.
- Mobile navigation opens, routes, and closes. FAQ expands. Homepage section links reach their targets.
- Demo required fields prevent empty submissions locally; no production submission was made.
- Evidence page loaded 22 study cards from the existing research API.
- Checked 29 authored internal links and exact React/WordPress demo-form markup parity.
- PHP runtime validation and live CF7 delivery require a WordPress/PHP environment; PHP is not installed in the current workspace.

## Official logo

The user supplied the Thinkable symbol from care-navigation on 2026-09-16. An unchanged source copy is stored at `logos/thinkable-symbol.png`. The exact PNG is embedded in shared theme CSS for the header, footer, product illustrations, and final CTA, and in the existing SVG favicon. This avoids adding binary assets to the WordPress text-only deployment path.

## Production verification — 2026-09-16

Published 12 existing theme files and 7 pages after backing up live versions and confirming no drift from the original mirror. Every uploaded file and page was read back and verified. Homepage, demo, evidence, clinic, device-partner, privacy, and terms pages return HTTP 200. Live logo, CSS, and favicon verified. Mobile navigation and evidence loading (22 studies) verified in the browser. A clearly labeled internal QA demo submission reached the thank-you page and was confirmed in Flamingo; the test record remains labeled in the inbox. Email and lead forwarding were both disabled, so no notification or partner lead was sent. Existing notification settings were preserved.

## Patient journey photo flow — published 2026-09-16

Added a horizontal, gently tilted three-card journey directly after the hero: call the clinic, meet the team, and begin treatment. Supplied images are illustrative, not testimonials. On small screens, the ordered sequence scrolls horizontally with native scroll snapping and keyboard access. Images have alt text, explicit dimensions, lazy loading, and responsive 480/800px WebP sources. Three 800px images total 159,868 bytes, down from 6,411,439 bytes for the original PNGs (97.5% reduction); 480px sources total 73,626 bytes. No full-size PNGs are served. Asset IDs and URLs are recorded in `patient-journey-images.json`.

Validated local build, desktop composition, image loading, mobile keyboard scrolling, and absence of page overflow. Published the shared homepage template and CSS, then verified the homepage and all six WebP assets on the live site.

### Fourth journey step — published 2026-09-16

Added the user-supplied post-treatment photo as step 04, “Stay connected after treatment,” with copy about follow-up check-ins and continued digital support. Four cards share a horizontal desktop row; tablet/mobile keep horizontally scrollable cards. The new image was compressed from 2,290,287 bytes to 65,284 bytes (800px) and 27,994 bytes (480px). Updated responsive image size hints and CSS cache version. Build and desktop/mobile layout checks passed; homepage template, CSS, and both new WebP assets verified live.

### Final clinic-facing journey copy — published 2026-09-16

The photo journey is presented from the clinic’s perspective: “Attract the right patients,” “Onboard patients with ease,” “Engage patients throughout treatment,” and “Stay connected after treatment.” Section headline: “One patient journey. Connected by your clinic.” Supporting copy addresses acquisition/referrals, intake coordination, engagement visibility, and follow-up. Published and verified on thinkable.app.
