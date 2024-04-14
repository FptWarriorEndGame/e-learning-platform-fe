import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IParams } from '../../../types/params.type';
import { IUser } from '../../../types/user.type';
import { CustomError } from '../../../utils/errorHelpers';
import { TreeNode } from '../../../types/treeNode.type';
import { ISelectBox } from '../../../types/selectBox.type';
import { IActionLog } from '../../../types/actionLog.type';

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
 * 2. Chúng ta sẽ tiến hành fetch lại API get Users để cập nhật state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * =====> Cách này giúp data dưới local sẽ luôn mới nhất, luôn đồng bộ với server
 * =====> Khuyết điểm là chúng ta sẽ tốn thêm một lần gọi API. Thực ra thì điều này có thể chấp nhận được
 */

interface getUsersResponse {
  users: IUser[];
  message: string;
}

interface getUsersSelectResponse {
  users: ISelectBox[];
  message: string;
}

interface getPermissionsResponse {
  listPermission: TreeNode[][];
  message: string;
}

interface getUserResponse {
  user: IUser;
  message: string;
}

interface UpdateActiveStatusUserResponse {
  message: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

interface GetUserHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const userApi = createApi({
  reducerPath: 'userApi', // Tên field trong Redux state
  tagTypes: ['Users', 'Permissions'], // Những kiểu tag cho phép dùng trong userAPI, permissionAPI
  // keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    getUsers: build.query<getUsersResponse, IParams>({
      query: (params) => ({
        url: '/users',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Users method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Users chạy
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Users' as const, _id })),
              { type: 'Users' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Users' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Users', id: 'LIST' }];
      }
    }),
    // Generic type theo thứ tự là kiểu response trả về và argument
    getUsersSelect: build.query<getUsersSelectResponse, { role?: string }>({
      query: (params) => ({
        url: '/users/select',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Users method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Users chạy
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Users' as const, _id })),
              { type: 'Users' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Users' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Users', id: 'LIST' }];
      }
    }),
    // Generic type theo thứ tự là kiểu response trả về và argument
    getPermissions: build.query<getPermissionsResponse, IParams>({
      query: (params) => ({
        url: '/permissions',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Users method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Users chạy
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Permissions' as const, _id })),
              { type: 'Permissions' as const, id: 'LIST_PERMISSION' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Users' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Permissions', id: 'LIST_PERMISSION' }];
      }
    }),
    /**
     * Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
     * Post là response trả về và Omit<Post, 'id'> là body gửi lên
     */
    addUser: build.mutation<IUser, Omit<IUser, '_id'>>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: '/users/user/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          console.log('error: ', error);

          throw new CustomError((error as CustomError).message);
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Users sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    approveUser: build.mutation<
      {
        message: string;
      },
      { userId: string }
    >({
      query(body) {
        try {
          return {
            url: '/users/user/approve',
            method: 'PATCH',
            body
          };
        } catch (error: any) {
          console.log('error: ', error);

          throw new CustomError((error as CustomError).message);
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Users sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    updatePermission: build.mutation<any, { userId: string; listPermission: TreeNode[][] | undefined }>({
      query(body) {
        try {
          return {
            url: '/permissions/update',
            method: 'PUT',
            body: body
          };
        } catch (error: any) {
          console.log('error: ', error);

          throw new CustomError((error as CustomError).message);
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Permissions sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Permissions', id: 'LIST_PERMISSION' }])
    }),
    getUser: build.query<getUserResponse, string>({
      query: (id) => ({
        url: `/users/user/${id}`
        // headers: {
        //   hello: 'Im duoc'
        // },
        // params: {
        //   first_name: 'du',
        //   'last-name': 'duoc'
        // }
      })
    }),
    updateUser: build.mutation<IUser, { _id: string; body: Omit<IUser, '_id'> }>({
      query(data) {
        return {
          url: `/users/user/update/${data._id}`,
          method: 'PUT',
          body: data.body
        };
      },
      // Trong trường hợp này thì Users sẽ chạy lại
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    updateUserSetting: build.mutation<IUser, { _id: string; body: Omit<IUser, '_id'> }>({
      query(data) {
        return {
          url: `/users/user/setting/${data._id}`,
          method: 'PUT',
          body: data.body
        };
      },
      // Trong trường hợp này thì Users sẽ chạy lại
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    updateActiveStatusUser: build.mutation<UpdateActiveStatusUserResponse, Partial<{ userId: string }>>({
      query: (data) => ({
        url: 'users/user/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: 'Users', id: 'LIST' },
        { type: 'Users', id: userId }
      ]
    }),
    getUserHistories: build.query<GetUserHistoriesResponse, { userId: string; params: IParams }>({
      query: ({ userId, params }) => ({
        url: `users/user/histories/${userId}`,
        params: params
      }),
      providesTags: (result, error, { userId }) => [
        { type: 'Users' as const, id: 'LIST' },
        { type: 'Users' as const, id: userId }
      ]
    }),
    ChangePassword: build.mutation<
      ChangePasswordResponse,
      { userId: string; oldPassword: string; newPassword: string }
    >({
      query: ({ userId, oldPassword, newPassword }) => ({
        url: `users/user/change-password`,
        method: 'POST',
        body: { userId, oldPassword, newPassword }
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: 'Users', id: 'LIST' },
        { type: 'Users', id: userId }
      ]
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUsersSelectQuery,
  useGetPermissionsQuery,
  useAddUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateActiveStatusUserMutation,
  useUpdatePermissionMutation,
  useApproveUserMutation,
  useGetUserHistoriesQuery,
  useChangePasswordMutation,
  useUpdateUserSettingMutation
} = userApi;
