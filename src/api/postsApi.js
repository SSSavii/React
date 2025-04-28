import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const delayedBaseQuery = async (args, api, extraOptions) => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // задержка 2 секунды
  return fetchBaseQuery({ baseUrl: 'http://localhost:3001' })(args, api, extraOptions);
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: delayedBaseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;