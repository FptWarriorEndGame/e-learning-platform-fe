import React, { useState } from 'react';
import { Modal, Table, Button, Space, message, Popconfirm, Pagination } from 'antd';
import { StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useGetReviewRepliesByReviewIdQuery, useUpdateActiveStatusReviewReplyMutation } from '../review.service';
import { IReviewReply } from '../../../../../../types/review.type';

interface ReviewRepliesModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewRepliesModal: React.FC<ReviewRepliesModalProps> = ({ reviewId, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: repliesData,
    isFetching: isRepliesFetching,
    refetch: refetchReplies
  } = useGetReviewRepliesByReviewIdQuery({ reviewId, params: { _page: currentPage, _limit: pageSize } });

  const [updateActiveStatusReviewReply] = useUpdateActiveStatusReviewReplyMutation();

  const columns = [
    {
      title: 'Content Reply',
      dataIndex: 'contentReply',
      key: 'contentReply',
      width: '60%',
      ellipsis: true
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (createdAt: string) => <span>{createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}</span>
    },
    {
      title: 'Created By',
      dataIndex: 'createBy',
      key: 'createBy',
      ellipsis: true,
      width: '20%',
      render: (_: IReviewReply, record: IReviewReply) => {
        if (typeof record.createdBy === 'object' && record.createdBy !== null) {
          return record.createdBy.name || 'N/A';
        } else {
          return 'N/A';
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: '10%',
      render: (isDeleted: boolean) => <span>{isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_: IReviewReply, record: IReviewReply) => (
        <Space size='small'>
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this reply?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this reply?'
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

  const handleTableChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleUpdateStatus = (reviewReplyId: string) => {
    updateActiveStatusReviewReply({ reviewId, reviewReplyId })
      .unwrap()
      .then(() => {
        void message.success('Reply status updated successfully');
        void refetchReplies();
      })
      .catch(() => {
        void message.error('Failed to update reply status');
      });
  };

  return (
    <Modal title='Review Replies' open={isOpen} onCancel={onClose} footer={null} width={1500}>
      <Table
        dataSource={repliesData?.reviewReplies as IReviewReply[]}
        columns={columns}
        rowKey='_id'
        className='mt-8'
        pagination={false}
        loading={isRepliesFetching}
        scroll={{ y: 400 }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={repliesData?.count}
        onChange={handleTableChange}
        style={{ marginTop: '16px', textAlign: 'right' }}
      />
    </Modal>
  );
};

export default ReviewRepliesModal;
