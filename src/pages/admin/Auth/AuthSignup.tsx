import { Col, Row } from 'antd';
import Button from '../../../components/Button';
import './Auth.scss';
import AdminLogin from './Login';
import AdminSignUpRequest from './SignUpRequest';
const AdminAuthSignUp = () => {
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
          <AdminSignUpRequest />
          <div className='admin-auth__forgot-password'>
            <a href='#'>Forgot Password</a>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdminAuthSignUp;
