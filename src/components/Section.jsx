import Container from './Container';
import styles from './Section.module.css';

export default function Section({ children, variant = 'default', id }) {
  const navy = variant === 'navy' ? 'surface-navy' : '';
  const alt = variant === 'alt' ? styles.alt : '';
  return (
    <section id={id} className={`${styles.section} ${navy} ${alt}`.trim()}>
      <Container>{children}</Container>
    </section>
  );
}
