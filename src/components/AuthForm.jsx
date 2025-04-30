/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ onSubmit, onSwitch, onResetPassword }) => {
  const [authError, setAuthError] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

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
        // Проверяем, является ли пользователь заблокированным
        if (values.login === 'user2' || values.login === 'user') { // В реальном приложении это должно проверяться через API
          setAuthError('Ваш аккаунт заблокирован. Обратитесь к администратору.');
        } else {
          setAuthError('Неверный логин или пароль');
        }
      }
    }
  });

  const handleResetClick = () => {
    setShowResetPassword(true);
    onResetPassword();
  };

  const handleBackToLogin = () => {
    setShowResetPassword(false);
    setResetMessage('');
  };

  if (showResetPassword) {
    return (
      <div className="auth-form block">
        <h3>Сброс пароля</h3>
        <p>Введите новый пароль для пользователя {formik.values.login}</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          onResetPassword(formik.values.login);
          setResetMessage('Пароль успешно изменен!');
          setTimeout(() => {
            setShowResetPassword(false);
          }, 2000);
        }}>
          <div>
            <label>Новый пароль:</label><br />
            <input
              type="password"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword || ''}
              required
            />
          </div>
          {resetMessage && <div className="success">{resetMessage}</div>}
          <div style={{ marginTop: '10px' }}>
            <button type="submit">Сохранить новый пароль</button>
            <button 
              type="button" 
              onClick={handleBackToLogin}
            >
              Назад к входу
            </button>
          </div>
        </form>
      </div>
    );
  }

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
              setAuthError('');
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
              setAuthError('');
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
          <button 
            type="button"
            onClick={onSwitch}
          >
            Регистрация
          </button>
          <button 
            type="button"
            onClick={handleResetClick}
            style={{ marginLeft: '10px' }}
          >
            Забыли пароль?
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;