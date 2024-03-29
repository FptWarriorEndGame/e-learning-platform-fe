import { Col, Input, Row } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeSinceRead } from '../../../utils/functions';
import { useGetAllBlogsQuery } from '../client.service';
import CustomCard from './components/CustomCard';
import Panigation from './components/Panigation';
import PostTitle from './components/PostTitle';

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

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setParams((prev) => ({ ...prev, _page: page }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, author: e.target.value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleCategoryClick = (categoryId: string) => {
    setParams((prev) => ({ ...prev, categoryId, _page: 1 }));
  };

  return (
    <div className='mt-36 mb-8'>
      <div className='container mx-auto px-4 pb-20'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={18} xl={18} className='max-h-full relative'>
            <Input
              placeholder='Search by author'
              onChange={handleAuthorChange}
              value={params.author}
              style={{ marginBottom: '10px', width: '45%', marginRight: '20px' }}
            />
            <Input
              placeholder='Search by title'
              onChange={handleTitleChange}
              value={params.title}
              style={{ marginBottom: '10px', width: '45%' }}
            />
            <PostTitle
              title='Bài viết nổi bật'
              content='Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.'
            />

            {data?.blogs.map((blog) => (
              <Link to={`/blog-detail/${blog._id}`}>
                <CustomCard
                  key={blog._id}
                  blogImg={blog.blogImg}
                  author={blog.author}
                  content={blog.content}
                  technology={blog.technology}
                  readTime={calculateTimeSinceRead(blog.readTime)}
                  title={blog.title}
                />
              </Link>
            ))}
            <div className='w-full text-center mt-14'>
              <Panigation
                page={page}
                pageSize={page}
                onPageChange={handlePageChange}
                totalPages={data?.totalPages || 0}
              />
            </div>
          </Col>
          <Col xs={0} sm={0} md={8} lg={6} xl={6} className='max-h-full'>
            <div className='suggetested_Topic'>
              <div className='text-gray-500 text-1xl mb-4 mt-36 ml-10'>
                {data?.blogs.map((blog, index) => (
                  <span
                    key={index}
                    className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer inline-block m-3'
                    onClick={() => handleCategoryClick(blog.categoryId._id)}
                  >
                    {blog.categoryId.name}
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
