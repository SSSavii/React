/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/UserProfile.jsx
import React from 'react';

const UserProfile = ({ onLogout }) => {
  const username = localStorage.getItem('savedLogin');
  
  return (
    <div className="user-profile">
      <span>{username}</span>
      <button onClick={onLogout}>Выйти</button>
    </div>
  );
};

export default UserProfile;