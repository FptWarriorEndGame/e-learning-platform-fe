import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IActionLog } from '../../../types/actionLog.type';
import { IParams } from '../../../types/params.type';
import { IDiscuss } from '../../../types/discuss.type';

interface GetDiscussesResponse {
  discuss: IDiscuss[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetDiscussResponse {
  discuss: IDiscuss;
  message: string;
}

interface GetDiscussHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const discussApi = createApi({
  reducerPath: 'discussApi',
  tagTypes: ['Discusses'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getDiscuss: builder.query<GetDiscussesResponse, IParams>({
      query: (params) => ({
        url: '/discuss/getdisscuss',
        params: params
      }),
      providesTags: [{ type: 'Discusses', id: 'LIST' }]
    }),
    getDiscussions: builder.query<GetDiscussesResponse, void | IParams>({
      query: () => `/discuss/getAll`,
      providesTags: [{ type: 'Discusses', id: 'LIST' }]
    }),
    getDiscussionByLessonId: builder.query<GetDiscussResponse, string>({
      query: (lessonId) => `/discuss/lesson/${lessonId}`,
      providesTags: (result, error, id) => [{ type: 'Discusses', id: `lesson-${id}` }]
    }),
    getDiscussionBySectionId: builder.query<GetDiscussResponse, string>({
      query: (sectionId) => `/discuss/section/${sectionId}`,
      providesTags: (result, error, id) => [{ type: 'Discusses', id: `section-${id}` }]
    }),
    getDiscussionById: builder.query<GetDiscussResponse, string>({
      query: (discussId) => `/discuss/discuss/${discussId}`,
      providesTags: (result, error, id) => [{ type: 'Discusses', id }]
    }),
    createDiscuss: builder.mutation<void, IDiscuss>({
      query: (discuss) => ({
        url: '/discuss/add',
        method: 'POST',
        body: discuss
      }),
      invalidatesTags: [{ type: 'Discusses' as const, id: 'LIST' }]
    }),
    updateDiscuss: builder.mutation<void, IDiscuss>({
      query: (discuss) => ({
        url: `/discuss/update/${discuss._id}`,
        method: 'PUT',
        body: discuss
      }),
      invalidatesTags: (_, __, { _id }) => [
        { type: 'Discusses' as const, id: 'LIST' },
        { type: 'Discusses' as const, id: _id }
      ]
    }),
    updateActiveStatusDiscuss: builder.mutation<void, Partial<{ discussId: string }>>({
      query: (data) => ({
        url: `/discuss/update-active-status`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { discussId }) => [
        { type: 'Discusses' as const, discussId: 'LIST' },
        { type: 'Discusses' as const, discussId }
      ]
    }),
    loadHistoriesForDiscuss: builder.query<GetDiscussHistoriesResponse, { discussId: string; params: IParams }>({
      query: ({ discussId, params }) => ({
        url: `/discuss/histories/${discussId}`,
        params: params
      }),
      providesTags: (result, error, { discussId }) => [
        { type: 'Discusses' as const, id: 'LIST' },
        { type: 'Discusses' as const, id: discussId }
      ]
    }),
    addReplyToComment: builder.mutation<void, { discussId: string; reply: string }>({
      query: ({ discussId, reply }) => ({
        url: `/reply`,
        method: 'POST',
        body: { discussId, reply }
      }),
      invalidatesTags: [{ type: 'Discusses', id: 'LIST' }]
    })
  })
});

export const {
  useGetDiscussQuery,
  useGetDiscussionsQuery,
  useGetDiscussionByLessonIdQuery,
  useGetDiscussionBySectionIdQuery,
  useGetDiscussionByIdQuery,
  useCreateDiscussMutation,
  useUpdateDiscussMutation,
  useUpdateActiveStatusDiscussMutation,
  useLoadHistoriesForDiscussQuery,
  useAddReplyToCommentMutation
} = discussApi;
