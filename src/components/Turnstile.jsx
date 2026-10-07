import { useEffect, useRef } from 'react';

// Cloudflare Turnstile, the CAPTCHA on the lead forms. Renders nothing until
// VITE_TURNSTILE_SITE_KEY is set at build time, so the form works exactly as
// before until the key exists. The site key is public by design; the secret
// lives only on the backend (TURNSTILE_SECRET_KEY), which does the real check.
//
// Most visitors never see a puzzle: Cloudflare decides in the background and
// hands back a token. onToken(null) fires when the token expires or errors so
// the form can block submit until a fresh one arrives.

export const TURNSTILE_SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY || '').trim();
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise = null;
function loadScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.turnstile);
      s.onerror = () => { scriptPromise = null; reject(new Error('turnstile failed to load')); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function Turnstile({ onToken, className }) {
  const box = useRef(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    let widgetId = null;
    let cancelled = false;
    loadScript()
      .then((ts) => {
        if (cancelled || !box.current) return;
        widgetId = ts.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'auto',
          callback: (token) => cb.current?.(token),
          'expired-callback': () => cb.current?.(null),
          'error-callback': () => cb.current?.(null),
        });
      })
      .catch(() => cb.current?.(null));
    return () => {
      cancelled = true;
      if (widgetId !== null && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={box} className={className} />;
}
