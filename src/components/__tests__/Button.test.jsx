/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button component', () => {
  it('отображает текст кнопки', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });

  it('вызывает функцию при клике', () => {
    const handleClick = vi.fn(); // используйте vi.fn() вместо jest.fn()
    render(<Button text="Click me" onClick={handleClick} />);
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('отображает кнопку как disabled', () => {
    render(<Button text="Click me" disabled />);
    const button = screen.getByText(/Click me/i);
    expect(button).toBeDisabled();
  });
});