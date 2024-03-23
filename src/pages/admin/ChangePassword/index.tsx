/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Form, Input, Button, notification, Divider, Card } from 'antd';
import { LockOutlined, BookOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useChangePasswordMutation } from '../Users/user.service';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.auth.adminId);
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
    <div style={{ maxWidth: 720, margin: 'auto', paddingTop: 50 }}>
      <Card>
        <h1 className='text-4xl text-center mb-10'>Change Password</h1>

        {/* E-Learning Side */}
        <div style={{ float: 'left', width: '50%', paddingRight: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src='https://i.pinimg.com/564x/46/d2/65/46d2653d01aa35bffbcf9e64f6f34df1.jpg'
              alt='change password'
              style={{
                textAlign: 'center',
                objectFit: 'cover',
                borderRadius: '30%'
              }}
            />
          </div>
        </div>

        {/* Divider for visual separation */}
        <Divider type='vertical' style={{ height: 'auto' }} />

        {/* Change Password Form Side */}
        <div style={{ float: 'right', width: '50%', paddingLeft: 20 }}>
          <Form form={form} name='changePasswordForm' onFinish={handleSubmit} autoComplete='off'>
            <Form.Item name='oldPassword' rules={[{ required: true, message: 'Please input your old password!' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder='Old Password' />
            </Form.Item>
            <Form.Item
              name='newPassword'
              rules={[
                { required: true, message: 'Please input your new password!' },
                { max: 8, message: 'Password must be maximum 8 characters.' }
              ]}
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
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  }
                }),
                { max: 8, message: 'Password must be maximum 8 characters.' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder='Confirm New Password' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={isLoading}>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
      {/* Clear floats */}
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default ChangePassword;
