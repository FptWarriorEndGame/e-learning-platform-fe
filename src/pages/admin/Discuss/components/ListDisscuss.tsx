/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
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
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { transformDate } from '../../../../utils/functions';
import { IDiscuss } from '../../../../types/discuss.type';
import { ICourse } from '../../../../types/course.type';
import { ISection } from '../../../../types/lesson.type';
import { useUpdateActiveStatusDiscussMutation, useUpdateDiscussMutation } from '../discuss.service';
import { startEditDiscuss } from '../discuss.slice';
import ViewDetailDiscuss from './ViewDetailDiscuss';
import ViewHistoryDiscuss from './ViewHistoryDiscuss';
import ViewMessDiscuss from './ViewMessReply';

interface IDisCussProps {
  data: IDiscuss[];
  onDiscussEdit: (discussId: string) => void;
  course: ICourse[];
  section: ISection[];
}

const ListDiscuss: React.FC<IDisCussProps> = ({ data, onDiscussEdit, course, section }) => {
  const dispatch = useDispatch();
  const [updateActiveStatusDiscuss] = useUpdateActiveStatusDiscussMutation();
  const [discussId, setSelectedCommentsId] = useState('');
  const [discusss, setDiscuss] = useState(data);
  const [detailVisible, setDetailVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [MessVisible, setMessVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const getCourseName = (courseId: string) => {
    const courseObj = course.find((c) => c._id === courseId);
    return courseObj ? courseObj.name : 'N/A';
  };

  const getSectionName = (sectionId: string) => {
    const sectionObj = section.find((c) => c._id === sectionId);
    return sectionObj ? sectionObj.name : 'N/A';
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleViewDetail = (discussId: string) => {
    setDetailVisible(true);
    setSelectedCommentsId(discussId);
  };

  const handleViewHistory = (discussId: string) => {
    setHistoryVisible(true);
    setSelectedCommentsId(discussId);
  };

  const handleViewMess = (discussId: string) => {
    setMessVisible(true);
    setSelectedCommentsId(discussId);
  };

  const handleUpdateStatus = (discussId: string) => {
    updateActiveStatusDiscuss({ discussId: discussId })
      .unwrap()
      .then(() => {
        void message.success('Discuss status updated successfully');
        const updatedComments = discusss.map((comment) => {
          if (comment._id === discussId) {
            return { ...comment, isDeleted: !comment.isDeleted };
          }
          return comment;
        });
        setDiscuss(updatedComments);
      })
      .catch(() => {
        void message.error('Failed to update discuss status');
      });
  };

  const discussEditHandler = (discussId: string) => {
    onDiscussEdit(discussId);
    dispatch(startEditDiscuss(discussId));
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'Avatar',
      key: 'Avatar',
      render: (_: IDiscuss, record: IDiscuss) => (
        <img src={record.userId.avatar} alt='Avatar' style={{ width: '50px', height: '50px' }} />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.userId.name}</span>
    },
    {
      title: 'Course Name',
      dataIndex: 'CourseName',
      key: 'CourseName',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.courseId?.name}</span>
    },
    {
      title: 'Lesson Name',
      dataIndex: 'LessonNamee',
      key: 'LessonName',
      render: (_: IDiscuss, record: IDiscuss) => {
        return <span>{record.lessonId?.name}</span>;
      }
    },
    {
      title: 'Comments',
      dataIndex: 'Comments',
      key: 'Comments',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.comments}</span>
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: IDiscuss, record: IDiscuss) => (
        <span>{record.createdAt ? transformDate(record.createdAt) : 'N/A'}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: IDiscuss, record: IDiscuss) => (
        <Space size='middle'>
          <Button
            icon={<MessageOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewMess(record._id)}
            className='btn-wrap'
          >
            <span style={{ color: '#1890ff' }}>{record.replies.length}</span>
          </Button>
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetail(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this discuss?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this discuss?'
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
        dataSource={discusss}
        pagination={{ current: currentPage, pageSize, onChange: handleTableChange }}
        scroll={{ x: '1200px', y: 'calc(100vh - 300px)' }}
      />
      <ViewDetailDiscuss isVisible={detailVisible} onClose={() => setDetailVisible(false)} discussId={discussId} />
      <ViewHistoryDiscuss isVisible={historyVisible} onClose={() => setHistoryVisible(false)} discussId={discussId} />
      <ViewMessDiscuss isVisible={MessVisible} onClose={() => setMessVisible(false)} discussId={discussId} />
    </div>
  );
};

export default ListDiscuss;
