import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../client.service';
import { Table, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './ReceiptPage.scss';

interface DataType {
  key?: React.Key;
  name?: string;
  createdAt?: string;
  finalPrice?: number;
  quantity: number;
}

type Params = { [key: string]: string | undefined };

const ReceiptPage: React.FC = () => {
  const { orderId } = useParams<Params>();
  const { data: orderDetails } = useGetOrderByIdQuery(orderId || '');
  const navigate = useNavigate();

  if (!orderDetails) {
    return;
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ordered',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => formatDate(text),
      responsive: ['md']
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: () => 1
    },
    {
      title: 'Price',
      dataIndex: 'finalPrice',
      key: 'finalPrice',
      render: (text: number) => `$${text.toLocaleString()}`,
      responsive: ['sm']
    },
    {
      title: 'Amount',
      dataIndex: 'finalPrice',
      key: 'amount',
      render: (text: number) => `$${text.toLocaleString()}`,
      responsive: ['lg']
    }
  ];

  const dataSource: DataType[] = orderDetails.order.items.map((item) => ({
    key: item._id,
    name: item.name,
    createdAt: orderDetails.order.createdAt,
    finalPrice: item.finalPrice,
    quantity: 1
  }));

  const footerTable = () => (
    <div className='receipt-page__table__footer'>
      <p>Tax*: ${orderDetails.order.vatFee}</p>
      <p>Total Paid: ${orderDetails.order.totalPrice}</p>
    </div>
  );

  return (
    <div className='receipt-page'>
      <div className='container'>
        <Button
          type='primary'
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className='receipt-page__back-button'
        >
          Back to Previous Page
        </Button>
        <h2 className='receipt-page__title'>Receipt</h2>
        <div className='receipt-page__date-title'>Receipt - {formatDate(orderDetails.order.createdAt || '')}</div>
        <p className='receipt-page__company-name'>E-Leaning, Inc.</p>
        <div className='receipt-page__info'>
          <div className='receipt-page__company'>
            <p className='receipt-page__company-address'>600 Harrison Street, 3rd Floor</p>
            <p className='receipt-page__company-city'>San Francisco, CA 94107, US</p>
            <p className='receipt-page__company-city'>elearning.com</p>
          </div>
          <div className='receipt-page__order'>
            <p className='receipt-page__date'>
              <strong>Date:</strong> {formatDate(orderDetails.order.createdAt || '')}
            </p>
            <p className='receipt-page__order-number'>
              <strong>Order #:</strong> {orderDetails.order._id}
            </p>
          </div>
        </div>
        <p className='receipt-page__sold-to'>
          <strong>Sold To:</strong> {orderDetails.order.user.name}
        </p>
        <Table
          className='receipt-page__table'
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          footer={footerTable}
        />
        <div className='receipt-page__tax-note'>
          <p className='receipt-page__tax-note-item'>
            *For any users charged VAT, the Tax amount is calculated on the Subtotal, not the Total Amount.
          </p>
          <p className='receipt-page__tax-note-item'>
            If you have any questions about this receipt please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
