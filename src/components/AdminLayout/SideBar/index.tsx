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

  console.log('adminRole', adminRole);
  const navigateHandler: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setOpenDrawer(true);
  };

  const items: MenuItem[] = [
    getItem('Welcome', 'welcome', <DotChartOutlined />),
    (adminRole === UserRole.AUTHOR && getItem('Report', 'author-report', <PieChartOutlined />)) as MenuItem,
    (adminRole === UserRole.ADMIN && getItem('Dashboard', 'dashboard', <BorderOuterOutlined />)) as MenuItem,
    getItem('Courses', 'courses', <DesktopOutlined />, [
      getItem('Course Categories', 'categories'),
      getItem('Course Manager', 'courses'),
      getItem('Course Discuss', 'discuss'),
      getItem('Course Notes', 'courses-notes')
    ]),
    (adminRole === UserRole.ADMIN &&
      getItem('Orders', 'orders', <ShoppingCartOutlined />, [
        getItem('Order Manager', 'orders'),
        getItem('Transactions', 'transaction')
      ])) as MenuItem,
    getItem('Users', 'users', <UserOutlined />, [
      getItem('All Users', 'users'),
      // getItem('Admins', 'admins'),
      // getItem('Intructors', 'intructors'),
      (adminRole === UserRole.ADMIN && getItem('Permission', 'users/permission')) as MenuItem // Permission for each user and function
    ]),
    (adminRole === UserRole.ADMIN &&
      getItem('Reports Center', 'reports', <BarChartOutlined />, [
        getItem('User Progress', 'reports/users-progress'), 
        getItem('Course Insights', 'reports/course-insights'),
        getItem('Review center', 'reports/reviews-center'),
      ])) as MenuItem,
    getItem('Marketing', 'marketing', <TagsOutlined />, [
      getItem('Coupon Types', 'marketing/coupon-types'),
      // getItem('Bundles', 'marketing/bundles'),
      // getItem('Subscriptions', 'marketing/subscriptions'),
      getItem('Coupons', 'marketing/coupons')
    ]),
    getItem('Blog', 'blog', <BoldOutlined />, [
      getItem('Blog List', 'blog'),
      getItem('Blog Category', 'blog-category'),
      getItem('Blog comments', 'blog-comments')
    ]),
    (adminRole === UserRole.ADMIN &&
      getItem('Feedbacks', 'feedbacks', <IdcardOutlined />, [getItem('Feedbacks', 'feedbacks/list')])) as MenuItem,
    getItem('Setting', 'setting', <SettingOutlined />, [getItem('Settings', 'settings')]),
    getItem('My account', 'account', <UserAddOutlined />),
    getItem('Need Help ?', 'help', <FileOutlined />)
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
