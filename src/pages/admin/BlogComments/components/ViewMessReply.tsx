import { Modal } from 'antd';
import { transformDate } from '../../../../utils/functions';
import { useGetBlogCommentsByIdQuery } from '../blogComments.service';
import { Empty, Card } from 'antd';

interface ViewMessReplyProps {
  isVisible: boolean;
  onClose: () => void;
  blogCommentId: string;
}

const ViewMessReply: React.FC<ViewMessReplyProps> = ({ blogCommentId, isVisible, onClose }) => {
  const { data: blogCommentsDetail, isFetching: isblogCommentsFetching } = useGetBlogCommentsByIdQuery(blogCommentId);
  const dataBlogCommentsDetail = blogCommentsDetail?.comments;
  return (
    <>
      <Modal visible={isVisible} onCancel={onClose} footer={null}>
        {dataBlogCommentsDetail ? (
          <>
            <div className='title text-3xl mb-7 flex justify-center'>
              <span className='text-4xl'>Blog Comments Reply</span>
            </div>
            <div className='name text-2xl mb-7'>
              {dataBlogCommentsDetail.replies.length > 0 ? (
                dataBlogCommentsDetail.replies.map((reply, index) => (
                  <Card key={index} style={{ marginBottom: '15px' }}>
                    <img src={reply.userId?.avatar} alt={reply.userId?.name} />
                    <p className='text-3xl mt-4'>Name: {reply.userId?.name}</p>
                    <p className='text-3xl mt-4'>Reply: {reply.content}</p>
                  </Card>
                ))
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Empty description='No Reply' />
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Empty description='No Reply' />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ViewMessReply;
