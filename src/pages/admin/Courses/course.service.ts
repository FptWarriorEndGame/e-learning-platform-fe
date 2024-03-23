import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICourse } from '../../../types/course.type';
import { ILesson, ISection } from '../../../types/lesson.type';
import { IPagination } from '../../../types/pagination';
import { IParams } from '../../../types/params.type';
import { CustomError } from '../../../utils/errorHelpers';

interface getCoursesResponse {
  courses: ICourse[];
  pagination: IPagination;
  message: string;
}

interface getAllActiveCoursesResponse {
  courses: ICourse[];
  message: string;
}

interface getSectionsResponse {
  sections: ISection[];
  message: string;
}

interface getLessonsResponse {
  lessons: ILesson[];
  message: string;
}

interface UpdateActiveStatusCourseResponse {
  message: string;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  tagTypes: ['Courses', 'Sections', 'Lessons'],
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
    getCourses: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Courses' as const, _id })),
              { type: 'Courses' as const, id: 'LIST' }
            ];

            return final;
          }
        }
        return [{ type: 'Courses', id: 'LIST' }];
      }
    }),
    getAllActiveCourses: build.query<getAllActiveCoursesResponse, void>({
      query: () => ({
        url: 'courses/all-active'
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Courses' as const, _id })),
              { type: 'Courses' as const, id: 'LIST' }
            ];

            return final;
          }
        }
        return [{ type: 'Courses', id: 'LIST' }];
      }
    }),
    getAllCourses: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Courses' as const, _id })),
              { type: 'Courses' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Courses', id: 'LIST' }];
      }
    }),
    getSections: build.query<getSectionsResponse, void>({
      query: () => '/sections',
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Courses' as const, _id })),
              { type: 'Courses' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Courses', id: 'LIST' }];
      }
    }),
    getSectionsByCourseId: build.query<getSectionsResponse, string>({
      query: (courseId) => ({
        url: `/sections/course/${courseId}`
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Courses' as const, _id })),
              { type: 'Courses' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Courses', id: 'LIST' }];
      }
    }),
    getLessonsBySectionId: build.query<getLessonsResponse, string>({
      query: (sectionId) => ({
        url: `/lessons/section/${sectionId}`
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Courses' as const, _id })),
              { type: 'Courses' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Courses', id: 'LIST' }];
      }
    }),

    addCourse: build.mutation<ICourse, Omit<ICourse, 'id'>>({
      query(body) {
        try {
          return {
            url: 'courses/course/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },

      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    }),
    addSection: build.mutation<ISection, Omit<ISection, '_id'>>({
      query(body) {
        try {
          return {
            url: '/sections/section/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },

      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    }),
    addLesson: build.mutation<ILesson, Omit<ILesson, '_id'>>({
      query(body) {
        try {
          return {
            url: '/lessons/lesson/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },

      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    }),
    getCourse: build.query<ICourse, string>({
      query: (id) => ({
        url: `/courses/course/${id}`,
        headers: {
          hello: 'Im duoc'
        },
        params: {
          first_name: 'du',
          'last-name': 'duoc'
        }
      })
    }),
    updateCourse: build.mutation<ICourse, { id: string; body: ICourse }>({
      query(data) {
        return {
          url: `/courses/course/update/${data.id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Courses', id: data.id }])
    }),
    updateActiveStatusCourse: build.mutation<UpdateActiveStatusCourseResponse, Partial<{ courseId: string }>>({
      query: (data) => ({
        url: 'courses/course/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { courseId }) => [
        { type: 'Courses', id: 'LIST' },
        { type: 'Courses', id: courseId }
      ]
    }),
    updateSection: build.mutation<ISection, { id: string; body: ISection }>({
      query(data) {
        return {
          url: `sections/section/update/${data.id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    }),
    updateLesson: build.mutation<ILesson, { id: string; courseId?: string; body: ILesson }>({
      query(data) {
        return {
          url: `lessons/lesson/update/${data.id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    })
  })
});

export const {
  useGetCoursesQuery,
  useGetAllActiveCoursesQuery,
  useGetAllCoursesQuery,
  useGetSectionsQuery,
  useGetSectionsByCourseIdQuery,
  useGetLessonsBySectionIdQuery,
  useAddCourseMutation,
  useAddSectionMutation,
  useAddLessonMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useUpdateActiveStatusCourseMutation,
  useUpdateSectionMutation,
  useUpdateLessonMutation
} = courseApi;
