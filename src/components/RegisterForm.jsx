/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/RegisterForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterForm = ({ onSubmit, onSwitch }) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
      email: ''
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(3, 'Минимум 3 символа')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
      email: Yup.string()
        .email('Неверный формат email')
        .required('Обязательное поле')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <div className="auth-form block">
      <h3>Регистрация</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Логин:</label><br />
          <input
            type="text"
            name="login"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
          />
          {formik.touched.login && formik.errors.login && (
            <div className="error">{formik.errors.login}</div>
          )}
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Пароль:</label><br />
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <label>Подтвердите пароль:</label><br />
          <input
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Зарегистрироваться</button>
          <button type="button" onClick={onSwitch}>Уже есть аккаунт</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;