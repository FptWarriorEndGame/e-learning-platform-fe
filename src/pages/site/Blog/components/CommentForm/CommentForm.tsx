/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import './CommentForm.scss';
import Avatar from 'antd/es/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Button, message, notification } from 'antd';
import { useAddBlogCommentMutation } from '../../../client.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

function htmlToText(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
}

const CommentForm: React.FC<{ blogId: string; commentLength: number }> = ({ blogId, commentLength }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [addComment, { isLoading }] = useAddBlogCommentMutation();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleContentChange = (content: string) => {
    setComment(content);
    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bình luận.');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!htmlToText(comment).trim()) {
      setError('Vui lòng nhập nội dung bình luận.');
      return;
    }
    setError('');
    try {
      await addComment({ blogId, content: htmlToText(comment), userId });
      setComment('');
      notification.success({
        message: 'Thành công',
        description: 'Bình luận đã được thêm thành công.',
        duration: 3
      });
    } catch (error) {
      notification.error({
        message: 'Thất bại',
        description: 'Đã xảy ra lỗi khi thêm bình luận.',
        duration: 3
      });
    }
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='comment-title text-3xl mb-6 ml-14'>{commentLength} bình luận</div>
      <div className='div flex mb-20'>
        <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' className='mr-4 text-3xl' />{' '}
        <ReactQuill
          className='comment-input'
          placeholder='Thêm bình luận...'
          value={comment}
          onChange={handleContentChange}
        />
      </div>
      {error && (
        <div className='mt-9 ml-16' style={{ color: 'red', fontSize: '14px' }}>
          {error}
        </div>
      )}
      <div className='div flex justify-end'>
        <Button className='comment-btn mr-8' type='primary' htmlType='submit' disabled={isLoading}>
          Bình luận
        </Button>
        <Button className='comment-btn' type='default' onClick={() => setComment('')} disabled={isLoading}>
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
