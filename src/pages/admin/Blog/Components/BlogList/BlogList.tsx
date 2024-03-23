import { CheckCircleOutlined, EditOutlined, EyeOutlined, HistoryOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IBlog } from '../../../../../types/blog.type';
import { ICategoryBlogs } from '../../../../../types/categoryBlogs.type';
import { transformDate } from '../../../../../utils/functions';
import { useUpdateActiveStatusBlogMutation } from '../../blog.service';
import { startEditBlog } from '../../blog.slice';
import BlogDetailModal from '../BlogsDetailModal/BlogDetailModal';
import './BlogList.scss';
import ViewHistoryBlog from '../ViewHistoryBLog';

interface BlogListProps {
  data: IBlog[];
  onBlogEdit: (blogId: string) => void;
  categories: ICategoryBlogs[];
}

const BlogsList: React.FC<BlogListProps> = ({ data, onBlogEdit, categories }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<IBlog[]>(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [updateActiveStatusBlog] = useUpdateActiveStatusBlogMutation();
  const [currentBlogId, setCurrentBlogId] = useState(data.length > 0 ? data[0]._id : '');

  const handleViewHistory = (blogId: string) => {
    setCurrentBlogId(blogId);
    setHistoryVisible(true);
  };

  const showModal = (blogId: string) => {
    const blog = data.find((blog) => blog._id === blogId);
    if (blog) {
      setSelectedBlog(blog);
      setIsModalVisible(true);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : 'Not available';
  };

  const blogEditHandler = (blogId: string) => {
    onBlogEdit(blogId);
    dispatch(startEditBlog(blogId));
  };

  const handleUpdateStatus = (blogId: string) => {
    updateActiveStatusBlog({ blogId })
      .unwrap()
      .then(() => {
        notification.success({ message: 'Blog status updated successfully' });
        const updatedBlog = blogs.map((blog) => {
          if (blog._id === blogId) {
            return {
              ...blog,
              isDeleted: !blog.isDeleted
            };
          }
          return blog;
        });
        setBlogs(updatedBlog);
      })
      .catch(() => {
        notification.error({ message: 'Blog status update failed' });
      });
  };

  const columns: ColumnsType<IBlog> = [
    {
      title: 'Author Image',
      dataIndex: 'blogImg',
      key: 'blogImg',
      render: (text: string, record: IBlog) => (
        <img className='rounded-full' src={record.blogImg} alt='Author' style={{ width: '50px', height: '50px' }} />
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_: IBlog, record: IBlog) => getCategoryName(record.categoryId)
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      render: (_: IBlog, record: IBlog) => (
        <span>
          {record.title.substring(0, 30)}
          {record.title.length > 30 ? '...' : ''}
        </span>
      )
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (_: IBlog, record: IBlog) => <span>{record.author}</span>
    },
    {
      title: 'Content',
      dataIndex: 'content',
      render: (_: IBlog, record: IBlog) => (
        <span>
          {record.content.substring(0, 80)}
          {record.content.length > 60 ? '...' : ''}
        </span>
      )
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: (_: IBlog, record: IBlog) => transformDate(record.createdAt ? record.createdAt : new Date().toISOString())
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IBlog, record: IBlog) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Manage',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: IBlog, record: IBlog) => (
        <Space size='middle'>
          <Button icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => blogEditHandler(record._id)} />
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => showModal(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this blog?'
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
    <div className='users-list'>
      <Table columns={columns} dataSource={blogs} pagination={{ pageSize: 5 }} scroll={{ x: 'min-content' }} />
      {selectedBlog && (
        <BlogDetailModal
          blog={selectedBlog}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          categories={categories}
        />
      )}
      <ViewHistoryBlog isVisible={historyVisible} onClose={() => setHistoryVisible(false)} blogId={currentBlogId} />
    </div>
  );
};

export default BlogsList;
