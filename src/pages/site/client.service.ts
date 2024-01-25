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
import { IReview } from '../../types/review.type';
import { CustomError } from '../../utils/helpers';
import { Blog } from '../../types/page.type';

/**
 * Mô hình sync dữ liệu danh sách bài post dưới local sau khi thêm 1 bài post
 * Thường sẽ có 2 cách tiếp cận
 * Cách 1: Đây là cách những video trước đây mình dùng
 * 1. Sau khi thêm 1 bài post thì server sẽ trả về data của bài post đó
 * 2. Chúng ta sẽ tiến hành lấy data đó thêm vào state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * ====> Rủi ro cách này là nếu khi gọi request add post mà server trả về data không đủ các field để
 * chúng ta hiển thị thì sẽ gặp lỗi. Nếu có nhiều người cùng add post thì data sẽ sync thiếu,
 * Chưa kể chúng ta phải quản lý việc cập nhật state nữa, hơi mệt!
 *
 *
 * Cách 2: Đây là cách thường dùng với RTK query
 * 1. Sau khi thêm 1 bài post thì server sẽ trả về data của bài post đó
 * 2. Chúng ta sẽ tiến hành fetch lại API get Orders để cập nhật state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * =====> Cách này giúp data dưới local sẽ luôn mới nhất, luôn đồng bộ với server
 * =====> Khuyết điểm là chúng ta sẽ tốn thêm một lần gọi API. Thực ra thì điều này có thể chấp nhận được
 */

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

export interface getSectionsResponse {
  sections: ISection[];
  message: string;
}

export interface getLessonsResponse {
  lessons: ILesson[];
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
  totalPages: number;
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

export const clientApi = createApi({
  reducerPath: 'clientApi', // Tên field trong Redux state
  tagTypes: ['Clients', 'Users', 'Orders', 'Courses', 'Reviews', 'Wishlist'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ABCXYZ');

      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(token);

        headers.set('UserId', decodedToken.userId);
      }

      // Add the userId header

      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    getCategories: build.query<getCategoriesResponse, void>({
      query: () => '/categories', // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCourses: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getPopularCourses: build.query<getPopularCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses/popular',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),

    getAuthors: build.query<getAuthorsResponse, void>({
      query: () => ({
        url: '/users/authors'
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
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
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
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
            console.log('final: ', final);

            return final;
          }
        }
        return [{ type: 'Users', id: 'LIST' }];
      }
    }),
    getRetrieveCart: build.query<getRetrieveCartResponse, { courseIds: string[] }>({
      query: (params) => ({
        url: `/carts/retrieve`,
        params: {
          _courseIds: params.courseIds
        }
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
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
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
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
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Orders sẽ chạy lại
       */
      // invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Clients', id: 'LIST' }])
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
        // headers: {
        //   hello: 'Im Sang'
        // }
      }),
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
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
        // headers: {
        //   userId: 'Im Sang'
        // }
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
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: `certificates/certificate/generate`,
            method: 'POST',
            body: body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Orders sẽ chạy lại
       */
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
        url: `users//user/${userId}`,
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
      query: ({ _page = 1, _limit = 5 }) => ({
        url: `blog/?page=${_page}&limit=${_limit}`
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
        url: `courses/course/reviews/${courseId}`,
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
      invalidatesTags: () => [{ type: 'Wishlist', id: 'LIST' }, { type: 'Wishlist', id: 'CREATE' }]
    }),
    deleteWishlist: build.mutation<DeleteWishlistResponse, { courseId: string; userId: string }>({
      query: ({ courseId, userId }) => ({
        url: `wishlists/wishlist/delete/${courseId}`,
        method: 'DELETE',
        body: { userId }
      }),
      invalidatesTags: () => [{ type: 'Wishlist', id: 'LIST' }]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetAuthorsQuery,
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
  useGetCoursesFromWishlistByUserIdQuery
} = clientApi;
