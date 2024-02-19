import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import CancelledSales from './components/CancelledSales';
import CategoriesHeader from './components/Categories';
import Certifications from './components/Certifications';
import CourseInsights from './components/CourseInsights';
import CoursesHeader from './components/CoursesHeader';
import DashboardHeader from './components/DashboardHeader';
import InstructorsRevenues from './components/InstructorsRevenues';
import OrdersHeader from './components/Orders';
import ReviewsCenter from './components/ReviewsCenter';
import UsersHeader from './components/UsersHeader';
import UsersProgressHeader from './components/UsersProgress';
import BlogHeader from './components/BlogHeader';

import BlogCategory from '../../../pages/admin/Blog/Components/BlogCategory/BlogCategory';
import BlogCategoryHeader from './components/BlogCategory';
import FeedbacksHeader from './components/Feedbacks/Feedbacks';
import ReviewsHeader from './components/Reviews/Reviews';
import TransactionsHeader from './components/Transactions/Transactions';


const { Header } = Layout;
const AdminHeader = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const location = useLocation();
  const path = location.pathname;

  return (
    <Header className='admin-header' style={{ padding: 0, background: colorBgContainer }}>
      {path === '/author/dashboard' && <DashboardHeader />}
      {path === '/author/categories' && <CategoriesHeader />}
      {path === '/author/courses' && <CoursesHeader />}
      {path === '/author/users' && <UsersHeader />}
      {path === '/author/orders' && <OrdersHeader />}
      {path === '/author/reports/users-progress' && <UsersProgressHeader />}
      {path === '/author/reports/course-insights' && <CourseInsights />}
      {path === '/author/reports/reviews-center' && <ReviewsCenter />}
      {path === '/author/reports/certifications' && <Certifications />}
      {path === '/author/reports/courses-revenue' && <Certifications />}
      {path === '/author/reports/instructors-revenue' && <InstructorsRevenues />}
      {path === '/author/reports/cancelled-sales' && <CancelledSales />}
      {path === '/author/blog' && <BlogHeader />}
      {path === '/author/blog-category' && <BlogCategoryHeader />}
      {path === '/author/feedbacks/list' && <FeedbacksHeader />}
      {path === '/author/reviews' && <ReviewsHeader />}
      {path === '/author/transaction' && <TransactionsHeader />}
    </Header>
  );
};

export default AdminHeader;
