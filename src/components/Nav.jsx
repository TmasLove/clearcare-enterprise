import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import styles from './Nav.module.css';

const APP = import.meta.env.VITE_APP_URL || 'https://app.clearcaredentalenterprise.com';

const SOLUTIONS = [
  { label: 'All Solutions', to: '/solutions' },
  { label: 'Employers', to: '/solutions/employers' },
  { label: 'TPAs', to: '/solutions/tpa' },
  { label: 'DSOs', to: '/solutions/dso' },
  { label: 'Associations', to: '/solutions/associations' },
  { label: 'White-Label', to: '/solutions/white-label' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" aria-label="Clear Care Dental Enterprise home">
          <Logo height={34} />
        </Link>

        <div className={styles.links}>
          <div className={styles.dropdownWrap}>
            <button className={styles.link}>Solutions ▾</button>
            <div className={styles.dropdown}>
              {SOLUTIONS.map(s => (
                <Link key={s.to} to={s.to} className={styles.dropItem}>{s.label}</Link>
              ))}
            </div>
          </div>
          <Link to="/demo" className={styles.link}>Demo</Link>
        </div>

        <div className={styles.right}>
          <ThemeToggle />
          <a href={`${APP}/login`} className={styles.login}>Login</a>
          <Button to="/demo">Book a demo</Button>
        </div>

        <button
          className={styles.hamburger}
          aria-label="Toggle mobile menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobilePanel} ${mobileOpen ? styles.open : ''}`}>
        {SOLUTIONS.map(s => (
          <Link key={s.to} to={s.to} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{s.label}</Link>
        ))}
        <Link to="/demo" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Demo</Link>
        <a href={`${APP}/login`} className={styles.mobileLink}>Login</a>
        <div style={{ paddingTop: 8 }}>
          <Button to="/demo">Book a demo</Button>
        </div>
      </div>
    </nav>
  );
}
