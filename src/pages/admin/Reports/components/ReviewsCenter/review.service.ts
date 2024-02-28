import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { IReview } from '../../../../../types/review.type';
import { IParams } from '../../../../../types/params.type';

interface GetReviewsResponse {
  reviews: IReview[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetReviewResponse {
  review: IReview;
  message: string;
}

interface DeleteReviewResponse {
  message: string;
}

interface UndeleteReviewResponse {
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
    getReview: build.query<GetReviewResponse, string>({
      query: (id) => ({
        url: `review/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Reviews', id }]
    }),
    deleteReview: build.mutation<DeleteReviewResponse, string>({
      query: (reviewId) => ({
        url: `review/delete/${reviewId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }]
    }),
    undeleteReview: build.mutation<UndeleteReviewResponse, string>({
      query: (reviewId) => ({
        url: `review/undelete/${reviewId}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }]
    })
  })
});

export const { useGetReviewsQuery, useGetReviewQuery, useDeleteReviewMutation, useUndeleteReviewMutation } = reviewApi;
