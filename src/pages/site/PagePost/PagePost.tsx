import { Button, Card, Col, Input, Pagination, Row, Select } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeSinceRead } from '../../../utils/functions';
import { useGetAllBlogsQuery } from '../client.service';
import CustomCard from './components/CustomCard';
import PostTitle from './components/PostTitle';
import { RedoOutlined } from '@ant-design/icons';

const { Option } = Select;

type ParamsType = {
  _q: string;
  _page: number;
  _limit: number;
  _status?: string;
  categoryId?: string;
  tags?: string;
  author?: string;
  title?: string;
};

const PagePost = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 10,
    _page: 1,
    _q: '',
    tags: undefined,
    author: '',
    title: '',
    categoryId: ''
  });

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllBlogsQuery(params);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const handlePageChange = (page: number) => {
    setPage(page);
    setParams((prev) => ({ ...prev, _page: page }));
  };

  const handleAuthorChange = (author: string) => {
    setParams((prev) => ({ ...prev, author, _page: 1 }));
  };

  const resetSelection = () => {
    setParams({
      _limit: 10,
      _page: 1,
      _q: '',
      tags: undefined,
      author: '',
      title: '',
      categoryId: ''
    });
    setPage(1);
    setSelectedAuthor('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleCategoryClick = (categoryId: string) => {
    setParams((prev) => ({ ...prev, categoryId, _page: 1 }));
  };

  const uniqueCategories = data?.blogs.reduce<Record<string, string>>((acc, current) => {
    acc[current.categoryId._id] = current.categoryId.name;
    return acc;
  }, {});

  return (
    <div className='mt-36 mb-8'>
      <div className='container flex justify-end'>
        <Input
          placeholder='Search by title'
          onChange={handleTitleChange}
          value={params.title}
          style={{ marginBottom: '10px', width: '16%', marginRight: '10px' }}
        />
        <Select
          placeholder='Search by author'
          onChange={handleAuthorChange}
          style={{ marginBottom: '10px', width: '16%', marginRight: '10px' }}
        >
          {data?.blogs.map((blog) => (
            <Option key={blog.author} value={blog.author}>
              {blog.author}
            </Option>
          ))}
        </Select>
        <Button onClick={resetSelection}>
          <RedoOutlined />
        </Button>
      </div>
      <div className='container mx-auto px-4 pb-20'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={18} xl={18} className='max-h-full relative'>
            <div className='flex'>
              <PostTitle
                title='Featured article'
                content='Collection of articles sharing experiences in self-learning online programming and web programming techniques.'
              />
            </div>

            {data?.blogs.map((blog) => (
              <Link to={`/blog-detail/${blog._id}`}>
                <CustomCard
                  key={blog._id}
                  blogImg={blog.blogImg}
                  author={blog.userId?.name}
                  content={blog.content}
                  technology={blog.technology}
                  readTime={blog.createdAt ? calculateTimeSinceRead(new Date(blog.createdAt)) : 'Unknown'}
                  title={blog.title}
                />
              </Link>
            ))}
            <div className='w-full text-center mt-14'>
              <Pagination
                current={page}
                onChange={handlePageChange}
                total={data?.totalPages ? data.totalPages * params._limit : 0}
                pageSize={params._limit}
                showSizeChanger={false}
              />
            </div>
          </Col>
          <Col xs={0} sm={0} md={8} lg={6} xl={6} className='max-h-full'>
            <div className='suggetested_Topic'>
              <div className='text-gray-500 text-1xl mb-4 mt-36 ml-10'>
                {uniqueCategories &&
                  Object.entries(uniqueCategories).map(([id, name]) => (
                    <span
                      key={id}
                      className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer inline-block m-3'
                      onClick={() => handleCategoryClick(id)}
                    >
                      {name}
                    </span>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PagePost;
