import { AmazonCircleFilled, LoadingOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import { IconEmailAuthLogin, IconLocklAuthLogin } from '../../../../assets/svg/icons';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../../../types/user.type';
import { adminLoginError } from '../../../../utils/errorHelpers';
import { useAdminLoginMutation, useAdminSignUpRequestMutation } from '../../../auth.service';
import { setAdminAuthenticated} from '../../../auth.slice';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AdminSignUpRequest: React.FC = () => {
  const [form] = Form.useForm();
  const [adminLogin, adminLoginResult] = useAdminLoginMutation();
  const [adminSignupRequest, _] = useAdminSignUpRequestMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (formValues: { email: string; phone: string, name: string }) => {

    const payloadSignupData: {email: string; phone: string, name: string } = {
      email: formValues.email,
      phone: formValues.phone,
      name: formValues.name
    };

    setIsSubmitting(true);

    adminSignupRequest(payloadSignupData)
      .then((result) => {

        if ('data' in result) {

         notification.success({
           message: 'Sign up request successfully',
           description: 'Signup request administrator successfuly! Wait a minutes and ready for email reply with account!',
           duration: 4
         })
         form.resetFields()
        }

        // Handling error failed login here
        if ('error' in result) {
          if ('status' in result.error) {

            notification.error({
              message: 'Login failed',
              description: (result as adminLoginError).error.data.message
            });
          }
        }

        if (!adminLoginResult.isLoading) {
          setIsSubmitting(false);
        }
      })
      .catch((error: adminLoginError) => {

        notification.error({
          message: 'Login failed',
          description: error.error.data.message
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='admin-auth__login-form'
    >
      <Form.Item
        className='admin-auth__login-form__item'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<IconEmailAuthLogin />} placeholder='Email Address' className='admin-auth__login-form__input' />
      </Form.Item>

      <Form.Item
        className='admin-auth__login-form__item'
        name='name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input prefix={<AmazonCircleFilled />} placeholder='Name' className='admin-auth__login-form__input' />
      </Form.Item>

      <Form.Item
        className='admin-auth__login-form__item'
        name='phone'
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input prefix={<PhoneOutlined />} placeholder='Phone' className='admin-auth__login-form__input' />
      </Form.Item>

      <Form.Item className='admin-auth__login-form__item'>
        <Button className='admin-auth__login-form__button' type='primary' htmlType='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spin indicator={antIcon} /> : 'Send request '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminSignUpRequest;
