import Section from './Section';
import Reveal from './Reveal';

const STATS = [
  { label: 'Members covered', value: '—' },
  { label: 'Claims processed', value: '—' },
  { label: 'Avg. savings per member', value: '—' },
];

const LOGO_PLACEHOLDERS = [1, 2, 3, 4, 5];

/**
 * Trust scaffold — honest placeholder content.
 * Each slot is marked with a TODO(content) comment for real data from CEO.
 */
export default function ProofSlots() {
  return (
    <>
      {/* Stats band */}
      <Section variant="alt">
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {STATS.map((s) => (
              <div key={s.label}>
                {/* TODO(content): replace with real figure from CEO */}
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--sky)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Logo strip */}
      <Section>
        <Reveal>
          <p style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: '1.5rem',
          }}>
            {/* TODO(content): replace with real figure from CEO */}
            Trusted by partners across the country
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {LOGO_PLACEHOLDERS.map((n) => (
              /* TODO(content): replace with real figure from CEO */
              <div
                key={n}
                style={{
                  width: 120,
                  height: 40,
                  borderRadius: 8,
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--border-subtle)',
                }}
              />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Testimonial */}
      <Section variant="alt">
        <Reveal>
          <div style={{
            maxWidth: 640,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            {/* TODO(content): replace with real figure from CEO */}
            <blockquote style={{
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}>
              "Clear Care Enterprise made it simple to offer our members a dental benefit they actually
              value — without any of the complexity we expected."
            </blockquote>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              — Partner, Member Association {/* TODO(content): replace with real figure from CEO */}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
