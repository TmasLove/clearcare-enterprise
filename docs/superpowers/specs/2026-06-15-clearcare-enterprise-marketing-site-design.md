# Clear Care Enterprise — Marketing Site & B2B Front Door

**Status:** Design approved — ready for implementation plan
**Date:** 2026-06-15
**Repo:** `github.com/TmasLove/clearcare-enterprise`
**Sub-project:** A (of A–D; see "Relationship to other work")

---

## 1. Summary

A new, standalone **enterprise marketing site** for Clear Care Dental Group's B2B offering, plus the **branded B2B front door** (login/enroll entry) to the existing application. The site sells Clear Care's dental-benefits platform to seven market segments and captures leads. It must *feel* like a separate product from the consumer (B2C) experience, while in reality running on the **same backend, database, and auth** as the existing app — just a different domain, brand, and set of portals.

The guiding principle throughout: **one app, two faces.** We do not fork or clone the application. We add a second branded front end and route by hostname.

---

## 2. Goals & Non-Goals

### Goals
- A polished, enterprise-credible marketing site that converts B2B visitors.
- Cover seven segments via a Solutions hub + five tailored segment pages.
- Hybrid conversion: "Book a demo" (lead capture) + self-serve "Get started".
- Capture every lead into the **existing admin control panel** as a managed record, auto-categorized hot/medium/cold, and email the admin team.
- Stand up the **B2B app face** at `app.clearcaredentalenterprise.com` running the same backend, visually distinct from B2C.

### Non-Goals (explicitly out of scope — separate specs)
- **Sub-project B:** the web employer/enterprise portal that renders after login.
- **Sub-project C:** the white-label system + admin "create white-label" UI.
- **Sub-project D:** org-hierarchy data model for DSO/TPA (parent orgs owning multiple employers).
- **Employer self-enroll API** (the backend endpoint that creates an employer account from the self-serve enroll form) — part of B's onboarding.

---

## 3. Architecture

### 3.1 Domains & "one app, two faces"
| Domain | Serves | This spec? |
|---|---|---|
| `clearcaredentalenterprise.com` (apex/www) | Enterprise **marketing site** (pages, demo form, enroll/login entry shells) | ✅ Yes |
| `app.clearcaredentalenterprise.com` | Enterprise **app face** — same backend/DB/auth as consumer app, navy-branded, serves B2B `/login`, `/enroll`, `/portal` | ⚠️ Front-door + hostname branding here; the portal itself is sub-project B |
| `app.clearcaredentalgroup.com` (existing) | Consumer **app face** (B2C member experience) | ➖ Unchanged |

**Mechanism:** the application detects the request **hostname** and selects brand (palette, logo, copy) + post-login routing. Same codebase, same Postgres, same users/auth. Because the two app faces sit on **different registrable domains**, browser sessions are naturally isolated — which reinforces the "two separate products" perception rather than fighting it. No cross-domain token handoff is required (same-origin within each domain).

### 3.2 Repos
- **`clearcare-enterprise`** (new) — the marketing site. Vite + React, mirroring the structure and tooling of the existing `clearcare-marketing` repo. Reuses the brand palette and component conventions.
- **Existing app repo** (Dentist App) — receives two small additions in this spec's scope: (a) hostname-based branding for the enterprise app face, and (b) the **Leads** backend + admin page (see §6). Everything else app-side is sub-project B+.

### 3.3 Data flow — forms
```
clearcaredentalenterprise.com (marketing form)
        │  POST
        ▼
shared app API  ──►  persists Lead row + (enroll) calls account API
        │
        ├─►  emails troldan@, jterry@, jordan@clearcaredentalgroup.com
        └─►  Lead appears in Admin CP → Leads page
```
- **Demo/Contact form:** fully functional at launch — creates a Lead, emails the team. No external dependency.
- **Self-serve Enroll:** real UI at launch; its create-employer-account API is a **dependency on sub-project B**. Until B lands, the "Get started" path is present but its submit endpoint is stubbed/disabled with a graceful "we'll be in touch" fallback that creates a hot Lead.

---

## 4. Information Architecture (pages)

Structure pattern: **Hub + a page per segment** (chosen over single-page and buyer-type-grouping).

- **Home** — enterprise hero, value props, segment overview cards, proof slots, primary demo CTA.
- **Solutions hub** (`/solutions`) — overview linking to the five segment pages.
  - **Employers** (`/solutions/employers`) — covers Employer Groups + Small Business; message scales by size.
  - **TPAs & Health Plan Administrators** (`/solutions/tpa`) — TPAs + health-plan admins (same buyer).
  - **DSOs & Dental Groups** (`/solutions/dso`) — DSOs + independent practices (provider-side pitch).
  - **Associations & Member Groups** (`/solutions/associations`) — member-perk framing.
  - **White-Label / Partner Program** (`/solutions/white-label`) — the reseller/channel pitch (the *capability* resellers buy).
