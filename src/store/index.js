// src/store/index.js
import { createStore, combineReducers } from 'redux';

// Начальное состояние для счетчика
const initialCounterState = {
  value: 0
};

// Reducer для счетчика
const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREMENT':
      return { ...state, value: state.value - 1 };
    case 'RESET':
      return { ...state, value: 0 };
    default:
      return state;
  }
};

// Объединяем все reducers
const rootReducer = combineReducers({
  counter: counterReducer
});

// Создаем store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;