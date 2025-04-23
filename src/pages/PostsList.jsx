/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetPostsQuery } from '../api/postsApi';

const PostsList = () => {
  const { data, error, isLoading, isFetching } = useGetPostsQuery();

  if (isLoading || isFetching) {
    return <div>Загрузка<span className="spinner">...</span></div>;
  }

  if (error) {
    return <div>Ошибка при загрузке данных.</div>;
  }

  return (
    <div>
      <h2>Список постов</h2>
      {data && data.length > 0 ? (
        <ul>
          {data.map(post => (
            <li key={post.id}>{post.name}</li>
          ))}
        </ul>
      ) : (
        <div>Постов не найдено</div>
      )}
    </div>
  );
};

export default PostsList;