import React from 'react';
import { Modal, Typography, Spin } from 'antd';
import moment from 'moment';
import { useGetFeedbackByIdQuery } from '../feedback.service';
import './FeedbackDetailsModal.scss';

const { Text } = Typography;

interface FeedbackDetailsModalProps {
  feedbackId: string;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackDetailsModal: React.FC<FeedbackDetailsModalProps> = ({ feedbackId, isOpen, onClose }) => {
  const { data, isFetching } = useGetFeedbackByIdQuery(feedbackId);

  if (isFetching || !data) {
    return (
      <Modal className='feedback-details-modal' title='Feedback Details' open={isOpen} onCancel={onClose} footer={null}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spin size='large' />
        </div>
      </Modal>
    );
  }

  return (
    <Modal className='feedback-details-modal' title='Feedback Details' open={isOpen} onCancel={onClose} footer={null}>
      <div className='feedback-details'>
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Name:</Text>
          <Text>{data.feedback.name}</Text>
        </div>
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Email:</Text>
          <Text>{data.feedback.email}</Text>
        </div>
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Message:</Text>
          <Text style={{ maxWidth: '400px' }}>{data.feedback.message}</Text>
        </div>
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Status:</Text>
          <Text>{data.feedback.isDeleted ? 'Inactive' : 'Active'}</Text>
        </div>
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Created By:</Text>
          <Text>
            {typeof data.feedback.createdBy === 'string'
              ? data.feedback.createdBy
              : data.feedback.createdBy?.name ?? 'N/A'}
          </Text>
        </div>
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Created At:</Text>
          <Text>{moment(data.feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
        {data.feedback.updatedBy && (
          <div className='feedback-details__section'>
            <Text className='feedback-details__label'>Updated By:</Text>
            <Text>
              {typeof data.feedback.updatedBy === 'string'
                ? data.feedback.updatedBy
                : data.feedback.updatedBy?.name ?? 'N/A'}
            </Text>
          </div>
        )}
        <div className='feedback-details__section'>
          <Text className='feedback-details__label'>Updated At:</Text>
          <Text>{moment(data.feedback.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackDetailsModal;
