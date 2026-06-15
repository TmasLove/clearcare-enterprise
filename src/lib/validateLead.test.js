import { describe, it, expect } from 'vitest';
import { validateLead } from './validateLead';
describe('validateLead', () => {
  it('passes a complete valid lead', () => {
    expect(validateLead({ name: 'A B', email: 'a@co.com', company: 'Co', segment: 'tpa' })).toEqual({ ok: true, errors: {} });
  });
  it('requires name, email, company', () => {
    const r = validateLead({ name: '', email: '', company: '' });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBeTruthy();
    expect(r.errors.email).toBeTruthy();
    expect(r.errors.company).toBeTruthy();
  });
  it('rejects malformed email', () => {
    const r = validateLead({ name: 'A', email: 'nope', company: 'Co' });
    expect(r.errors.email).toBeTruthy();
  });
});
