import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('shows the title and the description', () => {
    render(<EmptyState title="No results" description="Try adjusting your filters" />);

    expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('announces itself politely to screen readers', () => {
    render(<EmptyState title="No results" description="Nothing here" />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('has no button unless there is an action', () => {
    render(<EmptyState title="Empty" description="Nothing here" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('runs the action when its button is pressed', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="Empty"
        description="Nothing here"
        actionLabel="Reset"
        onAction={onAction}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('defaults the button label to "Clear All Filters"', () => {
    render(<EmptyState title="Empty" description="Nothing here" onAction={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Clear All Filters' })).toBeInTheDocument();
  });

  it('has an error variant', () => {
    render(<EmptyState isError title="Transmission Failed" description="Network error" />);

    expect(screen.getByRole('status').className).toContain('border-red-200');
  });
});
