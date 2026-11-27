// Server-only: used while the static site is generated. Reads the snapshots written by
// `scripts/fetch-api-data.mjs` (run automatically by `pnpm dev` and `pnpm build`).
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { type Character, type Episode, type Location, type Paginated } from './types';

const SNAPSHOT_DIR = path.join(process.cwd(), '.cache', 'api');
export const PAGE_SIZE = 20;

interface Resources {
  character: Character;
  location: Location;
  episode: Episode;
}

type Snapshot<T> = { items: T[]; byId: Map<number, T> };

const snapshots = new Map<keyof Resources, Promise<Snapshot<never>>>();

function loadSnapshot<K extends keyof Resources>(resource: K): Promise<Snapshot<Resources[K]>> {
  let pending = snapshots.get(resource);

  if (!pending) {
    pending = readFile(path.join(SNAPSHOT_DIR, `${resource}.json`), 'utf8').then(
      text => {
        const items = JSON.parse(text) as Resources[K][];
        return { items, byId: new Map(items.map(item => [item.id, item])) } as Snapshot<never>;
      },
      (error: Error) => {
        throw new Error(
          `API snapshot for "${resource}" not found. Run \`pnpm data\` first (${error.message}).`,
        );
      },
    );
    snapshots.set(resource, pending);
  }

  return pending as Promise<Snapshot<Resources[K]>>;
}

/** The first page of a list, shaped like an API response, used to pre-render the list pages. */
export function firstPage<T>(items: T[]): Paginated<T> {
  const pages = Math.ceil(items.length / PAGE_SIZE);
  return {
    info: { count: items.length, pages, next: pages > 1 ? 'page-2' : null, prev: null },
    results: items.slice(0, PAGE_SIZE),
  };
}

export const dataset = {
  async characters() {
    return (await loadSnapshot('character')).items;
  },
  async locations() {
    return (await loadSnapshot('location')).items;
  },
  async episodes() {
    return (await loadSnapshot('episode')).items;
  },
  async character(id: number) {
    return (await loadSnapshot('character')).byId.get(id);
  },
  async location(id: number) {
    return (await loadSnapshot('location')).byId.get(id);
  },
  async episode(id: number) {
    return (await loadSnapshot('episode')).byId.get(id);
  },
  async charactersByIds(ids: number[]) {
    const { byId } = await loadSnapshot('character');
    return ids.flatMap(id => byId.get(id) ?? []);
  },
  async episodesByIds(ids: number[]) {
    const { byId } = await loadSnapshot('episode');
    return ids.flatMap(id => byId.get(id) ?? []);
  },
};
