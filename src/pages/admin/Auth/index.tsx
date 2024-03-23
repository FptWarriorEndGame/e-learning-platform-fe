import { Col, Row, Space } from 'antd';
import Button from '../../../components/Button';
import './Auth.scss';
import AdminLogin from './Login';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Auth.scss';
import ChangePassword from './components/ChangePassWord';
import ForgotPasswordModal from './components/FogotPassWord';

const AdminAuth = () => {
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [isChangePassVisible, setIsChangePassVisible] = useState(false);

  const showForgotPasswordModal = () => setIsForgotPasswordVisible(true);
  const handleCloseForgotPasswordModal = () => setIsForgotPasswordVisible(false);
  const handleForgotPasswordSuccess = () => {
    setIsForgotPasswordVisible(false);
    setIsChangePassVisible(true);
  };
  const handleCloseChangePass = () => setIsChangePassVisible(false);

  return (
    <Row className='admin-auth'>
      <Col xs={0} sm={0} md={12} lg={12} xl={14} className='admin-auth__content'>
        <div className='admin-auth__content-container'>
          <h1 className='admin-auth__title '>E-Learning</h1>
          <p className='admin-auth__description'>Learn, grow, and succeed with our interactive online courses.</p>
          <Button className='admin-auth__read-more'>
            <span>Read More</span>
          </Button>
        </div>
        <div className='admin-auth__ellipse admin-auth__ellipse--first'></div>
        <div className='admin-auth__ellipse admin-auth__ellipse--second'></div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={10} className='admin-auth__login'>
        <div className='admin-auth__login-container'>
          <h2 className='admin-auth__welcome'>Hello Again!</h2>
          <p className='admin-auth__welcome-back'>Welcome Back</p>
          <AdminLogin />
          <div className='admin-auth__forgot-password' onClick={showForgotPasswordModal}>
            <a href='#'>Forgot Password</a>
            <Link className="ml-4 fw-bold text-blue-500" to='/author-signup'>Sign up to become author!</Link>
          </div>
          <div className='admin-auth__forgot-password'>
            {isForgotPasswordVisible && (
              <ForgotPasswordModal
                isVisible={isForgotPasswordVisible}
                onClose={handleCloseForgotPasswordModal}
                onSuccess={handleForgotPasswordSuccess} // Add this prop to handle success
              />
            )}
            {isChangePassVisible && <ChangePassword isVisible={isChangePassVisible} onClose={handleCloseChangePass} />}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdminAuth;
