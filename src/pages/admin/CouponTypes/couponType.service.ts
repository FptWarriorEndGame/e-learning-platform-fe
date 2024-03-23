import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICouponType } from '../../../types/couponType.type';
import { IParams } from '../../../types/params.type';
import { IActionLog } from '../../../types/actionLog.type';

interface GetCouponTypesResponse {
  couponTypes: ICouponType[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetAllActiveCouponTypesResponse {
  couponTypes: ICouponType[];
  message: string;
}

interface GetCouponTypeResponse {
  couponType: ICouponType;
  message: string;
}

interface UpdateActiveStatusCouponTypeResponse {
  message: string;
}

interface GetCouponTypeHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const couponTypeApi = createApi({
  reducerPath: 'couponTypeApi',
  tagTypes: ['CouponTypes'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/coupon-types`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    getCouponTypes: build.query<GetCouponTypesResponse, IParams>({
      query: (params) => ({
        url: '',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.couponTypes)) {
          return [
            ...result.couponTypes.map(({ _id }: { _id: string }) => ({ type: 'CouponTypes' as const, _id })),
            { type: 'CouponTypes' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'CouponTypes', id: 'LIST' }];
      }
    }),
    getAllActiveCouponTypes: build.query<GetAllActiveCouponTypesResponse, void>({
      query: () => ({
        url: 'all-active'
      }),
      providesTags(result) {
        if (result && Array.isArray(result.couponTypes)) {
          return [
            ...result.couponTypes.map(({ _id }: { _id: string }) => ({ type: 'CouponTypes' as const, _id })),
            { type: 'CouponTypes' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'CouponTypes', id: 'LIST' }];
      }
    }),
    getCouponTypeById: build.query<GetCouponTypeResponse, string>({
      query: (id) => ({
        url: `coupon-type/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'CouponTypes', id }]
    }),
    getCouponTypeHistories: build.query<GetCouponTypeHistoriesResponse, { couponTypeId: string; params: IParams }>({
      query: ({ couponTypeId, params }) => ({
        url: `/coupon-type/histories/${couponTypeId}`,
        params: params
      }),
      providesTags: (result, error, { couponTypeId }) => [
        { type: 'CouponTypes', id: 'LIST' },
        { type: 'CouponTypes', id: couponTypeId }
      ]
    }),
    postCouponType: build.mutation<void, ICouponType>({
      query: (couponType) => ({
        url: 'coupon-type/create',
        method: 'POST',
        body: couponType
      }),
      invalidatesTags: [{ type: 'CouponTypes', id: 'LIST' }]
    }),
    updateCouponType: build.mutation<void, ICouponType>({
      query: (couponType) => ({
        url: 'coupon-type/update',
        method: 'PUT',
        body: couponType
      }),
      invalidatesTags: (_, __, { _id }) => [
        { type: 'CouponTypes', id: 'LIST' },
        { type: 'CouponTypes', id: _id }
      ]
    }),
    updateActiveStatusCouponType: build.mutation<
      UpdateActiveStatusCouponTypeResponse,
      Partial<{ couponTypeId: string }>
    >({
      query: (data) => ({
        url: 'coupon-type/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { couponTypeId }) => [
        { type: 'CouponTypes', id: 'LIST' },
        { type: 'CouponTypes', id: couponTypeId }
      ]
    })
  })
});

export const {
  useGetCouponTypesQuery,
  useGetAllActiveCouponTypesQuery,
  useGetCouponTypeByIdQuery,
  useGetCouponTypeHistoriesQuery,
  usePostCouponTypeMutation,
  useUpdateCouponTypeMutation,
  useUpdateActiveStatusCouponTypeMutation
} = couponTypeApi;
