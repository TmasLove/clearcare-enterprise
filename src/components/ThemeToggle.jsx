import { useTheme } from '../theme/ThemeContext';
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      style={{ background: 'none', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'inherit' }}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
