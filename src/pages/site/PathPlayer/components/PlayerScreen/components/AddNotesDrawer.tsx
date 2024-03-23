/* eslint-disable @typescript-eslint/no-misused-promises */
// AddNoteDrawer.jsx
import { Button, Drawer, Input, notification } from 'antd';
import { useState } from 'react';

interface AddNoteDrawerProps {
  visible: boolean;
  onClose: () => void;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
  onSubmitNote: () => Promise<void>;
  isLoading: boolean;
  formattedTime: string;
  currLessonId: string;
}

const AddNoteDrawer: React.FC<AddNoteDrawerProps> = ({
  visible,
  onClose,
  noteContent,
  setNoteContent,
  onSubmitNote,
  formattedTime,
  isLoading,
  currLessonId
}) => {
  const [error, setError] = useState('');

  const validateNoteContent = () => {
    if (!noteContent.trim()) {
      setError('Nội dung ghi chú không được để trống');
      return false;
    }
    setError('');
    return true;
  };

  const handleSaveNote = async () => {
    const isValid = validateNoteContent();
    if (isValid) {
      try {
        await onSubmitNote();
        notification.success({
          message: 'Thành công',
          description: 'Ghi chú đã được lưu thành công'
        });
        onClose(); // Đóng drawer sau khi lưu thành công
      } catch (error) {
        notification.error({
          message: 'Đã xảy ra lỗi',
          description: 'Lưu trữ ghi chú thất bại'
        });
      }
    }
  };
  return (
    <Drawer title='Thêm ghi chú' placement='right' closable={true} onClose={onClose} visible={visible}>
      <p className='mb-6 text-2xl'>
        Thêm ghi chú tại: <span className='bg-red-600 p-2 text-white rounded-xl'>{formattedTime}</span>
      </p>
      <Input.TextArea
        rows={4}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder='Nội dung ghi chú...'
      />
      {error && <p className='text-red-500'>{error}</p>}
      <Button type='primary' onClick={handleSaveNote} disabled={isLoading} style={{ marginTop: 16 }}>
        {isLoading ? 'Đang lưu...' : 'Lưu ghi chú'}
      </Button>
    </Drawer>
  );
};

export default AddNoteDrawer;
