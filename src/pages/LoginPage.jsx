import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Logo from '../components/Logo';
import styles from './LoginPage.module.css';

const API = import.meta.env.VITE_API_BASE;
const APP = import.meta.env.VITE_APP_URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        window.location.href = `${APP}/portal`;
      } else {
        setErr(data.error || 'Sign-in failed. Please check your credentials.');
      }
    } catch {
      setErr('Unable to connect. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo title="Sign in" />
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Logo height={38} />
            <h1 className={styles.title}>Enterprise sign-in</h1>
            <p className={styles.subtitle}>Sign in to your Clear Care Enterprise portal</p>
          </div>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label className={styles.field}>
              <span>Email address</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            {err && <div className={styles.error} role="alert">{err}</div>}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className={styles.footer}>
            Need access?{' '}
            <Link to="/demo">Book a demo</Link>
          </p>
        </div>
      </div>
    </>
  );
}
