import { Button, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useGetUserHistoriesQuery } from '../../user.service';

interface ViewHistoryUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const ViewHistoryUser: React.FC<ViewHistoryUserProps> = ({ userId, onClose, isOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: categoryHistories, isFetching: isHistoryFetching } = useGetUserHistoriesQuery({
    userId: userId,
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
    <Modal title='Category Blog History' visible={isOpen} onCancel={onClose} footer={null} width='80%' centered>
      <Table
        dataSource={categoryHistories?.results}
        columns={columns}
        rowKey='_id'
        pagination={false}
        loading={isHistoryFetching}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={categoryHistories?.count}
        onChange={handleTableChange}
        style={{ marginTop: '16px', textAlign: 'right' }}
      />
    </Modal>
  );
};

export default ViewHistoryUser;
