import React from 'react';
import { Modal, Typography, List, Image, Spin } from 'antd';
import moment from 'moment';
import { useGetCourseQuery } from '../../course.service';
import './CourseDetailsModal.scss';

const { Text } = Typography;

interface CourseDetailsModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ courseId, isOpen, onClose }) => {
  const { data, isFetching } = useGetCourseQuery(courseId);

  if (isFetching || !data) {
    return (
      <Modal className='course-details-modal' title='Course Details' open={isOpen} onCancel={onClose} footer={null}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spin size='large' />
        </div>
      </Modal>
    );
  }

  return (
    <Modal className='course-details-modal' title='Course Details' open={isOpen} onCancel={onClose} footer={null}>
      <div className='course-details'>
        <div className='course-details__section'>
          <Text className='course-details__label'>Course ID:</Text>
          <Text>{data.course._id}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Course Name:</Text>
          <Text style={{ maxWidth: '350px' }}>{data.course.name}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Description:</Text>
          <Text style={{ maxWidth: '350px' }}>{data.course.description}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Category:</Text>
          <Text>{data.course.categoryId.name}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Course Slug:</Text>
          <Text>{data.course.courseSlug}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Price:</Text>
          <Text>{data.course.price}$</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Final Price:</Text>
          <Text>{data.course.finalPrice}$</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Access:</Text>
          <Text>{data.course.access}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Level:</Text>
          <Text>{data.course.level}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Sub Title:</Text>
          <Text style={{ maxWidth: '350px' }}>{data.course.subTitle}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Thumbnail:</Text>
          <Image
            className='course-details__course__thumbnail'
            width={80}
            height={80}
            src={data.course.thumbnail}
            alt='course thumbnail'
          />
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>View:</Text>
          <Text>{data.course.views}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Status:</Text>
          <Text>{data.course.isDeleted ? 'Inactive' : 'Active'}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Created By:</Text>
          <Text>{data.course.userId.name}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Created At:</Text>
          <Text>{moment(data.course.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
        <div className='course-details__section'>
          <Text className='course-details__label'>Updated At:</Text>
          <Text>{moment(data.course.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default CourseDetailsModal;
