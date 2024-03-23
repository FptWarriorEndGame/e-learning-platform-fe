/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Modal, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useGetDiscussionsByIdQuery, useUpdateDiscussionMutation } from '../../../../../client.service';

interface UpdateDiscussProps {
  isUpdateModalVisible: boolean;
  setIsUpdateModalVisible: (isVisible: boolean) => void;
  discussId: string;
  handleOk: () => void;
  handleCancel: () => void;
}

interface DiscussionFormValues {
  comments: string;
}

const UpdateDiscuss: React.FC<UpdateDiscussProps> = ({
  isUpdateModalVisible,
  setIsUpdateModalVisible,
  discussId,
  handleOk,
  handleCancel
}) => {
  const [form] = Form.useForm();
  const id = discussId;
  const { data, isLoading, isError } = useGetDiscussionsByIdQuery(id);
  const [updateDiscussion] = useUpdateDiscussionMutation();
  const dataComments = data?.discuss;
  useEffect(() => {
    if (dataComments) {
      form.setFieldsValue({ comments: dataComments.comments });
    }
  }, [dataComments, form]);

  const handleUpdate = async (values: DiscussionFormValues) => {
    try {
      await updateDiscussion({ discussId, comments: values.comments });
      message.success('Discussion updated successfully');
      setIsUpdateModalVisible(false);
    } catch (error) {
      message.error('Failed to update discussion');
    }
  };

  return (
    <Modal
      title='Update Discussion'
      visible={isUpdateModalVisible}
      onOk={form.submit}
      onCancel={handleCancel}
      width={800}
    >
      <Form form={form} onFinish={handleUpdate} layout='vertical'>
        <Form.Item name='comments' label='Comments' rules={[{ required: true, message: 'Please input the content!' }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDiscuss;
