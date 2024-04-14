import { IReview, IReviewReply } from '../../types/review.type';
import { ICoupon } from '../../types/coupon.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { BACKEND_URL } from '../../constant/backend-domain';
import { ICategory } from '../../types/category.type';
import { ICertificate } from '../../types/certificate';
import { ICourse } from '../../types/course.type';
import { ILesson, ISection } from '../../types/lesson.type';
import { IOrder, IOrderHistory } from '../../types/order.type';
import { IParams } from '../../types/params.type';
import { IUser } from '../../types/user.type';
import { IContact } from '../../types/contact.type';
import { CustomError } from '../../utils/errorHelpers';
import { Blog } from '../../types/page.type';
import { IBlogComment } from '../../types/blogComments.type';
import { INote } from '../../types/note.type';
import { IDataSelect } from '../../types/dataSelect.type';
import { IDiscuss } from '../../types/discuss.type';
import { ISubscribe } from '../../types/subscribe.type';

interface getCategoriesResponse {
  categories: ICategory[];
  message: string;
}

export interface getCoursesResponse {
  courses: ICourse[];
  message: string;
  pagination: {
    _limit: number;
    _totalRows: number;
    _page: number;
  };
}

export interface getPopularCoursesResponse {
  courses: ICourse[];
  pagination: {
    _limit: number;
    _totalRows: number;
    _page: number;
  };
  message: string;
}

export interface getRetrieveCartResponse {
  cart: {
    items: ICourseDetail[];
    totalPrice: number;
  };
  duplicatedIds: string[];
  message: string;
}

export interface getAuthorsResponse {
  message: string;
  authors: [
    string,
    {
      name: string;
      _id: string;
    }
  ][];
}
export interface getAuthorsSelectResponse {
  message: string;
  authors: {
    name: string;
    label: string;
  }[];
}
export interface getCategoriesSelectResponse {
  message: string;
  categories: {
    name: string;
    label: string;
  }[];
}

export interface getSectionsResponse {
  sections: ISection[];
  message: string;
}

export interface getLessonsResponse {
  lessons: ILesson[];
  message: string;
}

export interface getUserByCourseResponse {
  users: IUser[];
  message: string;
}

export interface getCourseResponse {
  course: ICourse;
  message: string;
}

export interface ICourseEnrolledByUser extends ICourse {
  progress: number;
  totalVideosLengthDone: number;
  isBought: boolean;
  lessons: ILesson[];
  lessonsDone: string[];
  sections: ISection[];
}

export interface getCourseEnrolledByUserResponse {
  course: ICourseEnrolledByUser;
  message: string;
}

