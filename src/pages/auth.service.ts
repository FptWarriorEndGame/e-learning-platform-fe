import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../constant/backend-domain';
import { IUser } from '../types/user.type';
import { CustomError } from '../utils/errorHelpers';
import { EnumType } from '../types/enumData.type';


interface loginResponse {
  token: string;
  userId: string;
  message: string;
  enumData?: Record<string, Record<string, string>>
  listPermission?: string[]
}
interface signupResponse {
  userId: string;
  message: string;
}
interface signUpRequestResponse {
  userId: string;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Authentication'], 
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/auth`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      const token = localStorage.getItem('token');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
        headers.set('adminRole', 'admin');
      }
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set('userRole', 'user');
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    
    login: build.mutation<loginResponse, { email: string; password: string }>({
      query(body) {
        try {
          return {
            url: 'login',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
     
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
   
    logout: build.mutation<loginResponse, void>({
      query(body) {
        try {
    
          return {
            url: 'logout',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
     
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    adminLogout: build.mutation<loginResponse, void>({
      query(body) {
        try {
     
          return {
            url: 'admin/logout',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),

    updateLastLogin: build.mutation<loginResponse, { userId: string; lastLogin: Date }>({
      query(body) {
        try {
          return {
            url: `${body.userId}/last-login`,
            method: 'PATCH',
            body: {
              lastLogin: body.lastLogin
            }
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),

    adminLogin: build.mutation<loginResponse, { email: string; password: string }>({
      query(body) {
        try {
          return {
            url: 'admin-login',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    adminSignUpRequest: build.mutation<signUpRequestResponse, { email: string; password: string }>({
      query(body) {
        try {
          return {
            url: 'admin/signup-request',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
     
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    signup: build.mutation<signupResponse, Omit<IUser, '_id'>>({
      query(body) {
        return {
          url: `signup`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    resetPassword: build.mutation<{ message: string; user: { _id: string; email: string } }, { email: string }>({
      query(data) {
        return {
          url: `reset`,
          method: 'POST',
          body: {
            email: data.email
          }
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    generateNewPassword: build.mutation<any, { password: string; userId: string; passwordToken: string }>({
      query(data) {
        return {
          url: `new-password`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    googleLogin: build.mutation<loginResponse, { token: string }>({
      query(body) {
        return {
          url: 'google-login',
          method: 'POST',
          body
        };
      },
      invalidatesTags: (_, error) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),

    githubLogin: build.mutation<loginResponse, { code: string }>({
      query(body) {
        return {
          url: 'github-login',
          method: 'POST',
          body
        };
      }
    }),
    facebookLogin: build.mutation<loginResponse, { token: string }>({
      query(body) {
        return {
          url: 'facebook-login',
          method: 'POST',
          body
        };
      },
      invalidatesTags: (_, error) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    })
  })
});

export const {
  useLoginMutation,
  useAdminLoginMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useGenerateNewPasswordMutation,
  useUpdateLastLoginMutation,
  useLogoutMutation,
  useAdminLogoutMutation,
  useGoogleLoginMutation,
  useGithubLoginMutation,
  useFacebookLoginMutation
} = authApi;
