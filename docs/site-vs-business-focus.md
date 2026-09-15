# Live site vs. current business focus (assessment, 2026-09-15)

**Business focus (Sep 2026, `bi/business-focus.md`):** support **TMS clinics** in acquiring, qualifying, onboarding,
engaging and retaining depression patients. Offering is four layers — acquisition, onboarding coordination,
in-treatment engagement, retention — priced per secured patient plus an optional platform fee. First pilot: MooreWays (PA), sponsored by BrainsWay.

**Live site (copy dated May–June 2026):** "Thinkable brings clinics better-fit mental health patients" on the home page,
plus a generic partner layer (clinics, digital health, medical device, employer/EAP, research) across use cases, buyers,
resources and blog. Anxiety/OCD are the example conditions; TMS and depression are not mentioned anywhere.

## Gaps
| Area | On the site today | Business focus | Suggested change |
|---|---|---|---|
| Home hero | Better-fit patients for clinics (generic) | TMS clinics, depression patients | Keep the "better-fit patients" line; name TMS clinics explicitly and add proof from the pilot when available (inquiries, booked, retained). |
| Home fit form | Name, role, email, monthly inquiries, org, patient focus | Clinic qualification | Add "Do you offer TMS?" / "Monthly TMS starts" and a service-area (ZIP/state) field; route into partner-api leads instead of only Flamingo. |
| Use cases / Buyers | 5 partner types, equal weight | Clinics first; medical device (BrainsWay-style sponsors) second; the rest parked | Promote *Clinics* and *Medical device & treatment partners* to the top with TMS-specific copy; keep others as secondary pages (don't delete — SEO). |
| Evidence | Research library (22 studies) + generic framing | TMS engagement/retention, PHQ outcomes | Add the depression/mood track evidence and the BrainsWay study reference; explain how check-ins (PHQ-9) feed outcome reporting. |
| Resources / Blog | Between-session support, EAP, digital health themes | Clinic operations | New articles: "What a TMS clinic should ask before adding patient engagement", "Reducing TMS course abandonment", "Prior-auth and intake friction". |
| Product path | Patient engages → Thinkable qualifies → Clinic receives | Four-layer offering | Show the four layers (acquisition, onboarding, engagement, retention) and the clinic workspace (`partner.thinkable.app/clinic/`). |
| Forms/leads plumbing | CF7 → Flamingo inbox, no email | Leads should be visible to the team fast | Turn on CF7 mail (remove `skip_mail`) or forward to partner-api `POST /api/leads/ingest` so demo requests appear where clinic leads already do. |
| Legal | Privacy/Terms already cover the SMS program ("Thinkable care messages", STOP/HELP, ≤8 msgs/month) | Twilio toll-free verification pending | Good — these pages are the ones Twilio reviews; keep them stable. |
| Footer/legal entity | "GGTUDE LTD, doing business as Thinkable" | — | OK. |

## What this repo enables now
- All copy is in `content/**.md`; a TMS-focused rewrite is a set of markdown edits pushed with `npm run wp:push:content`.
- Home page copy is in the theme template (`page-main-design.php` / `HomePage.tsx`); nav is in the header part.
- New pages still need creating in wp-admin first (then `wp:pull`).

## Not changed in this pass
No live content was modified. This pass mirrored the site into the repo, rebuilt the React app to match, and documented the gaps above for a decision.
