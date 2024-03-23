import { Avatar, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrdersList.scss';
import { DownloadOutlined } from '@ant-design/icons';
import { IOrder } from '../../../../../types/order.type';
import moment from 'moment';
import OrderDetailModal from '../OrderDetailModal/OrderDetailModal';
interface DataOrderType {
  key: React.Key;
  name: JSX.Element;
  avatar?: string;
  email?: string;
  courses: JSX.Element;
  register: string;
  transaction: JSX.Element;
  amount: string;
  payment: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}


interface OrdersListProps {
  ordersList: IOrder[];
}

const OrdersList: React.FC<OrdersListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const showUserDetail = () => {
    setOpen(true);
  };

  const showDetailModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrderId(null);
  };

  const columns: ColumnsType<DataOrderType> = [
    {
      title: 'Learners',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'Category 1',
          value: 'Category 1'
        },
        {
          text: 'Category 2',
          value: 'Category 2'
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      width: '30%'
    },
    {
      title: 'Register',
      dataIndex: 'register'
    },
    {
      title: 'Courses',
      dataIndex: 'courses'
    },
    {
      title: 'Invoice / Transaction ID',
      dataIndex: 'transaction'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Payment Gateway',
      dataIndex: 'payment'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a onClick={() => showDetailModal(record.key.toString())}>View Details</a>
      ),
    },
  ];

  const ordersData: DataOrderType[] =
    props.ordersList.map((order) => {
      const { transaction, user, _id, totalPrice, items } = order;

      const orderTemplateItem = {
        key: order?._id,
        name: (
          <a href='#' onClick={showUserDetail}>
            <div className='user-info'>
              <img alt={user?.name} src={user?.avatar || ''} className='user-info__avatar' />

              <div className='user-info__content'>
                <div className='user-info__name txt-tt'>{user?.name}</div>
                <div className='user-info__email'>{user?.email}</div>
              </div>
            </div>
          </a>
        ),
        register: <div className='txt-desc'>{moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss') || ''}</div>,
        courses: (
          <Avatar.Group maxCount={1} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {(items || []).map((course) => (
              <Avatar src={course?.thumbnail} />
            ))}
            <Tooltip title='Courses' placement='top'>
              {(items || []).map((course) => (
                <Avatar src={course?.thumbnail} />
              ))}
            </Tooltip>
          </Avatar.Group>
        ),
        transaction: (
          <>
            <div className='txt-desc'>
              <Link to={`/cart-invoice/${order._id}`}>
                Invoice <DownloadOutlined />
              </Link>
            </div>
            <div className='txt-desc'>sandbox_64bccb1fc177e</div>
          </>
        ),        
        amount:  <div className='txt-desc'>{`$${totalPrice}`}</div>,
        payment:  <div className='txt-desc'>{transaction?.method}</div>,
      };

      return orderTemplateItem;
    }) || [];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataOrderType>['onChange'] = (pagination, filters, sorter, extra) => {

    setTableParams({
      pagination
    });
  };

  return (
    <Fragment>
      <div className='users-list'>
        <Table scroll={{ x: 'max-content', y: 'calc(100vh - 400px)' }} columns={columns} dataSource={ordersData} onChange={onChange} pagination={tableParams.pagination} />
      </div>
      {isModalVisible && selectedOrderId && (
        <OrderDetailModal 
          isVisible={isModalVisible} 
          onClose={handleModalClose} 
          orderId={selectedOrderId}
        />
      )}
    </Fragment>
  );
};

export default OrdersList;
