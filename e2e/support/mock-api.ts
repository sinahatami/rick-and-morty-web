import { readFileSync } from 'node:fs';

import { type Page, type Route } from '@playwright/test';

type Entity = { id: number; name: string } & Record<string, unknown>;

const PAGE_SIZE = 20;
const API = 'https://rickandmortyapi.com/api';

// A 1x1 transparent PNG, served for every character avatar.
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

function load(file: string): Entity[] {
  const url = new URL(`../fixtures/${file}`, import.meta.url);
  return JSON.parse(readFileSync(url, 'utf8')) as Entity[];
}

const DATA = {
  character: load('characters.json'),
  location: load('locations.json'),
  episode: load('episodes.json'),
};

type Resource = keyof typeof DATA;

const includes = (value: unknown, needle: string) =>
  String(value ?? '')
    .toLowerCase()
    .includes(needle.toLowerCase());
const equals = (value: unknown, expected: string) =>
  String(value ?? '').toLowerCase() === expected.toLowerCase();

/** Which query parameters the real API supports per resource, and how each one matches. */
const FILTERS: Record<Resource, Record<string, (value: unknown, needle: string) => boolean>> = {
  character: {
    name: includes,
    status: equals,
    species: equals,
    gender: equals,
    type: includes,
  },
  location: { name: includes, type: includes, dimension: includes },
  episode: { name: includes, episode: includes },
};

function json(route: Route, body: unknown, status = 200) {
  return route.fulfill({
    status,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify(body),
  });
}

function handle(route: Route) {
  const url = new URL(route.request().url());
  const [resource, rest] = url.pathname.replace('/api/', '').split('/') as [Resource, string?];

  if (!(resource in DATA)) return json(route, { error: 'There is nothing here' }, 404);

  if (rest === 'avatar') {
    return route.fulfill({ status: 200, contentType: 'image/png', body: PIXEL });
  }

  const items = DATA[resource];

  // /character/1 -> object, /character/1,2,3 -> array
  if (rest) {
    const ids = rest.split(',').map(Number);
    const found = ids.map(id => items.find(item => item.id === id)).filter(Boolean);
    if (found.length === 0) return json(route, { error: 'Character not found' }, 404);
    return json(route, ids.length === 1 ? found[0] : found);
  }

  // /character?page=2&name=rick&status=alive
  const filtered = items.filter(item =>
    Object.entries(FILTERS[resource]).every(([param, match]) => {
      const needle = url.searchParams.get(param);
      return !needle || match(item[param], needle);
    }),
  );
  if (filtered.length === 0) return json(route, { error: 'There is nothing here' }, 404);

  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const page = Number(url.searchParams.get('page') ?? 1);
  const pageUrl = (n: number) => {
    const next = new URL(`${API}/${resource}`);
    url.searchParams.forEach((value, key) => next.searchParams.set(key, value));
    next.searchParams.set('page', String(n));
    return next.toString();
  };

  return json(route, {
    info: {
      count: filtered.length,
      pages,
      next: page < pages ? pageUrl(page + 1) : null,
      prev: page > 1 ? pageUrl(page - 1) : null,
    },
    results: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  });
}

/**
 * Serves the public Rick and Morty API from small local fixtures so that tests are fast,
 * deterministic and offline. Returns the list of requested API URLs for assertions.
 */
export async function mockApi(page: Page): Promise<string[]> {
  const requests: string[] = [];

  await page.route(`${API}/**`, route => {
    requests.push(route.request().url());
    return handle(route);
  });

  return requests;
}
