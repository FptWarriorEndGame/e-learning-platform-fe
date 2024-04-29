/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Button, message, Space, Table, notification, Popconfirm } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { useState } from 'react';
import './CategoriesList.scss';
import { EditOutlined, EllipsisOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import { useDispatch } from 'react-redux';
import { ICategory } from '../../../../../types/category.type';
import { CategoryError } from '../../../../../utils/errorHelpers';
import { useDeleteCategoryMutation, useUpdateActiveStatusCategoryMutation } from '../../category.service';
import { startEditCategory } from '../../category.slice';
import moment from 'moment';
import { Helper } from '../../../../../utils/helper';

interface DataCategoryType {
  key: React.Key;
  name: any;
  courses: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  description: any;
  actions?: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface CategoryListProps {
  data: ICategory[];
  onCateEdit: (cateId: string) => void;
  permission: { isEdit: boolean; isDelete: boolean; isViewDetail: boolean };
}
const SettingContent = (cateId: string) => {
  const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();

  const deleteCateHandler = () => {
    deleteCategory(cateId)
      .unwrap()
      .then((result) => {
        notification.success({
          message: 'Delete cate successfully',
          description: result.message
        });
      })
      .catch((error: CategoryError) => {
        notification.error({
          message: 'Delete cate failed',
          description: error.data.message
        });
      });
  };

  return (
    // More action here!
    // Xoá mềm (cập nhật trạng thái)
    // Xem chi tiết (popup)
    <div>
      <p>Content</p>
      <div>
        {' '}
        <Link onClick={deleteCateHandler}>Delete</Link>{' '}
      </div>
      <div>
        {' '}
        <Link>View Detail</Link>{' '}
      </div>
    </div>
  );
};

const CategoriesList: React.FC<CategoryListProps> = (props) => {
  const [open, setOpen] = useState(false);

  const [updateActiveStatusCategory] = useUpdateActiveStatusCategoryMutation();

  const dispatch = useDispatch();

  // Create permission section
  const helper = new Helper();
  const CourseCategory = helper.getRole.CourseCategory;
  // GET AUTHORIZATION BY EACH EMPLOYEE
  // List Permission here!
  const isView = helper.checkPermission(CourseCategory?.View?.code);
  const isCreate = helper.checkPermission(CourseCategory?.Create?.code);
  const isEdit = helper.checkPermission(CourseCategory?.Edit?.code);
  const isViewDetail = helper.checkPermission(CourseCategory?.Detail?.code);
  const isDelete = helper.checkPermission(CourseCategory?.Delete?.code);

  const columns: ColumnsType<DataCategoryType> = [
    {
      title: 'Category',
      dataIndex: 'name',
      width: '20%'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: (value: string) => <div className='txt-desc'>{moment(value).format('YYYY-MM-DD HH:mm:ss') || ''}</div>
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      sorter: (a, b) => Number(a.courses) - Number(b.courses),
      render: (value: number) => <div className='txt-desc'>{value}</div>
    },
    {
      title: 'Manage',
      dataIndex: 'actions'
    }
  ];

  const cateEditHandler = (cateId: string) => {
    props.onCateEdit(cateId);
    dispatch(startEditCategory(cateId));
  };

  const handleUpdateStatus = (categoryId: string) => {
    updateActiveStatusCategory({ categoryId })
      .unwrap()
      .then(() => {
        void message.success('Category status updated successfully');
      })
      .catch(() => {
        void message.error('Failed to update Category status');
      });
  };

  const categoriesSource = props.data.map((cateItem) => {
    const { _id, name, cateImage, cateSlug, description, createdAt, courses, isDeleted } = cateItem;

    const categoryTemplateItem: DataCategoryType = {
      key: _id,
      name: (
        <a href='#'>
          <div className='category-info'>
            <img alt='' src={cateImage as string} className='category-info__avatar' />

            <div className='category-info__content'>
              <div className='category-info__name txt-tt'>{name}</div>
            </div>
          </div>
        </a>
      ),
      description: <div className='txt-desc'>{description}</div>,
      createdAt: createdAt ?? ('' as string),
      courses: courses || 0,
      actions: (
        <Space size='small'>
          {props.permission.isEdit && (
            <Button icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => cateEditHandler(_id)} />
          )}
          {isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this category?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(_id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this category?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(_id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<StopOutlined style={{ color: '#ff4d4f' }} />} danger />
            </Popconfirm>
          )}
        </Space>
      )
    };

    return categoryTemplateItem;
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataCategoryType>['onChange'] = (pagination, filters, sorter, extra) => {
    setTableParams({
      pagination
    });
  };

  return (
    <div className='users-list'>
      <Table
        columns={columns}
        dataSource={categoriesSource}
        onChange={onChange}
        pagination={tableParams.pagination}
        scroll={{ y: 820 }}
      />
    </div>
  );
};

export default CategoriesList;
