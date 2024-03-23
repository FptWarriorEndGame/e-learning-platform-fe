import { Button, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useLoadHistoriesForBlogQuery } from '../../blog.service';
import { IActionLog } from '../../../../../types/actionLog.type';

interface ViewHistoryBlogProps {
  isVisible: boolean;
  onClose: () => void;
  blogId: string;
}

const ViewHistoryBlog: React.FC<ViewHistoryBlogProps> = ({ blogId, isVisible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: blogHistories, isFetching: isHistoryFetching } = useLoadHistoriesForBlogQuery({
    blogId: blogId,
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
      <Modal title='Category Blog History' visible={isVisible} onCancel={onClose} footer={null} width={1500}>
        <Table
          dataSource={blogHistories?.results as IActionLog[]}
          columns={columns}
          rowKey='_id'
          className='mt-8'
          pagination={false}
          loading={isHistoryFetching}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={blogHistories?.count}
          onChange={handleTableChange}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </Modal>
    </>
  );
};

export default ViewHistoryBlog;
