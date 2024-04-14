/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Modal, Space, Typography, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { useDeleteDiscussionMutation, useGetDiscussionsByLessonIdQuery } from '../../../../../client.service';
import ReplyModal from '../ReplyModal';
import UpdateDiscuss from '../UpdateDiscuss';

interface CommentsProps {
  userId: string;
  lessonId: string;
  courseId: string | null;
}

const CommentList: React.FC<CommentsProps> = ({ userId, lessonId, courseId }) => {
  const { data, isLoading, isError, refetch } = useGetDiscussionsByLessonIdQuery(lessonId);
  const discuss = data?.discuss;
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [parentDiscussId, setParentDiscussId] = useState<string>('');
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: boolean }>({});
  const [deleteDiscussion] = useDeleteDiscussionMutation();

  const handleUpdate = (id: string) => {
    setUpdatingId(id);
    setIsUpdateModalVisible(true);
  };

  const handleOk = () => {
    setIsUpdateModalVisible(false);
  };

  const handleCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleOpenReplyModal = (discussId: string) => {
    setParentDiscussId(discussId);
    setIsReplyModalVisible(true);
  };

  if (isLoading) return <div>Loading comments...</div>;
  if (isError || !data) return <div>Error loading comments.</div>;

  const toggleReplies = (discussId: string) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [discussId]: !prevVisibleReplies[discussId]
    }));
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Do you want to delete this discussion?',
      async onOk() {
        try {
          await deleteDiscussion(id).unwrap();
          notification.success({
            message: 'Success',
            description: 'Discussion deleted successfully'
          });
          if (refetch) {
            refetch;
          }
        } catch (error) {
          notification.error({
            message: 'Error',
            description: 'Failed to delete discussion'
          });
          console.error('Failed to delete discussion:', error);
        }
      }
    });
  };

  return (
    <>
      <Content>
        <List
          itemLayout='horizontal'
          dataSource={discuss}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.userId.avatar} />}
                title={<a href='#'>{item.userId.name}</a>}
                description={
                  <>
                    <div style={{ wordBreak: 'break-word' }} className='mb-3'>
                      {item.comments}
                      <br />
                      <Typography.Text type='secondary' className='mr-8 my-2'>
                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}
                      </Typography.Text>
                    </div>
                    <span className='mr-6'>
                      <Button onClick={() => handleOpenReplyModal(item._id)}>Reply</Button>
                    </span>
                    <span className='mr-6'>
                      <Button onClick={() => toggleReplies(item._id)} className='mb-6'>
                        {visibleReplies[item._id] ? 'Hide' : 'Show'} Replies ({item.replies?.length || 0})
                      </Button>
                    </span>
                    {item.userId._id === userId && (
                      <Space className='mr-3'>
                        <Button
                          icon={<EditOutlined style={{ color: '#000' }} />}
                          onClick={() => handleUpdate(item._id)}
                        ></Button>
                        <Button
                          icon={<DeleteOutlined style={{ color: '#000' }} />}
                          onClick={() => handleDelete(item._id)}
                        ></Button>
                      </Space>
                    )}
                    {visibleReplies[item._id] &&
                      item.replies?.map((reply) => (
                        <div key={reply._id} style={{ marginLeft: '20px' }} className='mb-4'>
                          <div className='flex items-center'>
                            <Avatar src={reply.userId.avatar} />
                            <div className='ml-3 mr-6'>{reply.userId.name}</div>
                          </div>
                          <div className='mt-2' style={{ wordBreak: 'break-word' }}>
                            {reply.comments}
                            <br />
                            <div className='mt-2'>
                              {reply.createdAt ? new Date(reply.createdAt).toLocaleString() : 'N/A'}
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Content>
      <UpdateDiscuss
        isUpdateModalVisible={isUpdateModalVisible}
        setIsUpdateModalVisible={setIsUpdateModalVisible}
        discussId={updatingId || ''}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ReplyModal
        isReplyModalVisible={isReplyModalVisible}
        setIsReplyModalVisible={setIsReplyModalVisible}
        parentDiscussId={parentDiscussId}
        userId={userId}
      />
    </>
  );
};

export default CommentList;
