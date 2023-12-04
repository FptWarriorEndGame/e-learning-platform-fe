import { FacebookFilled, LinkedinFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './Footer.scss';
const Footer = () => {
  return (
    <div className='footer spacing-h-md'>
      <div className='container'>
        <Row className='footer__row'>
          <Col md={8} xs={24} sm={24}>
            <div className='footer__col'>
              <div className='footer__logo'>
                <img
                  src='https://cdn.mycourse.app/images/site-templates/5eacfe0d804d3c71aef6fe9da29f202b.png'
                  alt=''
                  className='footer__logo-img'
                />
              </div>
              <p className='footer__text'>
                We are an online educational platform that helps professionals and aspiring individuals to succeed in
                their goals.
              </p>
            </div>
          </Col>

          <Col md={8} xs={24} sm={24}>
            <div className='footer__col'>
              <h3 className='footer__title'>Featured links</h3>
              <Row gutter={16}>
                <Col sm={12} md={12}>
                  <ul className='featured-list'>
                    <li className='featured-list__item'>
                      <Link className='featured-list__item-link' to='/'>
                        Home
                      </Link>
                    </li>
                    <li className='featured-list__item'>
                      <Link className='featured-list__item-link' to='/courses'>
                        Courses
                      </Link>
                    </li>
                    <li className='featured-list__item'>
                      <Link className='featured-list__item-link' to='/about-us'>
                        About Us
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col sm={12} md={12}>
                  <ul className='featured-list'>
                    <li className='featured-list__item'>
                      <Link className='featured-list__item-link' to='/contact'>
                        Contact Us
                      </Link>
                    </li>
                    <li className='featured-list__item'>
                      <Link className='featured-list__item-link' to='/'>
                        Term & Conditions
                      </Link>
                    </li>
                    <li className='featured-list__item'>
                      <Link className='featured-list__item-link' to='/'>
                        Cookie Policy
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>

          <Col md={8}>
            <div className='footer__col'>
              <h3 className='footer__title'>Connect with us</h3>
              <div className='social-list'>
                <a href='https://www.facebook.com/fplelearning.official' title='facebook' className='social-btn'>
                  <FacebookFilled className='social-icon' />
                </a>
                <a href='https://twitter.com/fplelearning' title='twitter' className='social-btn'>
                  <TwitterOutlined className='social-icon' />
                </a>
                <a href='https://www.linkedin.com/in/e-learning-8462772a3/' title='linkedin' className='social-btn'>
                  <LinkedinFilled className='social-icon' />
                </a>
                <a
                  href='https://www.youtube.com/channel/UCNnShd591nbMQifsvpv_NZQ'
                  title='youtube'
                  className='social-btn'
                >
                  <YoutubeFilled className='social-icon' />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
