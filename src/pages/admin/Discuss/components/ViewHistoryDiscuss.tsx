import { Modal, Pagination, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { IActionLog } from '../../../../types/actionLog.type';
import { useLoadHistoriesForDiscussQuery } from '../discuss.service';

interface ViewDiscussProps {
  isVisible: boolean;
  onClose: () => void;
  discussId: string;
}

const ViewHistoryDiscuss: React.FC<ViewDiscussProps> = ({ discussId, isVisible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: commentsDiscuss, isFetching: isHistoryFetching } = useLoadHistoriesForDiscussQuery({
    discussId: discussId,
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
    <>
      <Modal title='Discuss History' visible={isVisible} onCancel={onClose} footer={null} width={1500}>
        <Table
          dataSource={commentsDiscuss?.results as IActionLog[]}
          columns={columns}
          rowKey='_id'
          className='mt-8'
          pagination={false}
          loading={isHistoryFetching}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={commentsDiscuss?.count}
          onChange={handleTableChange}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </Modal>
    </>
  );
};

export default ViewHistoryDiscuss;
