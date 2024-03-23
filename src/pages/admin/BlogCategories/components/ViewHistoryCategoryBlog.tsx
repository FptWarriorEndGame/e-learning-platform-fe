import { Button, Modal, Pagination, Table } from 'antd';
import { useLoadHistoriesForBlogCategoryQuery } from '../categoriesBlog.service';
import { useState } from 'react';
import moment from 'moment';
import { IActionLog } from '../../../../types/actionLog.type';

interface ViewHistoryCategoryBlogProps {
  isVisible: boolean;
  onClose: () => void;
  blogCategoryId: string;
}

const ViewHistoryCategoryBlog: React.FC<ViewHistoryCategoryBlogProps> = ({ blogCategoryId, isVisible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: categoryHistories, isFetching: isHistoryFetching } = useLoadHistoriesForBlogCategoryQuery({
    blogCategoryTypeId: blogCategoryId,
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
          dataSource={categoryHistories?.results as IActionLog[]}
          columns={columns}
          rowKey='_id'
          className='mt-8'
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
    </>
  );
};

export default ViewHistoryCategoryBlog;
