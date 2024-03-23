import React from 'react';
import { Avatar, Button, Modal, Rate } from 'antd';
import { useState } from 'react';

interface ModalCreateFeedback {
  name: string;
}

export default function ModalCreateFeedBack({ name }: ModalCreateFeedback) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type='link' className='text-blue-600 hover:text-blue-800 transition-colors text-2xl' onClick={showModal}>
        Create FeedBack
      </Button>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>
        ]}
      >
        <form>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-4xl font-bold'>Create FeedBack</h2>
          </div>
          <div className='flex items-center mb-8'>
            <Avatar size={64} src='https://i.pravatar.cc/150?img=3' />
            <div className='ml-4'>
              <h3 className='font-bold text-2xl'>{name}</h3>
              <Rate />
            </div>
          </div>
          <textarea
            className='w-full border border-gray-300 rounded-md p-4'
            name='content'
            id='content'
            cols={30}
            rows={10}
            placeholder='Write your feedback here...'
          ></textarea>
          <div className='text-right'>
            <Button type='primary' htmlType='submit' className='px-6'>
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
