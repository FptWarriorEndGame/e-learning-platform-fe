/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Input, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
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

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [authorSearch, setAuthorSearch] = useState('');
  const [tagsSearch, setTagsSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState(''); 

  const {
    data: blogsData,
    isFetching: isFetchingBlogs,
    refetch
  } = useGetBlogsQuery({
    _q: searchTerm,
    _page: currentPage,
    _limit: pageSize,
    _author: authorSearch,
    _status: statusFilter,
    _tags: tagsSearch,
    categoryId: categorySearch
  });
  useEffect(() => {
    refetch();
  }, [searchTerm, statusFilter, authorSearch, tagsSearch, categorySearch]);

  const { data: categoriesResponse, isFetching: isFetchingCategories } = useGetBlogCategoriesQuery({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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

  const onSearchHandler = (value: string) => {
    refetch();
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const onSearchAuthorHandler = (value: string) => {
    refetch();
    setAuthorSearch(value);
    setCurrentPage(1);
  };

  const filterStatusHandler = (value: string) => {
    refetch();
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const onCategoryChangeHandler = (value: string) => {
    refetch();
    setCategorySearch(value);
    setCurrentPage(1);
  };

  const onTagClick = (value: string) => {
    refetch();
    setTagsSearch(value);
    setCurrentPage(1);
  };

  const resetParams = () => {
    refetch();
    setSearchTerm('');
    setAuthorSearch('');
    setCategorySearch('');
    setTagsSearch('');
    setStatusFilter('all');
    setCurrentPage(1);
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
              <Option value=''>All Categories</Option>
              {categoriesResponse?.blogsCategories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Button onClick={resetParams} type='default' className='btn-wrap'>
              <UndoOutlined />
            </Button>
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
