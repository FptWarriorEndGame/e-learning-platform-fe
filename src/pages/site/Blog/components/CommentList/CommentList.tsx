import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import ReactQuill from 'react-quill';
import './CommentList.scss';
import { useState } from 'react';

// Define the shape of the props expected by the component
interface Comment {
  id: string;
  author: string;
  content: string;
  // other properties like timestamp, likes, etc.
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList(props: CommentListProps) {
  const [isReplying, setIsReplying] = useState(false);

  const items: MenuProps['items'] = [
    {
      label: <a href='https://www.antgroup.com'>Thêm bình luận</a>,
      key: '0'
    },
    {
      label: <a href='https://www.aliyun.com'>Sửa bình luận</a>,
      key: '1'
    }
  ];
  return (
    <div className='overflow-y-scroll max-h-80 comments-container mt-10'>
      {props.comments.map((comment) => (
        <div key={comment.id}>
          <div className='flex items-center border-current	'>
            <Avatar className='mr-4 flex-none' icon={<UserOutlined />} />
            <div
              className=' ml-2 bg-slate-300 px-6 py-7 rounded-2xl flex-1 '
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
            {/* <div className='comment-author'>{comment.author}</div> */}
          </div>

          <div className='ml-12 px-6 mt-4'>
            <button className='text-1xl text-slate-800 hover:text-slate-400 mr-2'>Thích</button>
            <span>-</span>
            <button
              className='text-1xl text-slate-800 hover:text-slate-400 mr-4'
              onClick={(e) => {
                e.preventDefault();
                setIsReplying(!isReplying);
              }}
            >
              Trả lời
            </button>
            {isReplying && <ReactQuill theme='snow' className='my-6' />}

            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UnorderedListOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
}
