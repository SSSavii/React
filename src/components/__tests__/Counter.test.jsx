/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter component', () => {
  test('отображает начальное значение и правильно увеличивает счетчик', () => {
    render(<Counter />);
    // Проверяем, что начальное значение равно 0
    const counterText = screen.getByText(/Счётчик:/i);
    expect(counterText).toHaveTextContent('0');

    // Находим кнопку Increment
    const incrementButton = screen.getByText(/Increment/i);
    // При клике функция increment вызывает дважды setCount, поэтому значение должно увеличиться на 2
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Счётчик:/i)).toHaveTextContent('2');
  });

  test('отображает кнопку Decrement и уменьшает значение', () => {
    render(<Counter />);
    // Увеличим сначала значение
    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);
    // Теперь нажмем Decrement – так как реализация уменьшает значение на 1,
    // ожидаем значение 1 (так как 2 - 1 = 1)
    const decrementButton = screen.getByText(/Decrement/i);
    fireEvent.click(decrementButton);
    expect(screen.getByText(/Счётчик:/i)).toHaveTextContent('1');
  });
});