import React, { useState, useMemo } from 'react';
import { useGetSubscribesQuery } from './SubscribeEmail.service';
import { Table, Input } from 'antd';
import { ISubscribe } from '../../../types/subscribe.type';
import { transformDate } from '../../../utils/functions';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const SubscribeEmail = () => {
  const { Search } = Input;
  const [searchText, setSearchText] = useState('');
  const { data: subscribeResponse, isFetching: isFetchingSubscribe } = useGetSubscribesQuery();

  const filteredData = useMemo(() => {
    if (!searchText) return subscribeResponse?.subscribe;
    return subscribeResponse?.subscribe.filter(item =>
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, subscribeResponse]);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string | Date) => transformDate(createdAt ? createdAt : new Date().toISOString()),
    },
  ];

  return (
    <div>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Subscribe Email'
            },
            {
              title: <Link to='#'>Subscribe Email</Link>
            }
          ]}
        />
      </div>
      <Search
        placeholder="Search by email"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={value => setSearchText(value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'min-content' }}
        loading={isFetchingSubscribe}
      />
    </div>
  );
};

export default SubscribeEmail;