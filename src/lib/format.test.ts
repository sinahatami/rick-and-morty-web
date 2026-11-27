import { describe, expect, it } from 'vitest';

import { formatDate } from './format';

describe('formatDate', () => {
  it('formats the air dates of the API ("December 2, 2013")', () => {
    expect(formatDate('December 2, 2013')).toBe('Dec 2, 2013');
  });

  it('formats ISO timestamps in UTC, whatever the time zone of the machine', () => {
    expect(formatDate('2017-11-10T12:42:04.162Z')).toBe('Nov 10, 2017');
    expect(formatDate('2017-11-30T23:59:59.000Z')).toBe('Nov 30, 2017');
  });

  it('has a fallback for missing and unparseable dates', () => {
    expect(formatDate(undefined)).toBe('Unknown date');
    expect(formatDate('')).toBe('Unknown date');
    expect(formatDate('not a date')).toBe('not a date');
  });
});
