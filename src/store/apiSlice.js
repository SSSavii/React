// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Feedbacks'], // Define tags for caching
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => 'feedbacks',
      providesTags: ['Feedbacks'],
    }),
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: 'feedbacks',
        method: 'POST',
        body: feedback,
      }),
      invalidatesTags: ['Feedbacks'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedbacks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedbacks'],
    }),
    toggleFeedbackBlock: builder.mutation({
      query: (id) => ({
        url: `feedbacks/${id}`,
        method: 'PATCH',
        body: { blocked: true },
      }),
      invalidatesTags: ['Feedbacks'],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useToggleFeedbackBlockMutation,
} = apiSlice;