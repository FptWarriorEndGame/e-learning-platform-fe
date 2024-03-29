import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { IBlogComment } from '../../../../../types/blogComments.type';
import { useGetBlogCommentsQuery } from '../../../client.service';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogId: string;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose, blogId }) => {
  const [commentsData, setCommentsData] = useState<IBlogComment[]>([]);
  const { data, error, isLoading } = useGetBlogCommentsQuery(blogId);
  const [commentLength, setCommentLength] = useState(0);

  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  const toggleCommentForm = () => {
    setIsCommentFormOpen(!isCommentFormOpen);
  };

  // Cập nhật state khi dữ liệu bình luận thay đổi
  useEffect(() => {
    if (data && data) {
      setCommentsData(data.comments);
    }
  }, [data]);

  useEffect(() => {
    if (commentsData.length > 0) {
      setCommentLength(commentsData.length);
    }
  }, [commentsData]);

  return (
    <Drawer
      title={commentsData.length > 0 ? 'Bình luận' : 'Chưa có bình luận'}
      placement='right'
      onClose={onClose}
      visible={isOpen}
      width={720}
    >
      <div className='comment-input-form' style={{ marginBottom: 16 }}>
        <div className='text-2xl mb-4'>{commentLength} commetns</div>
        <Button onClick={toggleCommentForm} type='default' className='mb-4'>  
          {isCommentFormOpen ? <CloseOutlined /> : 'Click here if you want to comment'}
        </Button>
        {isCommentFormOpen && <CommentForm blogId={blogId} commentLength={commentLength} comments={commentsData} />}
        <CommentList comments={commentsData} blogId={blogId} />
      </div>
    </Drawer>
  );
};

export default SlidingModal;
