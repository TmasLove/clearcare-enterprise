import { describe, it, expect, vi, afterEach } from 'vitest';
import { submitLead } from './leads';

afterEach(() => { vi.unstubAllGlobals(); });

const stubFetch = (impl) => vi.stubGlobal('fetch', vi.fn(impl));

describe('submitLead', () => {
  it('reports delivered on a 2xx', async () => {
    stubFetch(async () => ({ ok: true, status: 201 }));
    expect(await submitLead({ email: 'a@b.co' })).toEqual({ ok: true, delivered: true });
  });

  it('surfaces a 400 so the person can fix it, instead of a fake success', async () => {
    stubFetch(async () => ({ ok: false, status: 400, json: async () => ({ success: false, error: 'Please enter a full phone number, or leave it blank.' }) }));
    expect(await submitLead({ email: 'a@b.co', phone: '1202' })).toEqual({
      ok: false, error: 'Please enter a full phone number, or leave it blank.',
    });
  });

  it('keeps the soft fallback when the API is down', async () => {
    stubFetch(async () => ({ ok: false, status: 502 }));
    expect(await submitLead({ email: 'a@b.co' })).toEqual({ ok: true, delivered: false });
    stubFetch(async () => { throw new TypeError('network'); });
    expect(await submitLead({ email: 'a@b.co' })).toEqual({ ok: true, delivered: false });
  });
});
