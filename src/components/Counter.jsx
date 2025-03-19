/* eslint-disable no-unused-vars */
// src/components/Counter.jsx
/*import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <h3>Redux Counter Example</h3>
      <p>Current Count: {count}</p>
      <div className="counter-buttons">
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;*/
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev=> prev + 1);
    setCount(prev=> prev + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Счётчик: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;