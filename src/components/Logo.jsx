const LOGO_SRC = '/Clear Care Dental logo 2026.png';
export default function Logo({ height = 36 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <img src={LOGO_SRC} alt="Clear Care Dental" style={{ height, width: 'auto', display: 'block' }} draggable={false} />
      <span aria-hidden style={{ width: 1, height: height * 0.7, background: 'var(--border-strong)' }} />
      <span style={{ fontWeight: 600, fontSize: height * 0.5, color: '#1488B8', letterSpacing: '.5px' }}>Enterprise</span>
    </span>
  );
}
