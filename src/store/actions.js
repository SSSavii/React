/* eslint-disable no-unused-vars */
// src/store/actions.js
import {
  fetchFeedbacks,
  addFeedback,
  deleteFeedback,
  updateUserProfile,
  blockFeedbackApi
} from '../api/api';

// Feedback actions
export const loadFeedbacks = () => async (dispatch) => {
  dispatch({ type: 'FETCH_FEEDBACKS_START' });
  try {
    const feedbacks = await fetchFeedbacks();
    dispatch({ type: 'FETCH_FEEDBACKS_SUCCESS', payload: feedbacks });
  } catch (error) {
    dispatch({ type: 'FETCH_FEEDBACKS_FAILURE', payload: error.message });
  }
};

export const createFeedback = (feedback) => async (dispatch) => {
  try {
    const newFeedback = await addFeedback(feedback);
    dispatch({ type: 'ADD_FEEDBACK_SUCCESS', payload: newFeedback });
  } catch (error) {
    console.error('Error adding feedback:', error);
  }
};

export const removeFeedback = (id) => async (dispatch) => {
  try {
    await deleteFeedback(id);
    dispatch({ type: 'DELETE_FEEDBACK_SUCCESS', payload: id });
  } catch (error) {
    console.error('Error deleting feedback:', error);
  }
};

export const blockFeedback = (id) => async (dispatch) => {
  try {
    // В реальном приложении здесь был бы запрос к API
    // const updatedFeedback = await blockFeedbackApi(id);
    
    // Для демонстрации просто отправляем действие в редьюсер
    dispatch({ type: 'TOGGLE_FEEDBACK_BLOCK', payload: id });
  } catch (error) {
    console.error('Error blocking feedback:', error);
  }
};

// User actions
export const updateProfile = (userId, userData) => async (dispatch) => {
  try {
    const updatedUser = await updateUserProfile(userId, userData);
    // Здесь можно добавить логику для обновления состояния пользователя
    console.log('User updated:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Добавим действия для пользователей
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_START' });
  try {
    // В реальном приложении здесь был бы запрос к API
    // Для демонстрации используем моковые данные
    const users = [
      { id: 1, username: 'admin', role: 'admin', email: 'admin@example.com', status: 'active' },
      { id: 2, username: 'user1', role: 'user', email: 'user1@example.com', status: 'active' },
      { id: 3, username: 'user2', role: 'user', email: 'user2@example.com', status: 'blocked' },
    ];
    
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

export const toggleUserBlock = (userId) => async (dispatch) => {
  // В реальном приложении здесь был бы запрос к API
  dispatch({ type: 'TOGGLE_USER_BLOCK', payload: userId });
};

export const deleteUser = (userId) => async (dispatch) => {
  // В реальном приложении здесь был бы запрос к API
  dispatch({ type: 'DELETE_USER', payload: userId });
};