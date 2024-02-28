import type { PaginationProps } from 'antd';
import { Pagination, Row, notification } from 'antd';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../../components/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RootState } from '../../../../store/store';
import { ICourse } from '../../../../types/course.type';
import { IOrder, IOrderItem } from '../../../../types/order.type';
import { IPagination } from '../../../../types/pagination';
import { ICourseEnrolledByUser, useCreateOrderMutation, useGetUserQuery } from '../../client.service';
import CourseItem from '../CourseItem';
import './CourseList.scss';
type CourseListProps = {
  className: string;
  courses?: ICourseEnrolledByUser[] | ICourse[];
  pagination?: IPagination;
  courseState: string;
  isLoadMore?: boolean;
  isCarousel?: boolean;
  onPaginate?: (page: number) => void;
  onLoadMore?: () => void;
};
// props: Props

const CourseList = (props: CourseListProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [createOrder, createOrderResult] = useCreateOrderMutation();

  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data: userData } = useGetUserQuery(userId);

  const params = {
    _limit: searchParams.get('_limit') ? Number(searchParams.get('_limit')) : 12,
    _page: searchParams.get('_p') ? Number(searchParams.get('_p')) : 1,
    userId: userId
  };

  const moveToDetail = (id: string) => {
    if (props.courseState === 'ordered') {
      navigate(`/path-player?courseId=${id}`);
    } else {
      navigate(`/courses/${id}`);
    }
  };

  const [current, setCurrent] = useState(params._page || 1);

  // Change page with pagination
  const paginationChangeHandler: PaginationProps['onChange'] = (page) => {
    if (props.onPaginate) {
      props.onPaginate(page);
    }
    setCurrent(page);
  };

  const subscribeCourseHandler = (orderItem: IOrderItem) => {

    const newOrder: Omit<IOrder, '_id'> = {
      items: [orderItem],
      user: {
        _id: userId,
        email: userData?.user.email || '',
        name: userData?.user.name || '',
        phone: userData?.user.phone || '',
        avatar: userData?.user.avatar || ''
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

        navigate(`../cart/subscribe/course/${orderItem.courseId}`);
        notification.success({
          message: 'Enroll course successfully'
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  const carouselSettings = {
    infinite: true,
    speed: 500,
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

  const renderCoursesCarousel = () => {
    return (props.courses || []).map((courseItem) => (
      <div key={courseItem._id} className={props.className}>
        <CourseItem
          courseState={props.courseState}
          courseItem={courseItem}
          key={courseItem._id}
          onClick={moveToDetail}
          onEnroll={subscribeCourseHandler}
        />
      </div>
    ));
  };

  return (
    <Fragment>
      {props.isCarousel ? (
        <Slider {...carouselSettings} >
          {renderCoursesCarousel()}
        </Slider>
      ) : (
        <Fragment>
          <Row gutter={16} className={props.className}>
            {(props.courses || []).map((courseItem) => (
              <CourseItem
                courseState={props.courseState}
                key={courseItem._id}
                courseItem={courseItem}
                onClick={moveToDetail}
                onEnroll={subscribeCourseHandler}
              />
            ))}
          </Row>
          {props?.pagination && (
            <div className='our-courses__pagination'>
              <Pagination
                current={current}
                onChange={paginationChangeHandler}
                total={props?.pagination?._totalRows}
                pageSize={props.pagination._limit || 12}
              />
            </div>
          )}

          {props.isLoadMore && (
            <div className='our-courses__btn-place'>
              <Button onClick={() => props.onLoadMore && props.onLoadMore()} className='btn btn-secondary btn-sm'>
                Load more
              </Button>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseList;
