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
import { useGetCouponTypesQuery, useUpdateActiveStatusCouponTypeMutation } from '../couponType.service';
import { ICouponType } from '../../../../types/couponType.type';
import CouponTypeDetailsModal from '../CouponTypeDetailsModal/CouponTypeDetailsModal';
import CouponTypeHistoryModal from '../CouponTypeHistoryModal/CouponTypeHistoryModal';
import CreateCouponTypeDrawer from '../CreateCouponTypeDrawer/CreateCouponTypeDrawer';
import UpdateCouponTypeDrawer from '../UpdateCouponTypeDrawer/UpdateCouponTypeDrawer';
import './CouponTypesTable.scss';

const { Search } = Input;
const { Option } = Select;

const CouponTypesTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data, isFetching } = useGetCouponTypesQuery({
    _page: currentPage,
    _limit: pageSize,
    _q: searchTerm,
    _status: statusFilter
  });

  const [updateActiveStatusCouponType] = useUpdateActiveStatusCouponTypeMutation();

  const [selectedCouponTypeId, setSelectedCouponTypeId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [selectedCouponTypeIdForUpdate, setSelectedCouponTypeIdForUpdate] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (couponTypeId: string) => {
    setSelectedCouponTypeId(couponTypeId);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = (couponTypeId: string) => {
    updateActiveStatusCouponType({ couponTypeId })
      .unwrap()
      .then(() => {
        void message.success('Coupon type status updated successfully');
      })
      .catch(() => {
        void message.error('Failed to update coupon type status');
      });
  };

  const handleChangeStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'Coupon Type Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '55%',
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: '10%',
      render: (_: ICouponType, record: ICouponType) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_: ICouponType, record: ICouponType) => (
        <Space size='small'>
          <Button icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => handleUpdate(record._id)} />
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetails(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this coupon type?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this coupon type?'
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

  const handleViewHistory = (couponTypeId: string) => {
    setSelectedCouponTypeId(couponTypeId);
    setIsHistoryModalVisible(true);
  };

  const showCreateDrawer = () => {
    setIsCreateDrawerVisible(true);
  };

  const closeCreateDrawer = () => {
    setIsCreateDrawerVisible(false);
  };

  const handleUpdate = (couponTypeId: string) => {
    setSelectedCouponTypeIdForUpdate(couponTypeId);
    setIsUpdateDrawerVisible(true);
  };

  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
  };

  return (
    <div className='coupon-types-table'>
      <div className='search-bar-container'>
        <div className='add-coupon-type-button'>
          <Button type='primary' shape='circle' icon={<PlusOutlined />} onClick={showCreateDrawer} />
        </div>
        <div className='search-bar'>
          <Search placeholder='Search by name' onSearch={handleSearch} enterButton allowClear />
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
        dataSource={data?.couponTypes as ICouponType[]}
        columns={columns}
        rowKey='_id'
        pagination={false}
        loading={isFetching}
        scroll={{ y: 400 }}
      />
      <Pagination
        className='pagination'
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        onChange={handlePageChange}
        showSizeChanger
      />
      {selectedCouponTypeId && (
        <CouponTypeDetailsModal
          couponTypeId={selectedCouponTypeId}
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      {selectedCouponTypeId && (
        <CouponTypeHistoryModal
          couponTypeId={selectedCouponTypeId}
          isOpen={isHistoryModalVisible}
          onClose={() => setIsHistoryModalVisible(false)}
        />
      )}
      {selectedCouponTypeIdForUpdate && (
        <UpdateCouponTypeDrawer
          couponTypeId={selectedCouponTypeIdForUpdate}
          isOpen={isUpdateDrawerVisible}
          onClose={closeUpdateDrawer}
        />
      )}
      <CreateCouponTypeDrawer isOpen={isCreateDrawerVisible} onClose={closeCreateDrawer} />
    </div>
  );
};

export default CouponTypesTable;
