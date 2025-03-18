/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/FeedbackList.jsx
import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="feedback-list">
      <h3>Отзывы</h3>
      {feedbacks.length === 0 ? (
        <p>Пока нет отзывов</p>
      ) : (
        <div className="feedback-items">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <h4>{feedback.name}</h4>
              <p>{feedback.email}</p>
              <p>{feedback.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;