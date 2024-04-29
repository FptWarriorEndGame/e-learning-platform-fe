import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FolderOpenOutlined,
  ShoppingOutlined,
  ReadOutlined,
  RetweetOutlined,
  StockOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { Button, Col, Row, Select, Statistic } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useGetSummaryReportsQuery, useGetTopUsersQuery, useGetTopOrdersQuery } from '../report.service';
import { useGetAllBlogsQuery } from '../../site/client.service';
import { useGetCouponsQuery } from '../Coupons/coupon.service';
import { selectPreviousDays, showChart } from '../report.slice';
import './Dashboard.scss';
import Chart from './components/Chart';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../constant/backend-domain';
import moment from 'moment';
const statisticItemStyle = {};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const { data: summaryReportsData } = useGetSummaryReportsQuery();

  const { data: topUsersData } = useGetTopUsersQuery();

  const { data: topOrdersData } = useGetTopOrdersQuery();

  const { data: allBlogsData } = useGetAllBlogsQuery({});

  const { data: couponData } = useGetCouponsQuery({});

  const latestBlogs = allBlogsData?.blogs.slice(0, 10);

  const latestCoupons = couponData?.coupons.slice(0, 10);

  const chartName = useSelector((state: RootState) => state.report.chartName);

  const handleChange = (value: string) => {
    dispatch(selectPreviousDays(Number(value)));
  };

  const showNewUserSignupsChart = () => {
    dispatch(showChart('new-signups'));
  };

  const showRevenuesChart = () => {
    dispatch(showChart('revenues'));
  };

  const showCourseSalesChart = () => {
    dispatch(showChart('course-sales'));
  };

  // const socket = io(${BACKEND_URL}  );
  //   socket.on("auth", (data) => {
  //    console.log("Socket connect!", data)
  //  })

  return (
    <div className='dashboard'>
      <div className='dashboard__summary'>
        <Row className='dashboard__summary-row'>
          <Col className='dashboard__summary-col' md={16}>
            <div className='dashboard__chart'>
              <div className='dashboard__chart-header'>
                <div className='dashboard__chart-header-logo'>
                  <CalendarOutlined className='dashboard__chart-header-logo-icon' />
                  <span className='dashboard__chart-header-logo-text'>Your Academy</span>
                </div>
                <div className='dashboard__chart-header-nav'>
                  <Button
                    type={chartName === 'new-signups' ? 'primary' : 'default'}
                    ghost={chartName === 'new-signups' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showNewUserSignupsChart}
                  >
                    New signups
                  </Button>
                  <Button
                    type={chartName === 'revenues' ? 'primary' : 'default'}
                    ghost={chartName === 'revenues' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showRevenuesChart}
                  >
                    Revenue
                  </Button>
                  <Button
                    type={chartName === 'course-sales' ? 'primary' : 'default'}
                    ghost={chartName === 'course-sales' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showCourseSalesChart}
                  >
                    Course sales
                  </Button>
                  <Select
                    className='dashboard__chart-header-nav-item dashboard__chart-header-nav-item--select'
                    defaultValue='7'
                    style={{ width: 120, backgroundColor: '#EBEBEB' }}
                    onChange={handleChange}
                    options={[
                      { value: '7', label: 'Last 7 days' },
                      { value: '30', label: 'Last 30 days' },
                      { value: '60', label: 'Last 60 days' },
                      { value: 'all', label: 'All' }
                    ]}
                  />
                </div>
              </div>

              <div className='dashboard__chart-body'>
                <Chart />
              </div>
            </div>
          </Col>
          <Col className='dashboard__summary-col' md={8}>
            <div className='dashboard__statistic'>
              <Row className='dashboard__statistic-row'>
                <Col md={8}>
                  <Link to='/author/users'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='All Users'
                      value={summaryReportsData?.reports.users}
                      prefix={<UsergroupAddOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Conversation'
                    value={`${summaryReportsData?.reports.conversions || 0}%`}
                    prefix={<RetweetOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Link to='/author/orders?days=30'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='30 days sales'
                      value={summaryReportsData?.reports.saleOf30days.toFixed(2)}
                      prefix={<DollarOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='30 Days Orders'
                    value={`${summaryReportsData?.reports.totalOrdersIn30Days || 0}`}
                    prefix={<ShoppingOutlined />}
                  />
                </Col>

                <Col md={8}>
                  <Link to='/author/courses'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='Courses'
                      value={summaryReportsData?.reports.courses}
                      prefix={<ReadOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Link to='/author/categories'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='Course categories'
                      value={summaryReportsData?.reports.categories}
                      prefix={<FolderOpenOutlined />}
                    />
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <div className='dashboard__latest'>
        <Row gutter={10}>
          {/* User */}
          <Col md={6}>
            <div className='dashboard__latest-users dashboard__latest-item'>
              <div className='latest-users'>
                <div className='latest-users__header dashboard__latest-item-header'>
                  <UserOutlined className='latest-users__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-users__header-title dashboard__latest-item-header-title'>Top Users</h3>
                  <Link
                    to='/author/users'
                    className='latest-users__header-view-all dashboard__latest-item-header-view-all'
                  >
                    see all
                  </Link>
                </div>
                <div className='latest-users__body dashboard__latest-item-body'>
                  {topUsersData?.topUsers.map((user) => (
                    <div className='latest-users__item' key={user._id}>
                      <img
                        alt=''
                        src={user.avatar}
                        className='latest-users__item-avatar'
                        style={{ objectFit: 'cover' }}
                      />
                      <div className='latest-users__item-info'>
                        <div className='latest-users__item-name'>{user.name}</div>
                        <div className='latest-users__item-time'>{user.joinTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          {/* Posts */}
          <Col md={6}>
            <div className='dashboard__latest-orders dashboard__latest-item'>
              <div className='latest-orders'>
                <div className='latest-orders__header dashboard__latest-item-header'>
                  <ShoppingOutlined className='latest-orders__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-orders__header-title dashboard__latest-item-header-title'>Top Orders</h3>
                  <Link
                    to='/author/orders'
                    className='latest-orders__header-view-all dashboard__latest-item-header-view-all'
                  >
                    see all
                  </Link>
                </div>
                <div className='latest-orders__body dashboard__latest-item-body'>
                  {topOrdersData?.topOrders.map((order, index) => (
                    <div className='latest-orders__item' key={order._id}>
                      <div className='latest-orders__item-info'>
                        <span className='latest-orders__item-number'>{index + 1} - </span>
                        <span className='latest-orders__item-name'>{order.user.name} - </span>
                        <span className='latest-orders__item-time'>{order.orderTime}</span>
                        <div className='latest-orders__item-totalPrice'>Total Price: ${order.totalPrice}</div>
                        <div className='latest-orders__item-transaction'>Transaction: {order.transaction.method}</div>
                        <div className='latest-orders__item-numItems'>Number of Items: {order.items.length}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          {/* Events Log */}
          <Col md={6}>
            <div className='dashboard__latest-blogs dashboard__latest-item'>
              <div className='latest-blogs'>
                <div className='latest-blogs__header dashboard__latest-item-header'>
                  <CalendarOutlined className='latest-blogs__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-blogs__header-title dashboard__latest-item-header-title'>Latest Blogs</h3>
                  <Link
                    to='/author/blog'
                    className='latest-blogs__header-view-all dashboard__latest-item-header-view-all'
                  >
                    see all
                  </Link>
                </div>
                <div className='latest-blogs__body dashboard__latest-item-body'>
                  {latestBlogs?.map((blog) => (
                    <div
                      className='latest-blogs__item'
                      key={blog._id}
                      style={{
                        marginBottom: '20px',
                        padding: '10px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '5px'
                      }}
                    >
                      <img
                        alt=''
                        src={blog.blogImg}
                        className='latest-blogs__item-thumbnail'
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '5px'
                        }}
                      />
                      <div className='latest-blogs__item-info' style={{ marginTop: '10px' }}>
                        <h4
                          className='latest-blogs__item-title'
                          style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}
                        >
                          {blog.title}
                        </h4>
                        <div className='latest-blogs__item-meta' style={{ fontSize: '14px' }}>
                          <span className='latest-blogs__item-author'>
                            <UserOutlined /> {blog.author}
                          </span>
                          <span className='latest-blogs__item-date' style={{ marginLeft: '15px' }}>
                            <CalendarOutlined /> {moment(blog.datePublished).format('DD/MM/YYYY')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          {/* Latest posts */}
          <Col md={6}>
            <div className='dashboard__latest-coupons dashboard__latest-item'>
              <div className='latest-coupons'>
                <div className='latest-coupons__header dashboard__latest-item-header'>
                  <DollarOutlined className='latest-coupons__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-coupons__header-title dashboard__latest-item-header-title'>Latest Coupons</h3>
                  <Link
                    to='/author/marketing/coupons'
                    className='latest-coupons__header-view-all dashboard__latest-item-header-view-all'
                  >
                    see all
                  </Link>
                </div>
                <div className='latest-coupons__body dashboard__latest-item-body'>
                  {latestCoupons?.map((coupon) => (
                    <div
                      className='latest-coupons__item'
                      key={coupon._id}
                      style={{
                        marginBottom: '20px',
                        padding: '10px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '5px'
                      }}
                    >
                      <div className='latest-coupons__item-info' style={{ marginTop: '10px' }}>
                        <h4
                          className='latest-coupons__item-title'
                          style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}
                        >
                          {coupon.code}
                        </h4>
                        <div className='latest-coupons__item-meta' style={{ fontSize: '14px' }}>
                          <span className='latest-coupons__item-description'>{coupon.description}</span>
                          <span className='latest-coupons__item-date' style={{ marginLeft: '15px' }}>
                            <UserOutlined /> {moment(coupon.dateStart).format('DD/MM/YYYY')} -{' '}
                            {moment(coupon.dateEnd).format('DD/MM/YYYY')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
