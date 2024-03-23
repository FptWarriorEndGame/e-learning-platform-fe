import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setAuthenticated, closeAuthModal } from '../../../../auth.slice';
import { useUpdateLastLoginMutation } from '../../../../auth.service';
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../../../../auth.service';

const GoogleLoginButton: React.FC = () => {
  const [loginGoogle] = useGoogleLoginMutation();
  const dispatch = useDispatch();

  const [updateLastLogin] = useUpdateLastLoginMutation();

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      loginGoogle({ token: credentialResponse.access_token })
        .unwrap()
        .then((result) => {
          const loginResponse: { token: string; message: string; userId: string } = result;

          const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(
            loginResponse.token
          );

          const currentDate = new Date();
          updateLastLogin({
            userId: decodedToken.userId,
            lastLogin: currentDate
          })
            .unwrap()
            .then(() => {
              notification.success({ type: 'success', message: 'update last login successully!', duration: 2 });
            })
            .catch(() => {
              notification.error({ type: 'error', message: 'Failed to update your login information.', duration: 2 });
            });

          localStorage.setItem('token', loginResponse.token);
          const expirationTime = decodedToken.exp * 1000;

          if (Date.now() < expirationTime) {
            dispatch(setAuthenticated(loginResponse.token));
            dispatch(closeAuthModal());
            notification.success({ type: 'success', message: loginResponse.message, duration: 2 });
          } else {
            notification.error({
              type: 'error',
              message: 'Your session has expired. Please log in again.',
              duration: 2
            });
          }
        })
        .catch(() => {
          notification.error({
            type: 'error',
            message: 'An error occurred during the login process. Please try again.',
            duration: 2
          });
        });
    },
    onError: () => {
      notification.error({ type: 'error', message: 'Login failed. Please try again.', duration: 2 });
    }
  });

  return (
    <Button className='auth__socials-btn' onClick={() => login()}>
      {/* <GoogleOutlined className='auth__socials-icon' /> */}
      <img src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png" alt="" />
    </Button>
  );
};

export default GoogleLoginButton;
