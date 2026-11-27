#!/usr/bin/env node
// Downloads every character, location and episode from the public API into .cache/api/*.json.
// The static build reads these snapshots instead of calling the API once per page, which keeps
// the build fast and well below the API's rate limit. Snapshots younger than 24 h are reused;
// pass --force to refresh them.
import { mkdir, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API = 'https://rickandmortyapi.com/api';
const OUT_DIR = path.join(process.cwd(), '.cache', 'api');
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const CONCURRENCY = 3;
const MAX_ATTEMPTS = 6;
const RESOURCES = ['character', 'location', 'episode'];
const force = process.argv.includes('--force');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/** GET with retries: honours `Retry-After` on 429 and backs off exponentially on server errors. */
async function fetchJson(url, attempt = 1) {
  let waitMs = Math.min(30_000, 1_000 * 2 ** attempt);

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (response.ok) return await response.json();

    const retryAfter = Number(response.headers.get('retry-after'));
    if (retryAfter > 0) waitMs = retryAfter * 1_000;
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable) throw Object.assign(new Error(`HTTP ${response.status}`), { fatal: true });
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    if (error.fatal || attempt >= MAX_ATTEMPTS) {
      throw new Error(`Could not fetch ${url}: ${error.message}`, { cause: error });
    }
    await sleep(waitMs);
    return fetchJson(url, attempt + 1);
  }
}

/** Runs `task` for every item with at most `limit` running at the same time. */
async function pool(items, limit, task) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: limit }, async () => {
      for (let item = queue.shift(); item !== undefined; item = queue.shift()) await task(item);
    }),
  );
}

async function isFresh(file) {
  try {
    return Date.now() - (await stat(file)).mtimeMs < MAX_AGE_MS;
  } catch {
    return false;
  }
}

await mkdir(OUT_DIR, { recursive: true });

const stale = [];
for (const resource of RESOURCES) {
  if (!force && (await isFresh(path.join(OUT_DIR, `${resource}.json`)))) {
    console.log(`data: ${resource} snapshot is fresh, skipping`);
  } else {
    stale.push(resource);
  }
}

// Page 1 of every resource tells us how many pages there are; the rest is fetched in one pool.
const pages = new Map(stale.map(resource => [resource, []]));
const firstPages = new Map();
for (const resource of stale) {
  const first = await fetchJson(`${API}/${resource}`);
  firstPages.set(resource, first);
  pages.get(resource).push(...first.results);
}

const jobs = stale.flatMap(resource =>
  Array.from({ length: firstPages.get(resource).info.pages - 1 }, (_, index) => ({
    resource,
    url: `${API}/${resource}?page=${index + 2}`,
  })),
);

await pool(jobs, CONCURRENCY, async ({ resource, url }) => {
  pages.get(resource).push(...(await fetchJson(url)).results);
});

for (const resource of stale) {
  const items = pages.get(resource).sort((a, b) => a.id - b.id);
  const expected = firstPages.get(resource).info.count;
  if (items.length !== expected) {
    throw new Error(`${resource}: expected ${expected} items, received ${items.length}`);
  }

  const file = path.join(OUT_DIR, `${resource}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(items));
  await rename(tmp, file);
  console.log(`data: saved ${items.length} ${resource}s`);
}
