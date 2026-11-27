import { describe, expect, it } from 'vitest';

import { firstPage, PAGE_SIZE } from './dataset';

const items = (count: number) => Array.from({ length: count }, (_, index) => ({ id: index + 1 }));

describe('firstPage', () => {
  it('shapes the first slice like an API response', () => {
    const page = firstPage(items(45));

    expect(page.results).toHaveLength(PAGE_SIZE);
    expect(page.results[0]).toEqual({ id: 1 });
    expect(page.info).toMatchObject({ count: 45, pages: 3, prev: null });
    expect(page.info.next).not.toBeNull();
  });

  it('has no next page when everything fits on one', () => {
    const page = firstPage(items(5));

    expect(page.results).toHaveLength(5);
    expect(page.info).toMatchObject({ count: 5, pages: 1, next: null });
  });

  it('copes with an empty list', () => {
    expect(firstPage([]).info).toMatchObject({ count: 0, pages: 0, next: null });
  });
});
