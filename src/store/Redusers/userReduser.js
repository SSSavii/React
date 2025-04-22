/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// В src/store/index.js убедитесь, что редьюсер для users правильно определен:

// Начальное состояние для users
const initialUsersState = {
    items: [],
    loading: false,
    error: null
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
  
  // И убедитесь, что он добавлен в rootReducer
  const rootReducer = combineReducers({
    counter: counterReducer,
    feedbacks: feedbacksReducer,
    users: usersReducer
  });