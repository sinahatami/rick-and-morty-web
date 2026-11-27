import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it.each(['Alive', 'Dead', 'unknown'] as const)('shows the status "%s" as text', status => {
    render(<StatusBadge status={status} />);

    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it('only pulses for living characters', () => {
    const { container, rerender } = render(<StatusBadge status="Alive" />);
    expect(container.querySelector('.animate-ping')).toBeInTheDocument();

    rerender(<StatusBadge status="Dead" />);
    expect(container.querySelector('.animate-ping')).not.toBeInTheDocument();
  });
});
