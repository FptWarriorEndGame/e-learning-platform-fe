/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useChangePasswordMutation } from '../../auth.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ChangePasswordUser: React.FC = () => {
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (values: { oldPassword: string; newPassword: string; confirmNewPassword: string }) => {
    try {
      await changePassword({
        userId,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      }).unwrap();

      notification.success({
        message: 'Password Changed',
        description: 'Your password has been changed successfully!'
      });

      form.resetFields();
    } catch (error: any) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while changing your password!'
      });
    }
  };

  return (
    <div className='container' style={{ maxWidth: 360, margin: 'auto', paddingTop: '40px' }}>
      <h1 className='text-center mb-10 mt-10'>Change Password</h1>
      <Form form={form} name='changePasswordForm' onFinish={handleSubmit} layout='vertical' autoComplete='off'>
        <Form.Item name='oldPassword' rules={[{ required: true, message: 'Please input your current password!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder='Current Password' />
        </Form.Item>

        <Form.Item
          name='newPassword'
          rules={[{ required: true, message: 'Please input your new password!' }]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder='New Password' />
        </Form.Item>

        <Form.Item
          name='confirmNewPassword'
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords you entered do not match!'));
              }
            })
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='Confirm New Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordUser;
