/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCategoriesQuery, useGetCategoriesQuery } from './category.service';
import { startEditCategory } from './category.slice';
import CategoriesList from './components/CategoriesList';
import CreateCategory from './components/CreateCategory';
import { RootState } from '../../../store/store';
import { Helper } from '../../../utils/helper';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './Categories.scss';

const { Search } = Input;

const Categories = () => {
  const [params, setParams] = useState({
    _limit: 12,
    _page: 12,
    _q: '',
    _cateName: ''
  });

  const { data, isFetching } = useGetCategoriesQuery(params);
  const { data: allCateData, isFetching: isAllCateFetching } = useGetAllCategoriesQuery();
  const [open, setOpen] = useState(false);

  const helper = new Helper();
  const CourseCategory = helper.getRole.CourseCategory;
  // GET AUTHORIZATION BY EACH EMPLOYEE
  // List Permission here!
  const isView = helper.checkPermission(CourseCategory?.View?.code);
  const isCreate = helper.checkPermission(CourseCategory?.Create?.code);
  const isEdit = helper.checkPermission(CourseCategory?.Edit?.code);
  const isViewDetail = helper.checkPermission(CourseCategory?.Detail?.code);
  const isDelete = helper.checkPermission(CourseCategory?.Delete?.code);

  const cateFilterList =
    allCateData?.categories.map((cate) => {
      return {
        value: cate.name,
        label: cate.name
      };
    }) || [];

  cateFilterList.unshift({
    value: 'all',
    label: 'All Categories'
  });

  const dispatch = useDispatch();
  const onSearchHandler = (value: string) => {
    setParams({ ...params, _q: value });
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  const cateEditHandler = (cateId: string) => {
    if (isEdit) {
      setOpen(true);
    }
  };

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const newCategoryHandler = () => {
    dispatch(startEditCategory(''));
    setOpen(true);
  };

  const cateFilterHandler = (value: string) => {
    setParams({ ...params, _cateName: value });
  };

  if (!isView) return <div>You don't have permission</div>;

  return (
    <div className='categories'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Categories'
            },
            {
              title: <Link to='#'>Categories</Link>
            }
            
          ]}
        />
      </div>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
            {isCreate && (
              <Button onClick={newCategoryHandler} type='primary' icon={<PlusOutlined />}>
                New Category
              </Button>
            )}
            <Search placeholder='Search categories' onSearch={onSearchHandler} style={{ width: 200 }} />

            <Select
              size='middle'
              placeholder='Please select your category'
              defaultValue={'All Categories'}
              onChange={cateFilterHandler}
              style={{ width: '240px' }}
              options={cateFilterList}
            />
          </Space>
        </div>
        <div className='users__show-result'></div>
        <div className='users__content'>
          {isFetching ? (
            <Skeleton />
          ) : (
            <CategoriesList
              permission={{ isEdit, isDelete, isViewDetail }}
              onCateEdit={cateEditHandler}
              data={data?.categories || []}
            />
          )}
        </div>
      </div>
      <CreateCategory isOpen={open} onClose={closeDrawerHandler} />
    </div>
  );
};

export default Categories;
