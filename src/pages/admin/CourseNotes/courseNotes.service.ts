import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { INote } from '../../../types/note.type';
import { IParams } from '../../../types/params.type';
import { ILesson } from '../../../types/lesson.type';
import { ICourse } from '../../../types/course.type';
// Sử dụng các type được định nghĩa trong file gốc

interface GetNotesResponse {
  notes: INote[];
  message?: string;
}

interface GetNoteResponse {
  notes: INote;
  message?: string;
}

interface getLessonsResponse {
  lessons: ILesson[];
  message: string;
}

interface getCoursesResponse {
  courses: ICourse[];
  message: string;
}

export const courseNoteApi = createApi({
  reducerPath: 'courseNoteApi',
  tagTypes: ['Note', 'Lesson', 'Course'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`, // Sử dụng baseUrl đã được định nghĩa
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    getAllNotes: build.query<GetNotesResponse, void>({
      query: () => '/note',
      providesTags: (result) => (result ? [{ type: 'Note', id: 'LIST' }] : [])
    }),
    getNotes: build.query<GetNotesResponse, IParams>({
      query: (params) => ({
        url: '/note',
        params: params
      }),
      providesTags: (result) => (result ? [{ type: 'Note', id: 'LIST' }] : [])
    }),
    getNoteById: build.query<GetNoteResponse, string>({
      query: (id) => `/note/noteId/${id}`,
      providesTags: (result, error, id) => [{ type: 'Note', id }]
    }),
    createNote: build.mutation<GetNoteResponse, Partial<INote> & { lessonId: ILesson }>({
      query: (note) => ({
        url: '/note/createNote',
        method: 'POST',
        body: note
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),
    updateNote: build.mutation<GetNoteResponse, Partial<INote> & { id: string }>({
      query: ({ id, ...rest }) => ({
        url: `/note/update/${id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),
    deleteNote: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/note/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),
    getNotesByLessonId: build.query<GetNotesResponse, string>({
      query: (lessonId) => `/note/lesson/${lessonId}`,
      providesTags: (result) => (result ? [{ type: 'Note', id: 'LIST' }] : [])
    }),
    getNotesByUserId: build.query<GetNotesResponse, string>({
      query: (userId) => `/note/user/${userId}`,
      providesTags: (result) => (result ? [{ type: 'Note', id: 'LIST' }] : [])
    }),
    getLessons: build.query<getLessonsResponse, void>({
      query: () => '/lessons',
      providesTags: (result) => (result ? [{ type: 'Lesson', id: 'LIST' }] : [])
    }),
    getAllCourses: build.query<getCoursesResponse, void>({
      query: () => ({
        url: '/courses'
      }),
      providesTags: (result) => (result ? [{ type: 'Course', id: 'LIST' }] : [])
    })
  })
});

export const {
  useGetAllNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesByLessonIdQuery,
  useGetNotesByUserIdQuery,
  useGetNotesQuery,
  useGetLessonsQuery,
  useGetAllCoursesQuery
} = courseNoteApi;
