import { render, screen } from '@testing-library/react';
import { MapPin } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { Card, CardLink } from './Card';
import { CardInfoRow } from './CardInfoRow';

describe('Card', () => {
  it('contains exactly one primary link, named after the item', () => {
    render(
      <Card>
        <h2>
          <CardLink href="/characters/1/">Rick Sanchez</CardLink>
        </h2>
      </Card>,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName('Rick Sanchez');
    // next/link adds the trailing slash itself when the site is built with `trailingSlash`.
    expect(links[0]?.getAttribute('href')).toMatch(/^\/characters\/1\/?$/);
  });

  it('is an article, so the list of cards is easy to navigate', () => {
    render(
      <Card>
        <CardLink href="/x/">X</CardLink>
      </Card>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('can override the theme of its section', () => {
    render(<Card theme="rick">content</Card>);

    expect(screen.getByRole('article')).toHaveAttribute('data-theme', 'rick');
  });

  it('lets secondary links live inside without nesting anchors', () => {
    render(
      <Card>
        <CardLink href="/characters/1/">Rick Sanchez</CardLink>
        <CardInfoRow icon={MapPin} label="Origin" value="Earth (C-137)" href="/locations/1/" />
      </Card>,
    );

    const [primary, secondary] = screen.getAllByRole('link');
    expect(primary?.contains(secondary ?? null)).toBe(false);
    expect(secondary?.getAttribute('href')).toMatch(/^\/locations\/1\/?$/);
  });
});

describe('CardInfoRow', () => {
  it('is plain text without a link', () => {
    render(<CardInfoRow icon={MapPin} label="Origin" value="unknown" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });
});
