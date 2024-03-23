import React from 'react';

interface PostProps {
  title: string;
  content: string;
}

const PostTitle = ({ title, content }: PostProps) => {
  return (
    <div className='post my-6 ml-6'>
      <h1 className='text-6xl my-4 font-semibold mb-6'>{title}</h1>
      <p className='opacity-75 text-2xl'>{content}</p>
    </div>
  );
};

export default PostTitle;
