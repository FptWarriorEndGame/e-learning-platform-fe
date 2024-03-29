import { BookOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { sanitizeAndReturnHtml } from '../../../../utils/functions';

interface CustomCartProps {
  blogImg: string;
  author: string;
  content: string;
  technology: string;
  readTime: string;
  title: string;
}

const CustomCard = ({ author, content, technology, readTime, title, blogImg }: CustomCartProps) => {
  return (
    <>
      <Card>
        <div className='flex mb-4 flex-col mr-4'>
          <div>
            <div className='blog_user my-8'>
              <div className='blog_Avatar flex justify-between'>
                <div className='blog_Avatar-user'>
                  <Avatar src={blogImg} className='w-16 h-16' />
                  <div className='inline ml-3 text-3xl'>{author}</div>
                </div>
                <div className='blog_Avatar-icon'>
                  <div className='bookOutLine inline mr-4'>
                    <BookOutlined className='text-3xl hover:opacity-60 cursor-pointer' />
                  </div>
                  <div className='ellipsisOutlined inline'>
                    <EllipsisOutlined className='text-3xl hover:opacity-60 cursor-pointer' />
                  </div>
                </div>
              </div>
            </div>
            <div
              className='blog_Name text-4xl font-bold mb-12'
              dangerouslySetInnerHTML={sanitizeAndReturnHtml(
                title.length > 60 ? title.substring(0, 60) + '...' : title
              )}
            ></div>
            <div className='blog_Detail'>
              <div className='blog_Detail-content'>
                <p className='title my-10 text-2xl opacity-90'>
                  {content.length > 60 ? content.substring(0, 60) + '...' : content}
                </p>
                <div className='text-gray-500 text-1xl mb-4'>
                  <span className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer mr-6'>
                    {technology}
                  </span>{' '}
                  {readTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CustomCard;
