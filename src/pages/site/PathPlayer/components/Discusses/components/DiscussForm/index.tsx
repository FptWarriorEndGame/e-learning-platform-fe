/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Card, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { useAddDiscussionMutation } from '../../../../../client.service';

interface DiscussionFormValues {
  comments: string;
  title: string;
  userId: string;
  parentDiscussId: string;
  lessonId: string;
  sectionId: string;
  courseId: string;
}

interface DiscussFormProps {
  userId: string;
  lessonId: string;
  courseId: string | null;
}

const DiscussForm: React.FC<DiscussFormProps> = ({ userId, lessonId, courseId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addDiscussion, { isLoading, isSuccess, isError, error }] = useAddDiscussionMutation();

  const onFinish = async (values: DiscussionFormValues) => {
    try {
      await addDiscussion({
        comments: values.comments,
        title: values.title,
        userId,
        parentDiscussId: values.parentDiscussId,
        lessonId,
        courseId
      }).unwrap();
      notification.success({
        message: 'Thảo luận đã được thêm!',
        description: 'Cuộc thảo luận của bạn đã được tạo thành công.'
      });
      setIsVisible(false);
    } catch (err) {
      notification.error({
        message: 'Lỗi!',
        description: 'Không thể thêm cuộc thảo luận. Vui lòng thử lại.'
      });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Button type='link' onClick={() => setIsVisible(!isVisible)} className='mb-2'>
        {isVisible ? 'Close Discuss' : 'Create Discuss'}
      </Button>
      {isVisible && (
        <Card className='mb-2'>
          <Form name='discussForm' onFinish={onFinish} layout='vertical'>
            <Form.Item
              label='Comment'
              name='comments'
              rules={[{ required: true, message: 'Vui lòng nhập nội dung của cuộc thảo luận!' }]}
            >
              <Input.TextArea rows={4} placeholder='Nhập nội dung của cuộc thảo luận' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default DiscussForm;
