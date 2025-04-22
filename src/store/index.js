// src/store/index.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// Начальное состояние для счетчика
const initialCounterState = {
  value: 0
};

// Начальное состояние для feedbacks
const initialFeedbacksState = {
  items: [],
  loading: false,
  error: null
};

// Начальное состояние для users
const initialUsersState = {
  items: [],
  loading: false,
  error: null
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

// Reducer для feedbacks
const feedbacksReducer = (state = initialFeedbacksState, action) => {
  switch (action.type) {
    case 'FETCH_FEEDBACKS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_FEEDBACKS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_FEEDBACKS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_FEEDBACK_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
    case 'DELETE_FEEDBACK_SUCCESS':
      return { ...state, items: state.items.filter(feedback => feedback.id !== action.payload) };
    case 'TOGGLE_FEEDBACK_BLOCK':
      return { 
        ...state, 
        items: state.items.map(item => 
          item.id === action.payload 
            ? { ...item, blocked: !item.blocked } 
            : item
        ) 
      };
    default:
      return state;
  }
};

// Reducer для users
const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'TOGGLE_USER_BLOCK':
      return { 
        ...state, 
        items: state.items.map(user => 
          user.id === action.payload 
            ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
            : user
        ) 
      };
    case 'DELETE_USER':
      return { ...state, items: state.items.filter(user => user.id !== action.payload) };
    default:
      return state;
  }
};

// Объединяем все reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  feedbacks: feedbacksReducer,
  users: usersReducer
});

// Создаем store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;