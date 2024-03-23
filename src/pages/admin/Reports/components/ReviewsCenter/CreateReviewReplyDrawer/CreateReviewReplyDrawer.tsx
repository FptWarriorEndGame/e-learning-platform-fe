import React from 'react';
import { Drawer, Form, Button, Input, message } from 'antd';
import { useCreateReviewReplyMutation } from '../review.service';

interface CreateReviewReplyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
}

const CreateReviewReplyDrawer: React.FC<CreateReviewReplyDrawerProps> = ({ isOpen, onClose, reviewId }) => {
  const [form] = Form.useForm();
  const [createReviewReply] = useCreateReviewReplyMutation();

  const handleSubmit = (values: { contentReply: string }) => {
    createReviewReply({ reviewId, contentReply: values.contentReply })
      .unwrap()
      .then(() => {
        void message.success('Review reply created successfully');
        onClose();
        form.resetFields();
      })
      .catch(() => {
        void message.error('Failed to create review reply');
      });
  };

  return (
    <Drawer
      title='Create Review Reply'
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => form.submit()} type='primary'>
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='contentReply'
          label='Content Reply'
          rules={[{ required: true, message: 'Please enter the content reply!' }]}
        >
          <Input.TextArea rows={4} placeholder='Enter content reply' />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateReviewReplyDrawer;
