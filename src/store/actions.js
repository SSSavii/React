/* eslint-disable no-unused-vars */
import {
    fetchFeedbacks,
    addFeedback,
    deleteFeedback,
    updateUserProfile
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