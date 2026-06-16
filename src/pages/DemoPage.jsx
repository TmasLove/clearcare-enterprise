import Seo from '../components/Seo';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import DemoForm from '../components/DemoForm';
import styles from './DemoPage.module.css';

const VALUE_BULLETS = [
  'Custom plans tailored to your group size and structure',
  'White-label ready — your brand, our platform',
  'One platform for members, admins, and partners',
  'Transparent pricing with no long carrier contracts',
  'Modern member app with concierge dental support',
  'Full utilization and billing reporting from day one',
];

const CONTACTS = [
  { name: 'Jose Terry', title: 'CEO', email: 'jterry@clearcaredentalgroup.com' },
  { name: 'Jordan Terry', title: 'COO', email: 'jordan@clearcaredentalgroup.com' },
  { name: 'Tomas Roldan', title: 'CTO', email: 'troldan@clearcaredentalgroup.com' },
];

const MAILTO_SUBJECT = encodeURIComponent('Clear Care Enterprise inquiry');

export default function DemoPage() {
  return (
    <>
      <Seo
        title="Book a demo"
        description="See Clear Care Enterprise in action. Book a 20-minute demo with our enterprise team and discover how Clear Care powers dental benefits for employers, TPAs, DSOs, and partners."
      />

      {/* Navy hero */}
      <Section variant="navy">
        <Reveal>
          <div className="eyebrow-plain">BOOK A DEMO</div>
          <h1 className={styles.heroH1}>See Clear Care Enterprise in action</h1>
          <p className={styles.heroSub}>
            In 20 minutes, we’ll show you exactly how Clear Care powers dental benefits
            for your group — and what a rollout looks like from day one.
          </p>
        </Reveal>
      </Section>

      {/* Two-column body */}
      <Section>
        <div className={styles.body}>

          {/* Left: value bullets + contacts */}
          <div className={styles.left}>
            <Reveal>
              <h2 className={styles.valueH2}>What you’ll see in the demo</h2>
              <ul className={styles.bullets}>
                {VALUE_BULLETS.map((b, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.check} aria-hidden>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={styles.contactBox}>
                <p className={styles.contactTitle}>Prefer to reach us directly?</p>
                <ul className={styles.contactList}>
                  {CONTACTS.map(c => (
                    <li key={c.email}>
                      <span className={styles.contactName}>{c.name}</span>
                      <span className={styles.contactRole}>{c.title}</span>
                      <a href={`mailto:${c.email}?subject=${MAILTO_SUBJECT}`} className={styles.contactEmail}>
                        Reach out →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: demo form */}
          <div className={styles.right}>
            <Reveal delay={0.08}>
              <div className={styles.formWrap}>
                <p className={styles.formLabel}>Fill out the form and our enterprise team will follow up within one business day.</p>
                <DemoForm sourcePage="enterprise" />
              </div>
            </Reveal>
          </div>

        </div>
      </Section>
    </>
  );
}
