import { Avatar, Badge, Card, Col, Divider, Popover, Row, Tag, message } from 'antd';

import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
const { Meta } = Card;

type CourseItemProps = {
  xs?: number;
  md?: number;
  lg?: number;
  course: ICourse;
};

import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { ICourse } from '../../../../../types/course.type';
import { useUpdateActiveStatusCourseMutation } from '../../course.service';
import AuthorInfo from './AuthorInfo';
import './CourseItem.scss';
import CourseSettings from './CourseSettings';

const CourseItem = (props: CourseItemProps) => {
  const {
    access,
    categoryId,
    _id,
    courseSlug,
    createdAt,
    updatedAt,
    thumbnail,
    price,
    finalPrice,
    level,
    name,
    userId,
    isDeleted,
    description
  } = props.course;

  const [updateActiveStatusCourse, updateActiveStatusCourseResult] = useUpdateActiveStatusCourseMutation();

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const eventAction = (e.target as HTMLAnchorElement).dataset.action;

    updateActiveStatusCourse({ courseId: _id })
      .unwrap()
      .then(() => {
        const successMessage = isDeleted ? 'Course activated successfully' : 'Course deactivated successfully';
        void message.success(successMessage);
      })
      .catch(() => {
        const errorMessage = isDeleted ? 'Failed to activate course' : 'Failed to deactivate course';
        void message.error(errorMessage);
      });
  };

  let thumbnailUrl = '';
  if (thumbnail.startsWith('http')) {
    thumbnailUrl = thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
  }

  return (
    <Col className='course-content__item' md={props.md}>
      <Link to={_id}>
        <Badge.Ribbon text='Special offer'>
          <Card
            className='course-content__item-card'
            cover={<img className='course-content__item-thumb' alt={name} src={thumbnailUrl} />}
            actions={[
              <div></div>,
              <EditOutlined key='edit' />,
              <Popover
                content={<CourseSettings onClick={clickHandler} _id={_id} isDeleted={isDeleted} />}
                title='Settings'
                placement='topLeft'
              >
                <EllipsisOutlined className='course-content__item-settings' key='ellipsis' />,
              </Popover>
            ]}
          >
            <Meta
              className='course-content__item-meta'
              avatar={
                <Popover content={<AuthorInfo info={userId} />} title='Author Info' placement='topLeft'>
                  <Avatar src={userId.avatar} />
                </Popover>
              }
              title={name}
              description={description}
            />
            <Divider className='course-content__item-divider' />
            <Row>
              <Col className='item-price' span={12}>
                <div className='item-price__title'>Price</div>
                <div className='item-price__list'>
                  {finalPrice === 0 ? (
                    'Free'
                  ) : (
                    <>
                      <span className='item-price__old-price'>${price}</span>
                      <span className='item-price__new-price'>${finalPrice}</span>
                    </>
                  )}
                </div>
              </Col>
              <Col className='item-learners' span={12}>
                <div className='item-learners__title'>Learners</div>
                <div className='item-learners__qty'>1</div>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Link>
    </Col>
  );
};

export default CourseItem;
