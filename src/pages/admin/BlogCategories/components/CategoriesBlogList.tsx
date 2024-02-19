import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Modal, Popover, Space, Table, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import Link from 'antd/es/typography/Link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ICategoryBlogs } from '../../../../types/categoryBlogs.type';
import { BlogsCategoryError } from '../../../../utils/helpers';
import { useDeleteCategoryMutation } from '../categoriesBlog.service';
import { startEditCategory } from '../categoriesBlog.slice';

interface DataCategoryType {
  key: React.Key;
  name: string;
  description: string;
  createdAt?: string;
  cateImage?: string;
  actions?: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface CategoryListProps {
  data: ICategoryBlogs[];
  onCategoryEdit: (BlogcategoryId: string) => void;
}

const SettingContent = (BlogcategoryId: string) => {
  const [softDeleteCategory] = useDeleteCategoryMutation();

  const softDeleteCategoryHandler = (categoryId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'Deleting this category will remove it permanently. This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk() {
        return new Promise((resolve, reject) => {
          softDeleteCategory(categoryId)
            .unwrap()
            .then(() => {
              notification.success({
                message: 'Category deleted successfully'
              });
              resolve(undefined);
            })
            .catch((error: BlogsCategoryError) => {
              console.error('error: ', error);
              notification.error({
                message: 'Failed to delete category'
              });
              reject(error);
            });
        });
      }
    });
  };

  return (
    <div>
      <p>Content</p>
      <Link onClick={() => softDeleteCategoryHandler(BlogcategoryId)}>Delete</Link>{' '}
    </div>
  );
};

const CategoriesBlogList: React.FC<CategoryListProps> = ({ data, onCategoryEdit }) => {
  const dispatch = useDispatch();

  const columns: ColumnsType<DataCategoryType> = [
    {
      title: 'Cate Image',
      dataIndex: 'cateImage',
      render: (text: string, record: DataCategoryType) => (
        <img
          className='rounded-full'
          src={record.cateImage}
          alt='cateImage'
          style={{ width: '50px', height: '50px' }}
        />
      ),
      key: 'cateImage'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Manage',
      dataIndex: 'actions',
      key: 'actions'
    }
  ];

  const categoryEditHandler = (categoryId: string) => {
    onCategoryEdit(categoryId);
    dispatch(startEditCategory(categoryId));
  };

  const categoriesSource = data.map((categoryItem) => {
    const { _id, cateImage, name, description, createdAt } = categoryItem;
    const categoryTemplateItem: DataCategoryType = {
      key: _id,
      cateImage,
      name,
      description,
      createdAt,
      actions: (
        <Space>
          <Button onClick={() => categoryEditHandler(_id)}>
            <EditOutlined />
          </Button>
          <Popover placement='bottomRight' content={() => SettingContent(_id)} title='Actions'>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Popover>
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
    console.log('params', pagination, filters, sorter, extra);
    setTableParams({
      pagination,
      ...filters
    });
  };

  return (
    <div className='categories-list'>
      <Table columns={columns} dataSource={categoriesSource} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CategoriesBlogList;
