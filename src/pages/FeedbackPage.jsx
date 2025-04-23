/* eslint-disable no-unused-vars */
// src/pages/FeedbackPage.jsx
import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const FeedbackPage = () => {
  return (
    <div>
      <h2>Обратная связь</h2>
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
};

export default FeedbackPage;