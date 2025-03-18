// src/hooks/useLoginState.js
import { useState } from 'react';

export const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = (username, password) => {
    console.log('Login attempt:', username, password);
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('savedLogin', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('savedLogin');
  };

  return { isLoggedIn, login, logout };
};