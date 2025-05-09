import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../api/postsApi';

// Начальное состояние и редьюсер для счетчика
const initialCounterState = { value: 0 };

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

// Редьюсер для feedbacks (без изменений)
const initialFeedbacksState = {
  items: [],
  loading: false,
  error: null
};

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

// Редьюсер для users (без изменений)
const initialUsersState = {
  items: [],
  loading: false,
  error: null
};

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

// Объединяем редьюсеры, включая reducer RTK Query
const rootReducer = combineReducers({
  counter: counterReducer,
  feedbacks: feedbacksReducer,
  users: usersReducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

// Создаем store с добавлением middleware RTK Query
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;