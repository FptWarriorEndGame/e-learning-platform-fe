import React from 'react';
import GitHubLogin from 'react-login-github';
import '../Login.scss';
import { GithubOutlined } from '@ant-design/icons';
import { setAuthenticated, closeAuthModal } from '../../../../auth.slice';
import { useUpdateLastLoginMutation, useGithubLoginMutation } from '../../../../auth.service';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { notification } from 'antd';

interface Response {
  code: string;
}

const GithubLoginButton: React.FC = () => {
  const [loginGithub] = useGithubLoginMutation();
  const dispatch = useDispatch();

  const [updateLastLogin] = useUpdateLastLoginMutation();

  const onSuccess = (response: Response) => {
    loginGithub({ code: response.code })
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
  };

  const onFailure = (response: any) => {
    console.log(response);
  };

  return (
    <GitHubLogin
      clientId='2c54ea01c90e1cbc1e0f'
      redirectUri='https://e-learning-platform.pro'
      onSuccess={onSuccess}
      onFailure={onFailure}
      className='github-login-button'
      scope='read:user'
      buttonText={<GithubOutlined />}
    />
  );
};
export default GithubLoginButton;
