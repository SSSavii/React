// src/hooks/useLoginState.js
import { useState } from 'react';

export const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

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

  return { isLoggedIn, login, logout };
};