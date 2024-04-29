import { CheckCircleOutlined, EditOutlined, EyeOutlined, HistoryOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ICategoryBlogs } from '../../../../types/categoryBlogs.type';
import { transformDate } from '../../../../utils/functions';
import { useUpdateActiveStatusBlogCategoryMutation } from '../categoriesBlog.service';
import { startEditCategory } from '../categoriesBlog.slice';
import ViewDetailCategoryBlog from './ViewDetailCategoryBlog';
import ViewHistoryCategoryBlog from './ViewHistoryCategoryBlog';

interface CategoryListProps {
  data: ICategoryBlogs[];
  onCategoryEdit: (BlogcategoryId: string) => void;
}

const CategoriesBlogList: React.FC<CategoryListProps> = ({ data, onCategoryEdit }) => {
  const dispatch = useDispatch();
  const [updateActiveStatusBlogCategory] = useUpdateActiveStatusBlogCategoryMutation();

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState<ICategoryBlogs[]>(data);
  const [detailVisible, setDetailVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleViewDetail = (blogCategoryId: string) => {
    setDetailVisible(true);
    setSelectedCategoryId(blogCategoryId);
  };

  const handleViewHistory = (blogCategoryId: string) => {
    setHistoryVisible(true);
    setSelectedCategoryId(blogCategoryId);
  };

  const handleUpdateStatus = (blogCategoryId: string) => {
    updateActiveStatusBlogCategory({ blogCategoryTypeId: blogCategoryId })
      .unwrap()
      .then(() => {
        void message.success('Blog category status updated successfully');
        const updatedCategories = categories.map((category) => {
          if (category._id === blogCategoryId) {
            return {
              ...category,
              isDeleted: !category.isDeleted
            };
          }
          return category;
        });
        setCategories(updatedCategories);
      })
      .catch(() => {
        void message.error('Failed to update blog category status');
      });
  };

  const categoryEditHandler = (blogCategoryId: string) => {
    onCategoryEdit(blogCategoryId);
    dispatch(startEditCategory(blogCategoryId));
  };

  const columns = [
    {
      title: 'Cate Image',
      dataIndex: 'cateImage',
      render: (text: string, record: ICategoryBlogs) => (
        <img
          className='rounded-full'
          src={record.cateImage}
          alt='cateImage'
          style={{ width: '50px', height: '50px' }}
        />
      ),
      key: 'cateImage'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: ICategoryBlogs, record: ICategoryBlogs) => <span>{record.name}</span>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_: ICategoryBlogs, record: ICategoryBlogs) => (
        <span>{record.description.length > 60 ? record.description.substring(0, 60) + '...' : record.description}</span>
      )
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: ICategoryBlogs, record: ICategoryBlogs) => (
        <span>{record.createdAt ? transformDate(record.createdAt) : 'N/A'}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: ICategoryBlogs, record: ICategoryBlogs) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: ICategoryBlogs, record: ICategoryBlogs) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            onClick={() => categoryEditHandler(record._id)}
            className='btn-wrap'
          ></Button>
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetail(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this blog category?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this blog category?'
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
    <div className='categories-list'>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={{ current: currentPage, pageSize, onChange: handleTableChange }}
        scroll={{ x: 'max-content', y: 820 }}
      />
      <ViewDetailCategoryBlog
        isVisible={detailVisible}
        onClose={() => setDetailVisible(false)}
        blogCategoryId={selectedCategoryId}
      />
      <ViewHistoryCategoryBlog
        isVisible={historyVisible}
        onClose={() => setHistoryVisible(false)}
        blogCategoryId={selectedCategoryId}
      />
    </div>
  );
};

export default CategoriesBlogList;
