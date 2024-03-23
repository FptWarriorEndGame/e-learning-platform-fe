import { SearchOutlined } from '@ant-design/icons';

const InputFieldInbox = () => {
  return (
    <>
      <div className='flex justify-center mt-5'>
        <div className='relative w-full max-w-xl'>
          <input type='text' placeholder='Search...' className='w-full border py-3 px-4 rounded-2xl outline-none' />
          <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-3xl text-gray-400'>
            <SearchOutlined />
          </button>
        </div>
      </div>
      <div className='notification mt-6 text-2xl'>
        <h1 className='opacity-75'>No Message</h1>
      </div>
    </>
  );
};

export default InputFieldInbox;
