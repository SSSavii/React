/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/FeedbackList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFeedbacks, removeFeedback } from '../store/actions';

const FeedbackList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.feedbacks);

  useEffect(() => {
    dispatch(loadFeedbacks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeFeedback(id));
  };

  if (loading) return <p>Загрузка отзывов...</p>;
  if (error) return <p>Ошибка: {error}</p>;

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
              <button onClick={() => handleDelete(feedback.id)}>Удалить</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;