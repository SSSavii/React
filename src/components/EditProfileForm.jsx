/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../store/actions';

const EditProfileForm = ({ user, onCancel }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      login: user.login,
      email: user.email,
      password: '',
      newPassword: ''
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(3, 'Минимум 3 символа')
        .required('Обязательное поле'),
      email: Yup.string()
        .email('Неверный формат email')
        .required('Обязательное поле'),
      password: Yup.string()
        .required('Требуется текущий пароль'),
      newPassword: Yup.string()
        .min(6, 'Минимум 6 символов')
    }),
    onSubmit: (values) => {
      const { password, newPassword, ...profileData } = values;
      dispatch(updateProfile(user.id, profileData));
      onCancel();
    }
  });

  return (
    <div className="edit-profile-form">
      <h3>Редактирование профиля</h3>
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
          <label>Текущий пароль:</label><br />
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
          <label>Новый пароль (оставьте пустым, если не хотите менять):</label><br />
          <input
            type="password"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="error">{formik.errors.newPassword}</div>
          )}
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onCancel}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;