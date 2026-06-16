# Deploy Runbook — Clear Care Enterprise Marketing Site

Target: serve the static site at **clearcaredentalenterprise.com** on the existing
AWS EC2 box (same host as the B2C marketing site + dental app), via **nginx + certbot**.
It's a static SPA (Vite `dist/`) — **no PM2 process needed** (unlike the Node apps).

Host facts: EC2 `52.14.46.154` (us-east-2), apps under `/var/www`, nginx + certbot
already installed. Use the EC2 Instance Connect browser terminal (no SSH key).

---

## 0. DNS (do this first so certbot can validate)
At your domain registrar for **clearcaredentalenterprise.com**, add:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `52.14.46.154` |
| A | `www` | `52.14.46.154` |

(Optional, for later sub-project B) `A` record `app` → `52.14.46.154`.

DNS can take a few minutes to an hour. Verify: `dig +short clearcaredentalenterprise.com` returns the IP.

---

## 1. Get the code on the server + build
```bash
cd /var/www
git clone https://github.com/TmasLove/clearcare-enterprise.git
cd clearcare-enterprise
npm ci
npm run build          # reads .env.production, outputs dist/
```
`dist/` is what nginx serves.

---

## 2. nginx server block
Create `/etc/nginx/sites-available/clearcare-enterprise`:
```nginx
server {
    listen 80;
    server_name clearcaredentalenterprise.com www.clearcaredentalenterprise.com;

    root /var/www/clearcare-enterprise/dist;
    index index.html;

    # SPA fallback — client-side routes resolve to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # cache hashed static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```
Enable it and reload:
```bash
sudo ln -s /etc/nginx/sites-available/clearcare-enterprise /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 3. TLS (certbot)
```bash
sudo certbot --nginx -d clearcaredentalenterprise.com -d www.clearcaredentalenterprise.com
```
Certbot rewrites the server block to listen on 443 and sets up auto-renew.

At this point **https://clearcaredentalenterprise.com is live.**

---

## 4. Redeploy (after any future change)
```bash
cd /var/www/clearcare-enterprise
git pull
npm ci          # only if deps changed; otherwise skip
npm run build
# nginx serves dist/ directly — no restart needed (reload only if config changed)
```

---

## 5. Leads wiring (before driving real traffic)
The "Book a demo" / "Get started" forms POST to `${VITE_API_BASE}/leads`
(`.env.production`). Until that endpoint exists, the form shows a thank-you but the
lead is **not saved/emailed** (graceful fallback). To capture leads for real, pick one:

- **Fastest:** add `POST /leads` to the existing dental backend, set
  `VITE_API_BASE=https://app.clearcaredentalgroup.com/api/v1`, and enable **CORS**
  for `https://clearcaredentalenterprise.com`. Rebuild.
- **Cleaner (with sub-project B):** stand up `app.clearcaredentalenterprise.com`
  as an nginx alias to the same backend, keep `VITE_API_BASE` as-is.

Either way, the Leads endpoint = save row + email troldan@/jterry@/jordan@ + admin
Leads page (Plan 2). Until it's wired, **soft-launch** (deploy but don't publicize).

---

## Notes
- `.env.production` holds only public URLs (safe in git). Adjust the two values if
  the API/app hosts change, then rebuild.
- `vercel.json` is ignored on AWS (it's only for ad-hoc static previews).
- The B2B app face (`app.clearcaredentalenterprise.com`) + portal is sub-project B,
  deployed separately with the dental app's hostname-based branding.
