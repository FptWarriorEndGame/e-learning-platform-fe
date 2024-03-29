/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  BarChartOutlined,
  BoldOutlined,
  BorderOuterOutlined,
  DesktopOutlined,
  DotChartOutlined,
  FileOutlined,
  IdcardOutlined,
  PieChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { UserRole } from '../../../types/user.type';
import './SideBar.scss';
import { Helper } from '../../../utils/helper';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

  const navigateHandler: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setOpenDrawer(true);
  };

  // Create permission section
  const helper = new Helper();
  // --- 1. MODULE COURSE
  // Course catgegory
  const CourseCategory = helper.getRole.CourseCategory;
  // Course
  const Course = helper.getRole.Course;
  // Course discuss
  const CourseDiscuss = helper.getRole.CourseDiscuss;
  // Course note
  const CourseNote = helper.getRole.CourseNote;

  // --- 2. MODULE ORDER
  // Order
  const Order = helper.getRole.Order;
  // OrderTransaction
  const OrderTransaction = helper.getRole.OrderTransaction;

  // --- 3. MODULE USER
  // User
  const User = helper.getRole.User;
  // Permission
  const Permission = helper.getRole.Permission;

  // --- 4. MODULE REPORT
  // User progress
  const UserProgress = helper.getRole.UserProgress;
  // CourseInsight
  const CourseInsight = helper.getRole.CourseInsight;
  // review center
  const ReviewCenter = helper.getRole.ReviewCenter;

  // --- 5. Marketing
  // Coupon
  const Coupon = helper.getRole.Coupon;

  // --- 6. MODULE BLOG
  // Blog
  const BlogCategory = helper.getRole.BlogCategory;
  // Blog list
  const Blog = helper.getRole.Blog;
  const BlogComments = helper.getRole.BlogComments;

  // --- 7. MODULE FEDDBACK
  // feedback
  const Feedback = helper.getRole.Feedback;
  // email
  const Email = helper.getRole.Email;

  // --- 8. MODULE Settings
  // settings
  const Settings = helper.getRole.Settings;

  // GET AUTHORIZATION BY EACH EMPLOYEE
  // List Permission here!
  // Categories screen
  const isViewCategory = helper.checkPermission(CourseCategory?.View?.code);
  const isCreateCategory = helper.checkPermission(CourseCategory?.Create?.code);
  const isEditCategory = helper.checkPermission(CourseCategory?.Edit?.code);
  const isViewDetailCategory = helper.checkPermission(CourseCategory?.Detail?.code);
  const isDeleteCategory = helper.checkPermission(CourseCategory?.Delete?.code);

  // Course screen
  const isViewCourse = helper.checkPermission(Course?.View?.code);
  const isCreateCourse = helper.checkPermission(Course?.Create?.code);
  const isEditCourse = helper.checkPermission(Course?.Edit?.code);
  const isViewDetailCourse = helper.checkPermission(Course?.Detail?.code);
  const isDeleteCourse = helper.checkPermission(Course?.Delete?.code);

  // Course discuss screen
  const isViewCourseDiscuss = helper.checkPermission(CourseDiscuss?.View?.code);
  const isCreateCourseDiscuss = helper.checkPermission(CourseDiscuss?.Create?.code);
  const isEditCourseDiscuss = helper.checkPermission(CourseDiscuss?.Edit?.code);
  const isViewDetailCourseDiscuss = helper.checkPermission(CourseDiscuss?.Detail?.code);
  const isDeleteCourseDiscuss = helper.checkPermission(CourseDiscuss?.Delete?.code);

  // Course discuss screen
  const isViewCourseNote = helper.checkPermission(CourseNote?.View?.code);
  const isCreateCourseNote = helper.checkPermission(CourseNote?.Create?.code);
  const isEditCourseNote = helper.checkPermission(CourseNote?.Edit?.code);
  const isViewDetailCourseNote = helper.checkPermission(CourseNote?.Detail?.code);
  const isDeleteCourseNote = helper.checkPermission(CourseNote?.Delete?.code);

  // Big Course module
  const isViewCourseModule = isViewCategory && isViewCourse && isViewCourseDiscuss && isViewCourseNote;

  // Order screen
  const isViewOrder = helper.checkPermission(Order?.View?.code);
  const isCreateOrder = helper.checkPermission(Order?.Create?.code);
  const isEditOrder = helper.checkPermission(Order?.Edit?.code);
  const isViewDetailOrder = helper.checkPermission(Order?.Detail?.code);
  const isDeleteOrder = helper.checkPermission(Order?.Delete?.code);

  // Order transaction screen
  const isViewOrderTransaction = helper.checkPermission(OrderTransaction?.View?.code);
  const isCreateOrderTransaction = helper.checkPermission(OrderTransaction?.Create?.code);
  const isEditOrderTransaction = helper.checkPermission(OrderTransaction?.Edit?.code);
  const isViewDetailOrderTransaction = helper.checkPermission(OrderTransaction?.Detail?.code);
  const isDeleteOrderTransaction = helper.checkPermission(OrderTransaction?.Delete?.code);

   // Big Order module
   const isViewOrderModule = isViewOrder && isViewOrderTransaction;

  // User screen
  const isViewUser = helper.checkPermission(User?.View?.code);
  const isCreateUser = helper.checkPermission(User?.Create?.code);
  const isEditUser = helper.checkPermission(User?.Edit?.code);
  const isViewDetailUser = helper.checkPermission(User?.Detail?.code);
  const isDeleteUser = helper.checkPermission(User?.Delete?.code);

  // Permission screen
  const isViewPermission = helper.checkPermission(Permission?.View?.code);
  const isCreatePermission = helper.checkPermission(Permission?.Create?.code);
  const isEditPermission = helper.checkPermission(Permission?.Edit?.code);
  const isViewDetailPermission = helper.checkPermission(Permission?.Detail?.code);
  const isDeletePermission = helper.checkPermission(Permission?.Delete?.code);

  // Big User module
  const isViewUserModule = isViewUser && isViewPermission;

  // Coupon screen
  const isViewCoupon = helper.checkPermission(Coupon?.View?.code);
  const isCreateCoupon = helper.checkPermission(Coupon?.Create?.code);
  const isEditCoupon = helper.checkPermission(Coupon?.Edit?.code);
  const isViewDetailCoupon = helper.checkPermission(Coupon?.Detail?.code);
  const isDeleteCoupon = helper.checkPermission(Coupon?.Delete?.code);


  const isViewMarketingModule = isViewCoupon

  // User progress screen
  const isViewUserProgress = helper.checkPermission(UserProgress?.View?.code);
  const isCreateUserProgress = helper.checkPermission(UserProgress?.Create?.code);
  const isEditUserProgress = helper.checkPermission(UserProgress?.Edit?.code);
  const isViewDetailUserProgress = helper.checkPermission(UserProgress?.Detail?.code);
  const isDeleteUserProgress = helper.checkPermission(UserProgress?.Delete?.code);

  // User course insight screen
  const isViewCourseInsight = helper.checkPermission(CourseInsight?.View?.code);
  const isCreateCourseInsight = helper.checkPermission(CourseInsight?.Create?.code);
  const isEditCourseInsight = helper.checkPermission(CourseInsight?.Edit?.code);
  const isViewDetailCourseInsight = helper.checkPermission(CourseInsight?.Detail?.code);
  const isDeleteCourseInsight = helper.checkPermission(CourseInsight?.Delete?.code);
  // User review screen
  const isViewReviewCenter = helper.checkPermission(ReviewCenter?.View?.code);
  const isCreateReviewCenter = helper.checkPermission(ReviewCenter?.Create?.code);
  const isEditReviewCenter = helper.checkPermission(ReviewCenter?.Edit?.code);
  const isViewDetailReviewCenter = helper.checkPermission(ReviewCenter?.Detail?.code);
  const isDeleteReviewCenter = helper.checkPermission(ReviewCenter?.Delete?.code);

  const isViewReportModule = isViewUserProgress && isViewCourseInsight && isViewReviewCenter

  // User blog screen
  const isViewBlog = helper.checkPermission(Blog?.View?.code);
  const isCreateBlog = helper.checkPermission(Blog?.Create?.code);
  const isEditBlog = helper.checkPermission(Blog?.Edit?.code);
  const isViewDetailBlog = helper.checkPermission(Blog?.Detail?.code);
  const isDeleteBlog = helper.checkPermission(Blog?.Delete?.code);

  // User blog category screen
  const isViewBlogCategory = helper.checkPermission(BlogCategory?.View?.code);
  const isCreateBlogCategory = helper.checkPermission(BlogCategory?.Create?.code);
  const isEditBlogCategory = helper.checkPermission(BlogCategory?.Edit?.code);
  const isViewDetailBlogCategory = helper.checkPermission(BlogCategory?.Detail?.code);
  const isDeleteBlogCategory = helper.checkPermission(BlogCategory?.Delete?.code);

  // User blog comments screen
  const isViewBlogComments = helper.checkPermission(BlogComments?.View?.code);
  const isCreateBlogComments = helper.checkPermission(BlogComments?.Create?.code);
  const isEditBlogComments = helper.checkPermission(BlogComments?.Edit?.code);
  const isViewDetailBlogComments = helper.checkPermission(BlogComments?.Detail?.code);
  const isDeleteBlogComments = helper.checkPermission(BlogComments?.Delete?.code);

  const isViewBlogModule = isViewBlogComments && isViewDetailBlogComments && isViewBlogCategory

  // User feedback screen
  const isViewFeedback = helper.checkPermission(Feedback?.View?.code);
  const isCreateFeedback = helper.checkPermission(Feedback?.Create?.code);
  const isEditFeedback = helper.checkPermission(Feedback?.Edit?.code);
  const isViewDetailFeedback = helper.checkPermission(Feedback?.Detail?.code);
  const isDeleteFeedback = helper.checkPermission(Feedback?.Delete?.code);

  // User email screen
  const isViewEmail = helper.checkPermission(Email?.View?.code);
  const isCreateEmail = helper.checkPermission(Email?.Create?.code);
  const isEditEmail = helper.checkPermission(Email?.Edit?.code);
  const isViewDetailEmail = helper.checkPermission(Email?.Detail?.code);
  const isDeleteEmail = helper.checkPermission(Email?.Delete?.code);

  // User settings screen
  const isViewSettings = helper.checkPermission(Settings?.View?.code);
  const isCreateSettings = helper.checkPermission(Settings?.Create?.code);
  const isEditSettings = helper.checkPermission(Settings?.Edit?.code);
  const isViewDetailSettings = helper.checkPermission(Settings?.Detail?.code);
  const isDeleteSettings = helper.checkPermission(Settings?.Delete?.code);

  const items: MenuItem[] = [
    getItem('Welcome', 'welcome', <DotChartOutlined />),
    (adminRole === UserRole.AUTHOR && getItem('Report Overview', 'author-report', <PieChartOutlined />)) as MenuItem,
    (adminRole === UserRole.ADMIN && getItem('Dashboard', 'dashboard', <BorderOuterOutlined />)) as MenuItem,
    (isViewCourseModule && getItem('Courses', 'courses', <DesktopOutlined />, [
      (isViewCategory && getItem('Course Categories', 'categories')),
      (isViewCourse && getItem('Course Manager', 'courses')),
      (isViewCourseDiscuss && getItem('Course Discuss', 'discuss')),
      (isViewCourseNote && getItem('Course Notes', 'courses-notes'))
    ])) as MenuItem,
    (isViewOrderModule && (adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE) &&
      getItem('Orders', 'orders', <ShoppingCartOutlined />, [
        (isViewOrder && getItem('Order Manager', 'orders')),
        (isViewOrderTransaction && getItem('Transactions', 'transaction'))
      ])) as MenuItem,
    (isViewUserModule && getItem('Users', 'users', <UserOutlined />, [
      (isViewUser && getItem('All Users', 'users')),
      // getItem('Admins', 'admins'),
      // getItem('Intructors', 'intructors'),
      ((adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE) &&
        isViewPermission &&
        getItem('Permission', 'users/permission')) as MenuItem // Permission for each user and function
    ])) as MenuItem,
    (isViewReportModule && 
      getItem('Reports Center', 'reports', <BarChartOutlined />, [
        (isViewUserProgress && getItem('User Progress', 'reports/users-progress')),
        (isViewCourseInsight && getItem('Course Insights', 'reports/course-insights')),
        (isViewReviewCenter && getItem('Review center', 'reports/reviews-center'))
      ])) as MenuItem,
    (isViewMarketingModule && (adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE) && getItem('Marketing', 'marketing', <TagsOutlined />, [
      // (isViewCoupon && getItem('Coupon Types', 'marketing/coupon-types')),
      // getItem('Bundles', 'marketing/bundles'),
      // getItem('Subscriptions', 'marketing/subscriptions'),
      (isViewCoupon && getItem('Coupons', 'marketing/coupons'))
    ])) as MenuItem,
    (isViewBlogModule && getItem('Blog', 'blog', <BoldOutlined />, [
      (isViewBlog && getItem('Blog List', 'blog')) as MenuItem,
      (isViewBlogCategory && getItem('Blog Category', 'blog-category')),
      (isViewBlogComments && getItem('Blog comments', 'blog-comments'))
    ])) as MenuItem,
    (isViewFeedback && (adminRole === UserRole.ADMIN || adminRole === UserRole.EMPLOYEE) &&
      getItem('Feedbacks', 'feedbacks', <IdcardOutlined />, [
        (isViewFeedback && getItem('Feedbacks', 'feedbacks/list')),
        getItem('Subscribe', 'subscribe')
      ])) as MenuItem,
    getItem('Setting', 'setting', <SettingOutlined />, [getItem('Settings', 'settings' ) ]),
    // getItem('My account', 'account', <UserAddOutlined />),
    // getItem('Need Help ?', 'help', <FileOutlined />)
  ];

  return (
    <Sider
      className='sidebar'
      style={{ backgroundColor: '#fff' }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className='demo-logo-vertical' />
      <Menu
        className='sidebar__menu'
        onClick={navigateHandler}
        theme='light'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default SideBar;