const BASE = import.meta.env.VITE_API_BASE || '';

/**
 * payload: { name, email, phone, company, companySize, segment, sourcePage,
 *            sourceAction, message, website, turnstileToken }
 *
 * Returns one of:
 *   { ok: true,  delivered: true }   stored in the Leads CRM
 *   { ok: true,  delivered: false }  API unreachable or down; the form shows
 *                                    the "email us" fallback copy
 *   { ok: false, error }             the server refused this submission (400):
 *                                    a bad phone, a failed CAPTCHA. Show the
 *                                    message and let the person fix it. These
 *                                    used to be swallowed as a soft success,
 *                                    which would lose the lead silently.
 */
export async function submitLead(payload) {
  try {
    const res = await fetch(`${BASE}/leads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true, delivered: true };
    if (res.status === 400) {
      const data = await res.json().catch(() => null);
      return { ok: false, error: data?.error || 'Please check the form and try again.' };
    }
    return { ok: true, delivered: false };
  } catch {
    return { ok: true, delivered: false };
  }
}
