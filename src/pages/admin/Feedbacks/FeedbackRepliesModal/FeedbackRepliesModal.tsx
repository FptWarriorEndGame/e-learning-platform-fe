import React, { useState } from 'react';
import { Modal, Table, Button, Space, message, Popconfirm, Pagination } from 'antd';
import { StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useGetFeedbackRepliesByFeedbackIdQuery } from '../feedback.service';
import { IFeedbackReply } from '../../../../types/contact.type';

interface FeedbackRepliesModalProps {
  feedbackId: string;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackRepliesModal: React.FC<FeedbackRepliesModalProps> = ({ feedbackId, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: repliesData,
    isFetching: isRepliesFetching,
    refetch: refetchReplies
  } = useGetFeedbackRepliesByFeedbackIdQuery({ feedbackId, params: { _page: currentPage, _limit: pageSize } });

  const columns = [
    {
      title: 'Content Reply',
      dataIndex: 'contentReply',
      key: 'contentReply',
      width: '60%',
      ellipsis: true
    },
    {
      title: 'Created By',
      dataIndex: 'createBy',
      key: 'createBy',
      ellipsis: true,
      width: '20%',
      render: (_: IFeedbackReply, record: IFeedbackReply) => {
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
    }
  ];

  const handleTableChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <Modal title='Feedback Replies' open={isOpen} onCancel={onClose} footer={null} width={1500}>
      <Table
        dataSource={repliesData?.feedbackReplies as IFeedbackReply[]}
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

export default FeedbackRepliesModal;
