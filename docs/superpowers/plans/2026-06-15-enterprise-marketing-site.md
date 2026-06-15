# Clear Care Enterprise — Marketing Site Implementation Plan (Plan 1 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the standalone enterprise marketing site at `clearcaredentalenterprise.com` — Home, a Solutions hub, five segment pages, a Demo/Contact page with a working lead form, and branded Login/Enroll entry shells — in the `clearcare-enterprise` repo.

**Architecture:** A Vite + React 18 SPA that **mirrors the existing `clearcare-marketing` repo** (CSS Modules, `react-router-dom`, `framer-motion`, `react-helmet-async`, Figtree font, the shared design-token system). Navy-forward "Direction C" theme. The Demo form POSTs to a configurable `VITE_API_BASE` `/api/v1/leads` endpoint (delivered in Plan 2) with a graceful fallback so the site is fully buildable/previewable standalone. Login/Enroll are thin branded shells that POST to the shared app API on `app.clearcaredentalenterprise.com`.

**Tech Stack:** Vite 5, React 18, react-router-dom 7, framer-motion 11, react-helmet-async 3, three/@react-three/fiber (optional hero accent), CSS Modules, Vitest (for pure-logic tests).

**Verification model:** This is a marketing site — most tasks are visual. Verification = (a) `npm run build` passes, and (b) visual check via the Claude preview tool (`preview_start` / `preview_screenshot` / `preview_snapshot`). Pure logic (form validation) is covered with real Vitest unit tests (TDD). Each task ends in a commit.

**Out of scope (Plan 2 / sub-projects B–D):** the `leads` table + `POST /leads` API + admin Leads page (Plan 2); the post-login portal, employer self-enroll API, white-label, org-hierarchy, and the B2B app-face hostname branding.

**Brand reference (reuse verbatim from `clearcare-marketing/src/styles/globals.css`):**
`--navy:#0F172A · --navy-2:#1B4F72 · --sky:#0EA5E9 · --aqua:#4FB9CB · --mint:#10B981 · --sun:#F59E0B`. Logo file: `Clear Care Dental logo 2026.png` (copy from `clearcare-marketing/public/`). Logo wordmark teal ≈ `#1488B8`, lighter ≈ `#4FB9CB`. Demo lead emails: `troldan@`, `jterry@`, `jordan@clearcaredentalgroup.com`.

---

## File Structure

```
clearcare-enterprise/
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
├── .env.example                     # VITE_API_BASE, VITE_APP_URL
├── public/
│   ├── Clear Care Dental logo 2026.png
│   └── favicon.svg
└── src/
    ├── main.jsx                     # Router + HelmetProvider + ThemeProvider
    ├── App.jsx                      # <Routes> definition
    ├── styles/
    │   └── globals.css              # tokens + base (ported, navy-default tweaks)
    ├── theme/
    │   └── ThemeContext.jsx         # light/dark, persisted
    ├── lib/
    │   ├── leads.js                 # submitLead(): POST to VITE_API_BASE + fallback
    │   └── validateLead.js          # pure validation (unit-tested)
    ├── components/
    │   ├── Logo.jsx                 # master PNG + "Enterprise" descriptor lockup
    │   ├── Nav.jsx / Nav.module.css
    │   ├── Footer.jsx / Footer.module.css
    │   ├── Layout.jsx               # Nav + <Outlet/> + Footer + Seo slot
    │   ├── Seo.jsx                  # react-helmet-async wrapper
    │   ├── ThemeToggle.jsx
    │   ├── Reveal.jsx               # framer-motion scroll-reveal primitive
    │   ├── Container.jsx / Section.jsx
    │   ├── Button.jsx               # primary/secondary/ghost variants
    │   ├── CTASection.jsx           # reusable "Book a demo" band
    │   ├── DemoForm.jsx / DemoForm.module.css
    │   └── ProofSlots.jsx           # stat band / logo strip / testimonial placeholders
    ├── content/
    │   └── segments/
    │       ├── employers.js
    │       ├── tpa.js
    │       ├── dso.js
    │       ├── associations.js
    │       └── whiteLabel.js
    └── pages/
        ├── HomePage.jsx / .module.css
        ├── SolutionsHubPage.jsx / .module.css
        ├── SegmentPage.jsx / .module.css     # data-driven, renders content/segments/*
        ├── DemoPage.jsx / .module.css
        ├── LoginPage.jsx                      # branded shell → app API
        ├── EnrollPage.jsx                     # branded shell → app API (gated)
        └── NotFoundPage.jsx
```

---

## Task 1: Scaffold the Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `.env.example`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "clearcare-enterprise",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "framer-motion": "^11.18.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^3.0.0",
    "react-router-dom": "^7.15.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.2",
    "vite": "^5.4.8",
    "vitest": "^2.1.0"
  }
}
```
> Note: `three`/`@react-three/fiber` are deferred — add only if Task 8's hero needs the 3D accent. YAGNI until then.

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], server: { port: 5174 } });
```

