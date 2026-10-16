import { describe, it, expect } from 'vitest';
import tpa from './tpa';
import associations from './associations';
import employers from './employers';
import dso from './dso';
import whiteLabel from './whiteLabel';

const ALL = { tpa, associations, employers, dso, whiteLabel };

describe('segment search titles and descriptions', () => {
  for (const [name, seg] of Object.entries(ALL)) {
    if (!seg.seoTitle && !seg.seoDescription) continue;
    it(`${name}: fits what Google shows`, () => {
      if (seg.seoTitle) expect(seg.seoTitle.length).toBeLessThanOrEqual(70);
      if (seg.seoDescription) expect(seg.seoDescription.length).toBeLessThanOrEqual(155);
    });
    it(`${name}: never sells the program as insurance`, () => {
      const text = `${seg.seoTitle || ''} ${seg.seoDescription || ''}`.toLowerCase();
      expect(text).not.toMatch(/insurance|copay|deductible|claims processing/);
    });
  }

  it('TPA page targets the searches it gets impressions for', () => {
    const page = `${tpa.seoTitle} ${tpa.seoDescription} ${tpa.h1} ${tpa.subhead}`.toLowerCase();
    for (const term of ['dental tpa platform', 'benefits administration software', 'third-party administrators']) {
      expect(page).toContain(term);
    }
  });
});
