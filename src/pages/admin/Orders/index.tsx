import { Input, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import './Orders.scss';
import OrdersList from './components/OrdersList';

import { useGetCoursesQuery } from '../Courses/course.service';
import { useGetOrdersQuery } from './order.service';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;

const Orders = () => {
  const [open, setOpen] = useState(false);

  const [ordersParams, setOrdersParams] = useState({
    courseId: '',
    date: '',
    searchText: ''
  });

  const { data, isFetching } = useGetOrdersQuery(ordersParams);

  const params = {};

  const { data: coursesData } = useGetCoursesQuery(params);

  const filterCoursesList = coursesData?.courses.map((course) => {
    return {
      label: `[course]: ${course.name}`,
      value: course._id
    };
  });

  filterCoursesList?.unshift({
    label: 'All Products',
    value: 'all'
  });


  const onSearchHandler = (value: string) => {

    setOrdersParams({
      ...ordersParams,
      searchText: value
    });
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const orderDateFilterChange = (value: string) => {

    setOrdersParams({
      ...ordersParams,
      date: value
    });
  };

  const filterProductsChange = (value: string) => {

    setOrdersParams({
      ...ordersParams,
      courseId: value
    });
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div className='orders'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Orders'
            },
            {
              title: <Link to='#'>Order Manager</Link>
            },
            
          ]}
        />
      </div>
      <div className='orders__wrap'>
        <div className='orders__filter'>
          <Space className='sub-header__wrap'>
            <Search placeholder='input search text' onSearch={onSearchHandler} style={{ width: 200 }} />

            <Select
              size='middle'
              placeholder='Please select all products'
              defaultValue={'All Products'}
              onChange={filterProductsChange}
              style={{ width: '360px' }}
              options={filterCoursesList}
            />
            <Select
              size='middle'
              placeholder='All Dates'
              defaultValue={'All dates'}
              onChange={orderDateFilterChange}
              style={{ width: '200px' }}
              options={[
                {
                  value: 'all',
                  label: 'All dates'
                },
                {
                  value: 'today',
                  label: 'Today'
                },
                {
                  value: 'yesterday',
                  label: 'yesterday'
                },
                {
                  value: '7days',
                  label: 'Last 7 days'
                },
                {
                  value: '30days',
                  label: 'Last 30 days'
                }
              ]}
            />
          </Space>
        </div>
        <div className='orders__show-result'>
          <span className='orders__show-result-text'>Sales Count: {data?.count || 0}</span>
          <span className='orders__show-result-text'>Amount: ${data?.total || 0}</span>
          <span className='orders__show-result-text'>Taxes: $0</span>
        </div>
        <div className='orders__content'>
          {isFetching && <Skeleton />}
          {!isFetching && <OrdersList ordersList={data?.orders || []} />}
        </div>
      </div>
    </div>
  );
};

export default Orders;
