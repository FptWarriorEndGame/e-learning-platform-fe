import React from 'react';
import { Modal, Typography } from 'antd';
import { TransactionResponse } from '../transaction.service';
import './TransactionDetailsModal.scss';

const { Text } = Typography;

interface TransactionDetailsModalProps {
  transaction: TransactionResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ transaction, isOpen, onClose }) => {
  return (
    <Modal
      className='transaction-details-modal'
      title='Transaction Details'
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {transaction ? (
        <div className='transaction-details'>
          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Order ID:</Text>
            <Text>{transaction.orderId}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>User ID:</Text>
            <Text>{transaction.user._id}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>User Name:</Text>
            <Text>{transaction.user.name}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Email:</Text>
            <Text>{transaction.user.email}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Method:</Text>
            <Text>{transaction.transaction.method}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Amount:</Text>
            <Text>${transaction.transaction.amount.toFixed(2)}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Bank Code:</Text>
            <Text>{transaction.transaction.bankCode}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Bank Transaction No:</Text>
            <Text>{transaction.transaction.bankTranNo}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Card Type:</Text>
            <Text>{transaction.transaction.cardType}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Pay Date:</Text>
            <Text>{new Date(transaction.transaction.payDate).toLocaleString()}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Order Info:</Text>
            <Text>{decodeURIComponent(transaction.transaction.orderInfo)}</Text>
          </div>

          <div className='transaction-details__section'>
            <Text className='transaction-details__label'>Transaction No:</Text>
            <Text>{transaction.transaction.transactionNo}</Text>
          </div>
        </div>
      ) : (
        <Text className='transaction-details__empty'>No transaction data available.</Text>
      )}
    </Modal>
  );
};

export default TransactionDetailsModal;
