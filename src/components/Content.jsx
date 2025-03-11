/* eslint-disable react/prop-types */
const Content = ({ activeLab }) => {
  if (!activeLab) {
    return (
      <div className="content">
        <h2>Выберите лабораторную работу</h2>
        <p>Пожалуйста, выберите лабораторную работу из меню слева.</p>
      </div>
    );
  }

  return (
    <div className="content">
      <h2>Лабораторная работа {activeLab.id}: {activeLab.name}</h2>
      <div className="lab-content">
        {/* Здесь будет содержимое лабораторной работы */}
        {activeLab.content || <p>Содержимое лабораторной работы {activeLab.id}</p>}
      </div>
    </div>
  );
};

export default Content;