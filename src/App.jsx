/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';
import { useLoginState } from './hooks/useLoginState';
import AuthForm from './components/AuthForm';
import RegisterForm from './components/RegisterForm';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Header from './components/PageHeader';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Counter from './components/Counter';
import Container from './components/Container';
import LabDetail from './pages/LabDetail';
import './style.css';
// Данные лабораторных работ
const labs = [
  { 
    id: 1, 
    name: "JavaScript Events и LocalStorage", 
    content: <div>
      <h3>Лабораторная работа 1</h3>
      <p><strong>Задание:</strong></p>
      <ol>
        <li>Реализовать скрипт, который уведомит о полной загрузке страницы</li>
        <li>Реализовать кнопку счетчик, которая будет увеличивать счетчик на &quot;1&quot; и вывести его значение на страницу (button onclick)</li>
        <li>Реализовать кнопку счетчик, которая будет уменьшать счетчик на &quot;1&quot; реализовать с помощью listener click</li>
        <li>Реализовать форму аутентификации пользователя (&lt;form&gt;)</li>
        <li>Реализовать скрипт очистки данных формы</li>
        <li>Реализовать скрипт отправки данных формы с помощью listener submit.</li>
        <li>Без отправки на сервер провести валидацию введенных данных, если login==&quot;admin&quot; & pass==&quot;admin&quot; вывести сообщение об успехе, иначе сообщение о неуспехе</li>
        <li>Реализовать скрипт сохранения учетных данных и автоподстановку оных с помощью localStorage</li>
      </ol>
    </div>
  },
  { 
    id: 2, 
    name: "Введение в React", 
    content: <div>
      <h3>Лабораторная работа 2</h3>
      <ol>
        <li>Создать &quot;Hello World&quot; приложение на основе React.</li>
        <li>Для создания можно использовать create-react-app или vite</li>
        <li>Реализовать компонент кнопку, контейнер и использовать их на странице</li>
        <li>Реализовать шаблон страницы и разместить на нем компоненты навигации</li>
        <li>Разместить проект в репозиторий в github</li>
        <li>Прикрепить текстовый файл с сылкой на проект</li>
      </ol>
    </div>
  },
  { 
    id: 3, 
    name: "Компоненты React", 
    content: <div>
      <h3>Лабораторная работа 3</h3>
      <p>Продолжаем задание &quot;Реализовать шаблон страницы и разместить на нем компоненты навигации&quot; (Можно использовать готовые библиотеки Mui/Bootstrap и тд)</p>
      <ol>
        <li>Реализуем компоненты Header, Footer, Menu и Content</li>
        <li>В меню выводим список лабораторных работ</li>
        <li>В Content выводим содержимое лабораторной работы</li>
        <li>Разместить проект в репозиторий в github</li>
        <li>Прикрепить текстовый файл с сылкой на проект</li>
      </ol>
    </div>
  },
  { 
    id: 4, 
    name: "Hooks и React Router", 
    content: <div>
      <h3>Лабораторная работа 4</h3>
      <ol>
        <li>Реализовать изменение темы (день/ночь) используя Context</li>
        <li>useState и useEffect - простые примеры</li>
        <li>useEffect на монтировании и размонтировании страницы</li>
        <li>Внедрить в проект react-router</li>
        <li>В меню проекта реализовать ссылки переходы</li>
        <li>В Content реализовать обработчик роутов</li>
        <li>Внедрить в проект redux</li>
        <li>Реализовать несколько action и reducer, например increment/ decrement счетчика</li>
      </ol>
    </div>
  },
  { 
    id: 5, 
    name: "Формы и кастомные хуки", 
    content: <div>
      <h3>Лабораторная работа 5</h3>
      <ol>
        <li>Реализовать форму регистрации и форму авторизации с помощью React-hook-forms или Formik (валидация полей)</li>
        <li>Реализовать блок обратной связи. Форма обратной связи и список отзывов</li>
        <li>Обработать submit форм через useCallback функции по примеру Лабораторной работы 1</li>
        <li>Реализовать кастомный хук useLoginState</li>
        <li>Выдает true / false - статус авторизации</li>
        <li>Если true - отрисовать приложение, иначе форму авторизации</li>
        <li>Хранить статус авторизации можно в redux, context или localStore</li>
        <li>Реализовать в правом верхнем углу профиль пользователя с кнопкой разлогина</li>
        <li>Разместить лабораторную работу в репозиторий в github отдельным коммитом</li>
        <li>Прикрепить ссылку в виде текста</li>
      </ol>
    </div>
  },
  { 
    id: 6, 
    name: "REST API и асинхронные запросы", 
    content: <div>
      <h3>Лабораторная работа 6</h3>
      <ol>
        <li>Реализовать или использовать простой REST сервер</li>
        <li>Реализовать несколько (GET, POST, PUT, DELETE) запросов на сервер используя промисы JS (fetch, axios).</li>
        <li>Использовать формы (авторизации, регистрации, обратной связи) отправки данных на сервер из лабораторной работы №5.</li>
        <li>Добавить возможность редактирования профиля полььзователя</li>
        <li>Вывести результаты GET запроса от сервера на экран, например, все отзывы обратной связи.</li>
        <li>Добавить возможность удаления записей обратной связи</li>
        <li>Для оптимизации использовать redux</li>
        <li>Разместить лабораторную работу в репозиторий в github отдельным коммитом</li>
        <li>Прикрепить сылку на проект в виде текста</li>
      </ol>
    </div>
  },
  { 
    id: 7, 
    name: "UI библиотеки и адаптивный дизайн", 
    content: <div>
      <h3>Лабораторная работа 7</h3>
      <ol>
        <li>Внедрить в проект UI Kit Mui/Bootstrap или им подобное, для возможности адаптива.</li>
        <li>Реализовать Header (Главная, О себе) - отдельные страницы.</li>
        <li>Изменение темы на темную перенести в Header.</li>
        <li>Привести профиль пользователя в стандарт библиотеки Mui/Bootstrap</li>
        <li>Реализовать Menu (Drawer/Slider) - Меню по прежнему должно открывать список лабораторных, но должно быть скрываемым и вызываться из Header по кнопке-иконке.</li>
        <li>В нижнем меню организовать вызов быстрых действий (обратная связь и пр)</li>
        <li>* Проконтролировать, что приложение стало адаптивным под разные устройства.</li>
        <li>Разместить лабораторную работу в репозиторий в github отдельным коммитом</li>
        <li>Прикрепить сылку на проект в виде текста</li>
      </ol>
    </div>
  },
  { 
    id: 8, 
    name: "Таблицы и роли пользователей", 
    content: <div>
      <h3>Лабораторная работа 8</h3>
      <ol>
        <li>Внедрить в проект таблицы react-table.</li>
        <li>Добавить роли пользователей admin, user</li>
        <li>Реализовать блок администрирования для роли admin</li>
        <li>Реализовать страницу список пользователей в виде таблицы</li>
        <li>Добавить действия Удалить, Заблокировать и тд</li>
        <li>Перенести в блок администрирования блок обратной связи</li>
        <li>Добавить действия Удалить, Заблокировать и тд</li>
        <li>В пользовательском приложении оставить блок обратной связи только на чтение</li>
        <li>Добавить возможность сортировки и перетаскивания колонок.</li>
        <li>* Реализовать динамическую подгрузку данных (виртуализация) при скроллировании</li>
        <li>* Для просмотра на мобильных устройствах зафиксировать первую колонку, остальные скроллировать.</li>
        <li>Разместить лабораторную работу в репозиторий в github отдельным коммитом</li>
        <li>Прикрепить сылку на проект в виде текста</li>
      </ol>
    </div>
  },
  { 
    id: 9, 
    name: "Тестирование и оптимизация", 
    content: <div>
      <h3>Лабораторная работа 9</h3>
      <ol>
        <li>Написать тест для компонента кнопки</li>
        <li>Провести рефакторинг страницы со списком данных с сервера. Переписать запрос к backend через rtk-query(useGetPostsQuery).</li>
        <li>Используя isError, isLoading, isFetching отрисовать спиннер загрузки, сообщение об ошибке и результат успешного запроса</li>
        <li>* &quot;Ленивые&quot; импорты. Разбить приложение на Chunks (не обязательно)</li>
        <li>Результат работы разместить на github отдельным коммитом.</li>
        <li>Ссылку на репозиторий приложить к заданию</li>
      </ol>
    </div>
  }
];

