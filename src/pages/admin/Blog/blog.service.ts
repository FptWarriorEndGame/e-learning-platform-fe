/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IBlog } from '../../../types/blog.type';
import { IParams } from '../../../types/params.type';
import { IActionLog } from '../../../types/actionLog.type';

interface getBlogsResponse {
  blogs: IBlog[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface getBlogResponse {
  blog: IBlog;
  message: string;
}

interface GetBlogHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Blogs'],
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
    getBlog: build.query<getBlogResponse, string>({
      query: (id) => `/blogs/${id}`
    }),
    getBlogs: build.query<getBlogsResponse, IParams>({
      query: (params) => ({
        url: '/blogs/blogParams',
        params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.blogs)) {
          return [
            ...result.blogs.map(({ _id }: { _id: string | undefined }) => ({ type: 'Blogs' as const, _id })),
            { type: 'Blogs' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Blogs' as const, id: 'LIST' }];
      }
    }),
    addBlog: build.mutation<{ blog: IBlog; message: string }, Omit<IBlog, '_id'>>({
      query: (blog) => ({
        url: '/blogs/create',
        method: 'POST',
        body: blog
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }]
    }),
    updateBlog: build.mutation<IBlog, IBlog>({
      query: (blog) => ({
        url: `/blogs/update/${blog._id}`,
        method: 'PUT',
        body: blog
      }),
      invalidatesTags: (result, error, data) => [{ type: 'Blogs', id: 'LIST' }]
    }),
    loadHistoriesForBlog: build.query<GetBlogHistoriesResponse, { blogId: string; params: IParams }>({
      query: ({ blogId, params }) => ({
        url: `/blogs/histories/${blogId}`,
        params
      }),
      providesTags: (result, error, { blogId }) => [
        { type: 'Blogs' as const, id: 'LIST' },
        { type: 'Blogs' as const, id: blogId }
      ]
    }),
    updateActiveStatusBlog: build.mutation<void, Partial<{ blogId: string }>>({
      query: (data) => ({
        url: `/blogs/update-active-status`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { blogId }) => [
        { type: 'Blogs' as const, blogId: 'LIST' },
        { type: 'Blogs' as const, blogId }
      ]
    })
  })
});

export const {
  useGetBlogQuery,
  useGetBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useLoadHistoriesForBlogQuery,
  useUpdateActiveStatusBlogMutation
} = blogApi;
