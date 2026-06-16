import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Logo from '../components/Logo';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { submitLead } from '../lib/leads';
import styles from './EnrollPage.module.css';

// TODO(Plan-B/enroll-api): When the employer self-enroll API is live, replace the
// submitLead() call below with a POST to `${import.meta.env.VITE_API_BASE}/enroll`
// with { name, email, company } and handle the returned { accountId, portalUrl }.
// Until then, this form captures a hot lead so the team can manually provision.

export default function EnrollPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | submitting | done

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'A valid work email is required';
    }
    if (!form.company.trim()) errs.company = 'Company is required';
    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setState('submitting');
    await submitLead({
      name: form.name,
      email: form.email,
      company: form.company,
      sourceAction: 'enroll',
      sourcePage: 'enterprise',
    });
    setState('done');
  }

  return (
    <>
      <Seo
        title="Get started"
        description="Start offering modern dental benefits to your team — set up in days, not quarters."
        path="/enroll"
      />

      {/* Hero */}
      <Section variant="navy">
        <Reveal>
          <div className={styles.hero}>
            <div className={`eyebrow-plain ${styles.eyebrow}`}>GET STARTED</div>
            <h1 className={styles.h1}>Modern dental benefits, starting today</h1>
            <p className={styles.sub}>
              Set up Clear Care Enterprise for your team, group, or organization —
              affordable plans, a real member app, and support included.
              We’ll have you running in days, not quarters.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Form */}
      <Section variant="alt">
        <div className={styles.formWrap}>
          <Reveal>
            <div className={styles.formCard}>
              <Logo height={32} />

              {state === 'done' ? (
                <div className={styles.done}>
                  <div className={styles.doneIcon}>✅</div>
                  <h2>We’ll set up your account and reach out</h2>
                  <p>
                    Thanks for your interest! Our enterprise team will contact you within one
                    business day to complete your account setup and walk you through onboarding.
                  </p>
                  <Link to="/demo" className={styles.doneLink}>
                    Want to see a demo first? Book one here →
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Tell us about yourself</h2>
                  <form className={styles.form} onSubmit={onSubmit} noValidate>
                    <label className={styles.field}>
                      <span>Full name</span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Jane Smith"
                      />
                      {errors.name && <em className={styles.err} role="alert">{errors.name}</em>}
                    </label>

                    <label className={styles.field}>
                      <span>Work email</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="jane@company.com"
                      />
                      {errors.email && <em className={styles.err} role="alert">{errors.email}</em>}
                    </label>

                    <label className={styles.field}>
                      <span>Company / Organization</span>
                      <input
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={set('company')}
                        placeholder="Acme Corp"
                      />
                      {errors.company && <em className={styles.err} role="alert">{errors.company}</em>}
                    </label>

                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={state === 'submitting'}
                    >
                      {state === 'submitting' ? 'Submitting…' : 'Get started'}
                    </button>

                    <p className={styles.note}>
                      By submitting you agree to be contacted by our enterprise team.
                      Need more info first?{' '}
                      <Link to="/demo" className={styles.doneLink}>Book a demo →</Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
