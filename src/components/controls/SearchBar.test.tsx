import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('is a labelled text box', () => {
    render(<SearchBar value="" onChange={vi.fn()} placeholder="Filter by name..." />);

    expect(screen.getByRole('textbox', { name: 'Filter by name...' })).toBeInTheDocument();
  });

  it('reports every change', async () => {
    const onChange = vi.fn();

    function Controlled() {
      const [value, setValue] = useState('');
      return (
        <SearchBar
          value={value}
          onChange={next => {
            setValue(next);
            onChange(next);
          }}
        />
      );
    }

    render(<Controlled />);
    await userEvent.type(screen.getByRole('textbox'), 'Rick');

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenLastCalledWith('Rick');
  });

  it('offers a clear button only when there is text', () => {
    const { rerender } = render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();

    rerender(<SearchBar value="Morty" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clears the text with the clear button', () => {
    const onChange = vi.fn();
    render(<SearchBar value="Pickle Rick" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(onChange).toHaveBeenCalledWith('');
  });
});
