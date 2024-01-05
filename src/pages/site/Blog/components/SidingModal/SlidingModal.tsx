import React, { useState, useEffect } from 'react';
import './SidingModal.scss';
import CommentList from '../CommentList/CommentList';
import CommentForm from '../CommentForm/CommentForm';
import { CreateCommentResponse, useGetCommentsQuery } from '../../../client.service';
import { useParams } from 'react-router-dom';

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  author: string;
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCommentsQuery({ postId: id || 'default-id' });
  const [visible, setVisible] = useState(isOpen);

    
  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Assuming 300ms is your animation duration
  };

  const commentsData: Comment[] = (data || []).map((comment: CreateCommentResponse) => ({
    ...comment,
    author: 'default-author' // Replace with actual author
  }));

  return (
    <div className={`modal ${visible ? 'open' : 'closed'}`}>
      <div className='px-8 py-8 modal-content'>
        <button className='text-3xl opacity-60 mb-6' onClick={handleClose}>
          X
        </button>
        <div className='modal-title text-3xl'>
          {commentsData.length > 0 ? `${commentsData.length} bình luận` : 'Chưa có bình luận'}
        </div>
        <form className='comment-input-form'>
          <button className='comment-btn' type='submit'>
            <i className='fa fa-paper-plane'></i>
          </button>
        </form>
        <div className='comments-container'>
          <CommentForm />
          <CommentList comments={commentsData} />
        </div>
      </div>
    </div>
  );
};

export default SlidingModal;
