// src/store/reducers/feedbackReducer.js
const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_FEEDBACKS_START':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'FETCH_FEEDBACKS_SUCCESS':
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case 'FETCH_FEEDBACKS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case 'ADD_FEEDBACK_SUCCESS':
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      case 'DELETE_FEEDBACK_SUCCESS':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        };
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