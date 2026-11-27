/**
 * "December 2, 2013" or "2017-11-04T18:48:46.250Z" -> "Dec 2, 2013".
 * Always formatted in UTC, so the static HTML and the browser agree whatever the time zone.
 */
export function formatDate(date?: string): string {
  if (!date) return 'Unknown date';

  const parsed = new Date(date.includes('T') ? date : `${date} UTC`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
