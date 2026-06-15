import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Not found" />
      <Section variant="navy">
        <Reveal>
          <div className={styles.inner}>
            <p className={styles.code} aria-hidden>404</p>
            <h1 className={styles.title}>Page not found</h1>
            <p className={styles.sub}>
              The page you’re looking for doesn’t exist or may have moved.
              Let’s get you back on track.
            </p>
            <div className={styles.actions}>
              <Button to="/">Go home</Button>
              <Button variant="secondary" to="/demo">Book a demo</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
