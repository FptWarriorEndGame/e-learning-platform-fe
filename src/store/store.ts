import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rtkQueryErrorLogger } from '../middleware/middleware';
import { authorReportApi } from '../pages/admin/AuthorReport/authorReport.service';
import { blogApi } from '../pages/admin/Blog/blog.service';
import blogReducer from '../pages/admin/Blog/blog.slice';
import { blogCategoryApi } from '../pages/admin/BlogCategories/categoriesBlog.service';
import BlogcategoryReducer from '../pages/admin/BlogCategories/categoriesBlog.slice';
import { blogCommentsApi } from '../pages/admin/BlogComments/blogComments.service';
import BlogCommentsReducer from '../pages/admin/BlogComments/blogComments.slice';
import { categoryApi } from '../pages/admin/Categories/category.service';
import categoryReducer from '../pages/admin/Categories/category.slice';
import { couponApi } from '../pages/admin/Coupons/coupon.service';
import { couponTypeApi } from '../pages/admin/CouponTypes/couponType.service';
import { courseNoteApi } from '../pages/admin/CourseNotes/courseNotes.service';
import notesCourseReducer from '../pages/admin/CourseNotes/courseNotes.slice';
import { courseApi } from '../pages/admin/Courses/course.service';
import courseReducer from '../pages/admin/Courses/course.slice';
import { discussApi } from '../pages/admin/Discuss/discuss.service';
import DiscussReducer from '../pages/admin/Discuss/discuss.slice';
import { feedbackApi } from '../pages/admin/Feedbacks/feedback.service';
import { orderApi } from '../pages/admin/Orders/order.service';
import orderReducer from '../pages/admin/Orders/order.slice';
import { reportApi } from '../pages/admin/report.service';
import reportReducer from '../pages/admin/report.slice';
import { reviewApi } from '../pages/admin/Reports/components/ReviewsCenter/review.service';
import { subscribeApi } from '../pages/admin/SubscribeEmail/SubscribeEmail.service';
import { transactionApi } from '../pages/admin/Transactions/transaction.service';
import { userApi } from '../pages/admin/Users/user.service';
import userReducer from '../pages/admin/Users/user.slice';
import { authApi } from '../pages/auth.service';
import authReducer from '../pages/auth.slice';
import { clientApi } from '../pages/site/client.service';
import clientReducer from '../pages/site/client.slice';

const rootReducer = combineReducers({
  course: courseReducer,
  [courseApi.reducerPath]: courseApi.reducer,
  // course: courseReducer,
  [authorReportApi.reducerPath]: authorReportApi.reducer,
  order: orderReducer,
  [orderApi.reducerPath]: orderApi.reducer,
  category: categoryReducer,
  [userApi.reducerPath]: userApi.reducer,
  user: userReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  client: clientReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  report: reportReducer,
  [reportApi.reducerPath]: reportApi.reducer,
  blog: blogReducer,
  [blogApi.reducerPath]: blogApi.reducer,
  blogCategories: BlogcategoryReducer,
  [blogCategoryApi.reducerPath]: blogCategoryApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [subscribeApi.reducerPath]: subscribeApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  noteCourse: notesCourseReducer,
  [courseNoteApi.reducerPath]: courseNoteApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer,
  [couponTypeApi.reducerPath]: couponTypeApi.reducer,
  blogComments: BlogCommentsReducer,
  [blogCommentsApi.reducerPath]: blogCommentsApi.reducer,
  discuss: DiscussReducer,
  [discussApi.reducerPath]: discussApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      courseApi.middleware,
      orderApi.middleware,
      subscribeApi.middleware,
      authorReportApi.middleware,
      categoryApi.middleware,
      userApi.middleware,
      clientApi.middleware,
      authApi.middleware,
      reportApi.middleware,
      blogApi.middleware,
      blogCategoryApi.middleware,
      feedbackApi.middleware,
      transactionApi.middleware,
      reviewApi.middleware,
      courseNoteApi.middleware,
      couponApi.middleware,
      couponTypeApi.middleware,
      blogCommentsApi.middleware,
      discussApi.middleware,
      rtkQueryErrorLogger
    )
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Write Hello world function in javascript
