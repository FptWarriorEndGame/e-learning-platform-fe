import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Modal, Popover, Space, Table, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { INote } from '../../../../../types/note.type';
import { useDeleteCourseNoteMutation } from '../../courseNotes.service'; // Update the import path as needed
import { startEditNotesCourse } from '../../courseNotes.slice'; // Update the import path as needed
import Link from 'antd/es/typography/Link';
import { formatTimeRounded, transformDate } from '../../../../../utils/functions';

interface DataNoteType {
  key: React.Key;
  content: string;
  videoMinute?: string;
  createdAt?: string;
  actions?: any;
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

const SettingContent = (noteId: string) => {
  const [softDeleteNote] = useDeleteCourseNoteMutation();

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

  return (
    <div>
      <p>Content</p>
      <Link onClick={() => softDeleteNoteHandler(noteId)}>Delete</Link>{' '}
    </div>
  );
};

const CourseNotesList: React.FC<CourseNotesListProps> = ({ data, onNoteEdit }) => {
  const dispatch = useDispatch();

  const columns: ColumnsType<DataNoteType> = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content'
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
    const { _id, videoMinute, content, createdAt } = noteItem;
    const noteTemplateItem: DataNoteType = {
      key: _id,
      content,
      videoMinute: formatTimeRounded(videoMinute),
      createdAt: transformDate(createdAt),
      actions: (
        <Space>
          <Button onClick={() => noteEditHandler(_id)}>
            <EditOutlined />
          </Button>
          <Popover placement='bottomRight' content={() => SettingContent(_id)} title='Actions'>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Popover>
        </Space>
      )
    };
    return noteTemplateItem;
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10 // Adjust the pageSize as needed
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
      <Table columns={columns} dataSource={notesSource} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CourseNotesList;