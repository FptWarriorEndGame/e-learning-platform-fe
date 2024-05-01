import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Pagination, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetBlogCategoriesQuery } from './categoriesBlog.service';
import { startEditCategory } from './categoriesBlog.slice';
import AddCategoriesBlog from './components/AddCategoriesBlog';
import CategoriesBlogList from './components/CategoriesBlogList';

const { Search } = Input;
const { Option } = Select;

type ParamsType = {
  _q: string;
  _page: number;
  _limit: number;
  _status?: string;
};

const BlogCategories = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 99999,
    _page: 1,
    _q: ''
  });

  const { data: categoriesResponse, isFetching: isFetchingCategories } = useGetBlogCategoriesQuery(params);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSearchHandler = (value: string) => {
    setParams((prevParams) => {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        return {
          ...prevParams,
          _q: trimmedValue,
          _page: 1
        };
      } else {
        return {
          ...prevParams,
          _q: '',
          _page: prevParams._page
        };
      }
    });
  };

  const filterStatusHandler = (value: string) => {
    setParams((prevParams) => {
      return {
        ...prevParams,
        _status: value
      };
    });
  };

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const categoryEditHandler = (categoryId: string) => {
    dispatch(startEditCategory(categoryId));
    setOpen(true);
  };

  const newCategoryHandler = () => {
    dispatch(startEditCategory(''));
    setOpen(true);
  };

  return (
    <div className='blog-categories'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Blog'
            },
            {
              title: <Link to='#'>Blog Category</Link>
            }
          ]}
        />
      </div>
      <div className='blog-categories__wrap'>
        <div className='blog-categories__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newCategoryHandler} type='primary' icon={<PlusOutlined />} className='btn-wrap'>
              New Category
            </Button>
            <Search
              placeholder='Search categories'
              onSearch={onSearchHandler}
              style={{ width: 200 }}
              className='search-wrap'
            />
            {/* Thêm Select để lọc theo trạng thái */}
            <Select defaultValue='all' style={{ width: 120 }} onChange={filterStatusHandler}>
              <Option value='all'>All</Option>
              <Option value='active'>Active</Option>
              <Option value='inactive'>Inactive</Option>
            </Select>
          </Space>
        </div>
        <div className='blog-categories__content mt-4'>
          {isFetchingCategories ? (
            <Skeleton />
          ) : (
            <CategoriesBlogList onCategoryEdit={categoryEditHandler} data={categoriesResponse?.blogsCategories || []} />
          )}
        </div>
      </div>
      <AddCategoriesBlog isOpen={open} onClose={closeDrawerHandler} />
    </div>
  );
};

export default BlogCategories;
