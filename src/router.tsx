import { useSelector } from 'react-redux';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import './assets/sass/_base.scss';
import './assets/sass/reset.css';
import './assets/sass/tailwind.css';
import './assets/sass/App.css';
import InstructorsRevenues from './components/AdminLayout/Header/components/InstructorsRevenues';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './pages/Error/404Error';
import AdminAuth from './pages/admin/Auth';
import Categories from './pages/admin/Categories';
import CoursesList from './pages/admin/Courses/Courses';
import AdminCourseDetail from './pages/admin/Courses/components/CourseDetail';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import ReportsCenter from './pages/admin/Reports';
import CancelledSales from './pages/admin/Reports/components/CancelledSales';
import Certifications from './pages/admin/Reports/components/Certifications';
import CourseInsights from './pages/admin/Reports/components/CourseInsights';
import {
  default as CoursesRevenue,
  default as CoursesRevenues
} from './pages/admin/Reports/components/CoursesReveneue';
import InstructorsRevene from './pages/admin/Reports/components/InstructorsRevenue';
import ReviewsCenter from './pages/admin/Reports/components/ReviewsCenter/Reviews';
import UsersProgress from './pages/admin/Reports/components/UsersProgress';
import UsersSegment from './pages/admin/Reports/components/UsersSegments';
import Settings from './pages/admin/Settings';
import Users from './pages/admin/Users';
import About from './pages/site/About';
import AuthorProfile from './pages/site/AuthorProfile';
import Checkout from './pages/site/Checkout';
import Contact from './pages/site/Contact';
import Feedbacks from './pages/admin/Feedbacks/Feedbacks';
import CourseDetail from './pages/site/CourseDetail';
import SiteCourses from './pages/site/Courses';
import HomePage from './pages/site/Home';
import OrderCompleted from './pages/site/OrderCompleted';
import PathPlayer from './pages/site/PathPlayer';
import Profile from './pages/site/Profile';
import StartLearning from './pages/site/StartLearning';
import SubsribeCourse from './pages/site/SubscribeCourse';
import ViewCart from './pages/site/ViewCart';
import Privacy from './pages/site/Policy/Privacy';
import Terms from './pages/site/Policy/Terms';
import Cookie from './pages/site/Policy/Cookie';
import AccountSettings from './pages/site/AccountSettings/AccountSettings';
import PurchaseHistory from './pages/site/PurchaseHistory/PurchaseHistory';
import ReceiptPage from './pages/site/PurchaseHistory/ReceiptPage/ReceiptPage';
import InvoicePage from './pages/site/PurchaseHistory/InvoicePage/InvoicePage';
import { RootState } from './store/store';
import { UserRole } from './types/user.type';
import Blog from './pages/site/Blog/Blog';
import PagePost from './pages/site/PagePost/PagePost';
import Inbox from './pages/site/Inbox/Inbox';
import WishlistPage from './pages/site/Wishlist/Wishlist';
import PaymentHistory from './pages/site/PaymentHistory/PaymentHistory';
import PublicProfile from './pages/site/PublicProfile/PublicProfile';
import PaymentMethod from './pages/site/PaymentMethod/PaymentMethod';
import Social from './pages/site/Social';
import BlogList from './pages/admin/Blog/Blog';
import TransactionsPage from './pages/admin/Transactions/Transactions';
import CouponsPage from './pages/admin/Coupons/Coupons';
import CouponTypesPage from './pages/admin/CouponTypes/CouponTypes';
import Permission from './pages/admin/Users/components/Permission';
import BlogCategories from './pages/admin/BlogCategories/BlogCategories';
import AdminAuthSignUp from './pages/admin/Auth/AuthSignup';
import CourseNotes from './pages/admin/CourseNotes';
import ResetPasswordPage from './pages/site/Auth/ResetPassword';
import Welcome from './pages/admin/Welcome/welcome';
import AuthorReport from './pages/admin/AuthorReport/AuthorReport';
import BlogComments from './pages/admin/BlogComments/BlogComments';
import Discuss from './pages/admin/Discuss/Discuss';
import ChangePassword from './pages/admin/ChangePassword';
import ChangePasswordUser from './pages/site/ChangePassword';
import SubscribeEmail from './pages/admin/SubscribeEmail/index'

