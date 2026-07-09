import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

jest.mock('~/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'portal',
    styles: { primary: '#00B5CC' },
  }),
}));

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Submit</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onClickMock = jest.fn();
    render(
      <Button disabled onClick={onClickMock}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('shows loading spinner and disables button when isLoading is true', () => {
    render(<Button isLoading>Loading State</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // The loader icon has aria-hidden="true", but we can check if it exists via class
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });
});
