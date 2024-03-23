import { FacebookFilled, FacebookOutlined } from '@ant-design/icons';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { useFacebookLoginMutation, useUpdateLastLoginMutation } from '../../../../auth.service';
import { useDispatch } from 'react-redux';
import { closeAuthModal, setAuthenticated } from '../../../../auth.slice';
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';

interface FacebookResponse extends ReactFacebookLoginInfo {
  accessToken: string;
}

const FacebookLoginButton = () => {
  // const [facebookLogin] = useFacebookLoginMutation();
  // const dispatch = useDispatch();
  // const [updateLastLogin] = useUpdateLastLoginMutation();

  // const responseFacebook = (response: FacebookResponse | ReactFacebookFailureResponse) => {
  //   if ('accessToken' in response) {
  //     const accessToken = response.accessToken;
  //     facebookLogin({ token: accessToken })
  //       .unwrap()
  //       .then((result) => {
  //         const loginResponse: { token: string; message: string; userId: string } = result;

  //         const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(
  //           loginResponse.token
  //         );

  //         const currentDate = new Date();
  //         updateLastLogin({
  //           userId: decodedToken.userId,
  //           lastLogin: currentDate
  //         })
  //           .unwrap()
  //           .then(() => {
  //             console.log('Update last login successfully!');
  //           })
  //           .catch((updateError) => {
  //             console.error('Failed to update login information:', updateError);
  //           });

  //         localStorage.setItem('token', loginResponse.token);
  //         const expirationTime = decodedToken.exp * 1000;
  //         if (Date.now() < expirationTime) {
  //           dispatch(setAuthenticated(loginResponse.token));
  //           dispatch(closeAuthModal());
  //           notification.success({ type: 'success', message: loginResponse.message, duration: 2 });
  //         }
  //       })
  //       .catch((loginError) => {
  //         console.error('Login error:', loginError);
  //         notification.error({
  //           type: 'error',
  //           message: 'An error occurred during the login process. Please try again.',
  //           duration: 2
  //         });
  //       });
  //   } else {
  //     console.error('Facebook login failed:', response);
  //     notification.error({
  //       type: 'error',
  //       message: 'An error occurred during the login process. Please try again.',
  //       duration: 2
  //     });
  //   }
  // };

  return (
    // <>
    //   <FacebookLogin
    //     appId='1143621327082143'
    //     autoLoad={false}
    //     fields='name,email,picture'
    //     callback={responseFacebook}
    //     textButton=''
    //     icon={<FacebookFilled />}
    //     cssClass='my-facebook-button'
    //   />
    // </>
    <div></div>
  
  );
};

export default FacebookLoginButton;
