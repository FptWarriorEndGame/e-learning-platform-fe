import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { BlogComment } from '../../../../../types/blogComments.type';
import { useGetBlogCommentsQuery } from '../../../client.service';

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogId: string;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose, blogId }) => {
  const [commentsData, setCommentsData] = useState<BlogComment[]>([]);
  const { data, error, isLoading } = useGetBlogCommentsQuery(blogId);
  const [commentLength, setCommentLength] = useState(0);

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
        <CommentForm blogId={blogId} commentLength={commentLength} />
        <CommentList comments={commentsData} blogId={blogId} />
      </div>
    </Drawer>
  );
};

export default SlidingModal;
