import { Col, Row } from 'antd';
import { useGetAllBlogsQuery } from '../client.service';
import CustomCard from './components/CustomCard';
import Panigation from './components/Panigation';
import PostTitle from './components/PostTitle';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PagePost = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllBlogsQuery({ _page: page, _limit: 5 });

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
  };

  return (
    <div className='mt-36 mb-8'>
      <div className='container mx-auto px-4 pb-20'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={18} xl={18} className='max-h-full relative'>
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
                  readTime={blog.readTime}
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
                <span className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer inline-block '>
                  Frontend / Mobile App
                </span>
                <span className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer inline-block my-4 mr-4'>
                  Backend / Devops
                </span>
                <span className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer inline-block mb-4'>
                  UI / UX / Design
                </span>
                <span className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer inline-block mb-4'>
                  UI / UX / Design
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PagePost;
