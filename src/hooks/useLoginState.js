// src/hooks/useLoginState.js
import { useState } from 'react';

export const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/users?login=' + username);
      const users = await response.json();
      
      if (users.length > 0 && users[0].password === password) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('savedLogin', username);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('savedLogin');
  };

  const startPasswordReset = () => {
    setIsResettingPassword(true);
    setResetMessage('');
  };

  const cancelPasswordReset = () => {
    setIsResettingPassword(false);
    setResetUsername('');
    setNewPassword('');
    setResetMessage('');
  };

  const resetPassword = async () => {
    try {
      // 1. Находим пользователя
      const response = await fetch('http://localhost:3001/users?login=' + resetUsername);
      const users = await response.json();
      
      if (users.length === 0) {
        setResetMessage('Пользователь не найден');
        return;
      }

      // 2. Обновляем пароль
      const user = users[0];
      const updateResponse = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (updateResponse.ok) {
        setResetMessage('Пароль успешно изменен!');
        setTimeout(() => {
          setIsResettingPassword(false);
          setResetUsername('');
          setNewPassword('');
        }, 2000);
      } else {
        setResetMessage('Ошибка при изменении пароля');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setResetMessage('Произошла ошибка');
    }
  };

  return { 
    isLoggedIn, 
    login, 
    logout,
    isResettingPassword,
    resetUsername,
    setResetUsername,
    newPassword,
    setNewPassword,
    resetMessage,
    startPasswordReset,
    cancelPasswordReset,
    resetPassword
  };
};