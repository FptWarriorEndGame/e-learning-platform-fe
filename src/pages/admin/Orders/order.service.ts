import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IOrder, IOrderHistory } from '../../../types/order.type';
import { CustomError } from '../../../utils/errorHelpers';

interface getOrdersResponse {
  orders: IOrder[];
  count: number;
  total: number;
  message: string;
}

export interface getOrderResponse {
  message: string;
  order: IOrderHistory;
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Orders'], 
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ABCXYZ');
      return headers;
    }
  }),
  endpoints: (build) => ({
    getOrders: build.query<getOrdersResponse, { courseId: string; date: string }>({
      query: (params) => ({
        url: '/orders',
        params: params
      }), 
      providesTags(result) {
      

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Orders' as const, _id })),
              { type: 'Orders' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Orders', id: 'LIST' }];
      }
    }),
    addOrder: build.mutation<IOrder, Omit<IOrder, 'id'>>({
      query(body) {
        try {
        
          return {
            url: 'order',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
    
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Orders', id: 'LIST' }])
    }),
    getOrder: build.query<getOrderResponse, string>({
      query: (orderId) => ({
        url: `orders/order/${orderId}`
      }),
      providesTags: (result, error, orderId) => [{ type: 'Orders', id: orderId }]
    }),
    updateOrder: build.mutation<IOrder, { id: string; body: IOrder }>({
      query(data) {
        return {
          url: `orders/${data.id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Orders', id: data.id }])
    }),
    deleteOrder: build.mutation<Record<string, never>, string>({
      query(id) {
        return {
          url: `orders/${id}`,
          method: 'DELETE'
        };
      },
     
      invalidatesTags: (result, error, id) => [{ type: 'Orders', id }]
    })
  })
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = orderApi;
