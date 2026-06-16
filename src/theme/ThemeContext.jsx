import { createContext, useContext, useEffect, useState } from 'react';
const ThemeCtx = createContext({ theme: 'light', toggle: () => {} });
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem('cc-theme') : null) || 'light'
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('cc-theme', theme);
    }
  }, [theme]);
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
