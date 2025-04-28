/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/FeedbackList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFeedbacks, removeFeedback, blockFeedback } from '../store/actions';
import { CircularProgress, Alert } from '@mui/material'; // Import MUI components

const FeedbackList = ({ isAdmin = false }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.feedbacks);

  useEffect(() => {
    dispatch(loadFeedbacks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeFeedback(id));
  };

  const handleBlockFeedback = (id) => {
    dispatch(blockFeedback(id));
  };

  // Display loading spinner
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <CircularProgress />
    </div>
  );

  // Display error message
  if (error) return <Alert severity="error">{`Ошибка: ${error}`}</Alert>;

  return (
    <div className="feedback-list">
      <h3>Отзывы</h3>
      {items.length === 0 ? (
        <p>Пока нет отзывов</p>
      ) : (
        <div className="feedback-items">
          {items.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <h4>{feedback.name}</h4>
              <p>{feedback.email}</p>
              <p>{feedback.message}</p>
              {feedback.blocked && <p className="blocked-message">Этот отзыв заблокирован</p>}
              {isAdmin && (
                <div className="admin-actions">
                  <button onClick={() => handleBlockFeedback(feedback.id)}>
                    {feedback.blocked ? 'Разблокировать' : 'Заблокировать'}
                  </button>
                  <button onClick={() => handleDelete(feedback.id)}>Удалить</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;