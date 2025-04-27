/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  test('отображает текст кнопки', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });

  test('вызывает функцию при клике', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('отображает кнопку как disabled', () => {
    render(<Button text="Click me" disabled />);
    const button = screen.getByText(/Click me/i);
    expect(button).toBeDisabled();
  });
});