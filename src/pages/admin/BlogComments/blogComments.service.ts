import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IParams } from '../../../types/params.type';
import { IActionLog } from '../../../types/actionLog.type';
import { IBlogComment } from '../../../types/blogComments.type';

interface GetBlogCategoriesResponse {
  comments: IBlogComment[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetBlogCategoryResponse {
  comments: IBlogComment;
  message: string;
}

interface GetBlogCategoryHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const blogCommentsApi = createApi({
  reducerPath: 'blogCommentsApi',
  tagTypes: ['BlogComments'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/comments`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getBlogComments: builder.query<GetBlogCategoriesResponse, IParams>({
      query: (params) => ({
        url: 'getBlogParams/getBlogParams',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.comments)) {
          return [
            ...result.comments.map(({ _id }: { _id: string }) => ({ type: 'BlogComments' as const, _id })),
            { type: 'BlogComments' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'BlogComments' as const, id: 'LIST' }];
      }
    }),
    getBlogCommentsById: builder.query<GetBlogCategoryResponse, string>({
      query: (blogId) => ({
        url: `getCommentsByBlogId/${blogId}`
      }),
      providesTags: (result, error, id) => [{ type: 'BlogComments' as const, id }]
    }),
    loadHistoriesForBlogComments: builder.query<
      GetBlogCategoryHistoriesResponse,
      { commentId: string; params: IParams }
    >({
      query: ({ commentId, params }) => ({
        url: `histories/${commentId}`,
        params: params
      }),
      providesTags: (result, error, { commentId }) => [
        { type: 'BlogComments' as const, id: 'LIST' },
        { type: 'BlogComments' as const, id: commentId }
      ]
    }),
    createBlogComments: builder.mutation<void, IBlogComment>({
      query: (blogComments) => ({
        url: 'create',
        method: 'POST',
        body: blogComments
      }),
      invalidatesTags: [{ type: 'BlogComments' as const, id: 'LIST' }]
    }),
    updateBlogComments: builder.mutation<void, IBlogComment>({
      query: (blogComments) => ({
        url: `/update/${blogComments._id}`,
        method: 'PUT',
        body: blogComments
      }),
      invalidatesTags: (_, __, { _id }) => [
        { type: 'BlogComments' as const, id: 'LIST' },
        { type: 'BlogComments' as const, id: _id }
      ]
    }),
    updateActiveStatusBlogComments: builder.mutation<void, Partial<{ commentId: string }>>({
      query: (data) => ({
        url: `update-active-status`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { commentId }) => [
        { type: 'BlogComments' as const, commentId: 'LIST' },
        { type: 'BlogComments' as const, commentId }
      ]
    }),
    toggleLikeComment: builder.mutation<void, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/like`,
        method: 'PATCH',
        body: { commentId }
      }),
      invalidatesTags: [{ type: 'BlogComments', id: 'LIST' }]
    }),
    addReplyToComment: builder.mutation<void, { commentId: string; reply: string }>({
      query: ({ commentId, reply }) => ({
        url: `/reply`,
        method: 'POST',
        body: { commentId, reply }
      }),
      invalidatesTags: [{ type: 'BlogComments', id: 'LIST' }]
    })
  })
});

export const {
  useGetBlogCommentsQuery,
  useGetBlogCommentsByIdQuery,
  useLoadHistoriesForBlogCommentsQuery,
  useCreateBlogCommentsMutation,
  useUpdateBlogCommentsMutation,
  useUpdateActiveStatusBlogCommentsMutation,
  useToggleLikeCommentMutation,
  useAddReplyToCommentMutation
} = blogCommentsApi;
