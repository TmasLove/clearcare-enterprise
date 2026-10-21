import { motion } from 'framer-motion';
// `instant` renders the content visible straight from the prerendered HTML. Use it
// for above-the-fold heroes: a fade-in there starts at opacity 0 and waits for the
// JS bundle, which is what made the hero the late Largest Contentful Paint on phones.
export default function Reveal({ children, delay = 0, y = 24, instant = false }) {
  if (instant) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
