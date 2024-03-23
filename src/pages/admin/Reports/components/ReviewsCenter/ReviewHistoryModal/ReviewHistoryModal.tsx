import React, { useState } from 'react';
import { Modal, Table, Pagination } from 'antd';
import moment from 'moment';
import { useGetReviewHistoriesQuery } from '../review.service';
import { IActionLog } from '../../../../../../types/actionLog.type';

interface ReviewHistoryModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewHistoryModal: React.FC<ReviewHistoryModalProps> = ({ reviewId, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: historyData, isFetching: isHistoryFetching } = useGetReviewHistoriesQuery({
    reviewId,
    params: { _page: currentPage, _limit: pageSize }
  });

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '80%',
      ellipsis: true
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (createdAt: string) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  ];

  const handleTableChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <Modal title='Review History' open={isOpen} onCancel={onClose} footer={null} width={1500}>
      <Table
        dataSource={historyData?.results as IActionLog[]}
        columns={columns}
        rowKey='_id'
        className='mt-8'
        pagination={false}
        loading={isHistoryFetching}
        scroll={{ y: 400 }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={historyData?.count}
        onChange={handleTableChange}
        style={{ marginTop: '16px', textAlign: 'right' }}
      />
    </Modal>
  );
};

export default ReviewHistoryModal;
