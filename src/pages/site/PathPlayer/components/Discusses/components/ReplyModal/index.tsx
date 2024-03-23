/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Form, Input, Modal, notification } from 'antd';
import { useAddReplyToDiscussMutation } from '../../../../../client.service';

// Add a new prop type for the callback
interface ReplyModalProps {
  isReplyModalVisible: boolean;
  setIsReplyModalVisible: (isVisible: boolean) => void;
  parentDiscussId: string;
  userId: string;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
  isReplyModalVisible,
  setIsReplyModalVisible,
  parentDiscussId,
  userId
}) => {
  const [form] = Form.useForm();
  const [addReplyToDiscuss, { isLoading }] = useAddReplyToDiscussMutation();

  const onFinish = async (values: { comments: string }) => {
    try {
      await addReplyToDiscuss({
        comments: values.comments,
        parentDiscussId: parentDiscussId,
        userId: userId
      });
      notification.success({
        message: 'Reply added successfully',
        description: 'Your reply has been added successfully'
      });
      setIsReplyModalVisible(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add reply'
      });
    }
  };

  return (
    <Modal
      title='Reply to Comment'
      visible={isReplyModalVisible}
      onOk={form.submit}
      onCancel={() => setIsReplyModalVisible(false)}
      footer={[
        <Button key='back' onClick={() => setIsReplyModalVisible(false)}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' loading={isLoading} onClick={() => form.submit()}>
          Reply
        </Button>
      ]}
    >
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item name='comments' rules={[{ required: true, message: 'Please input your comments!' }]}>
          <Input.TextArea rows={4} placeholder='Write your reply here...' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReplyModal;
