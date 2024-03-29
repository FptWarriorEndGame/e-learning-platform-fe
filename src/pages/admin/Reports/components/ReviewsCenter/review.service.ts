import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { IReview, IReviewReply } from '../../../../../types/review.type';
import { IParams } from '../../../../../types/params.type';
import { IActionLog } from '../../../../../types/actionLog.type';

interface GetReviewsResponse {
  reviews: IReview[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetReviewHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetReviewByIdResponse {
  review: IReview;
  message: string;
}
interface UpdateActiveStatusReviewResponse {
  message: string;
}

interface CreateReviewReplyResponse {
  message: string;
}

interface GetReviewRepliesByReviewIdResponse {
  message: string;
  reviewReplies: IReviewReply[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

interface UpdateActiveStatusReviewReplyResponse {
  message: string;
}

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  tagTypes: ['Reviews'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/reviews`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    getReviews: build.query<GetReviewsResponse, IParams>({
      query: (params) => ({
        url: '',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.reviews)) {
          return [
            ...result.reviews.map(({ _id }: { _id: string }) => ({ type: 'Reviews' as const, _id })),
            { type: 'Reviews' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Reviews', id: 'LIST' }];
      }
    }),
    getReviewById: build.query<GetReviewByIdResponse, string>({
      query: (id) => ({
        url: `review/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Reviews', id }]
    }),
    getReviewHistories: build.query<GetReviewHistoriesResponse, { reviewId: string; params: IParams }>({
      query: ({ reviewId, params }) => ({
        url: `review/histories/${reviewId}`,
        params: params
      }),
      providesTags: (result, error, { reviewId }) => [
        { type: 'Reviews', id: 'LIST' },
        { type: 'Reviews', id: reviewId }
      ]
    }),
    updateActiveStatusReview: build.mutation<UpdateActiveStatusReviewResponse, Partial<{ reviewId: string }>>({
      query: (data) => ({
        url: 'review/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { reviewId }) => [
        { type: 'Reviews', id: 'LIST' },
        { type: 'Reviews', id: reviewId }
      ]
    }),
    createReviewReply: build.mutation<CreateReviewReplyResponse, { reviewId: string; contentReply: string }>({
      query: ({ reviewId, contentReply }) => ({
        url: 'review/reply/create',
        method: 'POST',
        body: { reviewId, contentReply }
      }),
      invalidatesTags: (_, __, { reviewId }) => [
        { type: 'Reviews', id: reviewId },
        { type: 'Reviews', id: 'LIST' }
      ]
    }),
    getReviewRepliesByReviewId: build.query<GetReviewRepliesByReviewIdResponse, { reviewId: string; params: IParams }>({
      query: ({ reviewId, params }) => ({
        url: `review/replies/${reviewId}`,
        params: params
      }),
      providesTags: (result, error, { reviewId }) => [
        { type: 'Reviews', id: 'LIST' },
        { type: 'Reviews', id: reviewId }
      ]
    }),
    updateActiveStatusReviewReply: build.mutation<
      UpdateActiveStatusReviewReplyResponse,
      { reviewId: string; reviewReplyId: string }
    >({
      query: ({ reviewReplyId }) => ({
        url: 'review/reply/update-active-status',
        method: 'PATCH',
        body: { reviewReplyId }
      }),
      invalidatesTags: (_, __, { reviewId }) => [
        { type: 'Reviews', id: 'LIST' },
        { type: 'Reviews', id: reviewId }
      ]
    })
  })
});

export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useGetReviewHistoriesQuery,
  useUpdateActiveStatusReviewMutation,
  useCreateReviewReplyMutation,
  useGetReviewRepliesByReviewIdQuery,
  useUpdateActiveStatusReviewReplyMutation
} = reviewApi;
