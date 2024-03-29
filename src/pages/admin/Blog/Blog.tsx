import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Skeleton, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startEditBlog } from './blog.slice';
import AddBlog from './Components/AddBlog/AddBlog';
import BlogListDetail from './Components/BlogList/BlogList';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from './blog.service';
import { useGetBlogCategoriesQuery } from '../BlogCategories/categoriesBlog.service';

const { Search } = Input;
const { Option } = Select;

type ParamsType = {
  _q: string;
  _page: number;
  _limit: number;
  _status?: string;
  categoryId?: string;
  tags?: string;
};

const Blogs = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 10,
    _page: 1,
    _q: '',
    tags: undefined
  });

  const { data: blogsData, isFetching: isFetchingBlogs } = useGetBlogsQuery(params);
  const { data: categoriesResponse, isFetching: isFetchingCategories } = useGetBlogCategoriesQuery(params);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onTagClick = (tags: string) => {
    if (tags === '') {
      setParams((prevParams) => ({
        ...prevParams,
        _page: 1, // Trở lại trang đầu tiên
        tags: undefined // Loại bỏ bộ lọc tags
      }));
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        _page: 1, // Trở lại trang đầu tiên
        tags: tags // Cập nhật bộ lọc tag
      }));
    }
  };

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
        _status: value !== 'all' ? value : undefined // Gửi 'active' hoặc 'inactive', loại bỏ nếu chọn 'all'
      };
    });
  };

  const onSearchAuthorHandler = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, author: value.trim(), _page: 1 }));
  };

  const blogEditHandler = (blogId: string) => {
    dispatch(startEditBlog(blogId));
    setOpen(true);
  };

  const newBlogHandler = () => {
    dispatch(startEditBlog(''));
    setOpen(true);
  };

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const onCategoryChangeHandler = (value: string) => {
    setParams((prevParams) => {
      if (value !== 'All') {
        return {
          ...prevParams,
          categoryId: value,
          _page: 1
        };
      } else {
        return {
          ...prevParams,
          categoryId: '',
          _page: 1
        };
      }
    });
  };

  return (
    <div className='blogs'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Blog'
            },
            {
              title: <Link to='#'>Blog List</Link>
            }
          ]}
        />
      </div>
      <div className='blogs__wrap'>
        <div className='blogs__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newBlogHandler} type='primary' icon={<PlusOutlined />} className='btn-wrap'>
              New Blog
            </Button>
            <Search
              placeholder='Search blog'
              onSearch={onSearchHandler}
              style={{ width: 200 }}
              className='search-wrap'
            />
            <Search
              placeholder='Search author'
              onSearch={onSearchAuthorHandler}
              style={{ width: 200 }}
              className='search-wrap'
            />
            <Select defaultValue='all' style={{ width: 120 }} onChange={filterStatusHandler}>
              <Option value='all'>All</Option>
              <Option value='active'>Active</Option>
              <Option value='inactive'>Inactive</Option>
            </Select>
            <Select
              defaultValue='All'
              style={{ width: 200 }}
              onChange={onCategoryChangeHandler}
              placeholder='Select a category'
            >
              <Option value='All'>All Categories</Option>
              {categoriesResponse?.blogsCategories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Space>
        </div>
        <div className='blogs__show-result'></div>
        <div className='blogs__content'>
          {isFetchingBlogs ? (
            <Skeleton />
          ) : (
            <BlogListDetail
              onBlogEdit={blogEditHandler}
              data={blogsData?.blogs || []}
              categories={categoriesResponse?.blogsCategories || []}
              htmlContent={''}
              onTagClick={onTagClick}
            />
          )}
        </div>
      </div>
      <AddBlog isOpen={open} onClose={closeDrawerHandler} categories={categoriesResponse?.blogsCategories || []} />
    </div>
  );
};

export default Blogs;
