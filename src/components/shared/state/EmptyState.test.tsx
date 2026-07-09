import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './EmptyState';

jest.mock('~/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'portal',
    styles: { primary: '#00B5CC', lightBg: 'bg-blue-50', lightBorder: 'border-blue-200' },
  }),
}));

describe('EmptyState Component', () => {
  it('renders title and description correctly', () => {
    render(
      <EmptyState
        title="No Results Found"
        description="Try adjusting your filters"
        theme="portal"
        onClearFilters={jest.fn()}
      />
    );

    expect(screen.getByText('No Results Found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('renders clear button if onClearFilters is provided and showClearButton is true', () => {
    const onClearMock = jest.fn();
    render(
      <EmptyState
        title="Empty"
        description="Nothing here"
        onClearFilters={onClearMock}
        buttonText="Reset Filters"
        theme="portal"
      />
    );

    const button = screen.getByRole('button', { name: 'Reset Filters' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClearMock).toHaveBeenCalledTimes(1);
  });

  it('does not render clear button if showClearButton is false', () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here"
        onClearFilters={jest.fn()}
        showClearButton={false}
        theme="portal"
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
