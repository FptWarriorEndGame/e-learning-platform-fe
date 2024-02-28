import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICategoryBlogs } from '../../../types/categoryBlogs.type';
import { IParams } from '../../../types/params.type';

interface getCategoriesResponse {
  blogsCategories: ICategoryBlogs[];
  message?: string;
}

interface getCategoryResponse {
  blogCategories: ICategoryBlogs;
  message?: string;
}

const CATEGORIES = 'Categories';

export const categoriesBlogApi = createApi({
  reducerPath: 'categoriesBlogApi',
  tagTypes: [CATEGORIES],
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
      query: () => '/blogCategory',
      providesTags: (result) =>
        result && result.blogsCategories
          ? [
              ...result.blogsCategories.map((blog) => ({ type: CATEGORIES as 'Categories', id: blog._id })),
              { type: CATEGORIES as 'Categories', id: 'LIST' }
            ]
          : [{ type: CATEGORIES as 'Categories', id: 'LIST' }]
    }),
    getCategories: build.query<getCategoriesResponse, IParams>({
      query: (params) => ({
        url: '/blogCategory',
        params
      }),
      providesTags: (result) =>
        result && result.blogsCategories
          ? [
              ...result.blogsCategories.map((blog) => ({ type: CATEGORIES as 'Categories', id: blog._id })),
              { type: CATEGORIES as 'Categories', id: 'LIST' }
            ]
          : [{ type: CATEGORIES as 'Categories', id: 'LIST' }]
    }),
    addCategory: build.mutation<{ category: ICategoryBlogs; message: string }, ICategoryBlogs>({
      query: (category) => ({
        url: '/blogCategory',
        method: 'POST',
        body: category
      }),
      invalidatesTags: [{ type: CATEGORIES, id: 'LIST' }]
    }),
    getCategoryById: build.query<getCategoryResponse, string>({
      query: (id) => `/blogCategory/${id}`,
      providesTags: (result, error, id) => [{ type: CATEGORIES, id }]
    }),
    updateCategory: build.mutation<{ category: getCategoryResponse; message: string }, ICategoryBlogs>({
      query: (category) => ({
        url: `/blogCategory/update/${category._id}`,
        method: 'PUT',
        body: category
      }),
      invalidatesTags: (result, error, arg) => [{ type: CATEGORIES, id: arg._id }]
    }),
    deleteCategory: build.mutation<Record<string, never>, string>({
      query: (id) => ({
        url: `/blogCategory/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: CATEGORIES, id: 'LIST' }]
    })
  })
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesBlogApi;
