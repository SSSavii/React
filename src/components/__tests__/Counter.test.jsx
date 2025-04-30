/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter component', () => {
  test('отображает начальное значение и правильно увеличивает счетчик', () => {
    render(<Counter />);
    const counterText = screen.getByText(/Счётчик:/i);
    expect(counterText).toHaveTextContent('0');
    console.log(counterText);
    const incrementButton = screen.getByText(/Increment/i);

    fireEvent.click(incrementButton);
    expect(screen.getByText(/Счётчик:/i)).toHaveTextContent('2');
  });

  test('отображает кнопку Decrement и уменьшает значение', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);
    const decrementButton = screen.getByText(/Decrement/i);
    fireEvent.click(decrementButton);
    expect(screen.getByText(/Счётчик:/i)).toHaveTextContent('1');
  });
});