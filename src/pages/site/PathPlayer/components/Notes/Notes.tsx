/* eslint-disable @typescript-eslint/no-misused-promises */
import { BookOutlined, CheckOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { formatTimeAndMinutes, transformDate } from '../../../../../utils/functions';
import { useDeleteNoteMutation, useGetNotesByUserIdQuery, useUpdateNoteMutation } from '../../../client.service';
import './Notes.scss';
import { INote } from '../../../../../types/note.type';
type Props = {
  className: string;
};
const Notes = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector<RootState, string>((state: RootState) => state.auth.userId);

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');

  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  const { data, error, isLoading } = useGetNotesByUserIdQuery(userId, {
    pollingInterval: 15000 // Polling mỗi 15 giây
  });

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId).unwrap();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className={props.className + ' Notes'}>
      <div className=''>
        <h1 className='text-2xl mb-3'>Nhấn vào đây để xem ghi chú :</h1>
        <Button type='default' className='flex items-center	' onClick={showModal}>
          Ghi chú <BookOutlined />
        </Button>
        <Modal title='' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className='modal-content-scrollable'>
              <h1 className='text-4xl mb-5'>Ghi chú của tôi</h1>
              {data?.notes.map((note) => (
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
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Notes;
