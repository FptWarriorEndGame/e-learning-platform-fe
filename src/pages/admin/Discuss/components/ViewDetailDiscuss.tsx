import { Modal } from 'antd';
import { transformDate } from '../../../../utils/functions';
import { useGetDiscussionByIdQuery } from '../discuss.service';

interface ViewDetailDiscussProps {
  isVisible: boolean;
  onClose: () => void;
  discussId: string;
}

const ViewDetailDiscuss: React.FC<ViewDetailDiscussProps> = ({ discussId, isVisible, onClose }) => {
  const { data: dataDisscus, isFetching: isblogCommentsFetching } = useGetDiscussionByIdQuery(discussId);
  const datadis = dataDisscus?.discuss;

  return (
    <>
      <Modal visible={isVisible} onCancel={onClose} footer={null}>
        {datadis && (
          <>
            <div className='title text-3xl mb-7'>
              <span className=''>Discuss Details</span>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>ID :</p> <p>{datadis?._id}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Code :</p> <p>{datadis?.code}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Comments :</p> <p>{datadis?.comments}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Create At :</p> <p>{transformDate(datadis?.createdAt || '')}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update At :</p> <p>{transformDate(datadis?.updatedAt || '')}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update At :</p> <p>{datadis?.isDeleted ? 'Inactive' : 'Active'}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ViewDetailDiscuss;
