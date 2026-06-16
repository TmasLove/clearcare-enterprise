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
import FeatureGrid from '../components/FeatureGrid';
import MemberExperience from '../components/MemberExperience';
import SecurityCompliance from '../components/SecurityCompliance';
import FAQ from '../components/FAQ';
import { Stagger, StaggerItem } from '../components/Stagger';
import styles from './SegmentPage.module.css';

const MAP = { employers, tpa, dso, associations, whiteLabel };

function buildJsonLd(c, slug) {
  const urlPath = '/solutions/' + (slug === 'whiteLabel' ? 'white-label' : slug);

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.h1,
    serviceType: 'Dental benefits platform',
    areaServed: 'US',
    provider: {
      '@type': 'Organization',
      name: 'Clear Care Dental Enterprise',
      url: 'https://clearcaredentalenterprise.com',
    },
  };

  return { jsonLd: [faqPage, service], urlPath };
}

export default function SegmentPage({ slug }) {
  const c = useMemo(() => MAP[slug], [slug]);
  const { jsonLd, urlPath } = useMemo(() => (c ? buildJsonLd(c, slug) : { jsonLd: [], urlPath: '' }), [c, slug]);

  if (!c) return null;

  return (
    <>
      <Seo title={c.h1} description={c.subhead} path={urlPath} jsonLd={jsonLd} />

      {/* 1. Hero */}
      <Section variant="navy">
        <Reveal>
          <div className="eyebrow-plain">{c.eyebrow}</div>
          <h1 className={styles.h1}>{c.h1}</h1>
          <p className={styles.sub}>{c.subhead}</p>
          <div className={styles.actions}>
            <Button to="/demo">Book a demo</Button>
            {c.selfServe && (
              <Button variant="secondary" to="/enroll">
                Get started
              </Button>
            )}
          </div>
        </Reveal>

        {/* Hero stats row */}
        <Stagger className={styles.heroStats}>
          {c.heroStats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className={styles.statChip}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 2. The challenge */}
      <Section>
        <Reveal>
          <h2 className={styles.sectionTitle}>The challenge</h2>
        </Reveal>
        <Stagger className={styles.pains}>
          {c.pains.map((p, i) => (
            <StaggerItem key={i}>
              <div className={styles.painItem}>{p}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 3. Why [segment] — FeatureGrid */}
      <FeatureGrid
        eyebrow={c.why.eyebrow}
        title={c.why.title}
        subtitle={c.why.subtitle}
        items={c.why.items}
        columns={3}
        variant="alt"
      />

      {/* 4. How it works */}
      <Section>
        <Reveal>
          <h2 className={styles.sectionTitle}>How it works</h2>
        </Reveal>
        <Stagger className={styles.grid3}>
          {c.how.map((h, i) => (
            <StaggerItem key={i}>
              <div className={styles.card}>
                <div className={styles.num}>{i + 1}</div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 5. Benefits */}
      <Section variant="alt">
        <Reveal>
          <h2 className={styles.sectionTitle}>What you get</h2>
        </Reveal>
        <Stagger className={styles.benefits}>
          {c.benefits.map((b, i) => (
            <StaggerItem key={i}>
              <div className={styles.benefit}>
                <span className={styles.check}>&#10003;</span>
                {b}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 6. Member experience */}
      <MemberExperience />

      {/* 7. Security & compliance */}
      <SecurityCompliance />

      {/* 8. Proof (stats + logos + testimonial) */}
      <ProofSlots />

      {/* 9. FAQ */}
      <FAQ items={c.faqs} />

      {/* 10. CTA band */}
      <CTASection title={c.ctaTitle} sub={c.ctaSub} segment={c.slug} />
    </>
  );
}
