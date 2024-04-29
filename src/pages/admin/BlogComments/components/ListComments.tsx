/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  HistoryOutlined,
  MessageOutlined,
  StopOutlined
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IBlog } from '../../../../types/blog.type';
import { IBlogComment } from '../../../../types/blogComments.type';
import { transformDate } from '../../../../utils/functions';
import { useUpdateActiveStatusBlogCommentsMutation } from '../blogComments.service';
import { startEditBlogComments } from '../blogComments.slice';
import ViewDetailBlogComments from './ViewDetailBlogComments';
import ViewHistoryBlogComments from './ViewHistoryBlogComments';
import ViewMessReply from './ViewMessReply';

interface IBlogProps {
  data: IBlogComment[];
  onBlogCommentsEdit: (commentId: string) => void;
  blog: IBlog[];
}

const ListComments: React.FC<IBlogProps> = ({ data, onBlogCommentsEdit, blog }) => {
  const dispatch = useDispatch();
  const [updateActiveStatusBlogComments] = useUpdateActiveStatusBlogCommentsMutation();
  const [blogCommentId, setSelectedCommentsId] = useState('');
  const [comments, setComments] = useState(data);
  const [detailVisible, setDetailVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [MessVisible, setMessVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getBlogName = (blogId: string) => {
    const blogs = blog.find((c) => c._id === blogId);
    return blogs?.title ? blogs.title : 'N/A';
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleViewDetail = (commentId: string) => {
    setDetailVisible(true);
    setSelectedCommentsId(commentId);
  };

  const handleViewHistory = (commentId: string) => {
    setHistoryVisible(true);
    setSelectedCommentsId(commentId);
  };

  const handleViewMess = (commentId: string) => {
    setMessVisible(true);
    setSelectedCommentsId(commentId);
  };

  const handleUpdateStatus = (commentId: string) => {
    updateActiveStatusBlogComments({ commentId: commentId })
      .unwrap()
      .then(() => {
        void message.success('Blog Comments status updated successfully');
        const updatedComments = comments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              isDeleted: !comment.isDeleted
            };
          }
          return comment;
        });
        setComments(updatedComments);
      })
      .catch(() => {
        void message.error('Failed to update blog category status');
      });
  };

  const BlogCommentsEditHandler = (blogId: string) => {
    onBlogCommentsEdit(blogId);
    dispatch(startEditBlogComments(blogId));
  };

  const columns = [
    {
      title: 'Blog Name',
      dataIndex: 'Blog',
      key: 'Blog',
      render: (_: IBlogComment, record: IBlogComment) => <span>{getBlogName(record.blogId)}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: IBlogComment, record: IBlogComment) => <span>{record.userId.name}</span>
    },
    {
      title: 'Comments',
      dataIndex: 'Comments',
      key: 'Comments',
      render: (_: IBlogComment, record: IBlogComment) => <span>{record.content}</span>
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: IBlogComment, record: IBlogComment) => (
        <span>{record.createdAt ? transformDate(record.createdAt) : 'N/A'}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IBlogComment, record: IBlogComment) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: IBlogComment, record: IBlogComment) => (
        <Space size='middle'>
          <Button
            icon={<MessageOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewMess(record.blogId)}
            className='btn-wrap'
          >
            <span style={{ color: '#1890ff' }}>{record.replies.length}</span>
          </Button>
          {/* <Button
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            onClick={() => BlogCommentsEditHandler(record.blogId)}
            className='btn-wrap'
          ></Button> */}
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetail(record.blogId)} />
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
        dataSource={comments}
        pagination={{ current: currentPage, pageSize, onChange: handleTableChange }}
        scroll={{ x: 'max-content', y: 800 }}
      />
      <ViewDetailBlogComments
        isVisible={detailVisible}
        onClose={() => setDetailVisible(false)}
        blogCommentId={blogCommentId}
      />
      <ViewHistoryBlogComments
        isVisible={historyVisible}
        onClose={() => setHistoryVisible(false)}
        blogCommentId={blogCommentId}
      />
      <ViewMessReply isVisible={MessVisible} onClose={() => setMessVisible(false)} blogCommentId={blogCommentId} />
    </div>
  );
};

export default ListComments;
