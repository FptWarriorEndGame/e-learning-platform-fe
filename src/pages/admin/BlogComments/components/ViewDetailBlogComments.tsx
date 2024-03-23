import { Modal } from 'antd';
import { transformDate } from '../../../../utils/functions';
import { useGetBlogCommentsByIdQuery } from '../blogComments.service';

interface ViewDetailBlogCommentsProps {
  isVisible: boolean;
  onClose: () => void;
  blogCommentId: string;
}

const ViewDetailBlogComments: React.FC<ViewDetailBlogCommentsProps> = ({ blogCommentId, isVisible, onClose }) => {
  const { data: blogCommentsDetail, isFetching: isblogCommentsFetching } = useGetBlogCommentsByIdQuery(blogCommentId);
  const dataBlogCommentsDetail = blogCommentsDetail?.comments;

  return (
    <>
      <Modal visible={isVisible} onCancel={onClose} footer={null}>
        {dataBlogCommentsDetail && (
          <>
            <div className='title text-3xl mb-7'>
              <span className=''>Blog Comments Details</span>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>ID Blog Comment :</p> <p>{dataBlogCommentsDetail?._id}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Code :</p> <p>{dataBlogCommentsDetail?.code}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Comment Blog Name:</p> <p>{dataBlogCommentsDetail?.content}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Create At:</p> <p>{transformDate(dataBlogCommentsDetail?.createdAt || '')}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update At:</p> <p>{transformDate(dataBlogCommentsDetail?.updatedAt || '')}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update At:</p> <p>{dataBlogCommentsDetail?.isDeleted ? 'Inactive' : 'Active'}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ViewDetailBlogComments;
