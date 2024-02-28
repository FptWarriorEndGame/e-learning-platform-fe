import { BellOutlined, HeartOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Drawer, Dropdown, Input, Modal, Space, notification } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLogoutMutation } from '../../../pages/auth.service';
import { closeAuthModal, openAuthModal, setUnauthenticated } from '../../../pages/auth.slice';
import Login from '../../../pages/site/Auth/Login';
import Signup from '../../../pages/site/Auth/Signup';
import { useGetUserQuery } from '../../../pages/site/client.service';
import { setSearchQuery } from '../../../pages/site/client.slice';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import Button from '../../Button';
import './Header.scss';
import CategoriesNav from './components/CategoriesNav';
import Forgot from '../../../pages/site/Auth/Forgot';
import ChangePassword from '../../../pages/site/Auth/ChangePassword';
import DropDownMenu from './components/Dropdown/Dropdown';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../constant/backend-domain';

const { Search } = Input;

const Header = () => {
  // State here
  const [showCategoriesNav, setShowCategoriesNav] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenAuthModal = useSelector((state: RootState) => state.auth.isOpenAuthModal);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [authState, setAuthState] = useState('login');
  const cart = useSelector((state: RootState) => state.client.cart);
  const authStateGlobal = useSelector((state: RootState) => state.auth.authState);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [userData, setUserData] = useState<IUser>();
  const { data } = useGetUserQuery(userId, {
    skip: !userId
  });
  const [logout, logoutResult] = useLogoutMutation();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPath = location.pathname;

  useMemo(() => {
  //   const socket = io(`${BACKEND_URL}` );
  //   socket.on("login", (data: any) => {
  //   console.log(data)
  // })
  }, [])


  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  const userAuthItems: MenuProps['items'] = [
    {
      label: (
        <Link to='/profile'>
          <div>{userData?.name}</div>
          <div>{userData?.email}</div>
        </Link>
      ),
      key: 'profile',
      icon: <Avatar src={userData?.avatar} />
    },
    {
      label: <Link to='/start'>My Learning</Link>,
      key: 'mylearning',
      icon: <UserOutlined />
    },
    {
      label: 'Instructor Dashboard',
      key: 'instructor',
      icon: <UserOutlined />
    },
    {
      label: 'Notifications',
      key: 'notifications',
      icon: <UserOutlined />
    },
    {
      label: 'Messages',
      key: 'messages',
      icon: <UserOutlined />
    },
    {
      label: (
        <Link to='/account-settings'>
          <div>Account settings</div>
        </Link>
      ),
      key: 'account-settings',
      icon: <UserOutlined />
    },
    {
      label: 'Payment method',
      key: 'payment-method',
      icon: <UserOutlined />
    },
    {
      label: (
        <Link to='/purchase-history'>
          <div>Purchase history</div>
        </Link>
      ),
      key: 'purchase-history',
      icon: <UserOutlined />
    },
    {
      label: 'Public Profile',
      key: 'public-profile',
      icon: <UserOutlined />
    },
    {
      label: 'Edit Profile',
      key: 'edit-profile',
      icon: <UserOutlined />
    },
    {
      label: 'Help',
      key: 'help',
      icon: <UserOutlined />
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

  const notificationItems: MenuProps['items'] = [
    {
      label: 'Note 1',
      key: '1',
      icon: <UserOutlined />
    },
    {
      label: 'Note 2',
      key: '2',
      icon: <UserOutlined />
    },
    {
      label: 'Note 3',
      key: '3',
      icon: <UserOutlined />,
      danger: true
    },
    {
      label: 'Note 4',
      key: 'Note 5',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

  const wishlistItems: MenuProps['items'] = [
    {
      label: (
        <Link to='/wishlist'>
          <div>Wishlist</div>
        </Link>
      ),
      key: 'wishlist',
      icon: <UserOutlined />
    },
    {
      label: 'Wishlist 2',
      key: '2',
      icon: <UserOutlined />
    },
    {
      label: 'Wishlist 3',
      key: '3',
      icon: <UserOutlined />,
      danger: true
    },
    {
      label: 'Wishlist 4',
      key: 'Note 5',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(closeAuthModal());
  };

  const handleCancel = () => {
    dispatch(closeAuthModal());
  };

  const signInHandler = () => {
    setAuthState('login');
    dispatch(openAuthModal());
  };

  const signUpHandler = () => {
    setAuthState('signup');
    dispatch(openAuthModal());
  };

  const changeAuthState = (authState: string) => {
    setAuthState(authState);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      logout()
        .unwrap()
        .then((result) => {
          notification.success({
            message: result.message
          });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
      dispatch(setUnauthenticated());
    }
  };

  const menuUserProps = {
    items: userAuthItems,
    onClick: handleMenuClick
  };
  const menuNotificationsProps = {
    items: notificationItems,
    onClick: handleMenuClick
  };
  const menuWishlistProps = {
    items: wishlistItems,
    onClick: handleMenuClick
  };

  const onSearch = (value: string) => {
    dispatch(setSearchQuery(value));
    setSearchParams({ _q: value });
    navigate(`courses?_q=${value}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowCategoriesNav(false);
      } else {
        setShowCategoriesNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  const showMobileMenuHandler = () => {
    setOpenMobileMenu(true);
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__wrapper '>
          <MenuOutlined onClick={showMobileMenuHandler} className='header__menu-mobile font-bold lg:hidden' />
          <Link to='/' className='header__logo'>
            <img src='https://i.imgur.com/NZj5m3U.png' alt='' className='header__logo-img' />
          </Link>

          <div className='header__nav'>
            <ul className='header__nav-list'>
              {isAuth && (
                <li className='header__nav-item'>
                  <Link to='/start' className='header__nav-link'>
                    My Learning
                  </Link>
                </li>
              )}
              <li className='header__nav-item'>
                <Link to='/' className='header__nav-link'>
                  Home
                </Link>
              </li>
              <li className='header__nav-item '>
                <Link to='/courses' className='header__nav-link'>
                  Courses
                </Link>
              </li>
              <li className='header__nav-item'>
                <Link to='/contact' className='header__nav-link'>
                  Contact
                </Link>
              </li>
              <li className='header__nav-item'>
                <Link to='/about-us' className='header__nav-link'>
                  About us
                </Link>
              </li>
              <li className='header__nav-item'>
                <DropDownMenu />
              </li>
            </ul>

            <div className='header-icon'>
              <div className='header__search'>
                <Search
                  style={{ width: '30rem' }}
                  placeholder='Search to find your suitable courses'
                  onSearch={onSearch}
                  enterButton
                />
              </div>

              <div className='header__search-mobile'>
                <div className="icon-search">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                <input className='input' type="search" name="" id="" placeholder='Tìm kiếm khóa học...' />
                </div>
              </div>
              <div className='header__nav-item header__nav-item--cart'>
                <Link className='header__nav-link' to='/view-cart'>
                  <Badge count={cart?.items?.length || 0}>
                    <ShoppingCartOutlined className='header__nav-link-icon' />
                  </Badge>
                </Link>
              </div>
              {isAuth && (
                <li className='header__nav-item'>
                  <Dropdown menu={menuWishlistProps} placement='bottomRight'>
                    <Badge dot={true}>
                      <HeartOutlined
                        className='header__nav-item-user-icon header__nav-link-icon'
                        style={{ cursor: 'pointer' }}
                      />
                    </Badge>
                  </Dropdown>
                </li>
              )}

              {isAuth && (
                <li className='header__nav-item'>
                  <Dropdown menu={menuNotificationsProps} placement='bottomRight'>
                    <Badge dot={true}>
                      <BellOutlined
                        className='header__nav-item-notify-icon header__nav-link-icon'
                        style={{ cursor: 'pointer' }}
                      />
                    </Badge>
                  </Dropdown>
                </li>
              )}
              {isAuth && (
                <div className='header__nav-item header__nav-item--user'>
                  <Dropdown menu={menuUserProps} placement='bottomRight'>
                    <Badge dot={true}>
                      <Avatar className='header__nav-item-user-icon' src={userData?.avatar} />
                    </Badge>
                  </Dropdown>
                </div>
              )}
              <div className='header__auth'>
                {!isAuth && (
                  <Space>
                    <Button onClick={signInHandler} className='btn btn-sm'>
                      Sign in
                    </Button>
                    <Button onClick={signUpHandler} className='btn btn-sm btn-outline-primary'>
                      Sign up
                    </Button>
                  </Space>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentPath === '/' && showCategoriesNav && <CategoriesNav />}
      <Modal title='' open={isOpenAuthModal} onOk={handleOk} onCancel={handleCancel}>
        {authState === 'login' && <Login onClick={changeAuthState} />}
        {authState === 'signup' && <Signup onClick={changeAuthState} />}
        {authState === 'forgot' && <Forgot onClick={changeAuthState} />}
        {authStateGlobal === 'changePassword' && <ChangePassword onClick={changeAuthState} />}
      </Modal>

      <Drawer
        title='Mobile menu'
        placement={'left'}
        width={300}
        onClose={onCloseMobileMenu}
        open={openMobileMenu}
        extra={
          <Space>
            <Button onClick={onCloseMobileMenu}>Cancel</Button>
            <Button onClick={onCloseMobileMenu}>OK</Button>
          </Space>
        }
      >
        <div>Content in here</div>
      </Drawer>
    </div>
  );
};

export default Header;
