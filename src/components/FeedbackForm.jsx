/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/FeedbackForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FeedbackForm = ({ onSubmit }) => {
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
        .email('Неверный формат email')
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

  return (
    <div className="feedback-form">
      <h3>Обратная связь</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Имя:</label><br />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Сообщение:</label><br />
          <textarea
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          {formik.errors.message && (
            <div className="error">{formik.errors.message}</div>
          )}
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default FeedbackForm;