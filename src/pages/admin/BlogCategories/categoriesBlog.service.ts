import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICategoryBlogs } from '../../../types/categoryBlogs.type';
import { IParams } from '../../../types/params.type';
import { IActionLog } from '../../../types/actionLog.type';

interface GetBlogCategoriesResponse {
  blogsCategories: ICategoryBlogs[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetBlogCategoryResponse {
  blogsCategories: ICategoryBlogs;
  message: string;
}

interface GetBlogCategoryHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const blogCategoryApi = createApi({
  reducerPath: 'blogCategoryApi',
  tagTypes: ['Categories'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/blogCategory`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getBlogCategories: builder.query<GetBlogCategoriesResponse, IParams>({
      query: (params) => ({
        url: '/category-blogs',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.blogsCategories)) {
          return [
            ...result.blogsCategories.map(({ _id }: { _id: string }) => ({ type: 'Categories' as const, _id })),
            { type: 'Categories' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Categories' as const, id: 'LIST' }];
      }
    }),
    getBlogCategoryById: builder.query<GetBlogCategoryResponse, string>({
      query: (id) => ({
        url: `${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Categories' as const, id }]
    }),
    loadHistoriesForBlogCategory: builder.query<
      GetBlogCategoryHistoriesResponse,
      { blogCategoryTypeId: string; params: IParams }
    >({
      query: ({ blogCategoryTypeId, params }) => ({
        url: `/histories/${blogCategoryTypeId}`,
        params: params
      }),
      providesTags: (result, error, { blogCategoryTypeId }) => [
        { type: 'Categories' as const, id: 'LIST' },
        { type: 'Categories' as const, id: blogCategoryTypeId }
      ]
    }),
    createBlogCategory: builder.mutation<void, ICategoryBlogs>({
      query: (blogCategory) => ({
        url: 'create',
        method: 'POST',
        body: blogCategory
      }),
      invalidatesTags: [{ type: 'Categories' as const, id: 'LIST' }]
    }),
    updateBlogCategory: builder.mutation<void, ICategoryBlogs>({
      query: (blogCategory) => ({
        url: `update/${blogCategory._id}`,
        method: 'PUT',
        body: blogCategory
      }),
      invalidatesTags: (_, __, { _id }) => [
        { type: 'Categories' as const, id: 'LIST' },
        { type: 'Categories' as const, id: _id }
      ]
    }),
    updateActiveStatusBlogCategory: builder.mutation<void, Partial<{ blogCategoryTypeId: string }>>({
      query: (data) => ({
        url: `update-active-status`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { blogCategoryTypeId }) => [
        { type: 'Categories' as const, blogCategoryTypeId: 'LIST' },
        { type: 'Categories' as const, blogCategoryTypeId }
      ]
    })
  })
});

export const {
  useGetBlogCategoriesQuery,
  useGetBlogCategoryByIdQuery,
  useLoadHistoriesForBlogCategoryQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useUpdateActiveStatusBlogCategoryMutation
} = blogCategoryApi;
