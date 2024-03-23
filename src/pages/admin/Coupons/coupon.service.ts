import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICoupon, ICouponCourse } from '../../../types/coupon.type';
import { IParams } from '../../../types/params.type';
import { IActionLog } from '../../../types/actionLog.type';

interface GetCouponsResponse {
  coupons: ICoupon[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetCouponResponse {
  coupon: ICoupon;
  couponCourses: ICouponCourse[];
  message: string;
}

interface GetCouponHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

interface UpdateActiveStatusCouponResponse {
  message: string;
}

export const couponApi = createApi({
  reducerPath: 'couponApi',
  tagTypes: ['Coupons'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/coupons`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    getCoupons: build.query<GetCouponsResponse, IParams>({
      query: (params) => ({
        url: '',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.coupons)) {
          return [
            ...result.coupons.map(({ _id }: { _id: string }) => ({ type: 'Coupons' as const, _id })),
            { type: 'Coupons' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Coupons', id: 'LIST' }];
      }
    }),
    getCouponById: build.query<GetCouponResponse, string>({
      query: (id) => ({
        url: `coupon/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Coupons', id }]
    }),
    getCouponHistories: build.query<GetCouponHistoriesResponse, { couponId: string; params: IParams }>({
      query: ({ couponId, params }) => ({
        url: `coupon/histories/${couponId}`,
        params: params
      }),
      providesTags: (result, error, { couponId }) => [
        { type: 'Coupons', id: 'LIST' },
        { type: 'Coupons', id: couponId }
      ]
    }),
    postCoupon: build.mutation<void, ICoupon>({
      query: (coupon) => ({
        url: 'coupon/create',
        method: 'POST',
        body: coupon
      }),
      invalidatesTags: [{ type: 'Coupons', id: 'LIST' }]
    }),
    updateCoupon: build.mutation<void, ICoupon>({
      query: (coupon) => ({
        url: 'coupon/update',
        method: 'PUT',
        body: coupon
      }),
      invalidatesTags: (_, __, { _id }) => [
        { type: 'Coupons', id: 'LIST' },
        { type: 'Coupons', id: _id }
      ]
    }),
    updateActiveStatusCoupon: build.mutation<UpdateActiveStatusCouponResponse, Partial<{ couponId: string }>>({
      query: (data) => ({
        url: 'coupon/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { couponId }) => [
        { type: 'Coupons', id: 'LIST' },
        { type: 'Coupons', id: couponId }
      ]
    })
  })
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useGetCouponHistoriesQuery,
  usePostCouponMutation,
  useUpdateCouponMutation,
  useUpdateActiveStatusCouponMutation
} = couponApi;
