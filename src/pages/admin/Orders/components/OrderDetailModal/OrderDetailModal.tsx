import React from 'react';
import { Modal, Spin, List, Avatar } from 'antd';
import { useGetOrderQuery } from '../../order.service';
import './OrderDetailModal.scss';

interface OrderDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isVisible, onClose, orderId }) => {
  const { data, isLoading } = useGetOrderQuery(orderId);

  return (
    <Modal className="order-detail-modal" title="Order Details" open={isVisible} onCancel={onClose} footer={null}>
      {isLoading ? (
        <Spin />
      ) : (
        <div className="order-detail-content">
          <p className="order-detail-info">
            <span className="info-label">Customer Name:</span> {data?.order.user.name}
          </p>
          <p className="order-detail-info">
            <span className="info-label">Email:</span> {data?.order.user.email}
          </p>
          <p className="order-detail-info">
            <span className="info-label">Payment Method:</span> {data?.order.transaction.method}
          </p>
          <p className="order-detail-info">
            <span className="info-label">Notes:</span> {data?.order.note}
          </p>
          <p className="order-detail-info">
            <span className="info-label">Total Price:</span> ${data?.order.totalPrice}
          </p>
          <p className="order-detail-info">
            <span className="info-label">Status:</span> {data?.order.status}
          </p>

          <List
            className="order-detail-list"
            itemLayout="horizontal"
            dataSource={data?.order.items}
            renderItem={item => (
              <List.Item className="order-detail-item">
                <List.Item.Meta
                  className="order-detail-meta"
                  avatar={<Avatar src={item.thumbnail} />}
                  title={item.name}
                  description={<span className="item-price">Price: ${item.finalPrice !== undefined ? item.finalPrice : 'N/A'}</span>}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </Modal>
  );
};

export default OrderDetailModal;
