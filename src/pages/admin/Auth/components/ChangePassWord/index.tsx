/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Form, Input, Button, notification, Modal } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerateNewPasswordMutation } from '../../../../auth.service'; // Correct import path
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

interface FormValues {
  password: string;
  confirmPassword: string;
  token: string;
}

interface ChangePasswordProps {
  isVisible: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const query = new URLSearchParams(location.search);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [generateNewPassword, { isLoading }] = useGenerateNewPasswordMutation();

  const handleSubmit = async (values: FormValues) => {
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: 'Error',
        description: 'The passwords do not match.'
      });
      return;
    }

    try {
      await generateNewPassword({
        password: values.password,
        userId: userId,
        passwordToken: values.token
      }).unwrap();

      notification.success({
        message: 'Password Reset Successfully',
        description: 'You can now log in with your new password.'
      });
      navigate('/author-login');
    } catch (error) {
      notification.error({
        message: 'Failed to Reset Password',
        description: 'An error occurred while resetting your password. Please try again.'
      });
    }
  };

  return (
    <Modal
      title='Reset Your Password'
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true} // This ensures the form is reset when the modal is closed
    >
      <Form form={form} onFinish={handleSubmit} layout='vertical'>
        <Form.Item name='token' label='Token' rules={[{ required: true, message: 'Please input your new token!' }]}>
          <Input placeholder='Token' disabled={isLoading} />
        </Form.Item>
        <Form.Item
          name='password'
          label='New Password'
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Confirm New Password'
          rules={[{ required: true, message: 'Please confirm your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