function App() {
  const [activeLab, setActiveLab] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedIn, login, logout } = useLoginState();

  const handleLabSelect = (lab) => {
    setActiveLab(lab);
  };

  const handleLogin = async ({ login: username, password }) => {
    const success = login(username, password);
    return success;
  };

  const handleRegister = (values) => {
    console.log('Registration values:', values);
    // Здесь будет логика регистрации
    setIsRegistering(false);
  };

  const handleFeedbackSubmit = (feedback) => {
    setFeedbacks([...feedbacks, { ...feedback, date: new Date().toISOString() }]);
  };

  if (!isLoggedIn) {
    return (
      <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        {isRegistering ? (
          <RegisterForm 
            onSubmit={handleRegister} 
            onSwitch={() => setIsRegistering(false)} 
          />
        ) : (
          <AuthForm 
            onSubmit={handleLogin} 
            onSwitch={() => setIsRegistering(true)} 
          />
        )}
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      <Container>
        <Routes>
          <Route path="/" element={<Home labs={labs} activeLab={activeLab} handleLabSelect={handleLabSelect} />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/feedback" element={
            <div className="feedback-page">
              <FeedbackForm onSubmit={handleFeedbackSubmit} />
              <FeedbackList feedbacks={feedbacks} />
            </div>
          } />
          <Route path="/lab/:id" element={<LabDetail labs={labs} setActiveLab={setActiveLab} activeLab={activeLab} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;