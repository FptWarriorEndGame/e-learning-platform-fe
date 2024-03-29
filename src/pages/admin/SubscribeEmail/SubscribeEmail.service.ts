import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ISubscribe } from '../../../types/subscribe.type';

interface getSubscribeEmailsResponse {
  subscribe: ISubscribe[];
  message: string;
}

export interface getSubscribeEmailResponse {
  message: string;
  subscribe: ISubscribe;
}

export const subscribeApi = createApi({
  reducerPath: 'subscribeApi',
  tagTypes: ['Subscribe'], 
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ABCXYZ');
      return headers;
    }
  }),
  endpoints: (build) => ({
    getSubscribes: build.query<getSubscribeEmailsResponse, void>({
      query: () => ({
        url: '/subscribe/getAll',
      }), 
    providesTags: (result) =>
        result
          ? [
              ...result.subscribe.map(({ _id }) => ({ type: 'Subscribe' as const, _id })),
              { type: 'Subscribe', id: 'LIST' },
            ]
          : [{ type: 'Subscribe', id: 'LIST' }],
    }),
    })
});

export const {
  useGetSubscribesQuery,
} = subscribeApi;