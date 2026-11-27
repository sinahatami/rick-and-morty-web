import { describe, expect, it } from 'vitest';

import { createFilterParser } from './filters';

type Filters = { name?: string; status?: 'Alive' | 'Dead' };

const parse = createFilterParser<Filters>({ name: true, status: ['Alive', 'Dead'] });
const parseQuery = (query: string) => parse(new URLSearchParams(query));

describe('createFilterParser', () => {
  it('returns an empty object for an empty query string', () => {
    expect(parseQuery('')).toEqual({});
  });

  it('accepts any text for free-text filters', () => {
    expect(parseQuery('name=Rick%20Sanchez')).toEqual({ name: 'Rick Sanchez' });
  });

  it('accepts listed values only', () => {
    expect(parseQuery('status=Dead')).toEqual({ status: 'Dead' });
    expect(parseQuery('status=Zombie')).toEqual({});
  });

  it('is case sensitive, because the lists define the canonical spelling', () => {
    expect(parseQuery('status=dead')).toEqual({});
  });

  it('ignores empty values and parameters it does not know', () => {
    expect(parseQuery('name=&status=Alive&page=3&sort=desc')).toEqual({ status: 'Alive' });
  });
});
