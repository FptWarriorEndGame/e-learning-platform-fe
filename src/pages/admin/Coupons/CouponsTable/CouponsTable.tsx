import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message, Popconfirm, Select, DatePicker } from 'antd';
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

const { Search } = Input;
const { Option } = Select;

const CouponsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);

  const { data, isFetching } = useGetCouponsQuery({
    _page: currentPage,
    _limit: pageSize,
    _q: searchTerm,
    _status: statusFilter,
    dateStart: dateRange[0]?.toISOString(),
    dateEnd: dateRange[1]?.toISOString()
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

  const handleDateRangeChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    if (dates) {
      setDateRange(dates);
      setCurrentPage(1);
    } else {
      setDateRange([null, null]);
      setCurrentPage(1);
    }
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
      ellipsis: true
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      width: '20%',
      render: (_: ICoupon, record: ICoupon) => <span>{record.discountAmount}</span>
    },
    {
      title: 'Start Coupon',
      dataIndex: 'dateStart',
      key: 'dateStart',
      width: '20%',
      render: (_: ICoupon, record: ICoupon) => <span>{record.dateStart ? transformDate(record.dateStart) : 'N/A'}</span>
    },
    {
      title: 'End Coupon',
      dataIndex: 'EndDate',
      key: 'EndDate',
      width: '20%',
      render: (_: ICoupon, record: ICoupon) => <span>{transformDate(record.dateEnd)}</span>
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (_: ICoupon, record: ICoupon) => <span>{record.createdAt ? transformDate(record.createdAt) : 'N/A'}</span>
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: '10%',
      render: (_: ICoupon, record: ICoupon) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
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
        <div className='date-range-filter'>
          <DatePicker.RangePicker
            onChange={handleDateRangeChange}
            style={{ width: 300, marginRight: 10 }}
            placeholder={['Start Coupons', 'End Coupons']}
            allowClear={true}
          />
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
        pagination={false}
        loading={isFetching}
        scroll={{ y: 400 }}
      />
      <Pagination
        style={{ float: 'right', marginRight: '0px' }}
        className='pagination'
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        onChange={handlePageChange}
        showSizeChanger
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
