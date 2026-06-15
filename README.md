# Clear Care Dental Enterprise — Marketing Site

The enterprise (B2B) marketing site for Clear Care Dental Group, served at
**clearcaredentalenterprise.com**. Sells the dental-benefits platform to
employers, TPAs/health-plan admins, DSOs, associations, and white-label
partners, and captures leads (Book a demo / Get started).

Built to mirror the consumer `clearcare-marketing` repo: Vite + React 18,
CSS Modules, Framer Motion, react-router-dom, react-helmet-async, Figtree.

## Quickstart

```bash
npm install
npm run dev      # local dev server (http://localhost:5181)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm test         # unit tests (Vitest)
```

## Environment

Copy `.env.example` and set:

| Var | Purpose |
|---|---|
| `VITE_API_BASE` | Base URL of the shared app API (e.g. `https://app.clearcaredentalenterprise.com/api/v1`). The demo/enroll forms and login POST here. |
| `VITE_APP_URL` | Base URL of the B2B app face (e.g. `https://app.clearcaredentalenterprise.com`). Login redirects to `${VITE_APP_URL}/portal` on success. |

The Demo and Enroll forms degrade gracefully if `VITE_API_BASE` isn't live yet
(they still confirm to the user and the lead isn't lost) — the Leads API is
delivered separately (Plan 2).

## Architecture (one app, two faces)

- **This repo** = the marketing site (apex domain) + branded `/login` and
  `/enroll` entry pages that POST to the shared app API.
- **`app.clearcaredentalenterprise.com`** = the B2B app face — the *same*
  backend/database/auth as the consumer app, hostname-branded. The post-login
  **portal**, the **Leads CRM** (admin), and the **employer self-enroll API**
  are separate workstreams (Plan 2 / sub-projects B–D), not in this repo.

## Deploy (AWS — same pattern as the B2C `clearcare-marketing` site)

Static SPA. Build locally/CI then serve the `dist/` over nginx on the existing
EC2 host (the same box that serves the consumer marketing site + app):

1. `npm ci && npm run build` → produces `dist/`.
2. Copy `dist/` to the server (e.g. `/var/www/enterprise`).
3. nginx server block for `clearcaredentalenterprise.com` with a SPA fallback so
   client routes resolve:
   ```nginx
   server {
     server_name clearcaredentalenterprise.com www.clearcaredentalenterprise.com;
     root /var/www/enterprise;
     index index.html;
     location / { try_files $uri $uri/ /index.html; }
   }
   ```
4. `certbot` for TLS, then point the domain's DNS at the EC2 IP.

The `app.clearcaredentalenterprise.com` subdomain (B2B app face) is served by the
existing app with hostname-based branding — separate workstream (sub-project B).
(`vercel.json` is kept only as a convenience for ad-hoc static previews; AWS is
the real target.)

See `docs/superpowers/specs/` and `docs/superpowers/plans/` for the full design
and implementation plan.
