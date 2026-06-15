import { motion } from 'framer-motion';
import Section from './Section';
import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';
import styles from './FeatureGrid.module.css';

export default function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items = [],
  columns = 3,
  variant,
}) {
  const cols = Math.min(Math.max(columns, 1), 4);

  return (
    <Section variant={variant}>
      <div className={styles.section}>
        {eyebrow && (
          <Reveal>
            <p className={`eyebrow-plain ${styles.eyebrow}`}>{eyebrow}</p>
          </Reveal>
        )}
        {title && (
          <Reveal delay={0.05}>
            <h2 className={styles.title}>{title}</h2>
          </Reveal>
        )}
        {subtitle && (
          <Reveal delay={0.1}>
            <p className={styles.subtitle}>{subtitle}</p>
          </Reveal>
        )}

        <Stagger className={`${styles.grid} ${styles[`cols${cols}`]}`}>
          {items.map((item, i) => (
            <StaggerItem key={i} className={styles.cardWrap}>
              <motion.div className={styles.card} whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                {item.icon && <span className={styles.iconChip}>{item.icon}</span>}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
