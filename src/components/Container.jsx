export default function Container({ children, style }) {
  return <div style={{ width: '100%', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>;
}
