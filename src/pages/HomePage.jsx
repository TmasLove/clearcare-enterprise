import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { Stagger, StaggerItem } from '../components/Stagger';
import FeatureGrid from '../components/FeatureGrid';
import MemberExperience from '../components/MemberExperience';
import SecurityCompliance from '../components/SecurityCompliance';
import ProofSlots from '../components/ProofSlots';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import employers from '../content/segments/employers';
import tpa from '../content/segments/tpa';
import dso from '../content/segments/dso';
import associations from '../content/segments/associations';
import whiteLabel from '../content/segments/whiteLabel';
import styles from './HomePage.module.css';

// ─── Data ────────────────────────────────────────────────────────────────────

const TRUST_CHIPS = [
  'One platform · every audience',
  'App-first member experience',
  'Launch in days',
];

const PLATFORM_ITEMS = [
  {
    icon: '🧩',
    title: 'One app, every audience',
    body: 'Employers, TPAs, DSOs, associations, and white-label partners all served from a single, unified platform — no stitched-together integrations, no silos.',
  },
  {
    icon: '🏷️',
    title: 'White-label ready',
    body: 'Deploy under your own brand. Your logo, your colors, your domain. We operate the infrastructure; you own the relationship from first click to renewal.',
  },
  {
    icon: '📱',
    title: 'Modern member experience',
    body: 'Members get a polished mobile app with transparent pricing, dentist search, digital ID cards, and concierge support — benefits they actually open.',
  },
  {
    icon: '⚡',
    title: 'Plans & enrollment built in',
    body: 'Design plan tiers, set member groups, and open enrollment in days — not months. No separate enrollment platform required.',
  },
  {
    icon: '📊',
    title: 'Reporting & control',
    body: 'Utilization, savings, enrollment trends, and billing data consolidated in one partner dashboard. Prove the value. Make the case for expansion.',
  },
  {
    icon: '🔓',
    title: 'No carrier lock-in',
    body: 'Clear Care is network-agnostic. Pair with any PPO or DMO, bring an existing carrier relationship, or leverage ours. You choose.',
  },
];

const SEGMENTS = [
  { ...employers, route: '/solutions/employers' },
  { ...tpa,       route: '/solutions/tpa' },
  { ...dso,       route: '/solutions/dso' },
  { ...associations, route: '/solutions/associations' },
  { ...whiteLabel,   route: '/solutions/white-label' },
];

