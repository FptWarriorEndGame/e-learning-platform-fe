import { BookOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

interface CustomCartProps {
  title: string;
  name: string;
  content: string;
  months: number;
  minute: number;
  technology: string;
}

const CustomCard = ({ title, name, content, months, minute, technology }: CustomCartProps) => {
  return (
    <>
      <Card>
        <div className='flex mb-4 flex-col mr-4'>
          <div>
            <div className='blog_user my-8'>
              <div className='blog_Avatar flex justify-between'>
                <div className='blog_Avatar-user'>
                  <Avatar src='path_to_avatar_image' className='w-16 h-16' />
                  <div className='inline ml-3 text-3xl'>{name}</div>
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
            <h1 className='blog_Name text-4xl font-bold mb-12'>{title}</h1>
            <div className='blog_Detail'>
              <div className='blog_Detail-content'>
                <p className='title my-10 text-2xl opacity-90'>{content}</p>
                <div className='text-gray-500 text-1xl mb-4'>
                  <span className='bg-slate-200 p-3 rounded-3xl text-black hover:opacity-75 cursor-pointer'>
                    {technology}
                  </span>{' '}
                  • {months} tháng trước • {minute} phút đọc
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
