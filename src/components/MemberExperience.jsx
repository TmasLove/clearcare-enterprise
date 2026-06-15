import { motion } from 'framer-motion';
import Section from './Section';
import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';
import styles from './MemberExperience.module.css';

const ITEMS = [
  {
    icon: '💲',
    title: 'Price transparency',
    body: 'Members see real procedure costs up front — no guesswork, no fine print surprises at checkout.',
  },
  {
    icon: '🧾',
    title: 'No surprise bills',
    body: 'Clear, predictable pricing on every visit so members always know exactly what they owe.',
  },
  {
    icon: '📱',
    title: 'App-first',
    body: 'Manage coverage, find a dentist, and review benefits directly from the Clear Care mobile app.',
  },
  {
    icon: '🎧',
    title: 'Concierge support',
    body: 'Real people ready to help — from the moment someone enrolls through the day of their appointment.',
  },
];

export default function MemberExperience() {
  return (
    <Section variant="alt">
      <div className={styles.header}>
        <Reveal>
          <p className={`eyebrow-plain ${styles.eyebrow}`}>Member experience</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={styles.title}>A member experience people actually use</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.subtitle}>
            Benefits only matter when members engage with them. Clear Care is designed to remove every
            friction point between enrollment and the dental chair.
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
