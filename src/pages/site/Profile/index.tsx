import { Col, Row, Tabs, TabsProps } from 'antd';
import './Profile.scss';
// type Props = {}
import { ReadOutlined, StockOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { RootState } from '../../../store/store';
import { formatVideoLengthToHours } from '../../../utils/functions';
import { useGetUserDetailQuery } from '../client.service';

const profileItems: TabsProps['items'] = [
  {
    key: 'about',
    label: (
      <div className='tab-item'>
        <p className='tab-item__text'>
          <UserOutlined className='tab-item__icon' />
        </p>
        <p>About</p>
      </div>
    ),
    children: ``
  },
  {
    key: 'activity',
    label: (
      <div className='tab-item'>
        <p className='tab-item__text'>
          <StockOutlined className='tab-item__icon' />
        </p>
        <p>Activities</p>
      </div>
    ),
    children: `Some activies of users`
  }
];

const tabBarStyleCss = {
  padding: '2rem',
  fontSize: '2.4rem',
  bacgroundColor: '#194583'
};

const Profile = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const params = {
    _userId: userId,
    _limit: 12,
    _page: 1
  };

  const { data, isFetching } = useGetUserDetailQuery(params, {
    skip: !userId
  });

  const sumTotalVideosLengthDone = data?.user.courses.reduce((acc, course) => {
    return acc + course.totalVideosLengthDone;
  }, 0);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className='profile'>
      <div className='profile__wrap '>
        <div className='container'>
          <div className='profile__header'>
            <div className=' profile__header-wrap'>
              <Row className='row-wrap'>
                <Col className='col'>
                  <div className='profile__header-item'>
                    <div className='profile__header-item-icon'>
                      <ReadOutlined />
                    </div>
                    <div className='profile__header-item-number'>{data?.user.courses.length}</div>
                    <div className='profile__header-item-text'>Courses</div>
                  </div>
                </Col>
                <Col className='col'>
                  <div className='profile__header-item'>
                    <div className='profile__header-item-icon'>
                      <ReadOutlined />
                    </div>
                    <div className='profile__header-item-number'>
                      {formatVideoLengthToHours(sumTotalVideosLengthDone || 0)}
                    </div>
                    <div className='profile__header-item-text'>Hours</div>
                  </div>
                </Col>
                <Col className='col col-wrap'>
                  <div className='profile__header-item'>
                    <div className='profile__header-item-icon'>
                      <img
                        src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/avatars/648eaf1c0c0c35ee7db7e0a3.jpg?version=2023-07-16%2010%3A02%3A03'
                        alt=''
                        className='profile__header-item-img'
                      />
                    </div>
                    <div className='profile__header-item-name'>
                      <div className='profile__header-item-name-text'>Tran Nhat Sang</div>
                      <div className='profile__header-item-name-badge'>Staff</div>
                    </div>
                    <div className='profile__header-item-btn-wrap'>
                      <Button className=' profile__header-item-btn btn btn-sm btn-primary'>Edit</Button>
                    </div>
                  </div>
                </Col>
                <Col className='col'>
                  <div className='profile__header-item'>
                    <div className='profile__header-item-icon'>
                      <ReadOutlined />
                    </div>
                    <div className='profile__header-item-number'>0</div>
                    <div className='profile__header-item-text'>POSTS</div>
                  </div>
                </Col>
                <Col className='col'>
                  <div className='profile__header-item'>
                    <div className='profile__header-item-icon'>
                      <ReadOutlined />
                    </div>
                    <div className='profile__header-item-number'>0</div>
                    <div className='profile__header-item-text'>Achievement</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className='profile__tabs'>
            <Tabs
              tabBarStyle={tabBarStyleCss}
              className='profile__tabs-bar'
              defaultActiveKey='1'
              items={profileItems}
              onChange={onChange}
              centered
            />
          </div>

          <div className='profile__courses-taken'>
            <div className='profile__courses-taken-list'>
              <Row>
                <Col></Col>
              </Row>
            </div>
          </div>
          <div className='profile__networks'>
            <div className='profile__followers'></div>
            <div className='profile__followings'></div>
          </div>
        </div>
      </div>
      <div className='profile__info'>
        <div className='container'>
          <div className='profile-achievements'>
            <div className='profile-achievements-tt'>ACHIEVEMENTS</div>
            <div className='profile-achievements-list'>
              <div className='profile-achievements-item'>
                <div className='level'>
                  <div className='level-img'>
                    <img src='https://lwfiles.mycourse.app/65ac73296e5c564383a8e28b-public/badges/newbie.png' alt='' />
                  </div>
                  <div className='level-text'>Newbie</div>
                </div>
              </div>
              <div className='profile-achievements-item'>
                <div className='profile-achievements-star'>
                  <div className='profile-achievements-star-img'>
                    <img src='https://cdn.mycourse.app/v3.0.4/images/initial-badge.png' alt='' />
                  </div>
                  <div className='profile-achievements-star-img'>
                    <img src='https://cdn.mycourse.app/v3.0.4/images/initial-badge.png' alt='' />
                  </div>
                  <div className='profile-achievements-star-img'>
                    <img src='https://cdn.mycourse.app/v3.0.4/images/initial-badge.png' alt='' />
                  </div>
                  <div className='profile-achievements-star-img'>
                    <img src='https://cdn.mycourse.app/v3.0.4/images/initial-badge.png' alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='profile-network'>
            <div className='profile-network-tt'>NETWORK</div>
            <div className='profile-network-list'>
              <div className='profile-network-item'>
                <div className='content'>
                  <div className='number'>0</div>
                  <div className='text'>followers</div>
                </div>
                <div className='img'>
                  <img src='https://cdn.mycourse.app/v3.0.4/images/initial-avatar.jpg' alt='' />
                </div>
              </div>
              <div className='profile-network-item'>
                <div className='content'>
                  <div className='number'>0</div>
                  <div className='text'>following</div>
                </div>
                <div className='img'>
                  <img src='https://cdn.mycourse.app/v3.0.4/images/initial-avatar.jpg' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
