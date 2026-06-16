import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import CTASection from '../components/CTASection';
import employers from '../content/segments/employers';
import tpa from '../content/segments/tpa';
import dso from '../content/segments/dso';
import associations from '../content/segments/associations';
import whiteLabel from '../content/segments/whiteLabel';
import styles from './SolutionsHubPage.module.css';

const SEGMENTS = [
  { ...employers, route: '/solutions/employers' },
  { ...tpa, route: '/solutions/tpa' },
  { ...dso, route: '/solutions/dso' },
  { ...associations, route: '/solutions/associations' },
  { ...whiteLabel, route: '/solutions/white-label' },
];

export default function SolutionsHubPage() {
  return (
    <>
      <Seo
        title="Solutions"
        description="One platform. Every way to offer dental — for employers, TPAs, DSOs, associations, and white-label partners."
        path="/solutions"
      />

      {/* Hero */}
      <Section variant="navy">
        <Reveal>
          <div className="eyebrow-plain">SOLUTIONS</div>
          <h1 className={styles.h1}>One platform. Every way to offer dental.</h1>
          <p className={styles.sub}>
            Whether you’re an employer offering a benefit, a TPA administering plans, a dental group
            building loyalty, or a partner launching under your own brand — Clear Care Enterprise
            has a purpose-built path for you.
          </p>
        </Reveal>
      </Section>

      {/* Segment cards grid */}
      <Section>
        <Reveal>
          <h2 className={styles.gridTitle}>Choose your path</h2>
        </Reveal>
        <div className={styles.grid}>
          {SEGMENTS.map((seg, i) => (
            <Reveal key={seg.slug} delay={i * 0.07}>
              <Link to={seg.route} className={styles.card}>
                <div className={styles.cardEyebrow}>{seg.eyebrow}</div>
                <h3 className={styles.cardH3}>{seg.h1}</h3>
                <p className={styles.cardSub}>{seg.subhead}</p>
                <span className={styles.cardLink}>Learn more &rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Not sure which fits? Let’s figure it out together."
        sub="Book a 20-minute call and we’ll map the right solution to your needs."
      />
    </>
  );
}
