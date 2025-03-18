/* eslint-disable no-unused-vars */
// src/pages/About.jsx
import React, { useState, useEffect } from 'react';

const About = () => {
  const [visitCount, setVisitCount] = useState(0);
  
  // Простой пример useState
  const [name, setName] = useState('Студент');
  
  // useEffect при монтировании
  useEffect(() => {
    console.log('About page mounted');
    // Увеличиваем счетчик посещений
    setVisitCount(prev => prev + 1);
    
    // Функция очистки при размонтировании
    return () => {
      console.log('About page unmounted');
    };
  }, []);
  
  // useEffect с зависимостью
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