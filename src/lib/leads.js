const BASE = import.meta.env.VITE_API_BASE || '';
export async function submitLead(payload) {
  // payload: { name, email, phone, company, companySize, segment, sourcePage, sourceAction, message }
  try {
    const res = await fetch(`${BASE}/leads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true, delivered: true };
    // Endpoint not live yet (Plan 2) → soft success, flag undelivered for UX copy.
    return { ok: true, delivered: false };
  } catch {
    return { ok: true, delivered: false };
  }
}
