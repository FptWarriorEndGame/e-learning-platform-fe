import { Modal, Table, Image, Button, Row, Col } from 'antd';
import { IOrderHistoryItem } from '../../../../../types/order.type';
import React, { useState } from 'react';
import { useCreateReviewMutation, useGetOrderByIdQuery } from '../../../client.service';
import CourseReviewModal from './CourseReviewModal/CourseReviewModal';
import styles from './OrderDetailsModal.module.scss';
import { message } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface OrderDetailsModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ orderId, isOpen, onClose }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewCourseId, setReviewCourseId] = useState<string | null>(null);
  const [reviewCourseInfo, setReviewCourseInfo] = useState<IOrderHistoryItem | null>(null);
  const [createReview] = useCreateReviewMutation();

  const { data: orderData } = useGetOrderByIdQuery(orderId || '', {
    skip: !isOpen || !orderId
  });

  if (!orderData) {
    return;
  }

  const order = orderData.order;

  const openReviewModal = (courseId: string) => {
    const courseInfo = order.items.find((item) => item._id === courseId) || null;

    setReviewCourseId(courseId);
    setReviewCourseInfo(courseInfo);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (courseId: string, rating: number, title: string, review: string) => {
    createReview({ courseId, title, content: review, ratingStar: rating, orderId: order._id, userId: order.user._id })
      .unwrap()
      .then(() => {
        void message.success('Review created successfully');
      })
      .catch(() => {
        void message.error('Error creating review');
      });
  };

  const dataSource = order.items.map((item) => ({
    key: item._id,
    name: item.name,
    thumbnail: <Image src={item.thumbnail} alt={item.name} />,
    finalPrice: `$${item.finalPrice || 0}`
  }));

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: {key: string, name: string}) => <Link to={`/courses/${record.key}`}>{record.name}</Link>
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail'
    },
    {
      title: 'Final Price',
      dataIndex: 'finalPrice',
      key: 'finalPrice'
    },
    {
      title: 'Review Product',
      dataIndex: 'key',
      key: 'key',
      render: (key: string) => {
        const item = order.items.find((item) => item._id === key);
        if (item && item.reviewed) {
          return (
            <Button size='small' disabled>
              Reviewed
            </Button>
          );
        } else {
          if (order.status !== 'Success') {
            return (
              <Button size='small' disabled>
                Reviewed
              </Button>
            );
          } else {
            return (
              <Button size='small' onClick={() => openReviewModal(key)}>
                Review
              </Button>
            );
          }
        }
      }
    }
  ];

  return (
    <Modal title='Order Details' open={isOpen} onCancel={onClose} footer={null} width={1000}>
      <Row gutter={20} className={styles.orderDetails}>
        <Col xs={24} lg={12} className={styles.orderDetails__info}>
          <div className={styles.orderDetails__item}>
            <strong>Order ID:</strong>
            <span>{order._id}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Customer Name:</strong>
            <span>{order.user.name}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Customer Email:</strong>
            <span>{order.user.email}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Created At:</strong>
            <span>{moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Total Price:</strong>
            <span>${order.totalPrice}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Transaction Method:</strong>
            <span>{order.transaction.method}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>VAT Fee:</strong>
            <span>${order.vatFee.toFixed(2)}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Customer Phone:</strong>
            <span>{order.user.phone}</span>
          </div>
          <div className={styles.orderDetails__item}>
            <strong>Status:</strong>
            <span>{order.status}</span>
          </div>
        </Col>
        <Col xs={24} lg={12} className={styles.orderDetails__productList}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Col>
      </Row>
      <CourseReviewModal
        courseId={reviewCourseId}
        courseInfo={reviewCourseInfo}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmit={handleReviewSubmit}
      />
    </Modal>
  );
};

export default OrderDetailsModal;