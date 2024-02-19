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
import ReviewsCenter from './pages/admin/Reports/components/ReviewsCenter';
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
import ReviewsPage from './pages/admin/Reviews/Reviews';
import Permission from './pages/admin/Users/components/Permission';

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
              path: 'users',
              children: [
                {
                  index: true,
                  element: adminRole === UserRole.ADMIN ? <Users /> : <Navigate to='/error' />
                },
                {
                  path: 'permission',
                  element: adminRole === UserRole.ADMIN ? <Permission /> : <Navigate to='/error' />
                }
              ]
            },
            {
              path: 'orders',
              children: [
                {
                  index: true,
                  element: adminRole === UserRole.ADMIN ? <Orders /> : <Navigate to='/error' />
                }
              ]
            },
            {
              path: 'transaction',
              children: [
                {
                  index: true,
                  element: adminRole === UserRole.ADMIN ? <TransactionsPage /> : <Navigate to='/error' />
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
                  element: <Feedbacks />
                }
              ]
            },
            {
              path: 'reviews',
              children: [
                {
                  index: true,
                  element: <ReviewsPage />
                }
              ]
            },
            {
              path: 'reports',
              children:
                adminRole === UserRole.ADMIN
                  ? [
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
                  : []
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
      }
}

export default RouterHooks;