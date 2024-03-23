import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICourse } from '../../../types/course.type';
import { IPagination } from '../../../types/pagination';
import { IParams } from '../../../types/params.type';
import { CustomError } from '../../../utils/errorHelpers';

interface getAuthorReportsResponse {
  courses: ICourse[];
  pagination: IPagination;
  message: string;
}

interface getAllActiveAuthorReportsResponse {
  courses: ICourse[];
  message: string;
}

export const authorReportApi = createApi({
  reducerPath: 'authorReportApi',
  tagTypes: ['AuthorReports'],
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
  endpoints: (build) => ({
    getAuthorReports: build.query<getAuthorReportsResponse, IParams>({
      query: (params) => ({
        url: '/courses',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'AuthorReports' as const, _id })),
              { type: 'AuthorReports' as const, id: 'LIST' }
            ];

            return final;
          }
        }
        return [{ type: 'AuthorReports', id: 'LIST' }];
      }
    }),
    getAllActiveAuthorReports: build.query<getAllActiveAuthorReportsResponse, void>({
      query: () => ({
        url: 'courses/all-active'
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'AuthorReports' as const, _id })),
              { type: 'AuthorReports' as const, id: 'LIST' }
            ];

            return final;
          }
        }
        return [{ type: 'AuthorReports', id: 'LIST' }];
      }
    }),
    getAllAuthorReports: build.query<getAuthorReportsResponse, IParams>({
      query: (params) => ({
        url: '/courses',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'AuthorReports' as const, _id })),
              { type: 'AuthorReports' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'AuthorReports', id: 'LIST' }];
      }
    }),
  })
});

export const {
  useGetAuthorReportsQuery,
} = authorReportApi;
