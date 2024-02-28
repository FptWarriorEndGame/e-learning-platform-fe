import React from 'react';
import { Modal, Typography } from 'antd';
import moment from 'moment';
import { useGetReviewQuery } from '../review.service';
import './ReviewDetailsModal.scss';

const { Text } = Typography;

interface ReviewDetailsModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({ reviewId, isOpen, onClose }) => {
  const { data, isFetching } = useGetReviewQuery(reviewId);

  if (isFetching || !data) {
    return (
      <Modal className='review-details-modal' title='Review Details' open={isOpen} onCancel={onClose} footer={null}>
        <Text className='review-details__empty'>Loading...</Text>
      </Modal>
    );
  }

  const formattedCreatedAt = moment(data.review.createdAt).format("YYYY-MM-DD HH:mm:ss");

  return (
    <Modal className='review-details-modal' title='Review Details' open={isOpen} onCancel={onClose} footer={null}>
      <div className='review-details'>
        <div className='review-details__section'>
          <Text className='review-details__label'>User Name:</Text>
          <Text>{data.review.userId.name}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Course Name:</Text>
          <Text>{data.review.courseId.name}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Order ID:</Text>
          <Text>{data.review.orderId}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Title:</Text>
          <Text>{data.review.title}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Content:</Text>
          <Text>{data.review.content}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Rating star:</Text>
          <Text>{data.review.ratingStar}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Created At:</Text>
          <Text>{formattedCreatedAt}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDetailsModal;
