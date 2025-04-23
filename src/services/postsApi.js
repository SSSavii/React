// Вариант 1 (рекомендуемый):
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // замените URL на реальный адрес сервера
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts', // предполагается, что endpoint /posts возвращает список постов
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;