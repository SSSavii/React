/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ onSubmit }) => {
  const [authError, setAuthError] = useState('');

  const formik = useFormik({
    initialValues: {
      login: localStorage.getItem('savedLogin') || '',
      password: ''
    },
    validationSchema: Yup.object({
      login: Yup.string().required('Обязательное поле'),
      password: Yup.string().required('Обязательное поле')
    }),
    onSubmit: async (values) => {
      const success = await onSubmit(values);
      if (!success) {
        setAuthError('Неверный логин или пароль');
      }
    }
  });

  return (
    <div className="auth-form block">
      <h3>Форма входа</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Логин:</label><br />
          <input
            type="text"
            name="login"
            onChange={(e) => {
              setAuthError(''); // Очищаем ошибку при изменении полей
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.login}
          />
          {formik.touched.login && formik.errors.login && (
            <div className="error">{formik.errors.login}</div>
          )}
        </div>
        <div>
          <label>Пароль:</label><br />
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setAuthError(''); // Очищаем ошибку при изменении полей
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        {authError && <div className="error">{authError}</div>}
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Войти</button>
          <button 
            type="reset" 
            onClick={() => {
              formik.handleReset();
              setAuthError('');
            }}
          >
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;