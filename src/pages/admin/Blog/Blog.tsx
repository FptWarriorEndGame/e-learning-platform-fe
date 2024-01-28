import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startEditBlog } from './blog.slice';
import { useGetAllBlogsQuery, useGetBlogsQuery } from './blog.service';
import AddBlog from './Components/AddBlog/AddBlog';
import BlogListDetail from './Components/BlogList/BlogList';

const { Search } = Input;

type ParamsType = {
  _limit: number;
  _page: number;
  _q: string;
  _blogName?: string;
};

const Blogs = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 10,
    _page: 1,
    _q: ''
  });

  const { data, isFetching } = useGetBlogsQuery(params);
  const { data: allBlogsData, isFetching: isAllBlogsFetching } = useGetAllBlogsQuery();
  const [open, setOpen] = useState(false);

  const blogFilterList =
    allBlogsData?.blogs.map((blog) => {
      return {
        value: blog.author,
        label: blog.author
      };
    }) || [];

  blogFilterList.unshift({
    value: 'all',
    label: 'All Blogs'
  });

  const dispatch = useDispatch();

  const onSearchHandler = (value: string) => {
    console.log(value);
    setParams({ ...params, _q: value });
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  const blogEditHandler = (blogId: string) => {
    setOpen(true);
  };

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const newBlogHandler = () => {
    dispatch(startEditBlog(''));
    setOpen(true);
  };

  const blogFilterHandler = (value: string) => {
    console.log('value: ', value);
    setParams({ ...params, _blogName: value });
  };

  return (
    <div className='blogs'>
      <div className='blogs__wrap'>
        <div className='blogs__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newBlogHandler} type='primary' icon={<PlusOutlined />}>
              New Blog
            </Button>
            <Search placeholder='Search blogs' onSearch={onSearchHandler} style={{ width: 200 }} />

            <Select
              size='middle'
              placeholder='Please select a authors'
              defaultValue={'All authors'}
              onChange={blogFilterHandler}
              style={{ width: '240px' }}
              options={blogFilterList}
            />
          </Space>
        </div>
        <div className='blogs__show-result'></div>
        <div className='blogs__content'>
          {isFetching ? <Skeleton /> : <BlogListDetail onBlogEdit={blogEditHandler} data={data?.blogs || []} />}
        </div>
      </div>
      <AddBlog isOpen={open} onClose={closeDrawerHandler} />
    </div>
  );
};

export default Blogs;
