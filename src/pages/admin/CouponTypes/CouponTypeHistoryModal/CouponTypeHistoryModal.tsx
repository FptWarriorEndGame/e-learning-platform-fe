import React, { useState } from 'react';
import { Modal, Table, Pagination } from 'antd';
import moment from 'moment';
import { useGetCouponTypeHistoriesQuery } from '../couponType.service';
import { IActionLog } from '../../../../types/actionLog.type';

interface CouponTypeHistoryModalProps {
  couponTypeId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CouponTypeHistoryModal: React.FC<CouponTypeHistoryModalProps> = ({ couponTypeId, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: historyData, isFetching: isHistoryFetching } = useGetCouponTypeHistoriesQuery({
    couponTypeId,
    params: { _page: currentPage, _limit: pageSize }
  });

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  ];

  const handleTableChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <Modal title='Coupon Type History' open={isOpen} onCancel={onClose} footer={null} width={1500}>
      <Table
        dataSource={historyData?.results as IActionLog[]}
        columns={columns}
        rowKey='_id'
        className='mt-8'
        pagination={false}
        loading={isHistoryFetching}
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

export default CouponTypeHistoryModal;
