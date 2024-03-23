import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../client.service';
import { Table, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './InvoicePage.scss';

interface DataType {
  key?: React.Key;
  name?: string;
  createdAt?: string;
  finalPrice?: number;
  quantity: number;
}

type Params = { [key: string]: string | undefined };

const InvoicePage: React.FC = () => {
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
      title: 'Ordered On',
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
      title: 'Unit Price',
      dataIndex: 'finalPrice',
      key: 'finalPrice',
      render: (text: number) => `$${text.toLocaleString()}`,
      responsive: ['sm']
    },
    {
      title: 'Total Amount',
      dataIndex: 'finalPrice',
      key: 'amount',
      render: (text: number) => `$${(text * 1).toLocaleString()}`,
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
    <div className='invoice-page__table-footer'>
      <p>VAT: ${orderDetails.order.vatFee}</p>
      <p>Total Due: ${orderDetails.order.totalPrice}</p>
    </div>
  );

  return (
    <div className='invoice-page'>
      <div className='container'>
        <Button
          type='primary'
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className='receipt-page__back-button'
        >
          Back to Previous Page
        </Button>
        <div className='invoice-page__header'>
          <div className='invoice-page__logo'>
            <img src='https://i.imgur.com/NZj5m3U.png' alt='E-Leaning' className='invoice-page__logo-img' />
          </div>
          <div className='invoice-page__info'>
            <h2 className='invoice-page__title'>Invoice</h2>
            <br />
            <p>
              <strong>Order #:</strong> {orderDetails.order._id}
            </p>
            <br />
            <p>
              <strong>Invoice date:</strong> {formatDate(orderDetails.order.createdAt || '')}
            </p>
            <br />
            <p>
              <strong>Place:</strong> 600 Harrison St, San Francisco, CA
            </p>
          </div>
        </div>
        <div className='invoice-page__bottom'>
          <hr />
          <div className='invoice-page__provided'>
            <div className='invoice-page__provided-by'>
              <h3 className='invoice-page__provided-title'>Provided by:</h3>
              <p>E-Leaning</p>
              <p>600 Harrison St</p>
              <p>San Francisco, CA 94107</p>
              <p>US</p>
              <p>VAT #: 686868686868</p>
            </div>
            <div className='invoice-page__provided-to'>
              <h3 className='invoice-page__provided-title'>Provided to:</h3>
              <p>{orderDetails.order.user.name}</p>
            </div>
          </div>
        </div>
        <Table
          className='invoice-page__table'
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          footer={footerTable}
        />
      </div>
    </div>
  );
};

export default InvoicePage;
