import { LoadingOutlined } from '@ant-design/icons';
import { Divider, Form, Input, Spin, notification } from 'antd';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonCmp from '../../../../components/Button';
import { useGenerateNewPasswordMutation } from '../../../auth.service';
import { closeAuthModal, setAuthState } from '../../../auth.slice';
import './ChangePassword.scss';
import { RootState } from '../../../../store/store';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
interface ChangePasswordProps {
  onClick: (authState: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const [form] = Form.useForm();
  const [generateNewPass, generateNewPassResult] = useGenerateNewPasswordMutation();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onFinish = (formValues: { token: string; newPassword: string }) => {
    setIsSubmitting(true);
    generateNewPass({
      password: formValues.newPassword,
      passwordToken: formValues.token,
      userId: userId
    })
      .unwrap()
      .then((result) => {
        if ('error' in result) {
          notification.error({ type: 'error', message: 'login failed', description: 'Email or password incorrect' });
        }

        if (!generateNewPassResult.isLoading) {
          notification.success({ type: 'success', message: 'Change password successfully!', duration: 2 });
          setIsSubmitting(false);
          dispatch(setAuthState(''));
          dispatch(closeAuthModal());
          props.onClick('');
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Update your password</h2>
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
        <Form.Item
          wrapperCol={{ span: 24 }}
          label='New Password'
          name='newPassword'
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label='Token'
          name='token'
          rules={[{ required: true, message: 'Please input your token!' }]}
        >
          <Input.Password className='' />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <ButtonCmp disabled={isSubmitting} className='btn btn-primary btn-sm w-full'>
            {isSubmitting ? <Spin indicator={antIcon} /> : 'Change Password '}
          </ButtonCmp>
        </Form.Item>
      </Form>
      <div className='auth__footer'></div>
    </Fragment>
  );
};

export default ChangePassword;
