import {
  ApartmentOutlined,
  DingtalkOutlined,
  EditOutlined,
  FlagOutlined,
  FundFilled,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Skeleton, Space } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { RootState } from '../../../store/store';
import { IParams } from '../../../types/params.type';
import { openAuthModal } from '../../auth.slice';

import {
  useGetAllBlogsQuery,
  useGetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetSuggestedCoursesQuery
} from '../client.service';

import CourseList from '../components/CourseList';
import SubscribeEmail from './components/SubscribeEmail';
import FeedbackStudent from './components/FeedbackStudent';
import './Home.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [courseLimit, setCourseLimit] = useState(4);

  // Update screenSize when the window is resized

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { data, isLoading } = useGetAllBlogsQuery({});

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const params: IParams = {
    _limit: 4,
    _page: 1
  };

  const [popularParams, setPopularParams] = useState(params);

  const [userCoursesParams, setUserCoursesParams] = useState({
    _limit: 4,
    _page: 1,
    userId: userId
  });

  const [frontendParams, setFrontendParams] = useState({
    _limit: 4,
    _page: 1,
    _topic: ['64b363573bbbb6317297378d'], // frontend,
    userId: userId
  });
  const [backendParams, setBackendParams] = useState({
    _limit: 4,
    _page: 1,
    _topic: ['646781266859a50acfca8e93'], // backend,
    userId: userId
  });
  const [devopsParams, setDevopsParams] = useState({
    _limit: 4,
    _page: 1,
    _topic: ['64b363b13bbbb6317297378f'], // devops,
    userId: userId
  });

  const { data: userSuggestedCoursesData, isFetching: isSuggestedCoursesFetching } = useGetSuggestedCoursesQuery({
    userId,
    limit: 8
  });
  const { data: userCoursesData, isFetching } = useGetCoursesQuery(userCoursesParams);
  const { data: frontendData, isFetching: isFrontendFetching } = useGetCoursesQuery(frontendParams);
  const { data: backendData, isFetching: isBackendFetching } = useGetCoursesQuery(backendParams);
  const { data: devopsData, isFetching: isDevopsFetching } = useGetCoursesQuery(devopsParams);
  const { data: popularCoursesData, isFetching: isPoppularCoursesFetching } = useGetPopularCoursesQuery(popularParams);

  const isPopularLoadMore =
    (popularCoursesData?.pagination?._totalRows || 0) > (popularCoursesData?.courses?.length || 0);

  const isUserCoursesLoadMore =
    (userCoursesData?.pagination?._totalRows || 0) > (userCoursesData?.courses?.length || 0);
  const isFrontendLoadMore = (frontendData?.pagination?._totalRows || 0) > (frontendData?.courses?.length || 0);
  const isBackendLoadMore = (backendData?.pagination?._totalRows || 0) > (backendData?.courses?.length || 0);
  const isDevopsLoadMore = (devopsData?.pagination?._totalRows || 0) > (devopsData?.courses?.length || 0);

  const suggestedCourses = userSuggestedCoursesData?.suggestedCourses;

  // users courses
  const usersCourses = userCoursesData?.courses;

  // const popularCourses = data?.courses
  const popularCourses = popularCoursesData?.courses;

  // const totalPopularCourses = popularCoursesData?.pagination;

  // Frontend courses

  const frontendCourses = frontendData?.courses;

  // Backend courses
  const backendCourses = backendData?.courses;

  // Devops courses
  const devopsCourses = devopsData?.courses;

  const startNowHandler = () => {
    if (isAuth) {
      navigate('/start');
    } else {
      dispatch(openAuthModal());
    }
  };

  const popularLoadMoreHandler = () => {
    setPopularParams({
      ...popularParams,
      _limit: (popularParams._limit || 0) + 4
    });
  };

  const usersCoursesLoadMoreHandler = () => {
    setUserCoursesParams({
      ...userCoursesParams,
      _limit: (userCoursesParams._limit || 0) + 4
    });
  };

  const frontendLoadMoreHandler = () => {
    setFrontendParams({
      ...frontendParams,
      _limit: (frontendParams._limit || 0) + 4
    });
  };

  const backendLoadMoreHandler = () => {
    setBackendParams({
      ...backendParams,
      _limit: (backendParams._limit || 0) + 4
    });
  };

  const devopsLoadMoreHandler = () => {
    setDevopsParams({
      ...devopsParams,
      _limit: (devopsParams._limit || 0) + 4
    });
  };

  useEffect(() => {
    if (isAuth) {
      setUserCoursesParams({
        ...userCoursesParams,
        userId: userId
      });

      setFrontendParams({
        ...frontendParams,
        userId: userId
      });

      setBackendParams({
        ...backendParams,
        userId: userId
      });

      setDevopsParams({
        ...devopsParams,
        userId: userId
      });
    }
  }, [isAuth]);

  return (
    <div>
      {/* Banner */}
      <div className='banner mt-sm '>
        <div className='banner__wrapper'>
          <div className='container'>
            <div className='banner__wrapper-left'>
              <div className='banner__cta-section'>
                <h1 className='banner__title'>Learn and become better at your job</h1>
                <p className='banner__content'>
                  Participate in a fully professional, social, engaging and interactive online school. Get the learning
                  experience you deserve.
                </p>
                <div className='banner__cta--btns'>
                  <Space>
                    <Button onClick={startNowHandler} className='banner__cta-start-now btn btn-md btn-secondary'>
                      Start Now
                    </Button>
                    <Link to='/courses'>
                      <Button className='btn btn-md btn-tertiary'>View Courses</Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </div>
            <div className='banner__wrapper-right'></div>
          </div>
        </div>
      </div>

      {!isAuth && (
        <Fragment>
          {/* Our Benefits */}
          <div className='our-benefits spacing-h-md '>
            <div className='container'>
              <h2 className='our-benefits__title'>Benefits of our training programs</h2>
              <p className='our-benefits__sub-tittle'>
                The best instructors have designed the most motivating learning paths for you.
              </p>
              <div className='our-benefits__list'>
                <div className='our-benefits__item'>
                  <div className='our-benefits__item-img'>
                    <EditOutlined className='our-benefits__item-icon' />
                  </div>
                  <h3 className='our-benefits__item-title'>Practical approach</h3>
                  <p className='our-benefits__item-content'>
                    Our training is designed to provide the skills in a practical approach. Our students' success is our
                    best asset in showing the quality of our training.
                  </p>
                </div>
                <div className='our-benefits__item'>
                  <div className='our-benefits__item-img'>
                    <ApartmentOutlined className='our-benefits__item-icon' />
                  </div>
                  <h3 className='our-benefits__item-title'>Globally oriented</h3>
                  <p className='our-benefits__item-content'>
                    Strategies shared and knowledge earned allows our students to immediately set up their business and
                    start offering their services around the globe.
                  </p>
                </div>
                <div className='our-benefits__item'>
                  <div className='our-benefits__item-img'>
                    <DingtalkOutlined className='our-benefits__item-icon' />
                  </div>
                  <h3 className='our-benefits__item-title'>For your career</h3>
                  <p className='our-benefits__item-content'>
                    Whether you want to boost your career within the company you are working or grow at your own
                    business by applying the latest strategies in digital marketing, this is the way.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className='statistics spacing-h-md '>
            <div className='container'>
              <Row className='statistics__list '>
                <Col className='statistics__item'>
                  <div className='statistics__item-img'>
                    <UserOutlined className='statistics__item-icon' />
                  </div>
                  <h3 className='statistics__item-number'>19,200</h3>
                  <p className='statistics__item-content'>STUDENTS</p>
                </Col>
                <Col className='statistics__item'>
                  <div className='statistics__item-img'>
                    <FlagOutlined className='statistics__item-icon' />
                  </div>
                  <h3 className='statistics__item-number'>92.000</h3>
                  <p className='statistics__item-content'>LEARNING STEPS DONE</p>
                </Col>
                <Col className='statistics__item'>
                  <div className='statistics__item-img'>
                    <FundFilled className='statistics__item-icon' />
                  </div>
                  <h3 className='statistics__item-number'>80%</h3>
                  <p className='statistics__item-content'>COURSE COMPLETION RATE</p>
                </Col>
              </Row>
            </div>
          </div>

          {/* Quotes  */}
          <div className='quotes'>
            <div className='container'>
              <div className='quotes__wrapper'>
                <div className='quotes__author'>
                  <div className='quotes__author-img-cover'>
                    <img src='https://i.imgur.com/osnehcc.jpg' className='quotes__author-img' />
                  </div>
                  <div className='quotes__author-content'>
                    <h3 className='quotes__author-content-title'>Get Closer To Your Goals</h3>
                    <p className='quotes__author-content-text'>
                      Are you feeling overwhelmed by the explosion of digital platforms and channels? Are you unsure how
                      to best navigate this new environment to engage even more successfully with your colleagues?
                    </p>
                    <p className='quotes__author-content-text'>
                      Studying with us will help you learn how to create, capture and deliver value in a digital world.
                      You'll leave with smart strategies to optimize your performance and satisfaction both online AND
                      offline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      {isAuth && userSuggestedCoursesData && userSuggestedCoursesData.suggestedCourses?.length > 4 && (
        <div className={`our-courses-carousel`}>
          <div className='container'>
            <h2 className='our-courses-carousel__title mt-md'>Suggested Courses</h2>
            {isSuggestedCoursesFetching ? (
              <Skeleton />
            ) : (
              <CourseList
                courseState='notOrdered'
                courses={suggestedCourses}
                isCarousel={true}
                className='our-courses-carousel__wrapper'
              />
            )}
          </div>
        </div>
      )}

      {/* Popular Course Enrolled */}

      {!isAuth && (
        <div className='our-courses'>
          <div className='container'>
            <h2 className='our-courses__title'>Popular Courses</h2>
            {isPoppularCoursesFetching ? (
              <Skeleton />
            ) : (
              <CourseList
                courseState='notOrdered'
                onLoadMore={popularLoadMoreHandler}
                isLoadMore={isPopularLoadMore}
                courses={popularCourses}
                className='our-courses__wrapper'
              />
            )}
          </div>
        </div>
      )}

      {/* Courses */}

      {isAuth && (
        <div className={`our-courses`}>
          <div className='container'>
            <h2 className='our-courses__title mt-md'>Our Courses</h2>
            {isFetching ? (
              <Skeleton />
            ) : (
              <CourseList
                courseState='notOrdered'
                courses={usersCourses}
                onLoadMore={usersCoursesLoadMoreHandler}
                isLoadMore={isUserCoursesLoadMore}
                className='our-courses__wrapper'
              />
            )}
          </div>
        </div>
      )}

      {/* Frontend */}

      <div className='our-courses'>
        <div className='container'>
          <h2 className='our-courses__title'>Frontend</h2>
          {isFrontendFetching ? (
            <Skeleton />
          ) : (
            <CourseList
              courseState='notOrdered'
              isLoadMore={isFrontendLoadMore}
              onLoadMore={frontendLoadMoreHandler}
              courses={frontendCourses}
              className='our-courses__wrapper'
            />
          )}
        </div>
      </div>

      {/* Backend */}
      <div className='our-courses'>
        <div className='container'>
          <h2 className='our-courses__title'>Backend</h2>
          {isBackendFetching ? (
            <Skeleton />
          ) : (
            <CourseList
              courseState='notOrdered'
              isLoadMore={isBackendLoadMore}
              onLoadMore={backendLoadMoreHandler}
              courses={backendCourses}
              className='our-courses__wrapper'
            />
          )}
        </div>
      </div>

      {/* Subscribe Email */}
      <SubscribeEmail />

      {/* FeedbackStudent */}
      <FeedbackStudent />

      {/* Devops */}

      <div className='our-courses'>
        <div className='container'>
          <h2 className='our-courses__title'>Devops</h2>
          {isDevopsFetching ? (
            <Skeleton />
          ) : (
            <CourseList
              courseState='notOrdered'
              isLoadMore={isDevopsLoadMore}
              onLoadMore={devopsLoadMoreHandler}
              courses={devopsCourses}
              className='our-courses__wrapper'
            />
          )}
        </div>
      </div>
      {/* Blogs */}
      <div className='blogs mb-8'>
        <div className='container'>
          <h2 className='blogs__title text-6xl font-bold mb-16'>Blogs</h2>
          <Slider {...settings}>
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.blogs?.map((blog) => (
                <div key={blog._id} className='px-1 inline-block'>
                  <Link to={`/blog-detail/${blog._id}`}>
                    <Card
                      className='mx-4'
                      key={blog._id}
                      hoverable
                      style={{ width: 280 }}
                      cover={<img alt={blog.title} src={blog.blogImg} className='w-full object-cover' />} // Đảm bảo hình ảnh phủ đầy thẻ Card
                    >
                      <Card.Meta title={blog.title} description={blog.content} />
                    </Card>
                  </Link>
                </div>
              ))
            )}
          </Slider>
          {/* Blogs */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
