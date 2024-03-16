import React, { useState } from 'react';
import { Drawer, Form, Button, Input, message, Spin } from 'antd';
import { useCreateFeedbackReplyMutation } from '../feedback.service';

interface CreateFeedbackReplyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackId: string;
}

const CreateFeedbackReplyDrawer: React.FC<CreateFeedbackReplyDrawerProps> = ({ isOpen, onClose, feedbackId }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createFeedbackReply] = useCreateFeedbackReplyMutation();

  const handleSubmit = (values: { contentReply: string }) => {
    setIsSubmitting(true);

    createFeedbackReply({ feedbackId, contentReply: values.contentReply })
      .unwrap()
      .then(() => {
        void message.success('Feedback reply created successfully');
        onClose();
        form.resetFields();
      })
      .catch(() => {
        void message.error('Failed to create feedback reply');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Drawer
      title='Create Feedback Reply'
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => form.submit()} type='primary' disabled={isSubmitting}>
            {isSubmitting ? <Spin /> : 'Submit'}
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

export default CreateFeedbackReplyDrawer;
