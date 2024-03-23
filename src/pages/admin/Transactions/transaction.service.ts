import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IParams } from '../../../types/params.type';
import { ITransaction } from '../../../types/transaction.type';
import { IUser } from '../../../types/user.type';

export interface TransactionResponse {
  orderId: string;
  user: IUser;
  transaction: ITransaction;
}

interface GetTransactionsResponse {
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
  transactions: TransactionResponse[];
}

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  tagTypes: ['Transactions'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/transactions`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }

      return headers;
    }
  }),
  endpoints: (build) => ({
    getTransactions: build.query<GetTransactionsResponse, IParams>({
      query: (params) => ({
        url: '',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.transactions)) {
          return [
            ...result.transactions.map(({ orderId }) => ({ type: 'Transactions' as const, _id: orderId })),
            { type: 'Transactions' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Transactions', id: 'LIST' }];
      }
    })
  })
});

export const { useGetTransactionsQuery } = transactionApi;
