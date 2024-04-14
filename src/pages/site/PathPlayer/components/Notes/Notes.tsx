/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Modal, Select, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../../../../store/store';
import { INote } from '../../../../../types/note.type';
import { formatTimeAndMinutes, transformDate } from '../../../../../utils/functions';
import {
  useDeleteNoteMutation,
  useGetAllLessonsQuery,
  useGetAllNotesQuery,
  useGetNotesByLessonIdQuery,
  useUpdateNoteMutation
} from '../../../client.service';
import './Notes.scss';
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
  const [filter, setFilter] = useState(currLessonId || 'all');
  const [notes, setNotes] = useState<INote[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const { data: lessonsData, isLoading: isLoadingLessons } = useGetAllLessonsQuery();

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    setFilter(currLessonId || 'all');
  }, [currLessonId]);

  const {
    data: lessonNotesData,
    error,
    isLoading: isLoadingLesson,
  } = useGetNotesByLessonIdQuery(filter, {
    skip: filter === 'all',
    refetchOnMountOrArgChange: true
  });

  const {
    data: allNotesData,
    error: errorAll,
    isLoading: isLoadingAll,
  } = useGetAllNotesQuery(filter, {
    skip: filter !== 'all',
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (filter === 'all') {
      if (allNotesData && allNotesData.notes) {
        setNotes(allNotesData.notes.filter((note) => note.userId === userId));
      } else {
        setNotes([]);
      }
    } else {
      if (lessonNotesData && lessonNotesData.notes) {
        setNotes(lessonNotesData.notes.filter((note) => note.userId === userId));
      } else {
        setNotes([]);
      }
    }
  }, [filter, allNotesData, lessonNotesData]); // Đảm bảo đúng dependencies được theo dõi

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
    Modal.confirm({
      title: 'Delete Note',
      content: 'Are you sure you want to delete this note?',
      onOk: async () => {
        try {
          await deleteNote(noteId).unwrap();
          notification.success({ message: 'Delete note successfully' });
          setNotes(notes.filter((note) => note._id !== noteId));
        } catch (error) {
          console.error('Failed to delete note:', error);
        }
      }
    });
  };

  return (
    <div className={props.className + ' Notes'}>
      <div className=''>
        <Typography.Title level={4}>Notes</Typography.Title>
        <Select value={filter} style={{ width: 320, marginBottom: 10 }} onChange={handleFilterChange}>
          <Option value='all'>All notes</Option>
          {lessonsData?.lessons.map((lesson) => (
            <Option key={lesson._id} value={lesson._id}>
              {lesson.name}
            </Option>
          ))}
        </Select>
        {isLoadingLesson ? (
          <div>Loading...</div>
        ) : notes && notes.length > 0 ? (
          <div className='modal-content-scrollable'>
            {notes.map((note) => (
              <div key={note._id} className='mb-3'>
                <div className='mr-6'>
                  <div className='flex items-center justify-between'>
                    <span className='bg-red-500 w-20 text-center text-white rounded-2xl mb-4 mr-4'>
                      {formatTimeAndMinutes(note.videoMinute)}
                    </span>
                    <span>
                      <p className='opacity-70'>
                        {lessonsData?.lessons.find((lesson) => lesson._id === note.lessonId)?.name}
                      </p>
                    </span>
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
