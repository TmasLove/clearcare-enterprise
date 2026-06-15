const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateLead(d = {}) {
  const errors = {};
  if (!d.name || !d.name.trim()) errors.name = 'Name is required';
  if (!d.email || !EMAIL.test(d.email)) errors.email = 'A valid work email is required';
  if (!d.company || !d.company.trim()) errors.company = 'Company is required';
  return { ok: Object.keys(errors).length === 0, errors };
}