const RouterHooks = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isAdminAuth = useSelector((state: RootState) => state.auth.isAdminAuth);
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: '/courses',
          children: [
            {
              index: true,
              element: <SiteCourses />
            },
            {
              path: ':courseId',
              element: <CourseDetail />
            }
          ]
        },
        {
          path: '/blog',
          element: <PagePost />
        },
        {
          path: '/blog-detail/:id',
          element: <Blog />
        },
        {
          path: 'start',
          element: isAuth ? <StartLearning /> : <ErrorPage page='/' />
        },
        {
          path: 'profile',
          // element: isAuth ? <Profile /> : <ErrorPage page='/' />
          element: <Profile />
        },
        {
          path: 'view-cart',
          element: <ViewCart />
        },
        {
          path: 'checkout',
          element: isAuth ? <Checkout /> : <ErrorPage page='/' />
        },
        {
          path: 'order-completed',
          element: isAuth ? <OrderCompleted /> : <ErrorPage page='/' />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'inbox',
          element: <Inbox />
        },
        {
          path: 'about-us',
          element: <About />
        },
        {
          path: 'social',
          element: <Social />
        },
        {
          path: 'user',
          children: [
            {
              path: ':userId',
              element: <AuthorProfile />
            }
          ]
        },
        {
          path: 'privacy',
          element: <Privacy />
        },
        {
          path: 'terms',
          element: <Terms />
        },
        {
          path: 'cookies',
          element: <Cookie />
        },
        {
          path: 'account-settings',
          element: isAuth ? <AccountSettings /> : <ErrorPage page='/' />
        },
        {
          path: 'purchase-history',
          element: isAuth ? <PurchaseHistory /> : <ErrorPage page='/' />
        },
        {
          path: 'wishlist',
          element: isAuth ? <WishlistPage /> : <ErrorPage page='/' />
        },
        {
          path: 'change-password',
          element: isAuth ? <ChangePasswordUser /> : <ErrorPage page='/' />
        },
        {
          path: 'payment-history',
          element: <PaymentHistory />
        },
        {
          path: 'cart-receipt',
          children: [
            {
              path: ':orderId',
              element: isAuth ? <ReceiptPage /> : <ErrorPage page='/' />
            }
          ]
        },
        {
          path: 'cart-invoice/:orderId',
          element: <InvoicePage />
        },
        {
          path: 'publicprofile',
          element: <PublicProfile />
        },
        {
          path: 'paymentmethod',
          element: <PaymentMethod />
        }
      ],
      errorElement: <ErrorPage page='/author' />
    },
    {
      path: '/author',
      element: isAdminAuth ? <RootAdminLayout /> : <ErrorPage page='/author-login' />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'welcome',
          element: <Welcome />
        },
        {
          path: 'author-report',
          element: <AuthorReport />
        },
        {
          path: 'courses',
          children: [
            {
              index: true,
              element: <CoursesList />
            },
            {
              id: 'course-detail',
              path: ':courseId',
              element: <AdminCourseDetail />
            }
          ]
        },
        {
          path: 'courses-notes',
          children: [
            {
              index: true,
              element: <CourseNotes />
            }
          ]
        },
        {
          path: 'change-password',
          element: <ChangePassword />
        },
        {
          path: 'discuss',
          children: [
            {
              index: true,
              element: <Discuss />
            }
          ]
        },
        {
          path: 'users',
          children: [
            {
              index: true,
              element: <Users />
            },
            {
              path: 'permission',
              element: adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE ? <Permission /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE ? <Orders /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'transaction',
          children: [
            {
              index: true,
              element: adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE ? <TransactionsPage /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'categories',
          children: [
            {
              index: true,
              element: <Categories />
            }
          ]
        },
        {
          path: 'feedbacks',
          children: [
            {
              index: true,
              path: 'list',
              element: adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE ? <Feedbacks /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'subscribe',
          children: [
            {
              index: true,
              element: <SubscribeEmail/>
            }
          ]
        },
        {
          path: 'marketing',
          children: [
            {
              path: 'coupon-types',
              element: <CouponTypesPage />
            },
            {
              path: 'coupons',
              element: <CouponsPage />
            }
          ]
        },
        {
          path: 'reports',
          children: [
            {
              index: true,
              element: <ReportsCenter />
            },
            {
              path: 'users-progress',
              element: <UsersProgress />
            },
            {
              path: 'users-segment',
              element: <UsersSegment />
            },
            {
              path: 'course-insights',
              element: <CourseInsights />
            },
            {
              path: 'courses-revenue',
              element: <CoursesRevenue />
            },
            {
              path: 'instructors-revenue',
              element: <InstructorsRevene />
            },
            {
              path: 'cancelled-sales',
              element: <CancelledSales />
            },
            {
              path: 'courses-revenues',
              element: <CoursesRevenues />
            },
            {
              path: 'instructors-revenues',
              element: <InstructorsRevenues />
            },
            {
              path: 'certifications',
              element: <Certifications />
            },
            {
              path: 'reviews-center',
              element: <ReviewsCenter />
            }
          ]
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'blog',
          children: [
            {
              index: true,
              element: <BlogList />
            }
          ]
        },
        {
          path: 'blog-category',
          children: [
            {
              index: true,
              element: <BlogCategories />
            }
          ]
        },
        {
          path: 'blog-comments',
          children: [
            {
              index: true,
              element: <BlogComments />
            }
          ]
        }
      ],
      errorElement: <div>Admin Error</div>
    },
    {
      path: 'path-player',
      element: isAuth ? <PathPlayer /> : <ErrorPage page='/' />
    },
    {
      path: 'author-login',
      element: <AdminAuth />
    },
    {
      path: 'author-signup',
      element: <AdminAuthSignUp />
    },
    {
      path: 'site/reset-password',
      element: <ResetPasswordPage />
    },
    {
      path: 'cart/subscribe/course/',
      element: <RootLayout />,
      children: [
        {
          path: ':courseId',
          element: isAuth ? <SubsribeCourse /> : <ErrorPage page='/' />
        }
      ]
    }
  ]);

  return {
    router: router
  };
};

export default RouterHooks;
