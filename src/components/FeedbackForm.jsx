/* eslint-disable no-unused-vars */
// src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createFeedback } from '../store/actions';
import { useLoginState } from '../hooks/useLoginState';

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { userRole } = useLoginState();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Обязательное поле'),
      email: Yup.string()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}$/, 'Неверный формат email')
        .required('Обязательное поле'),
      message: Yup.string()
        .required('Обязательное поле')
        .min(10, 'Минимум 10 символов')
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createFeedback(values));
      resetForm();
      setSubmitted(false);
    }
  });

  const handleInputChange = () => {
    setSubmitted(true);
  };
  
  // Пользователи с ролью 'user' могут только отправлять отзывы
  if (userRole === 'user') {
    return (
      <div className="feedback-form">
        <h3>Обратная связь</h3>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Имя:</label><br />
            <input
              type="text"
              name="name"
              onChange={(e) => { formik.handleChange(e); handleInputChange(); }}
              value={formik.values.name}
            />
            {submitted && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              onChange={(e) => { formik.handleChange(e); handleInputChange(); }}
              value={formik.values.email}
            />
            {submitted && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label>Сообщение:</label><br />
            <textarea
              name="message"
              onChange={(e) => { formik.handleChange(e); handleInputChange(); }}
              value={formik.values.message}
            />
            {submitted && formik.errors.message && (
              <div className="error">{formik.errors.message}</div>
            )}
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    );
  }
  
  // Администраторы могут отправлять отзывы и видеть дополнительные действия
  return (
    <div className="feedback-form">
      <h3>Обратная связь</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Имя:</label><br />
          <input
            type="text"
            name="name"
            onChange={(e) => { formik.handleChange(e); handleInputChange(); }}
            value={formik.values.name}
          />
          {submitted && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            onChange={(e) => { formik.handleChange(e); handleInputChange(); }}
            value={formik.values.email}
          />
          {submitted && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Сообщение:</label><br />
          <textarea
            name="message"
            onChange={(e) => { formik.handleChange(e); handleInputChange(); }}
            value={formik.values.message}
          />
          {submitted && formik.errors.message && (
            <div className="error">{formik.errors.message}</div>
          )}
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default FeedbackForm;