import { Button, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useGetAuthorsQuery } from '../../../../site/client.service';
import { useGetCategoriesQuery } from '../../../Categories/category.service';
import { useGetAuthorReportsQuery } from '../../authorReport.service';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons';

enum Access {
  PAID = 'PAID',
  FREE = 'FREE',
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

interface DataCourseType {
  key: React.Key;
  courseName: string;
  learners: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  totalRevenue: number;
  actions?: any;
  render: (_: IAuthorReport, record: IAuthorReport) => JSX.Element
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface AuthorReportProps {
  data: DataCourseType[];
}

interface IAuthorReport {
  courseName: string;
  leanders: number;
  createdAt: string;
  totalRevenue: number;
  isDeleted?: boolean;
}

const AuthorReportList: React.FC<AuthorReportProps> = (props) => {
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const { data: dataList, isFetching } = useGetAuthorReportsQuery({ _q: '' });
  const { data: categoriesData, isFetching: isCategoriesFetching } = useGetCategoriesQuery({ _q: '' });
  const { data: authorsData, isFetching: isAuthorFetching } = useGetAuthorsQuery();

  if (dataList) {
    console.log(dataList, isFetching);
  }

  const columns: ColumnsType<DataCourseType> = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true
    },
    {
      title: 'learners',
      dataIndex: 'learners',
      key: 'learners',
      ellipsis: true
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IAuthorReport, record: IAuthorReport) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: IAuthorReport, record: IAuthorReport) => (
        <Space size='middle'>
          {/* <Button icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => handleUpdate(record._id)} />
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetails(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this coupon type?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this coupon type?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<StopOutlined style={{ color: '#ff4d4f' }} />} danger />
            </Popconfirm>
          )} */}
        </Space>
      )
    }
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataCourseType>['onChange'] = (pagination, filters, sorter, extra) => {

    setTableParams({
      pagination
    });
  };

  return (
    <div className='author-report-list'>
      <Table columns={columns} dataSource={props.data} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default AuthorReportList;