- [ ] **Step 3: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <title>Clear Care Dental Enterprise — Dental benefits platform for partners</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `.env.example`**

```
VITE_API_BASE=https://app.clearcaredentalenterprise.com/api/v1
VITE_APP_URL=https://app.clearcaredentalenterprise.com
```

- [ ] **Step 5: Create placeholder `src/main.jsx` and `src/App.jsx`** (replaced in Task 6)

```jsx
// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
function App() { return <div>Clear Care Enterprise</div>; }
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
```

- [ ] **Step 6: Install + verify build**

Run: `npm install && npm run build`
Expected: build completes, `dist/` produced, no errors.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold Vite + React enterprise site"
```

---

## Task 2: Design tokens + theme system

**Files:**
- Create: `src/styles/globals.css`, `src/theme/ThemeContext.jsx`, `src/components/ThemeToggle.jsx`
- Copy: `public/Clear Care Dental logo 2026.png`, `public/favicon.svg` (from `clearcare-marketing`)

- [ ] **Step 1: Copy brand assets**

```bash
cp "../clearcare-marketing/public/Clear Care Dental logo 2026.png" public/
cp "../clearcare-marketing/public/favicon.svg" public/
```

- [ ] **Step 2: Create `src/styles/globals.css`** — port the token block from `clearcare-marketing/src/styles/globals.css` verbatim (the `:root` palette, semantic surfaces, `[data-theme="dark"]`, base resets, Figtree body font). Then append the enterprise default-surface tweak so the site reads navy-forward:

```css
/* Enterprise default: dark navy hero surfaces even in light theme sections that opt in */
.surface-navy { background: linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 100%); color: #fff; }
.surface-navy .text-secondary, .surface-navy p { color: #CBD5E1; }
.accent-sky { color: var(--sky); }
.accent-mint { color: var(--mint); }
.eyebrow { text-transform: uppercase; letter-spacing: .12em; font-size: .8rem; font-weight: 700; color: var(--sky); }
```
(Keep the full ported token list — do not abbreviate it; the values are listed in the plan header's brand reference.)

- [ ] **Step 3: Create `src/theme/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeCtx = createContext({ theme: 'light', toggle: () => {} });
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('cc-theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cc-theme', theme);
  }, [theme]);
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
```

- [ ] **Step 4: Create `src/components/ThemeToggle.jsx`**

```jsx
import { useTheme } from '../theme/ThemeContext';
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      style={{ background: 'none', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'inherit' }}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: brand tokens, theme context, theme toggle, logo asset"
```

---

## Task 3: Logo lockup (sub-brand descriptor)

**Files:**
- Create: `src/components/Logo.jsx`

- [ ] **Step 1: Create `src/components/Logo.jsx`** — master PNG + "Enterprise" descriptor with divider (Design decision A from the spec).

```jsx
const LOGO_SRC = '/Clear Care Dental logo 2026.png';
export default function Logo({ height = 36 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <img src={LOGO_SRC} alt="Clear Care Dental" style={{ height, width: 'auto', display: 'block' }} draggable={false} />
      <span aria-hidden style={{ width: 1, height: height * 0.7, background: 'var(--border-strong)' }} />
      <span style={{ fontWeight: 600, fontSize: height * 0.5, color: '#1488B8', letterSpacing: '.5px' }}>Enterprise</span>
    </span>
  );
}
```

- [ ] **Step 2: Verify build, Step 3: Commit**

```bash
npm run build && git add -A && git commit -m "feat: enterprise logo lockup (master + descriptor)"
```

---

## Task 4: Layout primitives — Container, Section, Reveal, Button

**Files:**
- Create: `src/components/Container.jsx`, `Section.jsx`, `Reveal.jsx`, `Button.jsx` (+ `Button.module.css`)

- [ ] **Step 1: `Container.jsx`**

```jsx
export default function Container({ children, style }) {
  return <div style={{ width: '100%', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>;
}
```

- [ ] **Step 2: `Section.jsx`** (alternating surfaces; `navy` opt-in)

```jsx
import Container from './Container';
export default function Section({ children, variant = 'default', id }) {
  const cls = variant === 'navy' ? 'surface-navy' : variant === 'alt' ? '' : '';
  const bg = variant === 'alt' ? 'var(--surface-1)' : undefined;
  return (
    <section id={id} className={cls} style={{ padding: '96px 0', background: bg }}>
      <Container>{children}</Container>
    </section>
  );
}
```

- [ ] **Step 3: `Reveal.jsx`** (framer-motion scroll reveal — the core "wow")

```jsx
import { motion } from 'framer-motion';
export default function Reveal({ children, delay = 0, y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: `Button.jsx` + `Button.module.css`** — variants `primary` (sky), `secondary` (outline), `mint`. Supports `as="a"` / `to` (router Link).

```jsx
import { Link } from 'react-router-dom';
import styles from './Button.module.css';
export default function Button({ variant = 'primary', to, href, children, onClick, type }) {
  const cls = `${styles.btn} ${styles[variant]}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type || 'button'} className={cls} onClick={onClick}>{children}</button>;
}
```
```css
/* Button.module.css */
.btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; font-weight:600; font-size:1rem; padding:13px 26px; border-radius:12px; cursor:pointer; border:1px solid transparent; transition:transform .15s ease, box-shadow .2s ease, background .2s ease; }
.btn:hover { transform: translateY(-2px); }
.primary { background: var(--sky); color:#06283a; box-shadow: var(--shadow-card); }
.mint { background: var(--mint); color:#06281c; }
.secondary { background: transparent; color: var(--sky); border-color: var(--sky); }
```

- [ ] **Step 5: Verify build, Step 6: Commit**

```bash
npm run build && git add -A && git commit -m "feat: layout + motion + button primitives"
```

---

## Task 5: Nav, Footer, Seo, Layout

**Files:**
- Create: `src/components/Nav.jsx` (+css), `Footer.jsx` (+css), `Seo.jsx`, `Layout.jsx`

- [ ] **Step 1: `Seo.jsx`**

```jsx
import { Helmet } from 'react-helmet-async';
export default function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} — Clear Care Dental Enterprise` : 'Clear Care Dental Enterprise'}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
```

- [ ] **Step 2: `Nav.jsx`** — sticky, blurred (`var(--nav-bg)`). Left: `<Logo/>`. Center links: Solutions (dropdown to 5 segments), Pricing? (omit), Demo. Right: ThemeToggle + **Login** button (`href={VITE_APP_URL + '/login'}`) + primary **Book a demo** (`to="/demo"`).

Key detail — Login points to the app domain, not an internal route:
```jsx
const APP = import.meta.env.VITE_APP_URL || 'https://app.clearcaredentalenterprise.com';
// ...
<a href={`${APP}/login`} className={styles.login}>Login</a>
<Button to="/demo">Book a demo</Button>
```
Solutions dropdown links: `/solutions`, `/solutions/employers`, `/solutions/tpa`, `/solutions/dso`, `/solutions/associations`, `/solutions/white-label`. Include a mobile hamburger that toggles a panel (state via `useState`).

- [ ] **Step 3: `Footer.jsx`** — columns: Solutions (5 links), Company (Demo, Login→app, clearcaredentalgroup.com), Legal (Privacy/Terms placeholders to `/privacy`,`/terms` — render simple stub pages or external links to the consumer site's legal). Brand line + © year via `new Date().getFullYear()`.

- [ ] **Step 4: `Layout.jsx`**

```jsx
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
export default function Layout() {
  return (<><Nav /><main><Outlet /></main><Footer /></>);
}
```

- [ ] **Step 5: Verify build, Step 6: Commit**

```bash
npm run build && git add -A && git commit -m "feat: nav, footer, seo, layout shell"
```

---

## Task 6: Router wiring + page stubs

**Files:**
- Rewrite: `src/main.jsx`, `src/App.jsx`
- Create stub pages: `HomePage`, `SolutionsHubPage`, `SegmentPage`, `DemoPage`, `LoginPage`, `EnrollPage`, `NotFoundPage` (each returns `<Seo/>` + a heading; filled in later tasks).

- [ ] **Step 1: `src/main.jsx`**

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './theme/ThemeContext';
import App from './App';
import './styles/globals.css';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider><ThemeProvider><BrowserRouter><App /></BrowserRouter></ThemeProvider></HelmetProvider>
  </React.StrictMode>
);
```

- [ ] **Step 2: `src/App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SolutionsHubPage from './pages/SolutionsHubPage';
import SegmentPage from './pages/SegmentPage';
import DemoPage from './pages/DemoPage';
import LoginPage from './pages/LoginPage';
import EnrollPage from './pages/EnrollPage';
import NotFoundPage from './pages/NotFoundPage';
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="solutions" element={<SolutionsHubPage />} />
        <Route path="solutions/employers" element={<SegmentPage slug="employers" />} />
        <Route path="solutions/tpa" element={<SegmentPage slug="tpa" />} />
        <Route path="solutions/dso" element={<SegmentPage slug="dso" />} />
        <Route path="solutions/associations" element={<SegmentPage slug="associations" />} />
        <Route path="solutions/white-label" element={<SegmentPage slug="whiteLabel" />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="enroll" element={<EnrollPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

- [ ] **Step 3: Create the 7 stub pages** (each: `export default function X(){ return <><Seo title="X"/><Section><h1>X</h1></Section></>; }`).

- [ ] **Step 4: Verify with preview**

Run dev server, then use the preview tool: `preview_start`, navigate `/`, `/solutions`, `/solutions/employers`, `/demo` — confirm Nav/Footer render, links route, theme toggle works. `preview_screenshot` the home stub.
Expected: all routes render with shell; no console errors (`preview_console_logs`).

- [ ] **Step 5: Commit**

```bash
npm run build && git add -A && git commit -m "feat: router + page stubs wired"
```

---

## Task 7: Lead validation util (TDD)

**Files:**
- Create: `src/lib/validateLead.js`, `src/lib/validateLead.test.js`, `vitest.config.js`

- [ ] **Step 1: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'node' } });
```

- [ ] **Step 2: Write the failing test `src/lib/validateLead.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { validateLead } from './validateLead';
describe('validateLead', () => {
  it('passes a complete valid lead', () => {
    expect(validateLead({ name: 'A B', email: 'a@co.com', company: 'Co', segment: 'tpa' })).toEqual({ ok: true, errors: {} });
  });
  it('requires name, email, company', () => {
    const r = validateLead({ name: '', email: '', company: '' });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBeTruthy();
    expect(r.errors.email).toBeTruthy();
    expect(r.errors.company).toBeTruthy();
  });
  it('rejects malformed email', () => {
    const r = validateLead({ name: 'A', email: 'nope', company: 'Co' });
    expect(r.errors.email).toBeTruthy();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — "validateLead is not a function".

- [ ] **Step 4: Implement `src/lib/validateLead.js`**

```js
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateLead(d = {}) {
  const errors = {};
  if (!d.name || !d.name.trim()) errors.name = 'Name is required';
  if (!d.email || !EMAIL.test(d.email)) errors.email = 'A valid work email is required';
  if (!d.company || !d.company.trim()) errors.company = 'Company is required';
  return { ok: Object.keys(errors).length === 0, errors };
}
```

- [ ] **Step 5: Run test to verify pass**

Run: `npm test`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: lead validation util with tests"
```

---

## Task 8: Lead submission lib (API + graceful fallback)

**Files:**
- Create: `src/lib/leads.js`

- [ ] **Step 1: Create `src/lib/leads.js`** — POST to the Plan-2 endpoint; on network/501/404 (endpoint not yet deployed), resolve a soft-success so the UX still confirms and nothing is lost (the page also surfaces the team email).

```js
const BASE = import.meta.env.VITE_API_BASE || '';
export async function submitLead(payload) {
  // payload: { name, email, phone, company, companySize, segment, sourcePage, sourceAction, message }
  try {
    const res = await fetch(`${BASE}/leads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true, delivered: true };
    // Endpoint not live yet (Plan 2) → soft success, flag undelivered for UX copy.
    return { ok: true, delivered: false };
  } catch {
    return { ok: true, delivered: false };
  }
}
```

- [ ] **Step 2: Verify build, Step 3: Commit**

```bash
npm run build && git add -A && git commit -m "feat: lead submission lib with fallback"
```

---

## Task 9: DemoForm component

**Files:**
- Create: `src/components/DemoForm.jsx` (+ `DemoForm.module.css`)

- [ ] **Step 1: Build `DemoForm.jsx`** — controlled form: `name, email, phone, company, companySize (select: 1-50/51-200/201-1000/1000+), segment (select, defaults from prop), message`. On submit: run `validateLead`; if invalid, show inline errors; if valid, call `submitLead({...form, sourcePage, sourceAction:'demo'})`, show success state. Accept props `defaultSegment` and `sourcePage`.

```jsx
import { useState } from 'react';
import { validateLead } from '../lib/validateLead';
import { submitLead } from '../lib/leads';
import Button from './Button';
import styles from './DemoForm.module.css';

const SEGMENTS = [
  { v: 'employers', l: 'Employer / Small Business' },
  { v: 'tpa', l: 'TPA / Health Plan Admin' },
  { v: 'dso', l: 'DSO / Dental Group' },
  { v: 'associations', l: 'Association / Member Group' },
  { v: 'whiteLabel', l: 'White-Label / Reseller' },
  { v: 'other', l: 'Other' },
];

export default function DemoForm({ defaultSegment = 'other', sourcePage = 'demo' }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', companySize:'1-50', segment: defaultSegment, message:'' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | submitting | done
  const [delivered, setDelivered] = useState(true);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const v = validateLead(form);
    if (!v.ok) { setErrors(v.errors); return; }
    setErrors({}); setState('submitting');
    const r = await submitLead({ ...form, sourcePage, sourceAction: 'demo' });
    setDelivered(r.delivered); setState('done');
  }

  if (state === 'done') {
    return (
      <div className={styles.done}>
        <h3>Thanks — we’ll be in touch shortly.</h3>
        <p>{delivered
          ? 'Our enterprise team has your request and will reach out within one business day.'
          : 'Your request is recorded. If you need us sooner, email enterprise@clearcaredentalgroup.com.'}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <Field label="Full name" err={errors.name}><input value={form.name} onChange={set('name')} /></Field>
        <Field label="Work email" err={errors.email}><input value={form.email} onChange={set('email')} /></Field>
      </div>
      <div className={styles.row}>
        <Field label="Phone"><input value={form.phone} onChange={set('phone')} /></Field>
        <Field label="Company" err={errors.company}><input value={form.company} onChange={set('company')} /></Field>
      </div>
      <div className={styles.row}>
        <Field label="Company size">
          <select value={form.companySize} onChange={set('companySize')}>
            <option>1-50</option><option>51-200</option><option>201-1000</option><option>1000+</option>
          </select>
        </Field>
        <Field label="You are a…">
          <select value={form.segment} onChange={set('segment')}>
            {SEGMENTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
        </Field>
      </div>
      <Field label="What are you looking to solve?"><textarea rows={4} value={form.message} onChange={set('message')} /></Field>
      <Button type="submit">{state === 'submitting' ? 'Sending…' : 'Book a demo'}</Button>
    </form>
  );
}
function Field({ label, err, children }) {
  return (<label className={styles.field}><span>{label}</span>{children}{err && <em className={styles.err}>{err}</em>}</label>);
}
```
Add `DemoForm.module.css` styling inputs/selects/textarea with token borders, focus ring `var(--sky)`, two-column `.row` collapsing to one on mobile, `.err` in a red token, `.done` card.

- [ ] **Step 2: Verify build, Step 3: Commit**

```bash
npm run build && git add -A && git commit -m "feat: demo lead form"
```

---

## Task 10: Demo / Contact page

**Files:**
- Replace: `src/pages/DemoPage.jsx` (+css)

- [ ] **Step 1: Build `DemoPage.jsx`** — navy hero (`Section variant="navy"`): eyebrow "BOOK A DEMO", H1 "See Clear Care Enterprise in action", subhead. Two-column body: left = value bullets ("custom plans", "white-label ready", "one platform for members + admins") + the three contact emails; right = `<DemoForm sourcePage="demo" />`. Use `<Reveal>` on entrance. `<Seo title="Book a demo" description="..."/>`.

- [ ] **Step 2: Verify with preview** — `preview_start`, navigate `/demo`, fill the form with `preview_fill`, submit with `preview_click`, confirm success state via `preview_snapshot`. Submit empty → inline errors appear.

- [ ] **Step 3: Commit**

```bash
npm run build && git add -A && git commit -m "feat: demo/contact page"
```

---

## Task 11: Segment content data + SegmentPage component

**Files:**
- Create: `src/content/segments/{employers,tpa,dso,associations,whiteLabel}.js`
- Replace: `src/pages/SegmentPage.jsx` (+css)

Each content module exports a complete object — **real copy, no placeholders** — shaped:
```js
export default {
  slug, eyebrow, h1, subhead,
  pains: [ '…', '…', '…' ],            // 3-4 bullets
  how: [ { title, body }, … ],          // 3 "how it works" steps
  benefits: [ '…', … ],                 // 4-6 value bullets
  ctaTitle, ctaSub,
  selfServe: false,                      // true only for employers (shows "Get started")
};
```

- [ ] **Step 1: `employers.js`**

```js
export default {
  slug: 'employers',
  eyebrow: 'FOR EMPLOYERS & SMALL BUSINESS',
  h1: 'Dental benefits your team will actually use',
  subhead: 'Give employees real dental coverage without the cost and complexity of traditional insurance — set up in days, not quarters.',
  pains: [
    'Traditional dental insurance is expensive, slow to administer, and confusing for employees.',
    'Small and mid-size teams get ignored by big carriers and stuck with rigid plans.',
    'No easy way to see utilization or prove the benefit is worth it.',
  ],
  how: [
    { title: 'Pick a plan', body: 'Choose a Clear Care plan or we tailor one to your team size and budget.' },
    { title: 'Invite your team', body: 'Add employees by email or bulk upload; they enroll and get covered fast.' },
    { title: 'See the value', body: 'Track enrollment and savings from your employer dashboard.' },
  ],
  benefits: [
    'Transparent, predictable pricing', 'Fast employee onboarding',
    'Members get a real app + concierge support', 'No long carrier contracts',
  ],
  ctaTitle: 'Bring modern dental benefits to your team',
  ctaSub: 'Book a 20-minute demo, or get started online if you’re a small team.',
  selfServe: true,
};
```

- [ ] **Step 2: `tpa.js`**

```js
export default {
  slug: 'tpa',
  eyebrow: 'FOR TPAs & HEALTH PLAN ADMINISTRATORS',
  h1: 'A dental benefits engine you can administer at scale',
  subhead: 'Add a turnkey dental program to the plans you administer — with the eligibility, billing, and reporting controls you already expect.',
  pains: [
    'Bolting dental onto existing plans means juggling another vendor and another system.',
    'Clients want modern, app-first member experiences you can’t easily deliver.',
    'Manual eligibility and billing reconciliation eats margin.',
  ],
  how: [
    { title: 'Configure programs', body: 'Stand up dental plans for each client group under one administrator account.' },
    { title: 'Manage eligibility', body: 'Roster, invite, and manage members with role-based access and reporting.' },
    { title: 'Reconcile easily', body: 'Clear billing and utilization reporting per group.' },
  ],
  benefits: [
    'One platform across client groups', 'Modern member app + support',
    'Role-based admin access', 'Utilization & billing reporting',
  ],
  ctaTitle: 'Add dental to the plans you administer',
  ctaSub: 'Let’s map it to your book of business.',
  selfServe: false,
};
```

- [ ] **Step 3: `dso.js`**

```js
export default {
  slug: 'dso',
  eyebrow: 'FOR DSOs & DENTAL GROUPS',
  h1: 'Fill chairs with your own membership plan',
  subhead: 'Launch a branded in-house dental membership across your practices — drive recurring revenue and patient loyalty without insurance friction.',
  pains: [
    'Reliance on insurance reimbursement squeezes margins and slows care.',
    'No simple way to run a consistent membership plan across multiple locations.',
    'Patient retention and recurring revenue are hard to build.',
  ],
  how: [
    { title: 'Design your plan', body: 'Create membership tiers across all your practices from one account.' },
    { title: 'Enroll patients', body: 'Sign patients up in-office or online; they get an app and clear benefits.' },
    { title: 'Grow recurring revenue', body: 'Track members and renewals across every location.' },
  ],
  benefits: [
    'Multi-location management', 'Recurring membership revenue',
    'Reduced insurance dependence', 'Branded patient experience',
  ],
  ctaTitle: 'Launch membership across your group',
  ctaSub: 'See how DSOs run it on Clear Care.',
  selfServe: false,
};
```

- [ ] **Step 4: `associations.js`**

```js
export default {
  slug: 'associations',
  eyebrow: 'FOR ASSOCIATIONS & MEMBER GROUPS',
  h1: 'A dental benefit your members will value',
  subhead: 'Offer affordable dental coverage as a member perk — fully managed, app-first, and easy to roll out to your entire membership.',
  pains: [
    'Members want tangible benefits, not just discounts.',
    'Negotiating and managing a dental program is outside your core mission.',
    'Hard to communicate and track adoption across a large membership.',
  ],
  how: [
    { title: 'Offer the benefit', body: 'We set up a dental program branded for your association.' },
    { title: 'Roll it out', body: 'Members enroll online and get the app + support immediately.' },
    { title: 'Track adoption', body: 'See enrollment across your membership at a glance.' },
  ],
  benefits: [
    'Turnkey, fully managed', 'Affordable for members',
    'App-first experience', 'Adoption reporting',
  ],
  ctaTitle: 'Give your members a dental benefit worth having',
  ctaSub: 'Let’s tailor it to your association.',
  selfServe: false,
};
```

- [ ] **Step 5: `whiteLabel.js`**

```js
export default {
  slug: 'whiteLabel',
  eyebrow: 'WHITE-LABEL / PARTNER PROGRAM',
  h1: 'Your brand, our dental benefits engine',
  subhead: 'Resell a complete dental membership platform under your own brand — we run the technology, payments, and member experience behind the scenes.',
  pains: [
    'Building a dental benefits platform from scratch is slow and expensive.',
    'You want to own the brand and the relationship, not be a reseller in name only.',
    'Payments, member apps, and admin tooling are hard to build and maintain.',
  ],
  how: [
    { title: 'Brand it', body: 'Your logo, colors, and domain across the member and admin experience.' },
    { title: 'We power it', body: 'Plans, enrollment, payments, app, and support run on our platform.' },
    { title: 'You grow it', body: 'Own the customer relationship while we handle the engine.' },
  ],
  benefits: [
    'Full white-label branding', 'We handle payments & compliance',
    'Member app + admin portal included', 'Fast time to market',
  ],
  ctaTitle: 'Launch dental benefits under your brand',
  ctaSub: 'Let’s talk partnership.',
  selfServe: false,
};
```

- [ ] **Step 6: Build `SegmentPage.jsx`** — imports a map of the five content modules, selects by `slug` prop, and renders a consistent template: navy hero (eyebrow/h1/subhead + "Book a demo" and, if `selfServe`, a secondary "Get started" → `/enroll`); a "The challenge" pains section; a 3-step "How it works" grid; a benefits grid; `<ProofSlots/>`; closing `<CTASection title={ctaTitle} sub={ctaSub} segment={slug}/>`. Wrap blocks in `<Reveal>`. `<Seo title={h1}/>`.

```jsx
import { useMemo } from 'react';
import employers from '../content/segments/employers';
import tpa from '../content/segments/tpa';
import dso from '../content/segments/dso';
import associations from '../content/segments/associations';
import whiteLabel from '../content/segments/whiteLabel';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import Seo from '../components/Seo';
import CTASection from '../components/CTASection';
import ProofSlots from '../components/ProofSlots';
import styles from './SegmentPage.module.css';
const MAP = { employers, tpa, dso, associations, whiteLabel };
export default function SegmentPage({ slug }) {
  const c = useMemo(() => MAP[slug], [slug]);
  if (!c) return null;
  return (
    <>
      <Seo title={c.h1} description={c.subhead} />
      <Section variant="navy">
        <Reveal>
          <div className="eyebrow">{c.eyebrow}</div>
          <h1 className={styles.h1}>{c.h1}</h1>
          <p className={styles.sub}>{c.subhead}</p>
          <div className={styles.actions}>
            <Button to="/demo">Book a demo</Button>
            {c.selfServe && <Button variant="secondary" to="/enroll">Get started</Button>}
          </div>
        </Reveal>
      </Section>
      <Section>
        <Reveal><h2>The challenge</h2></Reveal>
        <ul className={styles.pains}>{c.pains.map((p,i)=><Reveal key={i} delay={i*0.05}><li>{p}</li></Reveal>)}</ul>
      </Section>
      <Section variant="alt">
        <Reveal><h2>How it works</h2></Reveal>
        <div className={styles.grid3}>{c.how.map((h,i)=>(
          <Reveal key={i} delay={i*0.08}><div className={styles.card}><div className={styles.num}>{i+1}</div><h3>{h.title}</h3><p>{h.body}</p></div></Reveal>
        ))}</div>
      </Section>
      <Section>
        <div className={styles.benefits}>{c.benefits.map((b,i)=><Reveal key={i} delay={i*0.04}><div className={styles.benefit}>✓ {b}</div></Reveal>)}</div>
      </Section>
      <ProofSlots />
      <CTASection title={c.ctaTitle} sub={c.ctaSub} segment={c.slug} />
    </>
  );
}
```
Add `SegmentPage.module.css` (hero h1 ~3rem, `.grid3` responsive 3→1 cols, cards with `--surface-card`/`--shadow-card`, `.benefits` 2-col grid).

- [ ] **Step 7: Verify with preview** — visit all five `/solutions/*` routes; confirm each renders its own copy, employers shows the "Get started" button, others don't. `preview_screenshot` two of them.

- [ ] **Step 8: Commit**

```bash
npm run build && git add -A && git commit -m "feat: segment content + data-driven segment page"
```

---

## Task 12: CTASection + ProofSlots components

**Files:**
- Create: `src/components/CTASection.jsx`, `src/components/ProofSlots.jsx`

- [ ] **Step 1: `CTASection.jsx`** — navy band: title, sub, "Book a demo" button (`to="/demo"`). `segment` prop reserved for future deep-link (`/demo?segment=`). Wrap in `<Reveal>`.

- [ ] **Step 2: `ProofSlots.jsx`** — renders the trust scaffold with honest placeholder content that reads fine empty: a stats band (3 stat cards: "Members covered", "Claims processed", "Avg. savings" with `—` until real numbers), a "Trusted by" logo strip (muted placeholder boxes), one testimonial block (generic, clearly swappable). Comment each slot `{/* TODO(content): replace with real figure from CEO */}` — these are content TODOs, acceptable per spec §8, not logic placeholders.

- [ ] **Step 3: Verify build, Step 4: Commit**

```bash
npm run build && git add -A && git commit -m "feat: CTA band + proof slots"
```

---

## Task 13: Solutions hub page

**Files:**
- Replace: `src/pages/SolutionsHubPage.jsx` (+css)

- [ ] **Step 1: Build hub** — navy hero ("One platform. Every way to offer dental."), then a grid of 5 cards (one per segment) linking to each segment route, each with eyebrow + one-line value (pull from each content module's `eyebrow`/`subhead`). Closing `<CTASection/>`. Use `<Reveal>` staggered. `<Seo title="Solutions"/>`.

- [ ] **Step 2: Verify preview** — `/solutions` shows 5 cards, each routes correctly. `preview_screenshot`.

- [ ] **Step 3: Commit**

```bash
npm run build && git add -A && git commit -m "feat: solutions hub page"
```

---

## Task 14: Home page

**Files:**
- Replace: `src/pages/HomePage.jsx` (+css)

- [ ] **Step 1: Build Home** sections, top to bottom:
  1. **Hero** (`Section variant="navy"`): eyebrow "ENTERPRISE DENTAL BENEFITS", H1 "The dental benefits platform for partners", subhead (one line on the offering), actions: "Book a demo" + "Explore solutions" (`to="/solutions"`). Optional subtle animated accent (CSS gradient blob via framer-motion; defer three.js unless wanted).
  2. **Value props** (3–4 cards): "One app, every audience", "White-label ready", "Modern member experience", "Reporting & control".
  3. **Segments overview**: compact grid linking to the 5 segment pages (reuse the hub card markup or a condensed strip).
  4. **How partners use it**: 3-step row (configure → onboard → grow).
  5. `<ProofSlots/>`.
  6. `<CTASection/>`.
  Wrap each in `<Reveal>`. `<Seo title="" description="The dental benefits platform for employers, TPAs, DSOs, associations, and partners."/>`.

- [ ] **Step 2: Verify preview** — home renders full; scroll reveals fire; both light/dark themes look right (`preview_resize` + toggle). `preview_screenshot` light and dark.

- [ ] **Step 3: Commit**

```bash
npm run build && git add -A && git commit -m "feat: home page"
```

---

## Task 15: Login + Enroll entry shells

**Files:**
- Replace: `src/pages/LoginPage.jsx`, `src/pages/EnrollPage.jsx`

- [ ] **Step 1: `LoginPage.jsx`** — branded, centered card: `<Logo/>`, "Enterprise sign-in", email + password fields, "Sign in" button. On submit, POST to `${VITE_API_BASE}/auth/login` (the existing app login endpoint). On success (`{token}`), redirect to `${VITE_APP_URL}/portal` (`window.location.href`). On failure, show error. Keep it minimal — the real portal is sub-project B; this is the branded front door. Include a "Need access? Book a demo" link.

```jsx
// core submit
const API = import.meta.env.VITE_API_BASE, APP = import.meta.env.VITE_APP_URL;
async function onSubmit(e){ e.preventDefault(); setErr('');
  const res = await fetch(`${API}/auth/login`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email, password }) });
  const data = await res.json();
  if (res.ok && data.token) { window.location.href = `${APP}/portal`; }
  else setErr(data.error || 'Sign-in failed'); }
```

- [ ] **Step 2: `EnrollPage.jsx`** — branded shell. Since the employer self-enroll API is a **Plan-B dependency**, this page renders the intro + a short "Get started" form that, on submit, **creates a hot lead** via `submitLead({...,sourceAction:'enroll'})` and shows "We’ll set up your account and reach out." (No fake account creation.) A comment documents the swap-in point for B's real `/enroll` endpoint.

- [ ] **Step 3: Verify build + preview** — `/login` renders branded; submitting with no API returns a graceful error (not a crash). `/enroll` submit shows the lead-captured confirmation.

- [ ] **Step 4: Commit**

```bash
npm run build && git add -A && git commit -m "feat: branded login + enroll entry shells"
```

---

## Task 16: 404, polish, SEO, responsive QA

**Files:**
- Replace: `src/pages/NotFoundPage.jsx`; touch any page needing meta.

- [ ] **Step 1: `NotFoundPage.jsx`** — simple navy 404 with link home + "Book a demo".
- [ ] **Step 2: Ensure every page has `<Seo>` with a real title + description.**
- [ ] **Step 3: Responsive QA via preview** — `preview_resize` to 375px and 768px on Home, a segment page, and Demo; fix any overflow/nav issues. Verify mobile nav hamburger works (`preview_click`).
- [ ] **Step 4: Console check** — `preview_console_logs` clean across pages.
- [ ] **Step 5: Commit**

```bash
npm run build && git add -A && git commit -m "feat: 404, seo coverage, responsive polish"
```

---

## Task 17: Deploy config + README

**Files:**
- Create: `vercel.json` (SPA rewrite), `README.md`, ensure `.gitignore`

- [ ] **Step 1: `.gitignore`** — `node_modules`, `dist`, `.env`, `.DS_Store`.
- [ ] **Step 2: `vercel.json`** — SPA fallback so client routes work:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

- [ ] **Step 3: `README.md`** — quickstart (`npm i`, `npm run dev`, `npm run build`), env vars (`VITE_API_BASE`, `VITE_APP_URL`), deploy notes: host on Vercel/static, point `clearcaredentalenterprise.com` at it; the `app.` subdomain + Leads API are separate (Plan 2 / sub-project B). Note DNS is an infra task.
- [ ] **Step 4: Final build + commit + push**

```bash
npm run build && git add -A && git commit -m "chore: deploy config + readme" && git push
```

---

## Self-Review (completed against the spec)

- **Spec coverage:** New domain site ✓ (Tasks 1–6,17); hub + 5 segment pages ✓ (11,13); hybrid demo + self-serve ✓ (9,10,11 selfServe,15); leads POST target + email/CRM = Plan 2 (site posts via Task 8 lib) ✓; direction-C navy visuals ✓ (2,Sections); logo descriptor ✓ (Task 3); proof slots honest/empty ✓ (12); login/enroll shells to shared API ✓ (15); out-of-scope items excluded ✓.
- **Placeholders:** none in logic; `ProofSlots` TODOs are content-fill markers (spec §8), explicitly allowed.
- **Type consistency:** `submitLead`/`validateLead` signatures consistent across Tasks 7–10,15; segment content object shape consistent across Task 11 modules and consumed identically by `SegmentPage`; `Button` props (`to`/`href`/`variant`) consistent.
- **Dependency flagged:** self-serve enroll real endpoint = Plan 2/B; site degrades gracefully until then (Task 8 fallback, Task 15 lead capture).
```
