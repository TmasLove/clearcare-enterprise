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

      {/* Hero */}
      <Section variant="navy">
        <Reveal>
          <div className="eyebrow-plain">{c.eyebrow}</div>
          <h1 className={styles.h1}>{c.h1}</h1>
          <p className={styles.sub}>{c.subhead}</p>
          <div className={styles.actions}>
            <Button to="/demo">Book a demo</Button>
            {c.selfServe && <Button variant="secondary" to="/enroll">Get started</Button>}
          </div>
        </Reveal>
      </Section>

      {/* The challenge */}
      <Section>
        <Reveal><h2 className={styles.sectionTitle}>The challenge</h2></Reveal>
        <ul className={styles.pains}>
          {c.pains.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li>{p}</li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section variant="alt">
        <Reveal><h2 className={styles.sectionTitle}>How it works</h2></Reveal>
        <div className={styles.grid3}>
          {c.how.map((h, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={styles.card}>
                <div className={styles.num}>{i + 1}</div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <Reveal><h2 className={styles.sectionTitle}>Why Clear Care</h2></Reveal>
        <div className={styles.benefits}>
          {c.benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className={styles.benefit}>&#10003; {b}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProofSlots />
      <CTASection title={c.ctaTitle} sub={c.ctaSub} segment={c.slug} />
    </>
  );
}
