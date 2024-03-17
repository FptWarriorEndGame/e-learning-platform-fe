import { Button, Popover, Space, Table, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { useState } from 'react';
import './CategoriesList.scss';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import { useDispatch } from 'react-redux';
import { ICategory } from '../../../../../types/category.type';
import { CategoryError } from '../../../../../utils/errorHelpers';
import { useDeleteCategoryMutation } from '../../category.service';
import { startEditCategory } from '../../category.slice';
import moment from 'moment';

interface DataCategoryType {
  key: React.Key;
  name: any;
  courses: number;
  tags: string[];
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
  const dispatch = useDispatch();

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
      dataIndex: 'createdAt'
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      sorter: (a, b) => Number(a.courses) - Number(b.courses)
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

  const categoriesSource = props.data.map((cateItem) => {
    const { _id, name, cateImage, cateSlug, description, createdAt, courses } = cateItem;

    const categoryTemplateItem: DataCategoryType = {
      key: _id,
      name: (
        <a href='#'>
          <div className='category-info'>
            <img alt='' src={cateImage} className='category-info__avatar' />

            <div className='category-info__content'>
              <div className='category-info__name txt-tt'>{name}</div>
            </div>
          </div>
        </a>
      ),
      description: <div className='txt-desc'>{description}</div>,
      createdAt: <div className='txt-desc'>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss') || ''}</div>,
      courses:  <div className='txt-desc'>{courses || 0}</div>,
      actions: (
        <Space>
          {props.permission.isEdit && (
            <Button onClick={() => cateEditHandler(_id)}>
              <EditOutlined />
            </Button>
          )}
          <Popover placement='bottomRight' content={SettingContent(_id)} title='Actions'>
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
    setTableParams({
      pagination
    });
  };

  return (
    <div className='users-list'>
      <Table scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}  columns={columns} dataSource={categoriesSource} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CategoriesList;
