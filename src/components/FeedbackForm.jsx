/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FeedbackForm = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Обязательное поле'),
      email: Yup.string()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}$/, 'Неверный формат email')
        .required('Обязательное поле'),
      message: Yup.string()
        .required('Обязательное поле')
        .min(10, 'Минимум 10 символов')
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    }
  });

  const handleInputChange = () => {
    setSubmitted(true);
  };
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