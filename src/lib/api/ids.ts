/** Extracts the numeric id from a resource URL ("https://…/api/episode/12" -> 12). */
export function extractIdFromUrl(url?: string): number | null {
  if (!url) return null;
  const id = Number.parseInt(url.split('/').filter(Boolean).pop() ?? '', 10);
  return Number.isNaN(id) ? null : id;
}

/** Ids of every resource URL in the list, skipping malformed entries. */
export function extractIds(urls: string[]): number[] {
  return urls.flatMap(url => extractIdFromUrl(url) ?? []);
}
