/* eslint-disable @typescript-eslint/no-misused-promises */
import { BookOutlined, CheckOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Modal, Select, Typography } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { formatTimeAndMinutes, transformDate } from '../../../../../utils/functions';
import {
  useDeleteNoteMutation,
  useGetAllLessonsQuery,
  useGetNotesByLessonIdQuery,
  useUpdateNoteMutation
} from '../../../client.service';
import './Notes.scss';
import { INote } from '../../../../../types/note.type';
import { useSearchParams } from 'react-router-dom';
type Props = {
  className: string;
};
const { Option } = Select;

const Notes = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);
  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  const { data, error, isLoading } = useGetNotesByLessonIdQuery(currLessonId, {
    skip: !currLessonId
  });
  const { data: lessonsData } = useGetAllLessonsQuery();
  console.log('data', lessonsData);

  const startEditing = (note: INote) => {
    setEditingNoteId(note._id);
    setNewContent(note.content);
  };

  const saveNote = async (noteId: string, newContent: string) => {
    try {
      await updateNote({
        _id: noteId,
        content: newContent
      }).unwrap();
      setEditingNoteId(null);
      setNewContent('');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId).unwrap();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const filteredNotes = data?.notes.filter((note) => {
    if (filter === 'all') return true;
    return false;
  });

  return (
    <div className={props.className + ' Notes'}>
      <div className=''>
        {isLoading ? (
          <div>Loading...</div>
        ) : filteredNotes && filteredNotes.length > 0 ? (
          <div className='modal-content-scrollable'>
            <Typography className='text-3xl mb-4'>List Notes</Typography>
            <Select defaultValue='all' style={{ width: 120, marginBottom: 10 }} onChange={handleFilterChange}>
              <Option value='all'>All</Option>
            </Select>
            {filteredNotes.map((note) => (
              <div key={note._id} className='mb-3'>
                <div className='mr-6'>
                  <div className='flex items-center justify-between'>
                    <p className='bg-red-500 w-20 text-center text-white rounded-2xl mb-4'>
                      {formatTimeAndMinutes(note.videoMinute)}
                    </p>
                    <div className='mb-4'>
                      {editingNoteId === note._id ? (
                        <Input
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          onPressEnter={() => saveNote(editingNoteId, newContent)} // Thêm xử lý này
                          suffix={
                            <SaveOutlined
                              onClick={() => saveNote(note._id, newContent)}
                              className='text-2xl font-semibold'
                              style={{ color: 'rgba(22, 109, 231, 0.45)' }} // Điều chỉnh màu sắc nếu cần
                            />
                          }
                        />
                      ) : (
                        <>
                          <Button type='link' onClick={() => startEditing(note)}>
                            <EditOutlined />
                          </Button>
                          <Button type='link' onClick={() => handleDeleteNote(note._id)}>
                            <DeleteOutlined />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingNoteId !== note._id && (
                    <div className='flex flex-col'>
                      <p className='text-2xl bg-slate-200 w-full py-4 pl-3 rounded-xl flex justify-between'>
                        {note.content}
                        <span className='pr-6'>{transformDate(note.createdAt)}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty description='No Notes' />
        )}
      </div>
    </div>
  );
};

export default Notes;
