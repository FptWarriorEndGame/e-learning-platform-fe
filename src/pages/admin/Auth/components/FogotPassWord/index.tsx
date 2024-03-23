/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Modal, Input, Button, Form, notification } from 'antd';
import { useResetPasswordMutation } from '../../../../auth.service';
import { setAuthState, setCurrentUserId } from '../../../../auth.slice';
import { useDispatch } from 'react-redux';

interface ForgotPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isVisible, onClose, onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [ResetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const result = await ResetPassword({ email }).unwrap();
      notification.success({ type: 'success', message: result.message });
      dispatch(setAuthState('resetPassword'));
      dispatch(setCurrentUserId(result.user._id));
      onSuccess();
    } catch (error) {
      notification.error({
        type: 'error',
        message: 'Failed to reset password',
        description: 'Failed to reset password' || 'An unexpected error occurred.'
      });
    }
  };

  return (
    <Modal title='Forgot Password' visible={isVisible} onCancel={onClose} footer={null}>
      <Form onFinish={handleSubmit}>
        <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
          <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
