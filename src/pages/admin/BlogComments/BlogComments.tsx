import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startEditBlog } from '../Blog/blog.slice';
import ListComments from './components/ListComments';
import { useGetBlogCommentsQuery } from './blogComments.service';
import { useGetBlogsQuery } from '../Blog/blog.service';
import AddBlogComments from './components/AddBlogComments';

const { Search } = Input;
const { Option } = Select;

type ParamsType = {
  _q: string;
  _page: number;
  _limit: number;
  _status?: string;
};

const BlogComments = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 99999,
    _page: 1,
    _q: ''
  });

  const { data: blogCommentsResponse, isFetching: isFetchingblogComments } = useGetBlogCommentsQuery(params);

  const { data: blog, isFetching: isFetchingblog } = useGetBlogsQuery(params);

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

  const BlogCommentsEditHandler = (commentId: string) => {
    dispatch(startEditBlog(commentId));
    setOpen(true);
  };

  const newCategoryHandler = () => {
    dispatch(startEditBlog(''));
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
              title: <Link to='#'>Blog Comments</Link>
            }
          ]}
        />
      </div>
      <div className='blog-categories__wrap'>
        <div className='blog-categories__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newCategoryHandler} type='primary' icon={<PlusOutlined />} className='btn-wrap'>
              New Blog Comments
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
        <div className='blog-categories__content mt-8'>
          {isFetchingblogComments ? (
            <Skeleton />
          ) : (
            <ListComments
              onBlogCommentsEdit={BlogCommentsEditHandler}
              data={blogCommentsResponse?.comments || []}
              blog={blog?.blogs || []}
            />
          )}
        </div>
      </div>
      <AddBlogComments isOpen={open} onClose={closeDrawerHandler} blog={blog?.blogs || []} />
    </div>
  );
};

export default BlogComments;
