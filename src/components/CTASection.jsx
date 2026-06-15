import Section from './Section';
import Reveal from './Reveal';
import Button from './Button';

/**
 * Reusable navy CTA band — "Book a demo" call to action.
 * `segment` prop is reserved for future deep-link (/demo?segment=…).
 */
export default function CTASection({ title, sub, segment }) {
  const demoHref = segment ? `/demo?segment=${segment}` : '/demo';
  return (
    <Section variant="navy">
      <Reveal>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          {title && (
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
              {title}
            </h2>
          )}
          {sub && (
            <p style={{ fontSize: '1.125rem', color: '#CBD5E1', marginBottom: '2rem' }}>
              {sub}
            </p>
          )}
          <Button to={demoHref}>Book a demo</Button>
        </div>
      </Reveal>
    </Section>
  );
}
