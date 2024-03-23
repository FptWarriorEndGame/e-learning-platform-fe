import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import { IconEmailAuthLogin, IconLocklAuthLogin } from '../../../../assets/svg/icons';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../../../types/user.type';
import { adminLoginError } from '../../../../utils/errorHelpers';
import { useAdminLoginMutation } from '../../../auth.service';
import { setAdminAuthenticated } from '../../../auth.slice';
import { isNotValidEmail } from '../../../../utils/functions';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AdminLogin: React.FC = () => {
  const [form] = Form.useForm();
  const [adminLogin, adminLoginResult] = useAdminLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (formValues: { account: string; password: string }) => {
    let adminCredentials: any = {}
    if(isNotValidEmail(formValues.account)) {
      adminCredentials = {
        username: formValues.account,
        password: formValues.password
      };
    }else {
      adminCredentials = {
        email: formValues.account,
        password: formValues.password
      };
    }


    setIsSubmitting(true);

    adminLogin(adminCredentials)
      .then((result) => {
        if ('data' in result) {
          console.log("result: ", result);
          const loginResponse: {
            token: string;
            message: string;
            userId: string;
            enumData?: Record<string, Record<string, string>>;
            listPermission?: string[];
            adminRole: UserRole;
          } = result.data;
          const decodedToken: { exp: number; iat: number; userId: string; email: string; adminRole: UserRole } =
            jwtDecode(loginResponse.token);

          localStorage.setItem('adminToken', loginResponse.token);
          if (loginResponse.enumData) {
            localStorage.setItem('enumData', JSON.stringify(loginResponse.enumData));
          }
          if (loginResponse.listPermission) {
            localStorage.setItem('listPermission', JSON.stringify(loginResponse.listPermission));
          }
          if(loginResponse.adminRole) {
            localStorage.setItem('adminRole', loginResponse.adminRole);
          }
          const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

          // Check if the token has not expired
          if (Date.now() < expirationTime) {
            // Token is valid, dispatch action to set authentication state
            dispatch(setAdminAuthenticated(loginResponse.token));
            form.resetFields();
            notification.success({ type: 'success', message: loginResponse.message, duration: 2 });

            navigate('/author/welcome');
          } else {
            console.log('Token has expired. Please log in again.');
          }
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
        name='account'
        rules={[{ required: true, message: 'Please input your email or username!' }]}
      >
        <Input prefix={<IconEmailAuthLogin />} placeholder='Email Address or username' className='admin-auth__login-form__input' />
      </Form.Item>

      <Form.Item
        className='admin-auth__login-form__item'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<IconLocklAuthLogin />}
          placeholder='Password'
          className='admin-auth__login-form__input'
        />
      </Form.Item>

      <Form.Item className='admin-auth__login-form__item'>
        <Button className='admin-auth__login-form__button' type='primary' htmlType='submit' disabled={isSubmitting}>
          {isSubmitting ? <Spin indicator={antIcon} /> : 'Login '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminLogin;
