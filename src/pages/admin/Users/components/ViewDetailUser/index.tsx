import { Modal } from 'antd';
import { useGetUserQuery } from '../../user.service';
import { transformDate } from '../../../../../utils/functions';

interface ViewDetailUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const ViewDetailUser: React.FC<ViewDetailUserProps> = ({ userId, onClose, isOpen }) => {
  const { data: user, isLoading } = useGetUserQuery(userId);
  return (
    <Modal visible={isOpen} onCancel={onClose} footer={null} width='40%' centered>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='text-5xl text-center mb-4'>User Detail</div>
          <div className='flex justify-between mb-8 items-center'>
            <p className='text-2xl'>Avatar</p>
            <img
              src={user?.user.avatar ? user.user.avatar : 'https://via.placeholder.com/150'}
              alt='avatar'
              className='rounded-full h-24 w-24'
            />
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Status</p>
            <p className='text-2xl'>{user?.user?.status ? user?.user.status : 'No status'}</p>
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>User Name</p>
            <p className='text-2xl'>{user?.user.name}</p>
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Address</p>
            <p className='text-2xl'>{user?.user?.address ? user.user.address : 'No Address'}</p>
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Username</p>
            <p className='text-2xl'>{user?.user.role}</p>
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Facebook</p>
            <p className='text-2xl'>{user?.user?.facebook ? user.user.facebook : 'No Facebook'}</p>
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Phone</p>
            <p className='text-2xl'>{user?.user?.phone ? user.user.phone : 'No Phone'}</p>
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Active</p>
            <p className='text-2xl'>{user?.user?.isDeleted ? 'Active' : 'Un Active'}</p>{' '}
          </div>
          <div className='flex justify-between mb-6'>
            <p className='text-2xl'>Create At</p>
            <p className='text-2xl'>{user?.user?.createdAt ? transformDate(user.user.createdAt) : 'No Create At'}</p>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewDetailUser;
