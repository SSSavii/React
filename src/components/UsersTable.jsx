/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/UsersTable.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserBlock, deleteUser } from '../store/actions';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Компонент для перетаскиваемого заголовка
const DraggableColumnHeader = ({ column, index, moveColumn }) => {
  const [, drop] = useDrop({
    accept: 'column',
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <th 
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}
      onClick={() => column.onSort && column.onSort()}
    >
      {column.header}
      {column.isSorted && (
        <span>{column.isSortedDesc ? ' 🔽' : ' 🔼'}</span>
      )}
    </th>
  );
};

const UsersTable = () => {
  const dispatch = useDispatch();
  const { items: users = [], loading, error } = useSelector(state => state.users || { items: [], loading: false, error: null });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Определение колонок
  const columns= [
    { id: 'id', header: 'ID', accessor: 'id', sticky: true },
    { id: 'username', header: 'Логин', accessor: 'username' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Роль', accessor: 'role' },
    { id: 'status', header: 'Статус', accessor: 'status' },
    { id: 'actions', header: 'Действия' }
  ];
  
  // Порядок колонок
  const [columnOrder, setColumnOrder] = useState(['id', 'username', 'email', 'role', 'status', 'actions']);
  
  // Видимость колонок
  const [columnVisibility, setColumnVisibility] = useState({
    id: true,
    username: true,
    email: true,
    role: true,
    status: true,
    actions: true
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Функция сортировки
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Сортировка данных
  const sortedUsers = React.useMemo(() => {
    if (!users || users.length === 0) return [];
    
    let sortableItems = [...users];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [users, sortConfig]);

  // Обработчики действий
  const handleEdit = (userId) => {
    console.log('Edit user', userId);
  };

  const handleToggleBlock = (userId) => {
    dispatch(toggleUserBlock(userId));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteUser(userId));
    }
  };

  // Функция для перемещения колонок
  const moveColumn = (fromIndex, toIndex) => {
    const newColumnOrder = [...columnOrder];
    const column = newColumnOrder.splice(fromIndex, 1)[0];
    newColumnOrder.splice(toIndex, 0, column);
    setColumnOrder(newColumnOrder);
  };

  // Обновляем колонки с функциями сортировки
  const enhancedColumns = columns.map(column => ({
    ...column,
    isSorted: sortConfig.key === column.accessor,
    isSortedDesc: sortConfig.direction === 'desc',
    onSort: column.accessor ? () => requestSort(column.accessor) : undefined
  }));

  // Получаем колонки в правильном порядке
  const orderedColumns = columnOrder
    .map(columnId => enhancedColumns.find(col => col.id === columnId))
    .filter(Boolean);

  // Отображение при загрузке или ошибке
  if (loading) return <p>Загрузка пользователей...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="table-container">
        <h3>Управление пользователями</h3>
        
        {/* Контроль видимости колонок */}
        <div className="column-visibility-controls" style={{ marginBottom: '20px' }}>
          <h4>Видимость колонок:</h4>
          {columns.map(column => (
            <div key={`visibility-${column.id}`} style={{ margin: '8px 0' }}>
              <label>
                <input
                  type="checkbox"
                  checked={columnVisibility[column.id]}
                  onChange={() => {
                    setColumnVisibility({
                      ...columnVisibility,
                      [column.id]: !columnVisibility[column.id]
                    });
                  }}
                />
                {' '}
                {column.header}
              </label>
            </div>
          ))}
        </div>
        
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                {orderedColumns
                  .filter(column => columnVisibility[column.id])
                  .map((column, index) => (
                    <DraggableColumnHeader
                      key={`header-${column.id}`}
                      column={column}
                      index={index}
                      moveColumn={moveColumn}
                    />
                  ))}
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, userIndex) => (
                <tr key={`user-${user.id}-${userIndex}`}>
                  {orderedColumns
                    .filter(column => columnVisibility[column.id])
                    .map(column => {
                      if (column.id === 'actions') {
                        return (
                          <td key={`cell-${user.id}-${column.id}`}>
                            <div className="admin-actions">
                              <button onClick={() => handleEdit(user.id)}>
                                Изменить
                              </button>
                              <button onClick={() => handleToggleBlock(user.id)}>
                                {user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                              </button>
                              <button onClick={() => handleDelete(user.id)}>
                                Удалить
                              </button>
                            </div>
                          </td>
                        );
                      }
                      return (
                        <td 
                          key={`cell-${user.id}-${column.id}`}
                          className={column.sticky ? 'sticky-column' : ''}
                        >
                          {user[column.accessor]}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DndProvider>
  );
};

export default UsersTable;