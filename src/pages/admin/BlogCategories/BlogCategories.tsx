import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startEditCategory } from './categoriesBlog.slice';
import AddCategoriesBlog from './components/AddCategoriesBlog';
import CategoriesBlogList from './components/CategoriesBlogList';
import { useGetCategoriesQuery } from './categoriesBlog.service';

const { Search } = Input;

type ParamsType = {
  _limit: number;
  _page: number;
  _q: string;
};

const BlogCategories = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 10,
    _page: 1,
    _q: ''
  });

  const { data: categoriesResponse, isFetching: isFetchingCategories } = useGetCategoriesQuery(params);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSearchHandler = (value: string) => {
    setParams({ ...params, _q: value });
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
      <div className='blog-categories__wrap'>
        <div className='blog-categories__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newCategoryHandler} type='primary' icon={<PlusOutlined />}>
              New Category
            </Button>
            <Search placeholder='Search categories' onSearch={onSearchHandler} style={{ width: 200 }} />
          </Space>
        </div>
        <div className='blog-categories__content'>
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
