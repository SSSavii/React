/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/FeedbackList.jsx
import React from 'react';
import {
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
  useToggleFeedbackBlockMutation,
} from '../store/apiSlice';

const FeedbackList = ({ isAdmin = false }) => {
  const { data: feedbacks = [], isLoading, isError, error } = useGetFeedbacksQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [toggleFeedbackBlock] = useToggleFeedbackBlockMutation();

  if (isLoading) return <p>Загрузка отзывов...</p>;
  if (isError) return <p>Ошибка загрузки: {error?.message}</p>;

  return (
    <div className="feedback-list">
      <h3>Отзывы</h3>
      {feedbacks.length === 0 ? (
        <p>Пока нет отзывов</p>
      ) : (
        <div className="feedback-items">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <h4>{feedback.name}</h4>
              <p>{feedback.email}</p>
              <p>{feedback.message}</p>
              {feedback.blocked && <p className="blocked-message">Этот отзыв заблокирован</p>}
              {isAdmin && (
                <div className="admin-actions">
                  <button
                    onClick={() => toggleFeedbackBlock(feedback.id)}
                  >
                    {feedback.blocked ? 'Разблокировать' : 'Заблокировать'}
                  </button>
                  <button onClick={() => deleteFeedback(feedback.id)}>Удалить</button>
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