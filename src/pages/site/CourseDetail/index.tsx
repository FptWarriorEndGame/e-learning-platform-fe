import { CheckOutlined, HeartOutlined, RightCircleFilled, StarFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Col, List, Row, Space, Typography, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { RootState } from '../../../store/store';
import { AccessStatus, CourseLevel } from '../../../types/course.type';
import { IOrder } from '../../../types/order.type';
import { formatVideoLengthToHours, transformDate } from '../../../utils/functions';
import { openAuthModal } from '../../auth.slice';
import RelatedCourses from './components/RelatedCourses/RelatedCourses';
import {
  useCreateOrderMutation,
  useGetCourseDetailQuery,
  useGetSectionsByCourseIdQuery,
  useGetUserQuery,
  useIncreaseCourseViewMutation
} from '../client.service';
import { addToCart } from '../client.slice';
import './CourseDetail.scss';
import SectionList from './components/SectionList';
import ReviewModal from './components/ReviewModal/ReviewModal';
import PreviewModal from './components/PreviewModal/PreviewModal';

const initCourseDetail = {
  _id: '',
  name: '',
  description: '',
  price: 0,
  finalPrice: 0,
  access: AccessStatus.FREE,
  level: CourseLevel.BEGINNER,
  thumbnail: '',
  courseSlug: '',
  categoryId: {
    _id: '646781266859a50acfca8e93',
    name: 'Web'
  },
  userId: {
    _id: '6468a145401d3810494f4797',
    name: 'Nguyen Van A',
    avatar: ''
  },
  authorId: {
    _id: '6468a145401d3810494f4797',
    name: 'Nguyen Van A',
    avatar: '',
    biography: ''
  },
  numOfReviews: 0,
  totalVideosLength: 0,
  sections: 0,
  lessons: 0,
  students: 0,
  avgRatingStars: 0,
  isBought: false,
  createdAt: '',
  updatedAt: '',
  views: 0
};

const CourseDetail = () => {
  // HOOKS HERE
  const params = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const { data: userData } = useGetUserQuery(userId);

  const { courseId } = params;

  const [increaseCourseView] = useIncreaseCourseViewMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

  const [visibleCourseData, setVisibleCourseData] = useState<number>(10);

  const { data } = useGetCourseDetailQuery({ courseId, userId } as { courseId: string; userId: string });

  const courseData = data?.course.willLearns || [];

  const increaseView = async () => {
    try {
      if (!courseId) {
        console.error('Course ID is undefined');
        return;
      }

      await increaseCourseView(courseId);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error increasing course view:', error);
    }
  };

  useEffect(() => {
    increaseView().catch((error) => console.error('Error in increaseView:', error));
  }, [courseId, increaseCourseView]);

  const [createOrder, createOrderResult] = useCreateOrderMutation();
  const navigate = useNavigate();

  let courseDetail = initCourseDetail;

  if (data && data.course.createdAt) {
    courseDetail = {
      ...data.course,
      createdAt: data.course.createdAt
    };
  }

  const {
    name,
    description,
    price,
    finalPrice,
    thumbnail,
    userId: author,
    authorId,
    numOfReviews,
    totalVideosLength,
    sections,
    lessons,
    avgRatingStars,
    students,
    isBought,
    updatedAt,
    views
  } = courseDetail;

  let thumbnailUrl = '';
  if (thumbnail.startsWith('https')) {
    thumbnailUrl = thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
  }

  const { data: sectionData } = useGetSectionsByCourseIdQuery(courseId || '');

  const numOfSections = sectionData?.sections.length || 0;

  const overviewData = [
    `${formatVideoLengthToHours(totalVideosLength)} on-demand video`,
    `${sections} articles.`,
    '0 downloadable resources.',
    'Access on mobile and TV.',
    'Full lifetime access.',
    'Certificate of completion.'
  ];

  const addCartHandler = () => {
    dispatch(addToCart(courseId as string));
  };

  const subscribeCourseHandler = () => {
    if (isAuth) {
      const orderItem = {
        courseId: courseId as string,
        name: name,
        thumbnail: thumbnail,
        finalPrice: finalPrice
      };

      const newOrder: Omit<IOrder, '_id'> = {
        items: [orderItem],
        user: {
          _id: userId,
          email: userData?.user.email || '',
          name: userData?.user.name || '',
          phone: userData?.user.phone || '',
          avatar: (userData?.user.avatar as string) || ''
        },
        transaction: {
          method: 'VNPAY'
        },
        totalPrice: 0,
        vatFee: 0,
        note: 'ENROLL COURSE FREE'
      };

      createOrder(newOrder)
        .unwrap()
        .then((result) => {
          console.log(result);

          navigate(`/cart/subscribe/course/${orderItem.courseId}`);
          notification.success({
            message: 'Enroll course successfully'
          });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } else {
      notification.error({
        message: 'Please login to enroll this course'
      });

      dispatch(openAuthModal());
    }
  };

  const buyNowHandler = () => {
    if (isAuth) {
      dispatch(addToCart(courseId as string));
      navigate(`/checkout`);
    } else {
      notification.error({
        message: 'Please login to buy this course'
      });

      dispatch(openAuthModal());
    }
  };

  const gotoCourseHandler = () => {
    navigate(`/path-player?courseId=${courseId as string}`);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenPreviewModal = () => {
    setIsPreviewModalVisible(true);
  };

  const handleCancelPreviewModal = () => {
    setIsPreviewModalVisible(false);
  };

  const loadMoreCourseData = () => {
    setVisibleCourseData((prevVisibleCourseData) => prevVisibleCourseData + 5);
  };

  const truncatedCourseData = courseData.slice(0, visibleCourseData);

  const showLoadMoreButton = courseData.length > visibleCourseData;

  return (
    <div className='course-detail'>
      <div className='course-detail__wrap'>
        <div className='course-detail__intro '>
          <div className='container'>
            <div className='course-detail__intro-wrap'>
              <div className='course-detail__intro-wrap-content'>
                <Breadcrumb
                  className='course-detail__breadcrumb'
                  items={[
                    {
                      title: 'Home'
                    }
                  ]}
                />

                <h2 className='course-detail__title'>{name}</h2>
                <p className='course-detail__sub-title'>{description}</p>
                <div className='course-detail__info'>
                  <div className='course-detail__info-item course-detail__info-status'>Bestseller</div>
                  <div className='course-detail__info-item course-detail__info-rating'>
                    <Space>
                      <span>{avgRatingStars}</span>
                      <span>
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                      </span>
                      <span onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                        ({numOfReviews} ratings)
                      </span>
                    </Space>
                  </div>
                  <ReviewModal courseId={courseId} visible={isModalVisible} onCancel={handleCancel} />
                  <div className='course-detail__info-item course-detail__info-students'>
                    <Space>
                      <span>{students}</span>
                      <span>students</span>
                    </Space>
                  </div>
                  <div className='course-detail__info-item course-detail__info-views'>
                    <Space>
                      <span>{views}</span>
                      <span>views</span>
                    </Space>
                  </div>
                </div>
                <div className='course-detail__intro-author'>
                  <span className=''>Author</span>
                  <Link to={`/user/${authorId?._id}`} className='course-detail__intro-author-name'>
                    {authorId?.name}
                  </Link>
                </div>
                <div className='course-detail__intro-updated-at'>Last updated {transformDate(updatedAt)}</div>
              </div>
              <div className='course-detail__intro-wrap-course'>
                <div className='course-detail__overview'>
                  <div className='course-detail__thumbnail'>
                    <img
                      src={thumbnailUrl || 'https://img-c.udemycdn.com/course/240x135/3510096_5891.jpg'}
                      alt=''
                      className='course-detail__thumbnail-img'
                    />
                    <div onClick={handleOpenPreviewModal} className='course-detail__thumbnail-overlay'>
                      <RightCircleFilled className='course-detail__thumbnail-overlay-icon' />
                      <div className='course-detail__thumbnail-overlay-text'>
                        <span>Preview This course</span>
                      </div>
                    </div>

                    <PreviewModal
                      courseId={courseId}
                      lessonId={undefined}
                      courseName={name}
                      visible={isPreviewModalVisible}
                      onCancel={handleCancelPreviewModal}
                    />
                  </div>
                  <div className='course-detail__overview-content '>
                    <div className='course-detail__overview-price'>{finalPrice === 0 && 'FREE'}</div>
                    {finalPrice !== 0 && !isBought && (
                      <div className='course-detail__overview-price'>
                        <div>
                          <s className='font-light mr-4'>${price}</s> ${finalPrice}
                        </div>
                      </div>
                    )}
                    <div className='course-detail__overview-btns'>
                      {!isBought && (
                        <>
                          <Space>
                            {finalPrice !== 0 && (
                              <ButtonCmp
                                onClick={addCartHandler}
                                className='course-detail__overview-add-to-cart btn btn-md btn-secondary'
                              >
                                Add to Cart
                              </ButtonCmp>
                            )}
                            <Button className='course-detail__overview-wishlist-btn'>
                              <HeartOutlined />
                            </Button>
                          </Space>
                          <div>
                            <Space>
                              {finalPrice === 0 && (
                                <ButtonCmp
                                  onClick={subscribeCourseHandler}
                                  className='course-detail__overview-enroll-btn btn btn-md btn-primary'
                                >
                                  Enroll now
                                </ButtonCmp>
                              )}
                              {finalPrice !== 0 && (
                                <ButtonCmp
                                  onClick={buyNowHandler}
                                  className='course-detail__overview-enroll-btn btn btn-md btn-primary'
                                >
                                  Buy now
                                </ButtonCmp>
                              )}
                            </Space>
                          </div>
                        </>
                      )}

                      {isBought && (
                        <Space>
                          <ButtonCmp onClick={gotoCourseHandler} className='btn btn-primary btn-md btn-tertiary'>
                            Go to course
                          </ButtonCmp>
                        </Space>
                      )}

                      <div className='course-detail__overview-guarantee'>30-Day Money-Back Guarantee</div>
                    </div>
                    <div className='course-detail__overview-includes'>
                      <h4 className='course-detail__overview-includes-title'>This course includes:</h4>
                      <List
                        dataSource={overviewData}
                        renderItem={(item) => (
                          <List.Item>
                            <Typography.Text>+</Typography.Text> {item}
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='course-detail__includes'>
            <div className='course-detail__includes-list'>
              <div className='course-detail__includes-item spacing-h-sm'>
                <div className='container course-detail__includes-wrap '>
                  <List
                    header={<div className='course-detail__includes-header'>What you'll learn</div>}
                    dataSource={truncatedCourseData}
                    renderItem={(item) => (
                      <List.Item>
                        <Space>
                          <Typography.Text>
                            <CheckOutlined />
                          </Typography.Text>
                          <span>{item}</span>
                        </Space>
                      </List.Item>
                    )}
                  />
                  {showLoadMoreButton && (
                    <Button
                      className='course-detail__includes-footer'
                      style={{ marginBottom: '20px' }}
                      onClick={loadMoreCourseData}
                    >
                      Show more
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='course-detail__content spacing-h-sm'>
            <div className='course-detail__content-list'>
              <div className='course-detail__content-item'>
                <h3 className='course-detail__content-title'>Course content</h3>
                <div className='course-detail__content-wrap'>
                  <div className='course-detail__content-summary'>
                    <Row className='course-detail__content-summary-row'>
                      <Col md='12'>
                        {numOfSections} sections • {lessons} lectures • {formatVideoLengthToHours(totalVideosLength)}{' '}
                        total length
                      </Col>
                      <Col className='course-detail__content-summary-col col-right' md='12'>
                        <Link to='/'>Expand all sections</Link>
                      </Col>
                    </Row>
                  </div>
                </div>
                {courseId && <SectionList courseId={courseId} courseName={name} />}
              </div>
            </div>
          </div>
          <div className='course-detail__related-courses'>
            {courseId !== undefined && <RelatedCourses courseId={courseId} />}
          </div>
        </div>
        <div className='course-detail__author spacing-h-md'>
          <div className='course-detail__author-wrap container'>
            <div className='course-detail__author-list'>
              <div className='course-detail__author-info'>
                <p className='course-detail__author-intro'>Meet the intructor</p>
                <h2 className='course-detail__author-name'>{authorId?.name}</h2>
                <p className='course-detail__author-desc'>
                  {authorId?.name} {authorId?.biography}
                </p>
              </div>
              <div className='course-detail__author-avatar'>
                <img
                  className='course-detail__author-img'
                  src={authorId?.avatar || 'https://www.w3schools.com/howto/img_avatar.png'}
                  alt={authorId?.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
