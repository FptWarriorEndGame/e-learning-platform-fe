import { Avatar, Button, Card, Modal, Rate } from 'antd';
import { useState } from 'react';

interface FeedBackUser {
  name: string;
  rate: number;
  content: string;
}

export default function FeedBackUser({ name, rate, content }: FeedBackUser) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className='mb-8'>
        <div className='flex mb-2'>
          <div className='text-lg font-semibold'>
            <Avatar className='mr-2 my-4' size={52}>
              {name}
            </Avatar>{' '}
          </div>
          <div className='ml-auto flex items-center'>
            <Rate className='mr-2' disabled defaultValue={rate} />{' '}
            <span className='text-1xl text-gray-600 ml-2'>a week ago</span>
          </div>
        </div>
        <p className='text-gray-800'>{content}</p>
        <div className='flex mt-4'>
          <Button
            type='link'
            className='text-blue-600 hover:text-blue-800 transition-colors bg-slate-200'
            onClick={showModal}
          >
            Reply
          </Button>
        </div>
      </Card>
      <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <form>
          <div className='flex flex-col mt-10'>
            <textarea
              className='text-gray-700 text-base border rounded-md focus:outline-none focus:shadow-outline h-32 px-2'
              placeholder='Reply message.....'
              style={{ width: '100%', minHeight: '200px' }}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