- **Demo / Contact** (`/demo`) — lead form.
- **Login** (`/login`) & **Enroll** (`/enroll`) — branded entry shells that POST to the shared app API. Nav "Login" points here. (Post-login portal = sub-project B.)
- **Footer / legal** — standard.

Each segment page follows a consistent template: tailored headline → the segment's pains → how Clear Care solves it / how it works → proof slots → segment-specific CTA.

---

## 5. Conversion model (hybrid)

- **Primary CTA everywhere:** "Book a demo" → form fields: name, work email, phone, company, segment (pre-filled by page), company size, message. On submit: create Lead, email team, show confirmation.
- **Secondary CTA:** "Get started" (self-serve) → enterprise `/enroll`. Ships as UI; live submit depends on B's employer self-enroll API. Interim behavior: creates a **hot** Lead + "we'll reach out" confirmation.

---

## 6. Leads in the Admin Control Panel (CRM-lite)

Added to the **existing admin app** (not the marketing site).

### 6.1 Data model — `leads` table (new)
Fields (minimum): `id`, `created_at`, `name`, `email`, `phone`, `company`, `company_size`, `segment` (employers | tpa | dso | associations | white_label | other), `source_page`, `source_action` (demo | enroll | contact), `message`, `temperature` (hot | medium | cold), `status` (new | contacted | qualified | won | lost), `notes`, `utm` (jsonb, optional), `assigned_to` (nullable).

### 6.2 Auto-categorization (on insert; admin-overridable)
| Temp | Rule |
|---|---|
| 🔴 Hot | "Book a demo" from **white_label, tpa, or dso** pages; OR any **self-serve enroll** start; OR large company size |
| 🟡 Medium | "Book a demo" from **employers / associations** pages; mid-size company |
| 🔵 Cold | general Contact/footer form; low info; small/unknown company |

### 6.3 Admin "Leads" page (new, in `web` admin pages)
- Table: list with filters (temperature, segment, status, date), search.
- Row detail: full submission, editable `temperature`, `status`, `notes`, `assigned_to`.
- Sort by recency / temperature. Follows existing admin page patterns (e.g., MembersPage).

### 6.4 Notification
Every new Lead emails **troldan@, jterry@, jordan@clearcaredentalgroup.com** (reuses existing mailer), so nothing is missed even before anyone opens the CP.

---

## 7. Visual direction & motion

- **Direction C (hybrid):** corporate navy structure (`#0F172A`, `#1B4F72`) with Clear Care's signature accents — sky `#0EA5E9`, emerald `#10B981`. Reads "enterprise infrastructure partner" while staying unmistakably Clear Care. Light/dark mode like the consumer site.
- **Logo (sub-brand descriptor):** keep the master Clear Care Dental logo **untouched** and place an **"Enterprise"** descriptor beside it, separated by a thin vertical divider (standard brand-architecture, e.g. "Google Cloud"). Descriptor uses the brand teal (`~#1488B8`) in a complementary weight. This avoids recreating/altering the flat-PNG wordmark and carries no font-matching risk. If the original **vector source** (`.ai`/`.svg`/`.eps`/Figma) later surfaces, a fully-merged "…Dental Ent." wordmark remains an option, but is not required.
- **Motion:** premium feel via **Framer Motion** (scroll/entrance animations) + a **subtle Three.js** hero accent + smooth scroll — reusing the consumer site's stack for family consistency and maintainability.
- **HyperFrames:** *not* used for live-site animation (it renders HTML→MP4 video, server-side). Kept as a future option to produce an embedded hero **demo/explainer video**.

---

## 8. Proof / trust content (honest about today)

Limited real proof exists at launch (stats live with the CEO; no public logos/case studies yet). Therefore:
- Pages **lead with offering + value**, not fabricated metrics.
- Include **clearly-structured placeholder slots** designed to be filled later: a stats band, a logo strip, testimonial blocks, case-study cards.
- Founder/credibility angle available (Jose Terry, CEO) if desired.
- Nothing fabricated; slots render gracefully when empty.

---

## 9. Relationship to other work (decomposition)
- **A (this spec):** Enterprise marketing site + B2B front door + Leads CRM-lite.
- **B:** Web employer/enterprise portal (renders after login at `app.clearcaredentalenterprise.com/portal`) + employer self-enroll API.
- **C:** White-label system + admin "create white-label" UI + per-tenant branding.
- **D:** Org-hierarchy data model (parent orgs → employers → members) for DSO/TPA/broker.

Each gets its own spec → plan → implementation cycle. A can launch independently; the self-serve enroll path fully activates when B lands.

---

## 10. Open items to resolve during/after build
- Real stats/logos/case studies from the CEO to fill proof slots.
- DNS/hosting setup for the new domain + `app.` subdomain (infra task, coordinated with B).
- Confirm whether a pricing page is wanted (default: no public pricing; enterprise = "custom, via demo").
