import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IContact, IFeedbackReply } from '../../../types/contact.type';
import { IParams } from '../../../types/params.type';
import { IActionLog } from '../../../types/actionLog.type';

interface GetFeedbacksResponse {
  feedbacks: IContact[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetFeedbackResponse {
  feedback: IContact;
  message: string;
}

interface GetFeedbackHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

interface UpdateActiveStatusFeedbackResponse {
  message: string;
}

interface CreateFeedbackReplyResponse {
  message: string;
}

interface GetFeedbackRepliesByFeedbackIdResponse {
  message: string;
  feedbackReplies: IFeedbackReply[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  tagTypes: ['Feedbacks'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/feedbacks`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }

      return headers;
    }
  }),
  endpoints: (build) => ({
    getFeedbacks: build.query<GetFeedbacksResponse, IParams>({
      query: (params) => ({
        url: '',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.feedbacks)) {
          return [
            ...result.feedbacks.map(({ _id }: { _id: string }) => ({ type: 'Feedbacks' as const, _id })),
            { type: 'Feedbacks' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Feedbacks', id: 'LIST' }];
      }
    }),
    getFeedbackById: build.query<GetFeedbackResponse, string>({
      query: (id) => ({
        url: `feedback/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Feedbacks', id }]
    }),
    getFeedbackHistories: build.query<GetFeedbackHistoriesResponse, { feedbackId: string; params: IParams }>({
      query: ({ feedbackId, params }) => ({
        url: `feedback/histories/${feedbackId}`,
        params: params
      }),
      providesTags: (result, error, { feedbackId }) => [
        { type: 'Feedbacks', id: 'LIST' },
        { type: 'Feedbacks', id: feedbackId }
      ]
    }),
    updateActiveStatusFeedback: build.mutation<UpdateActiveStatusFeedbackResponse, Partial<{ feedbackId: string }>>({
      query: (data) => ({
        url: 'feedback/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { feedbackId }) => [
        { type: 'Feedbacks', id: 'LIST' },
        { type: 'Feedbacks', id: feedbackId }
      ]
    }),
    CreateFeedbackReply: build.mutation<CreateFeedbackReplyResponse, { feedbackId: string; contentReply: string }>({
      query: ({ feedbackId, contentReply }) => ({
        url: 'feedback/reply/create',
        method: 'POST',
        body: { feedbackId, contentReply }
      }),
      invalidatesTags: (_, __, { feedbackId }) => [
        { type: 'Feedbacks', id: feedbackId },
        { type: 'Feedbacks', id: 'LIST' }
      ]
    }),
    getFeedbackRepliesByFeedbackId: build.query<
      GetFeedbackRepliesByFeedbackIdResponse,
      { feedbackId: string; params: IParams }
    >({
      query: ({ feedbackId, params }) => ({
        url: `feedback/replies/${feedbackId}`,
        params: params
      }),
      providesTags: (result, error, { feedbackId }) => [
        { type: 'Feedbacks', id: 'LIST' },
        { type: 'Feedbacks', id: feedbackId }
      ]
    })
  })
});

export const {
  useGetFeedbacksQuery,
  useGetFeedbackByIdQuery,
  useGetFeedbackHistoriesQuery,
  useUpdateActiveStatusFeedbackMutation,
  useCreateFeedbackReplyMutation,
  useGetFeedbackRepliesByFeedbackIdQuery
} = feedbackApi;
