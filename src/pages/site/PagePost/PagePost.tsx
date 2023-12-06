import { Card, Col, Row } from 'antd';
import CustomCard from './components/CustomCard';
import PostTitle from './components/PostTitle';
import Panigation from './components/Panigation';

const PagePost = () => {
  return (
    <div>
      <div className='container mx-auto px-4 pb-20 pt-40'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={18} xl={18} className='max-h-full relative'>
            <PostTitle
              title='Bài viết nổi bật'
              content='Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.'
            />
            <CustomCard
              name='Kha'
              title='Authentication & Authorization trong ReactJS'
              content='Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền...'
              months={2}
              minute={9}
              technology='ReactJS'
            />
            <CustomCard
              name='Kha'
              title='Authentication & Authorization trong ReactJS'
              content='Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền...'
              months={2}
              minute={9}
              technology='ReactJS'
            />
            <CustomCard
              name='Kha'
              title='Authentication & Authorization trong ReactJS'
              content='Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền...'
              months={2}
              minute={9}
              technology='ReactJS'
            />
            <div className='w-full text-center mt-14'>
              <Panigation page={1} pageSize={5} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={18} lg={6} xl={6} className='max-h-full'>
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
