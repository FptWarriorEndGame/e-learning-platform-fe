import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const InputFieldMessage = () => {
  return (
    <>
      <div className='flex justify-center'>
        <div className='relative w-full max-w-5xl'>
          <input
            type='text'
            placeholder='Please,add resipient...'
            className='w-full border py-3 px-4 outline-none my-2'
          />
          <textarea
            placeholder='Please,write your message...'
            className='w-full border py-3 px-4 outline-none mt-4 row-span-6'
          />
          <div className='flex justify-end mt-4'>
            <Button className='mr-4'>Cancel</Button>
            <Button type='primary'>Send</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputFieldMessage;
