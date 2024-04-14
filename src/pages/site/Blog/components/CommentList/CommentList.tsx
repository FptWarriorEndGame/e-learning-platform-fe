/* eslint-disable @typescript-eslint/no-misused-promises */
import { DownOutlined, LikeOutlined, SendOutlined, UnorderedListOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Input, Menu, Modal, Space, notification } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import {
  useAddReplyToCommentMutation,
  useDeleteBlogCommentMutation,
  useToggleLikeCommentMutation,
  useUpdateBlogCommentMutation
} from '../../../client.service';
import './CommentList.scss';
import CommentWithReplies from './components/CommentWithReplies';
import { IBlogComment } from '../../../../../types/blogComments.type';

export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  _id: string;
  content: string;
  userId: User;
  blogId: string;
  parentCommentId?: string;
  isDeleted: boolean;
  likes: string[];
  replies?: Comment[];
}

interface CommentListProps {
  comments: IBlogComment[];
  blogId: string;
  onCommentDelete?: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, blogId, onCommentDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState<IBlogComment | null>(null);
  const [editContent, setEditContent] = useState('');
  const [localComments, setLocalComments] = useState(comments);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [isEditValid, setIsEditValid] = useState(true);

  //Reply to comments
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');

  // Ẩn hiện reply
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: boolean }>({});

  const [updateBlogComment, { isLoading: isUpdating }] = useUpdateBlogCommentMutation();
  const [deleteBlogComment, { isLoading: isDeleting }] = useDeleteBlogCommentMutation();
  const [toggleLikeComment] = useToggleLikeCommentMutation();
  const [addReplyToComment] = useAddReplyToCommentMutation();

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const toggleReplies = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const showEditModal = (comment: IBlogComment) => {
    setIsEditing(true);
    setCurrentComment(comment);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentComment(null);
    setEditContent('');
  };

  const handleEdit = async () => {
    if (!editContent.trim()) {
      setIsEditValid(false);
      notification.error({ message: 'Nội dung không được để trống.' });
      return;
    }

    if (currentComment && editContent.trim()) {
      try {
        const response = await updateBlogComment({
          commentId: currentComment._id,
          content: editContent
        }).unwrap();

        const updatedComments = localComments.map((comment) =>
          comment._id === currentComment._id ? { ...comment, content: editContent } : comment
        );
        setLocalComments(updatedComments);

        notification.success({ message: 'Bình luận đã được cập nhật thành công.' });
        handleCancelEdit();
      } catch (error) {
        notification.error({ message: 'Lỗi khi cập nhật bình luận.' });
      }
    }
  };

  const handleDelete = (commentId: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa bình luận này?',
      content: 'Hành động này không thể được hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteBlogComment({ commentId }).unwrap();
          const updatedComments = localComments.filter((comment) => comment._id !== commentId);
          setLocalComments(updatedComments);
          notification.success({ message: 'Bình luận đã được xóa thành công.' });
          if (onCommentDelete) {
            onCommentDelete();
          }
        } catch (error) {
          notification.error({ message: 'Lỗi khi xóa bình luận.' });
        }
      }
    });
  };

  const handleLike = async (commentId: string) => {
    try {
      await toggleLikeComment({ commentId, userId }).unwrap();
      const updatedComments = localComments.map((comment) => {
        if (comment._id === commentId) {
          if (comment.likes.includes(userId)) {
            return { ...comment, likes: comment.likes.filter((id) => id !== userId) };
          } else {
            return { ...comment, likes: [...comment.likes, userId] };
          }
        }
        return comment;
      });
      setLocalComments(updatedComments);
    } catch (error) {
      notification.error({ message: 'Error toggling the like.' });
    }
  };

  const handleReplyClick = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyContent('');
    } else {
      setReplyingTo(commentId);
    }
  };

  const handleAddReply = async (parentCommentId: string) => {
    if (!replyContent.trim()) {
      notification.error({ message: 'Reply cannot be empty.' });
      return;
    }

    try {
      const replyData = {
        blogId,
        parentCommentId,
        content: replyContent,
        userId
      };
      const newCommentResponse = await addReplyToComment(replyData).unwrap();

      // Update the local state with the new reply
      setLocalComments((currentComments) => {
        return currentComments.map((comment) => {
          if (comment._id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newCommentResponse.comment]
            };
          } else {
            return comment;
          }
        });
      });

      setReplyContent('');
      setReplyingTo(null);
      notification.success({ message: 'Reply added successfully.' });
    } catch (error) {
      notification.error({ message: 'Failed to add reply.' });
    }
  };

  return (
    <div>
      {localComments.map((comment) => (
        <div className='comment mb-12' key={comment._id}>
          <Card className='mt-4'>
            <div className='comment-header ml-4'>
              <div className='flex items-center mb-2'>
                {' '}
                <Avatar src={comment.userId.avatar} className='mr-4 text-3xl' />
                <div className='comment-author mr-5 text-2xl font-medium'>{comment.userId.name}</div>
              </div>
              <div className='comment-content ml-16 opacity-90'>{comment.content}</div>
            </div>

            <div className='flex items-center mt-2'>
              <Button onClick={() => handleLike(comment._id)} type='link'>
                <div className='flex items-center'>
                  <LikeOutlined />
                  <span className='likes-count ml-0'>{comment.likes.length}</span>
                </div>
              </Button>
              <Button type='link' className='mr-4' onClick={() => handleReplyClick(comment._id)}>
                Trả lời
              </Button>
              {userId === comment.userId._id && (
                <Dropdown
                  className='opacity-80'
                  overlay={
                    <Menu>
                      .
                      <Menu.Item key='edit' onClick={() => showEditModal(comment)}>
                        Sửa bình luận
                      </Menu.Item>
                      <Menu.Item key='delete' onClick={() => handleDelete(comment._id)}>
                        Xóa bình luận
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <UnorderedListOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </div>
            {/* Form comments */}
            {replyingTo === comment._id && (
              <div className='reply-input-container'>
                <Input
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder='Write your reply...'
                  onPressEnter={() => handleAddReply(comment._id)} // Allow pressing enter to submit reply
                  suffix={
                    <Button
                      icon={<SendOutlined />}
                      onClick={() => handleAddReply(comment._id)}
                      type='primary'
                      disabled={!replyContent.trim()}
                    />
                  }
                />
              </div>
            )}
            {/* Form comments */}

            {/* Render Comments */}
            <Button onClick={() => toggleReplies(comment._id)} type='link'>
              {visibleReplies[comment._id] ? 'Ẩn câu trả lời ' : `Xem ${comment.replies?.length || 0} câu trả lời`}
              {/* {visibleReplies[comment._id] ? <UpOutlined /> : <DownOutlined />} */}
            </Button>
            {visibleReplies[comment._id] && (
              <div className='replies-container'>
                {comment.replies && comment.replies.length > 0 && (
                  <CommentWithReplies replies={comment.replies} blogId={blogId} />
                )}
              </div>
            )}
            {/* Render Comments  */}
          </Card>
        </div>
      ))}

      <Modal
        title='Sửa Bình Luận'
        open={isEditing}
        onOk={handleEdit}
        onCancel={handleCancelEdit}
        okText='Lưu'
        cancelText='Hủy bỏ'
        confirmLoading={isUpdating}
      >
        <Input.TextArea
          rows={4}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          disabled={isUpdating}
        />
        {!isEditValid && <div style={{ color: 'red', marginTop: '10px' }}>Nội dung không được để trống.</div>}
      </Modal>
    </div>
  );
};

export default CommentList;
