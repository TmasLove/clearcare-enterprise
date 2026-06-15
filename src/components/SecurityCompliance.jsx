import { motion } from 'framer-motion';
import Section from './Section';
import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';
import styles from './SecurityCompliance.module.css';

const ITEMS = [
  {
    icon: '🔐',
    title: 'Encryption in transit and at rest',
    body: 'All data is encrypted over TLS in transit and AES-256 at rest — whether it is in transit between services or stored on disk.',
  },
  {
    icon: '🛡️',
    title: 'Role-based access controls',
    body: 'Granular permissions ensure every user — from HR admin to broker — sees only the data their role requires.',
  },
  {
    icon: '📋',
    title: 'Audit logging on sensitive actions',
    body: 'Every access, change, and export of member data is logged with a timestamp and actor, creating a full accountability trail.',
  },
  {
    icon: '⚕️',
    title: 'HIPAA-aligned data handling',
    body: 'Our infrastructure and processes are designed to align with HIPAA safeguards for the storage and handling of protected health information.',
  },
];

export default function SecurityCompliance() {
  return (
    <Section variant="navy">
      <div className={styles.header}>
        <Reveal>
          <p className={`eyebrow-plain ${styles.eyebrow}`}>Security &amp; compliance</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={styles.title}>Enterprise-grade security, built in</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.subtitle}>
            Your HR team and your employees deserve a platform that handles sensitive data with the same
            rigor you expect from your EHR or payroll system.
          </p>
        </Reveal>
      </div>

      <Stagger className={styles.grid}>
        {ITEMS.map((item) => (
          <StaggerItem key={item.title} className={styles.cardWrap}>
            <motion.div
              className={styles.card}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.iconChip}>{item.icon}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
