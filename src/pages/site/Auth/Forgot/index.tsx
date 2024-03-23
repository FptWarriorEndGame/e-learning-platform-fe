import { FacebookFilled, GithubOutlined, GoogleOutlined, LinkedinFilled, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Spin, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCmp from '../../../../components/Button';
import { useLoginMutation, useResetPasswordMutation, useUpdateLastLoginMutation } from '../../../auth.service';
import { closeAuthModal, setAuthState, setAuthenticated, setCurrentUserId } from '../../../auth.slice';
import '../Auth.scss';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
interface ForgotProps {
  onClick: (authState: string) => void;
}

const Forgot: React.FC<ForgotProps> = (props) => {
  const [form] = Form.useForm();
  const [resetPass, resetPassResult] = useResetPasswordMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [updateLastLogin] = useUpdateLastLoginMutation();

  // Send email function
  const onFinish = (formValues: { email: string; password: string }) => {
    const userCredentials: { email: string; password: string } = {
      email: formValues.email,
      password: formValues.password
    };

    setIsSubmitting(true);
    resetPass(userCredentials)
      .unwrap()
      .then((result) => {
        if ('error' in result) {
          notification.error({ type: 'error', message: 'login failed', description: 'Email or password incorrect' });
        } else {
          notification.success({ type: 'success', message: result.message });
          dispatch(setAuthState('changePassword'));
          dispatch(setCurrentUserId(result.user._id));
          props.onClick('');
        }

        if (!resetPassResult.isLoading) {
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const navigateLoginHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick('login');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Reset Password</h2>
        <p className='auth__title-sub-heading'>Send Email to reset your password</p>
      </div>

      <Divider></Divider>

      <Form
        form={form}
        name='basic'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item wrapperCol={{ span: 24 }} label='Email' name='email' rules={[{ type: 'email', required: true }]}>
          <Input className='' />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <ButtonCmp disabled={isSubmitting} className='btn btn-primary btn-sm w-full'>
            {isSubmitting ? <Spin indicator={antIcon} /> : 'Send Email '}
          </ButtonCmp>
        </Form.Item>
      </Form>
      <div className='auth__footer'>
        <a onClick={navigateLoginHandler} href='#' className='auth__footer-link'>
          Login
        </a>
      </div>
    </Fragment>
  );
};

export default Forgot;
