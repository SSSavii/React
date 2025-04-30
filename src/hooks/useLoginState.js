// src/hooks/useLoginState.js
import { useState, useEffect } from 'react';

export const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user'); // По умолчанию 'user'
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole') || 'user';
    const user = localStorage.getItem('userData');
    
    if (loggedIn) {
      setIsLoggedIn(true);
      setUserRole(role);
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  const login = async (username, password) => {
    // В реальном приложении здесь был бы запрос к API
    let success = false;
    let role = 'user';
    let status = 'active';
    
    // Проверка для демонстрационных учетных записей
    if (username === 'admin' && password === 'admin') {
      success = true;
      role = 'admin';
      status = 'active';
    } else if (username === 'user' && password === 'user') {
      success = true;
      role = 'user';
      status = 'blocked';
    } else if (username === 'user1' && password === 'user1') {
      success = true;
      role = 'user';
      status = 'active';
    } else if (username === 'user2' && password === 'user2') {
      success = true;
      role = 'user';
      status = 'blocked'; // Этот пользователь заблокирован
    }
    
    // Проверка статуса пользователя
    if (status === 'blocked') {
      return false; // Запрещаем вход заблокированным пользователям
    }
    
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('savedLogin', username);
      localStorage.setItem('userRole', role);
      
      const user = {
        id: role === 'admin' ? 1 : Math.floor(Math.random() * 1000) + 2,
        username,
        role,
        email: `${username}@example.com`,
        status
      };
      
      localStorage.setItem('userData', JSON.stringify(user));
      setUserData(user);
      setIsLoggedIn(true);
      setUserRole(role);
    }
    
    return success;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserRole('user');
    setUserData(null);
  };

  const startPasswordReset = () => {
    setIsResettingPassword(true);
  };

  const cancelPasswordReset = () => {
    setIsResettingPassword(false);
    setResetUsername('');
    setNewPassword('');
    setResetMessage('');
  };

  const resetPassword = () => {
    // В реальном приложении здесь был бы запрос к API
    // Для демонстрации просто показываем сообщение об успехе
    setResetMessage('Пароль успешно изменен!');
    setTimeout(() => {
      setIsResettingPassword(false);
      setResetUsername('');
      setNewPassword('');
      setResetMessage('');
    }, 2000);
  };

  return {
    isLoggedIn,
    userRole,
    userData,
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