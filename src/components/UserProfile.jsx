/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/UserProfile.jsx
import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';

const UserProfile = ({ onLogout }) => {
  const [editing, setEditing] = useState(false);
  const username = localStorage.getItem('savedLogin');
  
  if (editing) {
    return (
      <EditProfileForm 
        user={{
          id: 1, // Здесь должен быть реальный ID пользователя
          login: username,
          email: '' // Здесь должен быть email пользователя
        }} 
        onCancel={() => setEditing(false)} 
      />
    );
  }

  return (
    <div className="user-profile">
      <span>{username}</span>
      <button onClick={() => setEditing(true)}>Редактировать</button>
      <button onClick={onLogout}>Выйти</button>
    </div>
  );
};

export default UserProfile;