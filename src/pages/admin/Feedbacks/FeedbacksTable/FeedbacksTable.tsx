import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message, Popconfirm, Select, Badge } from 'antd';
import {
  EyeOutlined,
  HistoryOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  StopOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { useGetFeedbacksQuery, useUpdateActiveStatusFeedbackMutation } from '../feedback.service';
import FeedbackDetailsModal from '../FeedbackDetailsModal/FeedbackDetailsModal';
import FeedbackHistoryModal from '../FeedbackHistoryModal/FeedbackHistoryModal';
import CreateFeedbackReplyDrawer from '../CreateFeedbackReplyDrawer/CreateFeedbackReplyDrawer';
import FeedbackRepliesModal from '../FeedbackRepliesModal/FeedbackRepliesModal';
import { IContact } from '../../../../types/contact.type';
import './FeedbacksTable.scss';

const { Search } = Input;
const { Option } = Select;

const FeedbacksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [updateActiveStatusFeedback] = useUpdateActiveStatusFeedbackMutation();

  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [isFeedbackDetailsModalVisible, setIsFeedbackDetailsModalVisible] = useState(false);
  const [isFeedbackHistoryModalVisible, setIsFeedbackHistoryModalVisible] = useState(false);
  const [isFeedbackReplyDrawerVisible, setIsFeedbackReplyDrawerVisible] = useState(false);
  const [isFeedbackRepliesModalVisible, setIsFeedbackRepliesModalVisible] = useState(false);

  const { data, isFetching } = useGetFeedbacksQuery({
    _page: currentPage,
    _limit: pageSize,
    _q: searchTerm,
    _status: statusFilter
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleUpdateStatus = (feedbackId: string) => {
    updateActiveStatusFeedback({ feedbackId })
      .unwrap()
      .then(() => {
        void message.success('Feedback status updated successfully');
      })
      .catch(() => {
        void message.error('Failed to update feedback status');
      });
  };

  const handleChangeStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleViewDetails = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId);
    setIsFeedbackDetailsModalVisible(true);
  };

  const handleViewHistory = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId);
    setIsFeedbackHistoryModalVisible(true);
  };

  const handleOpenFeedbackReplyDrawer = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId);
    setIsFeedbackReplyDrawerVisible(true);
  };

  const handleViewFeedbackRepliesModal = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId);
    setIsFeedbackRepliesModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '20%'
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '20%',
      ellipsis: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IContact, record: IContact) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>,
      width: '10%'
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_: IContact, record: IContact) => (
        <Space size='small'>
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetails(record._id)} />
          <Button
            onClick={() => handleOpenFeedbackReplyDrawer(record._id)}
            icon={<MessageOutlined style={{ color: '#1890ff' }} />}
          ></Button>
          {record.hasReplies ? (
            <Badge size='small' count={record.replyCount}>
              <Button
                icon={<SolutionOutlined style={{ color: '#1890ff' }} />}
                onClick={() => handleViewFeedbackRepliesModal(record._id)}
              />
            </Badge>
          ) : (
            <Button
              icon={<SolutionOutlined style={{ color: '#1890ff' }} />}
              onClick={() => handleViewFeedbackRepliesModal(record._id)}
            />
          )}

          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this feedback?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this feedback?'
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

  return (
    <div className='feedbacks-table'>
      <div className='search-bar-container'>
        <div className='search-bar'>
          <Search placeholder='Search by name' onSearch={handleSearch} enterButton allowClear className='search-wrap' />
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
        dataSource={data?.feedbacks as IContact[]}
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
      {selectedFeedbackId && (
        <FeedbackDetailsModal
          feedbackId={selectedFeedbackId}
          isOpen={isFeedbackDetailsModalVisible}
          onClose={() => setIsFeedbackDetailsModalVisible(false)}
        />
      )}
      {selectedFeedbackId && (
        <FeedbackHistoryModal
          feedbackId={selectedFeedbackId}
          isOpen={isFeedbackHistoryModalVisible}
          onClose={() => setIsFeedbackHistoryModalVisible(false)}
        />
      )}
      {selectedFeedbackId && (
        <CreateFeedbackReplyDrawer
          isOpen={isFeedbackReplyDrawerVisible}
          onClose={() => {
            setIsFeedbackReplyDrawerVisible(false);
            setSelectedFeedbackId(null);
          }}
          feedbackId={selectedFeedbackId}
        />
      )}
      {selectedFeedbackId && (
        <FeedbackRepliesModal
          feedbackId={selectedFeedbackId}
          isOpen={isFeedbackRepliesModalVisible}
          onClose={() => setIsFeedbackRepliesModalVisible(false)}
        />
      )}
    </div>
  );
};

export default FeedbacksTable;