const HOW_STEPS = [
  {
    num: '1',
    title: 'Configure',
    body: 'Stand up your dental program in the admin portal — set plan tiers, branding, eligibility rules, and member groups. Most partners go live within a week.',
  },
  {
    num: '2',
    title: 'Onboard',
    body: 'Invite members by email, CSV roster, or API integration. Members self-enroll in minutes and receive instant digital ID cards and app access.',
  },
  {
    num: '3',
    title: 'Grow',
    body: 'Monitor utilization, track savings, and identify engagement gaps from your dashboard. Expansion to new groups or plan types is a configuration change, not a re-implementation.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What is Clear Care Enterprise?',
    a: 'Clear Care Enterprise is a dental benefits platform designed for partners — employers, TPAs, DSOs, associations, and white-label operators — who want to offer, administer, and grow dental benefits without the complexity and cost of traditional insurance administration. The platform combines plan management, member enrollment, a consumer-facing mobile app, and reporting in one place.',
  },
  {
    q: 'Who is this platform built for?',
    a: "Clear Care Enterprise is purpose-built for organizations that bring dental benefits to an audience they serve. That includes self-funded employers, third-party administrators, dental service organizations, trade associations, and companies that want to offer a branded dental benefit as a product. If you're distributing or managing dental coverage for others, this platform is designed for you.",
  },
  {
    q: 'Can we launch under our own brand?',
    a: 'Yes — white-label deployment is a core feature, not an add-on. Partners can configure the member-facing experience with their own logo, color palette, and custom domain. Your members see your brand at every touchpoint from enrollment confirmation emails through the mobile app.',
  },
  {
    q: 'How fast can we go live?',
    a: 'Most partners complete their initial configuration and launch to a first member group within days of completing onboarding. The timeline depends on your plan complexity and how many member groups you need at launch, but Clear Care is designed to remove the traditional setup bottlenecks — there is no carrier underwriting cycle or benefits-admin software implementation blocking your start date.',
  },
  {
    q: 'How does billing and pricing work?',
    a: 'Clear Care Enterprise pricing is structured for partners, not for individual policyholders. We will walk you through the commercial model during your demo based on your use case — employer group size, TPA volume, DSO membership count, or white-label scope. There are no hidden carrier admin fees embedded in claims.',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Seo
        title=""
        description="The dental benefits platform for employers, TPAs, DSOs, associations, and white-label partners."
      />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* Background gradient orb 1 — top-right, sky blue */}
        <motion.div
          className={`${styles.orb} ${styles.orb1}`}
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        {/* Background gradient orb 2 — bottom-left, aqua */}
        <motion.div
          className={`${styles.orb} ${styles.orb2}`}
          animate={{
            x: [0, -25, 18, 0],
            y: [0, 22, -12, 0],
            scale: [1, 0.9, 1.08, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
        {/* Background gradient orb 3 — center, navy-mint accent */}
        <motion.div
          className={`${styles.orb} ${styles.orb3}`}
          animate={{
            x: [0, 15, -8, 0],
            y: [0, -10, 20, 0],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 0.7,
          }}
        />

        <div className={styles.heroInner}>
          <Reveal>
            <div className="eyebrow-plain">ENTERPRISE DENTAL BENEFITS</div>

            <h1 className={styles.heroH1}>
              The dental benefits platform{' '}
              <span className={styles.heroAccent}>for partners</span>
            </h1>

            <p className={styles.heroSub}>
              One platform for employers, TPAs, DSOs, associations, and white-label partners to
              offer, administer, and grow dental benefits — without the traditional insurance
              complexity.
            </p>

            <div className={styles.heroActions}>
              <Button to="/demo">Book a demo</Button>
              <Button variant="secondary" to="/solutions">Explore solutions</Button>
            </div>

            {/* Trust-stat chip row */}
            <div className={styles.trustChips}>
              {TRUST_CHIPS.map((chip) => (
                <span key={chip} className={styles.trustChip}>{chip}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Platform capabilities (FeatureGrid) ───────────────────────── */}
      <FeatureGrid
        eyebrow="THE PLATFORM"
        title="Everything you need to offer dental"
        subtitle="Built for partners who want to launch fast, white-label seamlessly, and give members a benefits experience that earns real engagement."
        columns={3}
        items={PLATFORM_ITEMS}
      />

      {/* ── 3. Segments overview ─────────────────────────────────────────── */}
      <Section variant="alt">
        <Reveal>
          <p className="eyebrow-plain">WHO WE SERVE</p>
          <h2 className={styles.sectionTitle}>Every way to offer dental — covered</h2>
          <p className={styles.sectionSub}>
            Choose your distribution model, or combine them. Clear Care Enterprise adapts to how
            you bring dental benefits to market.
          </p>
        </Reveal>

        <Stagger className={styles.segGrid}>
          {SEGMENTS.map((seg) => (
            <StaggerItem key={seg.slug}>
              <Link to={seg.route} className={styles.segCard}>
                <div className={styles.segEyebrow}>{seg.eyebrow}</div>
                <h3 className={styles.segH3}>{seg.h1}</h3>
                <span className={styles.segLink}>Learn more &rarr;</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── 4. How partners use it ───────────────────────────────────────── */}
      <Section>
        <Reveal>
          <p className="eyebrow-plain">HOW IT WORKS</p>
          <h2 className={styles.sectionTitle}>From setup to scale in three steps</h2>
          <p className={styles.sectionSub}>
            Clear Care Enterprise is designed to remove every implementation bottleneck between
            signing and your first active member.
          </p>
        </Reveal>

        <Stagger className={styles.stepsRow}>
          {HOW_STEPS.map((step) => (
            <StaggerItem key={step.num}>
              <div className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── 5. Member Experience ─────────────────────────────────────────── */}
      <MemberExperience />

      {/* ── 6. Security & Compliance ─────────────────────────────────────── */}
      <SecurityCompliance />

      {/* ── 7. Proof slots ───────────────────────────────────────────────── */}
      <ProofSlots />

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <FAQ
        title="Common questions"
        items={FAQ_ITEMS}
      />

      {/* ── 9. CTA ───────────────────────────────────────────────────────── */}
      <CTASection
        title="Ready to see it in action?"
        sub="Book a 20-minute walkthrough with our enterprise team and get a plan built around your model."
      />
    </>
  );
}
