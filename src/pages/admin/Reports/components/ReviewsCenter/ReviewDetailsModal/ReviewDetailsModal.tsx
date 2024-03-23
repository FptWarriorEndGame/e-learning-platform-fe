import React from 'react';
import { Modal, Typography, Spin } from 'antd';
import moment from 'moment';
import { useGetReviewByIdQuery } from '../review.service';
import './ReviewDetailsModal.scss';

const { Text } = Typography;

interface ReviewDetailsModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({ reviewId, isOpen, onClose }) => {
  const { data, isFetching } = useGetReviewByIdQuery(reviewId);

  if (isFetching || !data) {
    return (
      <Modal className='review-details-modal' title='Review Details' open={isOpen} onCancel={onClose} footer={null}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spin size='large' />
        </div>
      </Modal>
    );
  }

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
          <Text style={{maxWidth: "400px"}}>{data.review.content}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Rating star:</Text>
          <Text>{data.review.ratingStar}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Status:</Text>
          <Text>{data.review.isDeleted ? 'Inactive' : 'Active'}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Created By:</Text>
          <Text>
            {typeof data.review.createdBy === 'string' ? data.review.createdBy : data.review.createdBy?.name ?? 'N/A'}
          </Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Created At:</Text>
          <Text>{moment(data.review.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
        {data.review.updatedBy && (
          <div className='review-details__section'>
            <Text className='review-details__label'>Updated By:</Text>
            <Text>
              {typeof data.review.updatedBy === 'string' ? data.review.updatedBy : data.review.updatedBy?.name ?? 'N/A'}
            </Text>
          </div>
        )}
        <div className='review-details__section'>
          <Text className='review-details__label'>Updated At:</Text>
          <Text>{moment(data.review.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDetailsModal;
