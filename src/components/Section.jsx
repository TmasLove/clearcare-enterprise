import Container from './Container';
export default function Section({ children, variant = 'default', id }) {
  const cls = variant === 'navy' ? 'surface-navy' : '';
  const bg = variant === 'alt' ? 'var(--surface-1)' : undefined;
  return (
    <section id={id} className={cls} style={{ padding: '96px 0', background: bg }}>
      <Container>{children}</Container>
    </section>
  );
}
