import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message, Popconfirm, Select } from 'antd';
import { useGetReviewsQuery, useDeleteReviewMutation, useUndeleteReviewMutation } from '../review.service';
import ReviewDetailsModal from '../ReviewDetailsModal/ReviewDetailsModal';
import { IReview } from '../../../../../../types/review.type';
import './ReviewsTable.scss';

const { Search } = Input;
const { Option } = Select;

const ReviewsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data, isFetching } = useGetReviewsQuery({
    _page: currentPage,
    _limit: pageSize,
    _q: searchTerm,
    _status: statusFilter
  });
  const [deleteReview] = useDeleteReviewMutation();
  const [undeleteReview] = useUndeleteReviewMutation();

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsModalVisible(true);
  };

  const handleDelete = (reviewId: string) => {
    deleteReview(reviewId)
      .unwrap()
      .then(() => {
        void message.success('Review deleted successfully');
      })
      .catch(() => {
        void message.error('Failed to delete review');
      });
  };

  const handleUndelete = (reviewId: string) => {
    undeleteReview(reviewId)
      .unwrap()
      .then(() => {
        void message.success('Review undeleted successfully');
      })
      .catch(() => {
        void message.error('Failed to undelete review');
      });
  };

  const handleChangeStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseId',
      key: 'courseId',
      ellipsis: true,
      render: (_: IReview, record: IReview) => record.courseId?.name || 'N/A'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: 'Rating',
      dataIndex: 'ratingStar',
      key: 'ratingStar',
      ellipsis: true,
      width: '10%'
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IReview, record: IReview) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>,
      width: '10%'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: IReview, record: IReview) => (
        <Space size='middle'>
          <Button onClick={() => handleViewDetails(record._id)}>View Details</Button>
          {record.isDeleted ? (
            <>
              <Popconfirm
                title='Are you sure you want to activate this review?'
                placement='topRight'
                onConfirm={() => handleUndelete(record._id)}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary'>Activate</Button>
              </Popconfirm>
            </>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this review?'
              placement='topRight'
              onConfirm={() => handleDelete(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button danger>Deactivate</Button>
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

  return (
    <div className='reviews-table'>
      <div className='search-bar-container'>
        <div className='search-bar'>
          <Search placeholder='Search by title' onSearch={handleSearch} enterButton allowClear />
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
        dataSource={data?.reviews as IReview[]}
        columns={columns}
        rowKey='_id'
        pagination={false}
        loading={isFetching}
      />
      <Pagination
        className='pagination'
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        onChange={handlePageChange}
        showSizeChanger
      />
      {selectedReviewId && (
        <ReviewDetailsModal
          reviewId={selectedReviewId}
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ReviewsTable;
