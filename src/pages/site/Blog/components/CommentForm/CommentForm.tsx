import { UserOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../store/store';
import { useCreateCommentMutation } from '../../../client.service';
import './CommentForm.scss';

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('');
  const [createComment, { isLoading }] = useCreateCommentMutation(); // Use the mutation hook
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { id } = useParams<{ id: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment && id) {
      createComment({
        postId: id,
        content: comment,
        userId: userId,
        parentCommentId: ''
      })
        .then(() => {
          setComment('');
        })
        .catch((error) => {
          console.error('Failed to create comment:', error);
        });
    }
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='div flex mb-36'>
        <Avatar className='mr-4' icon={<UserOutlined />} />
        <ReactQuill className='comment-input' placeholder='Thêm bình luận...' value={comment} onChange={setComment} />
      </div>
      <div className='div flex justify-end'>
        <Button className='comment-btn mr-8' type='default' htmlType='submit' loading={isLoading}>
          Bình luận
        </Button>
        <Button className='comment-btn' type='primary' onClick={() => setComment('')}>
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
