import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message, Popconfirm, Select } from 'antd';
import {
  EyeOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  StopOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useGetCouponsQuery, useUpdateActiveStatusCouponMutation } from '../coupon.service';
import { ICoupon } from '../../../../types/coupon.type';
import './CouponsTable.scss';
import CouponDetailsModal from '../CouponDetailsModal/CouponDetailsModal';
import CouponHistoriesModal from '../CouponHistoryModal/CouponHistoryModal';
import CreateCouponDrawer from '../CreateCouponDrawer/CreateCouponDrawer';
import UpdateCouponDrawer from '../UpdateCouponDrawer/UpdateCouponDrawer';
import { transformDate } from '../../../../utils/functions';
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;

const CouponsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data, isFetching } = useGetCouponsQuery({
    _page: currentPage,
    _limit: pageSize,
    _q: searchTerm,
    _status: statusFilter
  });

  const [updateActiveStatusCoupon] = useUpdateActiveStatusCouponMutation();

  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [selectedCouponIdForUpdate, setSelectedCouponIdForUpdate] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (couponId: string) => {
    setSelectedCouponId(couponId);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = (couponId: string) => {
    updateActiveStatusCoupon({ couponId })
      .unwrap()
      .then(() => {
        void message.success('Coupon status updated successfully');
      })
      .catch(() => {
        void message.error('Failed to update coupon status');
      });
  };

  const handleChangeStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      ellipsis: true,
      sorter: (a: ICoupon, b: ICoupon) => a.code.localeCompare(b.code)
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '15%',
      ellipsis: true,
      sorter: (a: ICoupon, b: ICoupon) => a.description.localeCompare(b.description)
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      width: '15%',
      render: (_: ICoupon, record: ICoupon) => <span>{record.discountAmount}</span>,
      sorter: (a: ICoupon, b: ICoupon) => a.discountAmount - b.discountAmount
    },
    {
      title: 'Coupon Type',
      dataIndex: 'couponType',
      key: 'couponType',
      width: '15%',
      render: (_: ICoupon, record: ICoupon) => (
        <span>
          {typeof record.couponTypeId === 'string' ? record.couponTypeId : record.couponTypeId?.name ?? 'N/A'}
        </span>
      ),
      sorter: (a: ICoupon, b: ICoupon) => {
        const idA = typeof a.couponTypeId === 'string' ? a.couponTypeId : a.couponTypeId?._id ?? '';
        const idB = typeof b.couponTypeId === 'string' ? b.couponTypeId : b.couponTypeId?._id ?? '';
        return idA.localeCompare(idB);
      }
    },
    {
      title: 'Start Coupon',
      dataIndex: 'dateStart',
      key: 'dateStart',
      width: '12%',
      render: (_: ICoupon, record: ICoupon) => (
        <span>{record.dateStart ? moment(record.dateStart).format('YYYY-MM-DD') : 'N/A'}</span>
      ),
      sorter: (a: ICoupon, b: ICoupon) => (moment(a.dateStart).valueOf() || 0) - (moment(b.dateStart).valueOf() || 0)
    },
    {
      title: 'End Coupon',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
      width: '12%',
      render: (_: ICoupon, record: ICoupon) => (
        <span>{record.dateEnd ? moment(record.dateEnd).format('YYYY-MM-DD') : 'N/A'}</span>
      ),
      sorter: (a: ICoupon, b: ICoupon) => (moment(a.dateEnd).valueOf() || 0) - (moment(b.dateEnd).valueOf() || 0)
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (_: ICoupon, record: ICoupon) => (
        <span>{record.createdAt ? moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}</span>
      ),
      sorter: (a: ICoupon, b: ICoupon) => (moment(a.createdAt).valueOf() || 0) - (moment(b.createdAt).valueOf() || 0)
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: '10%',
      render: (_: ICoupon, record: ICoupon) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>,
      sorter: (a: ICoupon, b: ICoupon) => (a.isDeleted ? 1 : 0) - (b.isDeleted ? 1 : 0)
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_: ICoupon, record: ICoupon) => (
        <Space size='small'>
          <Button icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => handleUpdate(record._id)} />
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetails(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this coupon?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this coupon?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<StopOutlined style={{ color: '#ff4d4f' }} />} danger />
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleViewHistory = (couponId: string) => {
    setSelectedCouponId(couponId);
    setIsHistoryModalVisible(true);
  };

  const showCreateDrawer = () => {
    setIsCreateDrawerVisible(true);
  };

  const closeCreateDrawer = () => {
    setIsCreateDrawerVisible(false);
  };

  const handleUpdate = (couponId: string) => {
    setSelectedCouponIdForUpdate(couponId);
    setIsUpdateDrawerVisible(true);
  };

  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
  };

  return (
    <div className='coupons-table'>
      <div className='search-bar-container'>
        <Button onClick={showCreateDrawer} type='primary' icon={<PlusOutlined />} className='add-coupon-type-button'>
          New Coupon
        </Button>
        <div className='search-bar'>
          <Search placeholder='Search by description' onSearch={handleSearch} enterButton allowClear />
        </div>
        <div className='status-filter'>
          <Select defaultValue='all' style={{ width: 120 }} onChange={handleChangeStatusFilter}>
            <Option value='all'>All</Option>
            <Option value='active'>Active</Option>
            <Option value='inactive'>Inactive</Option>
          </Select>
        </div>
      </div>
      <Table
        dataSource={data?.coupons as ICoupon[]}
        columns={columns}
        rowKey='_id'
        loading={isFetching}
        scroll={{ y: 800 }}
      />
      {selectedCouponId && (
        <CouponDetailsModal
          couponId={selectedCouponId}
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      {selectedCouponId && (
        <CouponHistoriesModal
          couponId={selectedCouponId}
          isOpen={isHistoryModalVisible}
          onClose={() => setIsHistoryModalVisible(false)}
        />
      )}
      {selectedCouponIdForUpdate && (
        <UpdateCouponDrawer
          couponId={selectedCouponIdForUpdate}
          isOpen={isUpdateDrawerVisible}
          onClose={closeUpdateDrawer}
        />
      )}
      <CreateCouponDrawer isOpen={isCreateDrawerVisible} onClose={closeCreateDrawer} />
    </div>
  );
};

export default CouponsTable;
