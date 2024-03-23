import React from 'react';
import { Modal, Typography, Spin } from 'antd';
import moment from 'moment';
import { useGetCouponTypeByIdQuery } from '../couponType.service';
import './CouponTypeDetailsModal.scss';

const { Text } = Typography;

interface CouponTypeDetailsModalProps {
  couponTypeId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CouponTypeDetailsModal: React.FC<CouponTypeDetailsModalProps> = ({ couponTypeId, isOpen, onClose }) => {
  const { data, isFetching } = useGetCouponTypeByIdQuery(couponTypeId);

  if (isFetching || !data) {
    return (
      <Modal
        className='coupon-type-details-modal'
        title='Coupon Type Details'
        open={isOpen}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spin size='large' />
        </div>
      </Modal>
    );
  }

  const formattedCreatedAt = moment(data.couponType.createdAt).format('YYYY-MM-DD HH:mm:ss');
  const formattedUpdatedAt = moment(data.couponType.updatedAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <Modal
      className='coupon-type-details-modal'
      title='Coupon Type Details'
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className='coupon-type-details'>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Coupon Type ID:</Text>
          <Text>{data.couponType._id}</Text>
        </div>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Coupon Type Code:</Text>
          <Text>{data.couponType.code}</Text>
        </div>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Coupon Type Name:</Text>
          <Text>{data.couponType.name}</Text>
        </div>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Description:</Text>
          <Text style={{ maxWidth: '350px' }}>{data.couponType.description}</Text>
        </div>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Created By:</Text>
          <Text>
            {typeof data.couponType.createdBy === 'string'
              ? data.couponType.createdBy
              : data.couponType.createdBy?.name ?? 'N/A'}
          </Text>
        </div>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Created At:</Text>
          <Text>{formattedCreatedAt}</Text>
        </div>
        {data.couponType.updatedBy && (
          <div className='coupon-type-details__section'>
            <Text className='coupon-type-details__label'>Updated By:</Text>
            <Text>
              {typeof data.couponType.updatedBy === 'string'
                ? data.couponType.updatedBy
                : data.couponType.updatedBy?.name ?? 'N/A'}
            </Text>
          </div>
        )}
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Updated At:</Text>
          <Text>{formattedUpdatedAt}</Text>
        </div>
        <div className='coupon-type-details__section'>
          <Text className='coupon-type-details__label'>Status:</Text>
          <Text>{data.couponType.isDeleted ? 'Inactive' : 'Active'}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default CouponTypeDetailsModal;
