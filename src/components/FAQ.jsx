import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from './Section';
import Reveal from './Reveal';
import styles from './FAQ.module.css';

function ChevronIcon({ open }) {
  return (
    <svg
      className={styles.chevron}
      data-open={open}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="5 8 10 13 15 8" />
    </svg>
  );
}

export default function FAQ({ title = 'Frequently asked questions', items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <Section>
      <Reveal>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </Reveal>

      <div className={styles.list} role="list">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const answerId = `faq-answer-${i}`;

          return (
            <div key={i} className={styles.item} role="listitem">
              <button
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <ChevronIcon open={isOpen} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    className={styles.answerWrap}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className={styles.answer}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
