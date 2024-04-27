import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message, Popconfirm, Select, Badge } from 'antd';
import moment from 'moment';
import {
  EyeOutlined,
  HistoryOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  StopOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { useGetReviewsQuery, useUpdateActiveStatusReviewMutation } from '../review.service';
import ReviewDetailsModal from '../ReviewDetailsModal/ReviewDetailsModal';
import CreateReviewReplyDrawer from '../CreateReviewReplyDrawer/CreateReviewReplyDrawer';
import ReviewHistoryModal from '../ReviewHistoryModal/ReviewHistoryModal';
import ReviewRepliesModal from '../ReviewRepliesModal/ReviewRepliesModal';
import { IReview } from '../../../../../../types/review.type';
import './ReviewsTable.scss';

const { Search } = Input;
const { Option } = Select;

const ReviewsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilterValue, setDateFilterValue] = useState('all');

  const { data, isFetching } = useGetReviewsQuery({
    _page: currentPage,
    _limit: pageSize,
    _q: searchTerm,
    _status: statusFilter,
    _date: dateFilterValue
  });

  const [updateActiveStatusReview] = useUpdateActiveStatusReviewMutation();

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isReviewReplyDrawerVisible, setIsReviewReplyDrawerVisible] = useState(false);
  const [selectedReviewIdForReply, setSelectedReviewIdForReply] = useState<string | null>(null);

  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isRepliesModalVisible, setIsRepliesModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsDetailModalVisible(true);
  };

  const handleUpdateStatus = (reviewId: string) => {
    updateActiveStatusReview({ reviewId })
      .unwrap()
      .then(() => {
        void message.success('Review status updated successfully');
      })
      .catch(() => {
        void message.error('Failed to update review status');
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

  const handleOpenReviewReplyDrawer = (reviewId: string) => {
    setSelectedReviewIdForReply(reviewId);
    setIsReviewReplyDrawerVisible(true);
  };

  const handleViewHistory = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsHistoryModalVisible(true);
  };

  const handleViewReplies = (reviewId: string) => {
    setSelectedReviewIdForReply(reviewId);
    setIsRepliesModalVisible(true);
  };

  const ReviewDateFilterChange = (value: string) => {
    setDateFilterValue(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseId',
      key: 'courseId',
      ellipsis: true,
      width: '20%',
      sorter: (a: IReview, b: IReview) => a.courseId?.name.localeCompare(b.courseId?.name),
      render: (_: IReview, record: IReview) => record.courseId?.name || 'N/A'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      sorter: (a: IReview, b: IReview) => a.title.localeCompare(b.title),
      ellipsis: true
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '25%',
      ellipsis: true
    },
    {
      title: 'Rating',
      dataIndex: 'ratingStar',
      key: 'ratingStar',
      ellipsis: true,
      width: '7%',
      sorter: (a: IReview, b: IReview) => a.ratingStar - b.ratingStar
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IReview, record: IReview) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>,
      width: '7%'
    },
    {
      title: 'Create at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: IReview, b: IReview) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: (_: IReview, record: IReview) => (
        <span>{record.createdAt ? moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}</span>
      ),
      width: '15%'
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_: IReview, record: IReview) => (
        <Space size='small'>
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetails(record._id)} />
          <Button
            onClick={() => handleOpenReviewReplyDrawer(record._id)}
            icon={<MessageOutlined style={{ color: '#1890ff' }} />}
          ></Button>
          {record.hasReplies ? (
            <Badge size='small' count={record.replyCount}>
              <Button
                icon={<SolutionOutlined style={{ color: '#1890ff' }} />}
                onClick={() => handleViewReplies(record._id)}
              />
            </Badge>
          ) : (
            <Button
              icon={<SolutionOutlined style={{ color: '#1890ff' }} />}
              onClick={() => handleViewReplies(record._id)}
            />
          )}
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this review?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this review?'
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
    <div className='reviews-table'>
      <div className='search-bar-container'>
        <div className='w-3/5 mr-3'>
          <Search
            placeholder='Search by title'
            onSearch={handleSearch}
            enterButton
            allowClear
            className='search-wrap'
          />
        </div>
        <Select
          size='middle'
          placeholder='All Dates'
          defaultValue={'All dates'}
          onChange={ReviewDateFilterChange}
          style={{ width: '200px', marginRight: '10px' }}
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
        <div className='status-filter'>
          <Select defaultValue='all' style={{ width: 120 }} onChange={handleChangeStatusFilter}>
            <Option value='all'>All</Option>
            <Option value='active'>Active</Option>
            <Option value='inactive'>Inactive</Option>
          </Select>
        </div>
      </div>
      <Table
        dataSource={data?.reviews as IReview[]}
        columns={columns}
        rowKey='_id'
        // pagination={false}
        loading={isFetching}
        scroll={{ y: 600 }}
      />
      {/* <Pagination
        style={{ float: 'right', marginRight: '0px' }}
        className='pagination'
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        onChange={handlePageChange}
        showSizeChanger
      /> */}
      {selectedReviewId && (
        <ReviewDetailsModal
          reviewId={selectedReviewId}
          isOpen={isDetailModalVisible}
          onClose={() => setIsDetailModalVisible(false)}
        />
      )}
      {selectedReviewId && (
        <ReviewHistoryModal
          reviewId={selectedReviewId}
          isOpen={isHistoryModalVisible}
          onClose={() => setIsHistoryModalVisible(false)}
        />
      )}
      {selectedReviewIdForReply && (
        <ReviewRepliesModal
          reviewId={selectedReviewIdForReply}
          isOpen={isRepliesModalVisible}
          onClose={() => setIsRepliesModalVisible(false)}
        />
      )}
      {selectedReviewIdForReply && (
        <CreateReviewReplyDrawer
          isOpen={isReviewReplyDrawerVisible}
          onClose={() => {
            setIsReviewReplyDrawerVisible(false);
            setSelectedReviewIdForReply(null);
          }}
          reviewId={selectedReviewIdForReply}
        />
      )}
    </div>
  );
};

export default ReviewsTable;
