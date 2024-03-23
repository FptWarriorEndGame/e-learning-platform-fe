import React from 'react';
import { Modal, Typography, List, Image, Spin } from 'antd';
import moment from 'moment';
import { useGetCouponByIdQuery } from '../coupon.service';
import './CouponDetailsModal.scss';

const { Text } = Typography;

interface CouponDetailsModalProps {
  couponId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CouponDetailsModal: React.FC<CouponDetailsModalProps> = ({ couponId, isOpen, onClose }) => {
  const { data, isFetching } = useGetCouponByIdQuery(couponId);

  if (isFetching || !data) {
    return (
      <Modal className='coupon-details-modal' title='Coupon Details' open={isOpen} onCancel={onClose} footer={null}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spin size='large' />
        </div>
      </Modal>
    );
  }

  const formattedCreatedAt = moment(data.coupon.createdAt).format('YYYY-MM-DD HH:mm:ss');
  const formattedUpdatedAt = moment(data.coupon.updatedAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <Modal className='coupon-details-modal' title='Coupon Details' open={isOpen} onCancel={onClose} footer={null}>
      <div className='coupon-details'>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Coupon ID:</Text>
          <Text>{data.coupon._id}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Coupon Code:</Text>
          <Text>{data.coupon.code}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Coupon Type:</Text>
          <Text>
            {typeof data.coupon.couponTypeId === 'string'
              ? data.coupon.couponTypeId
              : data.coupon.couponTypeId?.name ?? 'N/A'}
          </Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Description:</Text>
          <Text style={{ maxWidth: '350px' }}>{data.coupon.description}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Discount Amount:</Text>
          <Text>{data.coupon.discountAmount}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Start Date:</Text>
          <Text>{moment(data.coupon.dateStart).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>End Date:</Text>
          <Text>{moment(data.coupon.dateEnd).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Status:</Text>
          <Text>{data.coupon.isDeleted ? 'Inactive' : 'Active'}</Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Created By:</Text>
          <Text>
            {typeof data.coupon.createdBy === 'string' ? data.coupon.createdBy : data.coupon.createdBy?.name ?? 'N/A'}
          </Text>
        </div>
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Created At:</Text>
          <Text>{formattedCreatedAt}</Text>
        </div>
        {data.coupon.updatedBy && (
          <div className='coupon-details__section'>
            <Text className='coupon-details__label'>Updated By:</Text>
            <Text>
              {typeof data.coupon.updatedBy === 'string' ? data.coupon.updatedBy : data.coupon.updatedBy?.name ?? 'N/A'}
            </Text>
          </div>
        )}
        <div className='coupon-details__section'>
          <Text className='coupon-details__label'>Updated At:</Text>
          <Text>{formattedUpdatedAt}</Text>
        </div>
        <div className='coupon-details__section'>
          <List
            dataSource={data.couponCourses}
            renderItem={(item) => (
              <List.Item>
                <div className='coupon-details__course'>
                  <Image
                    className='coupon-details__course__thumbnail'
                    width={80}
                    height={80}
                    src={item.courseId?.thumbnail}
                    alt='course thumbnail'
                  />
                  <div className='coupon-details__course__info'>
                    <Text className='coupon-details__course__name'>{item.courseId?.name ?? 'N/A'}</Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CouponDetailsModal;
