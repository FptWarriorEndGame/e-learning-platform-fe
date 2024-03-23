import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICategory } from '../../../types/category.type';
import { IParams } from '../../../types/params.type';
import { CustomError } from '../../../utils/errorHelpers';

interface getCategoriesResponse {
  categories: ICategory[];
  message: string;
}

interface getCategoryResponse {
  category: ICategory;
  message: string;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Categories'],
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
    getAllCategories: build.query<getCategoriesResponse, void>({
      query: () => ({
        url: '/categories/get-all'
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Categories' as const, _id })),
              { type: 'Categories' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Categories', id: 'LIST' }];
      }
    }),
    getCategories: build.query<getCategoriesResponse, IParams>({
      query: (params) => ({
        url: '/categories',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Categories' as const, _id })),
              { type: 'Categories' as const, id: 'LIST' }
            ];
            return final;
          }
        }
        return [{ type: 'Categories', id: 'LIST' }];
      }
    }),
    addCategory: build.mutation<{ category: ICategory; message: string }, Omit<ICategory, '_id'>>({
      query(body) {
        try {
          return {
            url: '/categories/category/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Categories', id: 'LIST' }])
    }),
    getCategory: build.query<getCategoryResponse, string>({
      query: (id) => ({
        url: `/categories/category/${id}`
      })
    }),
    updateCategory: build.mutation<ICategory, ICategory>({
      query(data) {
        return {
          url: `/categories/category/update/${data._id}`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Categories', id: 'LIST' }])
    }),
    deleteCategory: build.mutation<Record<string, never>, string>({
      query(id) {
        return {
          url: `/categories/category/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: 'Categories', id: 'LIST' }];
      }
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