export interface ICourseDetail extends ICourse {
  lessons: number;
  sections: number;
  numOfReviews: number;
  totalVideosLength: number;
  avgRatingStars: number;
  students: number;
  isBought: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateDiscussionRequest {
  discussId: string;
  comments: string;
}

export interface getCourseDetailResponse {
  course: ICourseDetail;
  message: string;
}

export interface createOrderResponse {
  order: IOrder;
  message: string;
}

export interface getUserResponse {
  user: IUser;
  message: string;
}

export interface IUserDetail extends IUser {
  courses: ICourseEnrolledByUser[];
  achievement: string;
}

export interface getUserDetailResponse {
  user: IUserDetail;
  message: string;
}

export interface certificateRequest {
  courseId: string;
  userId: string;
  completionDate: string;
}

export interface createCertificateResponse {
  message: string;
  certificate: ICertificate;
}

export interface getCertificateResponse {
  certificate: ICertificate;
  message: string;
}

export interface UpdateUserResponse {
  message: string;
  userId: string;
}

export interface getOrdersByUserIdResponse {
  orders: IOrderHistory[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  message: string;
}

export interface GetOrderByIdResponse {
  message: string;
  order: IOrderHistory;
}

export interface GetAllBlogReponse {
  blogs: Blog[];
  message: string;
  totalPages: number | undefined;
}

export interface GetBlogByIdResponse {
  blog: Blog;
  message: string;
}
export interface RelatedCoursesResponse {
  message: string;
  relatedCourses: ICourse[];
}

export interface CreateReviewResponse {
  message: string;
  review: IReview;
}
export interface CreateSubscribeResponse {
  message: string;
  subscribe: ISubscribe;
}
export interface CreateVnpayUrlResponse {
  redirectUrl: string;
}

export interface SuggestedCoursesResponse {
  message: string;
  suggestedCourses: ICourse[];
}

export interface CreateWishlistResponse {
  message: string;
  wishlist: {
    _id: string;
    courseId: string;
    userId: string;
  };
}

export interface DeleteWishlistResponse {
  message: string;
}

export interface GetCourseIdsFromWishlistByUserIdResponse {
  message: string;
  data: string[];
}

export interface GetCoursesFromWishlistByUserIdResponse {
  message: string;
  courses: ICourse[];
}

export interface CreateContactResponse {
  message: string;
  contact: IContact;
}

export interface GetBlogCommentsResponse {
  length: number;
  comments: IBlogComment[];
  message: string;
}

export interface AddBlogCommentResponse {
  comment: IBlogComment;
  message: string;
}

interface GetNotesResponse {
  notes: INote[];
  message: string;
}

interface CreateNoteRequest {
  userId: string;
  lessonId: string;
  content: string;
  videoMinute: number;
  courseId: string;
}

interface UpdateNoteRequest {
  _id: string;
  content: string;
}

interface NoteResponse {
  note: INote;
  message: string;
}

interface GetReviewsByCourseIdResponse {
  message: string;
  reviews: IReview[];
  total: number;
}

export interface GetTotalReviewsByCourseIdResponse {
  message: string;
  totalReviews: number;
}

export interface GetAverageRatingByCourseIdResponse {
  message: string;
  averageRating: number;
}

export interface GetRatingPercentageByCourseIdResponse {
  message: string;
  ratingPercentages: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
  };
}

export interface GetReviewRepliesByReviewIdResponse {
  message: string;
  replies: IReviewReply[];
}

export interface GetCouponsValidForCoursesResponse {
  message: string;
  coupons: ICoupon[] | null;
  maxDiscountCoupon: ICoupon | null;
}

export interface GetTotalPriceResponse {
  message: string;
  totalPrice: number;
  discountPrice: number;
}

export interface GetAllDiscussionsResponse {
  message: string;
  discuss: IDiscuss[];
}

export interface GetDiscussionsByLessonIdResponse {
  message: string;
  discuss: IDiscuss[];
}

export interface GetDiscussionsBySectionIdResponse {
  message: string;
  discuss: IDiscuss[];
}

export interface AddDiscussionResponse {
  message: string;
  discuss: IDiscuss;
}

interface AddDiscussionRequest {
  comments: string;
  userId: string;
  parentDiscussId: string;
  lessonId: string;
  courseId: string;
  title: string;
}

export interface UpdateDiscussionResponse {
  message: string;
  discuss: IDiscuss;
}

export interface DeleteDiscussionResponse {
  message: string;
}

export interface GetFreeLessonsByCourseIdResponse {
  message: string;
  lessons: ILesson[];
}

export const clientApi = createApi({
  reducerPath: 'clientApi',
  tagTypes: [
    'Clients',
    'Users',
    'Orders',
    'Courses',
    'Reviews',
    'Wishlist',
    'Feedbacks',
    'Coupons',
    'BlogComment',
    'Note',
    'Discussions',
    'Subscribe'
  ],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
    prepareHeaders(headers) {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(token);
        headers.set('authorization', `Bearer ${token}`);
        headers.set('UserId', decodedToken.userId);
      } else {
        headers.set('role', 'client');
      }

      return headers;
    }
  }),
  endpoints: (build) => ({
    getCategories: build.query<getCategoriesResponse, void>({
      query: () => '/categories',
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            return final;
          }
        }

        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCourses: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getPopularCourses: build.query<getPopularCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses/popular',
        params: params
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            return final;
          }
        }
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),

    getAuthors: build.query<getAuthorsResponse, void>({
      query: () => ({
        url: '/users/authors'
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getAuthorsSelect: build.query<IDataSelect[], void>({
      query: () => ({
        url: '/users/authors/select'
      }),
      providesTags() {
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCategoriesSelect: build.query<IDataSelect[], void>({
      query: () => ({
        url: '/categories/select'
      }),
      providesTags() {
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),

    getCoursesOrderedByUser: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: `/courses/ordered/${params._userId as string}`,
        params: {
          _limit: params._limit,
          _page: params._page
        }
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            return final;
          }
        }

        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getUserDetail: build.query<getUserDetailResponse, IParams>({
      query: (params) => ({
        url: `/users/user/detail/${params._userId as string}`,
        params: {
          _limit: params._limit,
          _page: params._page
        }
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Users' as const, _id })),
              { type: 'Users' as const, id: 'LIST' }
            ];
            return final;
          }
        }
        return [{ type: 'Users', id: 'LIST' }];
      }
    }),
    getRetrieveCart: build.query<getRetrieveCartResponse, { courseIds: string[]; userId: string }>({
      query: (params) => ({
        url: `/carts/retrieve`,
        params: {
          _courseIds: params.courseIds,
          _userId: params.userId
        }
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            return final;
          }
        }

        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    createOrder: build.mutation<createOrderResponse, Omit<IOrder, '_id'>>({
      query(body) {
        try {
          return {
            url: 'orders/order/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },

      invalidatesTags: (result, error, body) =>
        error
          ? []
          : [
              { type: 'Orders' as const, id: 'LIST' },
              { type: 'Clients' as const, id: 'LIST' },
              { type: 'Courses' as const, id: 'LIST' }
            ]
    }),
    updateLessonDoneByUser: build.mutation<createOrderResponse, { userId: string; lessonId: string }>({
      query(body) {
        try {
          return {
            url: `lessons/lesson/done/${body.lessonId}`,
            method: 'POST',
            body: {
              userId: body.userId
            }
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      }
    }),
    getCategory: build.query<ICategory, string>({
      query: (id) => ({
        url: `categories/category/${id}`,
        headers: {
          hello: 'Im Sang'
        }
      })
    }),
    getCourse: build.query<getCourseResponse, string>({
      query: (id) => ({
        url: `courses/course/${id}`
      })
    }),
    getCourseEnrolledByUser: build.query<getCourseEnrolledByUserResponse, string>({
      query: (id) => ({
        url: `courses/course/enrolled/${id}`
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            return final;
          }
        }

        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCourseDetail: build.query<getCourseDetailResponse, { courseId: string; userId: string }>({
      query: (params) => {
        return {
          url: `courses/course/detail/${params.courseId}?userId=${params.userId}`
        };
      }
    }),
    getSectionsByCourseId: build.query<getSectionsResponse, string>({
      query: (courseId) => ({
        url: `sections/course/${courseId}`
      })
    }),
    getCertificate: build.query<getCertificateResponse, { courseId: string; userId: string }>({
      query: (params) => ({
        url: `certificates/certificate/get`,
        params: params
      })
    }),
    createCertificate: build.mutation<createCertificateResponse, certificateRequest>({
      query(body) {
        try {
          return {
            url: `certificates/certificate/generate`,
            method: 'POST',
            body: body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Clients', id: 'LIST' }])
    }),
    getLessonsBySectionId: build.query<getLessonsResponse, { sectionId: string; userId: string }>({
      query: (payload) => ({
        url: `lessons/section/${payload.sectionId}`,
        headers: {
          userId: payload.userId
        }
      })
    }),
    getAllUserByCourse: build.query<getUserByCourseResponse, { courseId: string }>({
      query: (payload) => ({
        url: `/courses/course/getUserByCourse/${payload.courseId}`
      })
    }),
    getAllLessons: build.query<getLessonsResponse, void>({
      query: () => 'lessons/getAllLesson'
    }),
    getLessonsBySectionIdEnrolledCourse: build.query<getLessonsResponse, { sectionId: string; userId: string }>({
      query: (payload) => ({
        url: `lessons/section/course-enrolled/${payload.sectionId}`,
        headers: {
          userId: payload.userId
        }
      })
    }),
    getUser: build.query<getUserResponse, string>({
      query: (id) => ({
        url: `users/user/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Users', id }]
    }),
    updateUser: build.mutation<UpdateUserResponse, { userId: string; formData: FormData }>({
      query: ({ userId, formData }) => ({
        url: `users/user/${userId}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Users', id: userId }]
    }),
    getOrderById: build.query<GetOrderByIdResponse, string>({
      query: (orderId) => ({
        url: `orders/order/${orderId}`
      }),
      providesTags: (result, error, orderId) => [{ type: 'Orders', id: orderId }]
    }),
    getOrdersByUserId: build.query<getOrdersByUserIdResponse, { userId: string; page: number; limit: number }>({
      query: ({ userId, page, limit }) => `orders/user/${userId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, { userId }) => [{ type: 'Orders', id: userId }]
    }),

    getAllBlogs: build.query<GetAllBlogReponse, IParams>({
      query: (params) => ({
        url: `blog`,
        params
      })
    }),

    getBlogById: build.query<GetBlogByIdResponse, string>({
      query: (_id) => ({
        url: `/blog/${_id}`
      })
    }),

    getRelatedCourses: build.query<RelatedCoursesResponse, { courseId: string; limit: number; userId?: string }>({
      query: ({ courseId, limit, userId }) => ({
        url: `courses/related/${courseId}`,
        params: { limit, userId },
        method: 'GET'
      }),
      providesTags: () => [{ type: 'Courses', id: 'LIST' }]
    }),
    createReview: build.mutation<
      CreateReviewResponse,
      { courseId: string; title: string; content: string; ratingStar: number; orderId: string; userId: string }
    >({
      query: ({ courseId, title, content, ratingStar, orderId, userId }) => ({
        url: `reviews/review/create`,
        method: 'POST',
        body: { courseId, title, content, ratingStar, orderId, userId }
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Reviews', id: 'LIST' },
        { type: 'Orders', id: orderId }
      ]
    }),
    createVnpayUrl: build.mutation<CreateVnpayUrlResponse, { orderId: string; amount: number; bankCode?: string }>({
      query: ({ orderId, amount, bankCode }) => ({
        url: `payments/vnpay/create_vnpayment_url`,
        method: 'POST',
        body: { orderId, amount, bankCode }
      })
    }),
    createSubscribe: build.mutation<CreateSubscribeResponse, { email: string }>({
      query: ({ email }) => ({
        url: `subscribe/create`,
        method: 'POST',
        body: { email }
      })
    }),
    getSuggestedCourses: build.query<SuggestedCoursesResponse, { userId: string; limit?: number }>({
      query: ({ userId, limit = 5 }) => ({
        url: `courses/suggested/${userId}`,
        params: { limit },
        method: 'GET'
      }),
      providesTags: () => [{ type: 'Courses', id: 'LIST' }]
    }),
    getCourseIdsFromWishlistByUserId: build.query<GetCourseIdsFromWishlistByUserIdResponse, string>({
      query: (userId) => `courses/id/wishlist/${userId}`,
      providesTags: () => [{ type: 'Wishlist', id: 'LIST' }]
    }),
    getCoursesFromWishlistByUserId: build.query<GetCoursesFromWishlistByUserIdResponse, string>({
      query: (userId) => `courses/wishlist/${userId}`,
      providesTags: () => [
        { type: 'Courses', id: 'LIST' },
        { type: 'Wishlist', id: 'CREATE' }
      ]
    }),
    createWishlist: build.mutation<CreateWishlistResponse, { courseId: string; userId: string }>({
      query: ({ courseId, userId }) => ({
        url: `wishlists/wishlist/create`,
        method: 'POST',
        body: { courseId, userId }
      }),
      invalidatesTags: () => [
        { type: 'Wishlist', id: 'LIST' },
        { type: 'Wishlist', id: 'CREATE' }
      ]
    }),
    deleteWishlist: build.mutation<DeleteWishlistResponse, { courseId: string; userId: string }>({
      query: ({ courseId, userId }) => ({
        url: `wishlists/wishlist/delete/${courseId}`,
        method: 'DELETE',
        body: { userId }
      }),
      invalidatesTags: () => [{ type: 'Wishlist', id: 'LIST' }]
    }),
    createFeedback: build.mutation<CreateContactResponse, IContact>({
      query: (contactDetails) => ({
        url: 'feedbacks/feedback/create',
        method: 'POST',
        body: contactDetails
      }),
      invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }]
    }),
    getBlogComments: build.query<GetBlogCommentsResponse, string>({
      query: (blogId) => `/comments/${blogId}`,
      providesTags: (result, error, blogId) => [{ type: 'BlogComment', id: blogId }]
    }),
    addBlogComment: build.mutation<AddBlogCommentResponse, { blogId: string; content: string; userId: string }>({
      query: (commentData) => ({
        url: '/comments',
        method: 'POST',
        body: commentData
      }),
      invalidatesTags: (result, error, commentData) => [{ type: 'BlogComment', id: commentData.blogId }]
    }),
    updateBlogComment: build.mutation<AddBlogCommentResponse, { commentId: string; content: string }>({
      query: ({ commentId, content }) => ({
        url: `/comments/${commentId}`,
        method: 'PUT',
        body: { content }
      }),
      invalidatesTags: (result, error, { commentId }) => [{ type: 'BlogComment', id: commentId }]
    }),
    deleteBlogComment: build.mutation<{ message: string }, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'BlogComment', id: 'LIST' }]
    }),
    toggleLikeComment: build.mutation<{ message: string }, { commentId: string; userId: string }>({
      query: (likeData) => ({
        url: `/comments/like`,
        method: 'PATCH',
        body: likeData
      }),
      invalidatesTags: (result, error, likeData) => [{ type: 'BlogComment', id: likeData.commentId }]
    }),
    // Thêm phản hồi cho một bình luận
    addReplyToComment: build.mutation<
      AddBlogCommentResponse,
      { parentCommentId: string; content: string; userId: string; blogId: string }
    >({
      query: (replyData) => ({
        url: '/comments/reply',
        method: 'POST',
        body: replyData
      }),
      invalidatesTags: (result, error, replyData) => [{ type: 'BlogComment', id: replyData.blogId }]
    }),

    getAllNotes: build.query<GetNotesResponse, string>({
      query: () => ({
        url: '/note/getAll'
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.notes.map(({ _id }) => ({ type: 'Note' as const, id: _id.toString() })),
              { type: 'Note' as const, id: 'LIST' }
            ]
          : [{ type: 'Note' as const, id: 'LIST' }]
    }),
    getNotesByLessonId: build.query<GetNotesResponse, string>({
      query: (lessonId) => `/note/lesson/${lessonId}`,
      providesTags: (result, error, lessonId) =>
        result
          ? [
              ...result.notes.map(({ _id }) => ({ type: 'Note' as const, id: _id.toString() })),
              { type: 'Note', id: 'LIST' }
            ]
          : [{ type: 'Note', id: 'LIST' }]
    }),
    // Fetch notes by user ID
    getNotesByUserId: build.query<GetNotesResponse, string>({
      query: (userId) => ({
        url: `/note/${userId}`
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.notes.map(({ _id }) => ({ type: 'Note' as const, id: _id.toString() })),
              { type: 'Note' as const, id: 'LIST' }
            ]
          : [{ type: 'Note' as const, id: 'LIST' }]
    }),

    // Create a note
    createNote: build.mutation<NoteResponse, CreateNoteRequest>({
      query: ({ userId, lessonId, content, videoMinute, courseId }) => ({
        url: `/note/createNote/${lessonId}`,
        method: 'POST',
        body: {
          userId,
          lessonId,
          content,
          videoMinute,
          courseId
        }
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),

    // Update a note
    updateNote: build.mutation<NoteResponse, UpdateNoteRequest>({
      query: ({ _id, ...rest }) => ({
        url: `/note/update/${_id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Note', id: _id }]
    }),

    // Delete a note
    deleteNote: build.mutation<{ message: string }, string>({
      query: (noteId) => ({
        url: `/note/delete/${noteId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, noteId) => [{ type: 'Note', id: noteId }]
    }),

    filterNotes: build.query<GetNotesResponse, string>({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return `/note/filter/?${queryString}`;
      }
    }),

    getReviewsByCourseId: build.query<GetReviewsByCourseIdResponse, { courseId: string; params?: IParams }>({
      query: ({ courseId, params }) => ({
        url: `reviews/course/${courseId}`,
        params: params
      }),
      providesTags: (result, error, { courseId }) => [{ type: 'Reviews', id: courseId }]
    }),
    getTotalReviewsByCourseId: build.query<GetTotalReviewsByCourseIdResponse, string>({
      query: (courseId) => ({
        url: `reviews/course/count/${courseId}`
      }),
      providesTags: () => [{ type: 'Reviews', id: 'LIST' }]
    }),
    getAverageRatingByCourseId: build.query<GetAverageRatingByCourseIdResponse, string>({
      query: (courseId) => ({
        url: `reviews/course/average-rating/${courseId}`
      }),
      providesTags: () => [{ type: 'Reviews', id: 'LIST' }]
    }),
    getRatingPercentageByCourseId: build.query<GetRatingPercentageByCourseIdResponse, string>({
      query: (courseId) => ({
        url: `reviews/course/percentage-rating/${courseId}`
      }),
      providesTags: () => [{ type: 'Reviews', id: 'LIST' }]
    }),
    getReviewRepliesByReviewId: build.query<GetReviewRepliesByReviewIdResponse, string>({
      query: (reviewId) => ({
        url: `reviews/review/replies/${reviewId}`
      }),
      providesTags: () => [{ type: 'Reviews', id: 'LIST' }]
    }),
    getCouponsValidForCourses: build.query<GetCouponsValidForCoursesResponse, string>({
      query: (courseIds) => ({
        url: `coupons/valid-for-courses?courseIds=${courseIds}`
      }),
      providesTags: () => [{ type: 'Coupons', id: 'LIST' }]
    }),
    getTotalPrice: build.query<GetTotalPriceResponse, { courseIds: string; couponCode?: string }>({
      query: ({ courseIds, couponCode }) => ({
        url: `carts/get-total-price`,
        params: { courseIds, couponCode }
      }),
      providesTags: () => [{ type: 'Clients', id: 'LIST' }]
    }),
    getValidCouponsForCoursesWithoutUser: build.query<GetCouponsValidForCoursesResponse, string>({
      query: (courseIds) => ({
        url: `coupons/valid-for-courses-without-user?courseIds=${courseIds}`
      }),
      providesTags: () => [{ type: 'Coupons', id: 'LIST' }]
    }),
    getTotalPriceWithoutUser: build.query<GetTotalPriceResponse, { courseIds: string; couponCode?: string }>({
      query: ({ courseIds, couponCode }) => ({
        url: `carts/get-total-price-without-user`,
        params: { courseIds, couponCode }
      }),
      providesTags: () => [{ type: 'Clients', id: 'LIST' }]
    }),
    getFreeLessonsByCourseId: build.query<GetFreeLessonsByCourseIdResponse, string>({
      query: (courseId) => ({
        url: `lessons/course/${courseId}/free-lessons`
      }),
      providesTags: () => [{ type: 'Courses', id: 'LIST' }]
    }),
    increaseCourseView: build.mutation<void, string>({
      query: (courseId) => ({
        url: `courses/course/increase-view/${courseId}`,
        method: 'POST'
      })
    }),
    // Discuss
    getAllDiscussions: build.query<GetAllDiscussionsResponse, void>({
      query: () => ({
        url: `discuss/getAll`
      }),
      providesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    getDiscussionsByLessonId: build.query<GetDiscussionsByLessonIdResponse, string>({
      query: (lessonId) => ({
        url: `discuss/lesson/${lessonId}`
      }),
      providesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    getDiscussionsBySectionId: build.query<GetDiscussionsBySectionIdResponse, string>({
      query: (sectionId) => ({
        url: `discuss/section/${sectionId}`
      }),
      providesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    getDiscussionsById: build.query<GetDiscussionsBySectionIdResponse, string>({
      query: (id) => ({
        url: `discuss/discuss/${id}`
      }),
      providesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    addDiscussion: build.mutation<AddDiscussionResponse, AddDiscussionRequest>({
      query: (newDiscussion) => ({
        url: `discuss/add`,
        method: 'POST',
        body: newDiscussion
      }),
      invalidatesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    updateDiscussion: build.mutation<UpdateDiscussionResponse, { discussId: string; comments: string }>({
      query: ({ discussId, comments }) => ({
        url: `discuss/update/${discussId}`,
        method: 'PUT',
        body: { comments }
      }),
      invalidatesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    deleteDiscussion: build.mutation<DeleteDiscussionResponse, string>({
      query: (discussId) => ({
        url: `discuss/delete/${discussId}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    }),
    addReplyToDiscuss: build.mutation<
      AddDiscussionResponse,
      {
        parentDiscussId: string;
        comments: string;
        userId: string;
      }
    >({
      query: (replyData) => ({
        url: '/discuss/reply',
        method: 'POST',
        body: replyData
      }),
      invalidatesTags: () => [{ type: 'Discussions', id: 'LIST' }]
    })
    // Discuss
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesSelectQuery,
  useGetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetAuthorsQuery,
  useGetAuthorsSelectQuery,
  useGetCourseEnrolledByUserQuery,
  useGetCoursesOrderedByUserQuery,
  useGetSectionsByCourseIdQuery,
  useGetLessonsBySectionIdQuery,
  useGetLessonsBySectionIdEnrolledCourseQuery,
  useGetUserQuery,
  useGetUserDetailQuery,
  useGetCourseQuery,
  useGetCourseDetailQuery,
  useCreateOrderMutation,
  useUpdateLessonDoneByUserMutation,
  useGetRetrieveCartQuery,
  useGetCertificateQuery,
  useCreateCertificateMutation,
  useUpdateUserMutation,
  useGetOrdersByUserIdQuery,
  useGetOrderByIdQuery,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetRelatedCoursesQuery,
  useCreateReviewMutation,
  useCreateVnpayUrlMutation,
  useGetSuggestedCoursesQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useGetCourseIdsFromWishlistByUserIdQuery,
  useGetCoursesFromWishlistByUserIdQuery,
  useCreateFeedbackMutation,
  useGetBlogCommentsQuery,
  useAddBlogCommentMutation,
  useUpdateBlogCommentMutation,
  useDeleteBlogCommentMutation,
  useToggleLikeCommentMutation,
  useAddReplyToCommentMutation,
  useGetAllNotesQuery,
  useGetNotesByUserIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesByLessonIdQuery,
  useFilterNotesQuery,
  useGetReviewsByCourseIdQuery,
  useGetTotalReviewsByCourseIdQuery,
  useGetAverageRatingByCourseIdQuery,
  useGetRatingPercentageByCourseIdQuery,
  useGetReviewRepliesByReviewIdQuery,
  useGetCouponsValidForCoursesQuery,
  useGetTotalPriceQuery,
  useGetValidCouponsForCoursesWithoutUserQuery,
  useGetTotalPriceWithoutUserQuery,
  useGetFreeLessonsByCourseIdQuery,
  useGetAllUserByCourseQuery,
  useIncreaseCourseViewMutation,
  // Discuss
  useGetAllDiscussionsQuery,
  useGetDiscussionsByLessonIdQuery,
  useGetDiscussionsBySectionIdQuery,
  useGetDiscussionsByIdQuery,
  useAddDiscussionMutation,
  useUpdateDiscussionMutation,
  useDeleteDiscussionMutation,
  useAddReplyToDiscussMutation,
  useGetAllLessonsQuery,
  useCreateSubscribeMutation
} = clientApi;
