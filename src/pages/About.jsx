/* eslint-disable no-unused-vars */
// src/pages/About.jsx
import React, { useState, useEffect } from 'react';

const About = () => {
  // Получаем начальное значение из localStorage или 0, если его нет
  const [visitCount, setVisitCount] = useState(() => {
    return parseInt(localStorage.getItem('visitCount') || 0);
  });
  
  const [name, setName] = useState('Студент');
  
  useEffect(() => {
    console.log('About page mounted');
    // Увеличиваем счетчик и сохраняем в localStorage
    const newCount = visitCount + 1;
    setVisitCount(newCount);
    localStorage.setItem('visitCount', newCount);
    
    return () => {
      console.log('About page unmounted');
    };
  }, []); // Зависимость пустая, чтобы эффект срабатывал только при монтировании
  
  useEffect(() => {
    document.title = `О ${name}`;
    
    return () => {
      document.title = 'React Labs';
    };
  }, [name]);

  return (
    <div className="about-page">
      <h2>О себе</h2>
      <p>Это страница с информацией о разработчике.</p>
      
      <div className="useState-example">
        <h3>Пример использования useState:</h3>
        <p>Имя: {name}</p>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Введите ваше имя"
        />
      </div>
      
      <div className="useEffect-example">
        <h3>Пример использования useEffect:</h3>
        <p>Количество посещений этой страницы: {visitCount}</p>
        <p>Проверьте консоль, чтобы увидеть сообщения при монтировании и размонтировании.</p>
      </div>
    </div>
  );
};

export default About;