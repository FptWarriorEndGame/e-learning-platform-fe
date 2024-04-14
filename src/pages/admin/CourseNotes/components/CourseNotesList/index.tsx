/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CheckCircleOutlined, EditOutlined, EllipsisOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Modal, Popover, Space, Table, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import Link from 'antd/es/typography/Link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { INote } from '../../../../../types/note.type';
import { formatTimeRounded, transformDate } from '../../../../../utils/functions';
import { useDeleteNoteMutation } from '../../courseNotes.service'; // Update the import path as needed
import { startEditNotesCourse } from '../../courseNotes.slice'; // Update the import path as needed

interface DataNoteType {
  key: React.Key;
  name: string | undefined;
  avatar?: string;
  content: string;
  videoMinute?: string;
  createdAt?: string;
  actions?: any;
  userId?: string;
  lessonName?: string; // Add lesson name
  courseName?: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface CourseNotesListProps {
  data: INote[];
  onNoteEdit: (noteId: string) => void;
}

const CourseNotesList: React.FC<CourseNotesListProps> = ({ data, onNoteEdit }) => {
  const dispatch = useDispatch();
  const [softDeleteNote] = useDeleteNoteMutation();

  const softDeleteNoteHandler = (noteId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this note?',
      content: 'Deleting this note will remove it permanently. This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk() {
        return new Promise((resolve, reject) => {
          softDeleteNote(noteId)
            .unwrap()
            .then(() => {
              notification.success({
                message: 'Note deleted successfully'
              });
              resolve(undefined);
            })
            .catch((error: any) => {
              console.error('error: ', error);
              notification.error({
                message: 'Failed to delete note'
              });
              reject(error);
            });
        });
      }
    });
  };

  const columns: ColumnsType<DataNoteType> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => <img src={record.avatar} alt='avatar' width='50' />
    },
    {
      title: 'Name',
      key: 'user',
      render: (_, record) => <Space>{record.name}</Space>
    },
    {
      title: 'Content',
      key: 'content',
      render: (_, record) => <Space>{record.content}</Space>
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName'
    },
    {
      title: 'Lesson Name',
      dataIndex: 'lessonName',
      key: 'lessonName'
    },
    {
      title: 'Video minutes',
      dataIndex: 'videoMinute',
      key: 'videoMinute'
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Manage',
      dataIndex: 'actions',
      key: 'actions'
    }
  ];

  const noteEditHandler = (noteId: string) => {
    onNoteEdit(noteId);
    dispatch(startEditNotesCourse(noteId));
  };

  const notesSource = data.map((noteItem) => {
    const { _id, videoMinute, content, createdAt, userId, lessonId, courseId } = noteItem;

    const noteTemplateItem: DataNoteType = {
      key: _id,
      name: userId?.name,
      avatar: userId?.avatar,
      lessonName: lessonId?.name,
      courseName: courseId?.name,
      content,
      videoMinute: formatTimeRounded(videoMinute),
      createdAt: transformDate(createdAt),
      actions: (
        <Space>
          <Button onClick={() => noteEditHandler(_id)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => softDeleteNoteHandler(_id)} danger>
            <StopOutlined />
          </Button>
        </Space>
      )
    };
    return noteTemplateItem;
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  const onChange: TableProps<DataNoteType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    setTableParams({
      pagination,
      ...filters
    });
  };

  return (
    <div className='course-notes-list'>
      <Table
        columns={columns}
        scroll={{ x: 'min-content' }}
        dataSource={notesSource}
        onChange={onChange}
        pagination={tableParams.pagination}
      />
    </div>
  );
};

export default CourseNotesList;
