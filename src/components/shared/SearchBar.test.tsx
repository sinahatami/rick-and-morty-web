import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { debug } from 'jest-preview';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with default placeholder', () => {
    const onChangeMock = jest.fn();
    render(<SearchBar value="" onChange={onChangeMock} />);

    // THIS LINE TELLS JEST TO SEND THE HTML TO THE DASHBOARD!
    debug();

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const onChangeMock = jest.fn();

    // Wrapper to manage controlled state
    const Wrapper = () => {
      const [val, setVal] = React.useState('');
      return (
        <SearchBar
          value={val}
          onChange={v => {
            setVal(v);
            onChangeMock(v);
          }}
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Rick');

    expect(onChangeMock).toHaveBeenCalledTimes(4);
    expect(onChangeMock).toHaveBeenLastCalledWith('Rick');
  });

  it('shows clear button only when value is not empty', () => {
    const onChangeMock = jest.fn();
    const { rerender } = render(<SearchBar value="" onChange={onChangeMock} />);

    // Clear button should not be present
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // Rerender with a value
    rerender(<SearchBar value="Morty" onChange={onChangeMock} />);

    // Clear button should now be present
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears the input when the clear button is clicked', () => {
    const onChangeMock = jest.fn();
    render(<SearchBar value="Pickle Rick" onChange={onChangeMock} />);

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(onChangeMock).toHaveBeenCalledWith('');
  });
});
