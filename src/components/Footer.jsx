import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Footer.module.css';

const APP = import.meta.env.VITE_APP_URL || 'https://app.clearcaredentalenterprise.com';
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo height={32} />
            <p>The dental benefits platform for employers, TPAs, DSOs, associations, and white-label partners.</p>
          </div>

          <div className={styles.col}>
            <h4>Solutions</h4>
            <Link to="/solutions/employers">Employers</Link>
            <Link to="/solutions/tpa">TPAs</Link>
            <Link to="/solutions/dso">DSOs</Link>
            <Link to="/solutions/associations">Associations</Link>
            <Link to="/solutions/white-label">White-Label</Link>
          </div>

          <div className={styles.col}>
            <h4>Company</h4>
            <Link to="/demo">Book a Demo</Link>
            <a href={`${APP}/login`}>Login</a>
            <a href="https://clearcaredentalgroup.com" target="_blank" rel="noopener noreferrer">
              Clear Care Dental
            </a>
          </div>

          <div className={styles.col}>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© {year} Clear Care Dental Enterprise. All rights reserved.</span>
          <div className={styles.legal}>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
