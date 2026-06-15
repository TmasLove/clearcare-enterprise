import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import ProofSlots from '../components/ProofSlots';
import CTASection from '../components/CTASection';
import employers from '../content/segments/employers';
import tpa from '../content/segments/tpa';
import dso from '../content/segments/dso';
import associations from '../content/segments/associations';
import whiteLabel from '../content/segments/whiteLabel';
import styles from './HomePage.module.css';

const VALUE_PROPS = [
  {
    icon: '⬡',
    title: 'One app, every audience',
    body: 'Employers, TPAs, DSOs, associations, and white-label partners all run on the same platform — no integrations required.',
  },
  {
    icon: '◈',
    title: 'White-label ready',
    body: 'Launch under your own brand with your logo, colors, and domain. We run the engine; you own the relationship.',
  },
  {
    icon: '◎',
    title: 'Modern member experience',
    body: 'Members get a best-in-class app with concierge support — the kind of experience that drives real utilization.',
  },
  {
    icon: '◱',
    title: 'Reporting & control',
    body: 'Utilization, enrollment, billing, and savings data in one place — so you can prove the value and grow.',
  },
];

const SEGMENTS = [
  { ...employers, route: '/solutions/employers' },
  { ...tpa, route: '/solutions/tpa' },
  { ...dso, route: '/solutions/dso' },
  { ...associations, route: '/solutions/associations' },
  { ...whiteLabel, route: '/solutions/white-label' },
];

const HOW_STEPS = [
  {
    num: '1',
    title: 'Configure',
    body: 'Set up your dental program in days — plans, branding, and member groups all in one admin portal.',
  },
  {
    num: '2',
    title: 'Onboard',
    body: 'Invite members by email or roster upload. They enroll and get covered in minutes, not weeks.',
  },
  {
    num: '3',
    title: 'Grow',
    body: 'Track utilization, measure savings, and expand — with the data and support to back every decision.',
  },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title=""
        description="The dental benefits platform for employers, TPAs, DSOs, associations, and partners."
      />

      {/* 1. Hero */}
      <section className={styles.hero}>
        {/* CSS gradient accent blob — no three.js */}
        <motion.div
          className={styles.heroBlob}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className={styles.heroInner}>
          <Reveal>
            <div className="eyebrow-plain">ENTERPRISE DENTAL BENEFITS</div>
            <h1 className={styles.heroH1}>The dental benefits platform for partners</h1>
            <p className={styles.heroSub}>
              One platform for employers, TPAs, DSOs, associations, and white-label partners to offer,
              administer, and grow dental benefits — without the traditional insurance complexity.
            </p>
            <div className={styles.heroActions}>
              <Button to="/demo">Book a demo</Button>
              <Button variant="secondary" to="/solutions">Explore solutions</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Value props */}
      <Section>
        <Reveal>
          <h2 className={styles.sectionTitle}>Built for every partner model</h2>
          <p className={styles.sectionSub}>
            One platform that fits the way you work — however you bring dental to your audience.
          </p>
        </Reveal>
        <div className={styles.valueGrid}>
          {VALUE_PROPS.map((vp, i) => (
            <Reveal key={vp.title} delay={i * 0.07}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>{vp.icon}</div>
                <h3 className={styles.valueTitle}>{vp.title}</h3>
                <p className={styles.valueBody}>{vp.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Segments overview */}
      <Section variant="alt">
        <Reveal>
          <h2 className={styles.sectionTitle}>Every way to offer dental — covered</h2>
          <p className={styles.sectionSub}>
            Choose your path or combine them. Clear Care Enterprise adapts to your model.
          </p>
        </Reveal>
        <div className={styles.segGrid}>
          {SEGMENTS.map((seg, i) => (
            <Reveal key={seg.slug} delay={i * 0.06}>
              <Link to={seg.route} className={styles.segCard}>
                <div className={styles.segEyebrow}>{seg.eyebrow}</div>
                <h3 className={styles.segH3}>{seg.h1}</h3>
                <span className={styles.segLink}>Learn more &rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. How partners use it */}
      <Section>
        <Reveal>
          <h2 className={styles.sectionTitle}>How partners use it</h2>
          <p className={styles.sectionSub}>
            From setup to scale — Clear Care Enterprise fits into your workflow in three steps.
          </p>
        </Reveal>
        <div className={styles.stepsRow}>
          {HOW_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Proof slots */}
      <ProofSlots />

      {/* 6. CTA */}
      <CTASection
        title="Ready to see it in action?"
        sub="Book a 20-minute demo with our enterprise team and get a plan built around your model."
      />
    </>
  );
}
