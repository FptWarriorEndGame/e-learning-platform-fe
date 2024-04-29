import React, { useState } from 'react';
import { Input, Table, Pagination, Button } from 'antd';
import { useGetTransactionsQuery, TransactionResponse } from '../transaction.service';
import TransactionDetailsModal from '../TransactionDetailsModal/TransactionDetailsModal';
import './TransactionsTable.scss';
import { Breadcrumb } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
const { Search } = Input;

const TransactionsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionResponse | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, isFetching } = useGetTransactionsQuery({ _page: currentPage, _limit: pageSize, _q: searchTerm });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (transaction: TransactionResponse) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: ['user', 'name'],
      key: 'userName',
      ellipsis: true,
      sorter: (a: TransactionResponse, b: TransactionResponse) => a.user.name.localeCompare(b.user.name)
    },
    {
      title: 'Amount',
      dataIndex: ['transaction', 'amount'],
      key: 'amount',
      ellipsis: true,
      render: (amount: number) => `$${amount}`,
      sorter: (a: TransactionResponse, b: TransactionResponse) => a.transaction.amount - b.transaction.amount
    },
    {
      title: 'Method',
      dataIndex: ['transaction', 'method'],
      key: 'method',
      ellipsis: true,
      sorter: (a: TransactionResponse, b: TransactionResponse) =>
        a.transaction.method.localeCompare(b.transaction.method)
    },
    {
      title: 'Pay Date',
      dataIndex: ['transaction', 'payDate'],
      key: 'payDate',
      ellipsis: true,
      sorter: (a: TransactionResponse, b: TransactionResponse) =>
        moment(a.transaction.payDate).diff(moment(b.transaction.payDate)),
      render: (payDate: string) => moment(payDate).format('YYYY-MM-DD')
    },
    {
      title: 'Bank',
      dataIndex: ['transaction', 'bankCode'],
      key: 'bankCode',
      ellipsis: true,
      sorter: (a: TransactionResponse, b: TransactionResponse) =>
        a.transaction.bankCode.localeCompare(b.transaction.bankCode)
    },
    {
      title: 'Card Type',
      dataIndex: ['transaction', 'cardType'],
      key: 'cardType',
      ellipsis: true,
      sorter: (a: TransactionResponse, b: TransactionResponse) =>
        a.transaction.cardType.localeCompare(b.transaction.cardType)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: TransactionResponse, record: TransactionResponse) => (
        <Button onClick={() => handleViewDetails(record)}>View Details</Button>
      )
    }
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <div className='transactions-table'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Orders'
            },
            {
              title: <Link to='#'>Transactions</Link>
            }
          ]}
        />
      </div>
      <div className='search-bar'>
        <Search
          placeholder='Search by user name or email'
          onSearch={handleSearch}
          enterButton
          allowClear
          className='search-wrap'
        />
      </div>
      <Table
        dataSource={data?.transactions as TransactionResponse[]}
        columns={columns}
        rowKey='orderId'
        loading={isFetching}
        scroll={{ y: 800 }}
      />
      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
