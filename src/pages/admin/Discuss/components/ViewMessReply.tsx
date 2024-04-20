import { Card, Empty, Modal } from 'antd';
import { useGetDiscussionByIdQuery } from '../discuss.service';

interface ViewMessReplyProps {
  isVisible: boolean;
  onClose: () => void;
  discussId: string;
}

const ViewMessDiscuss: React.FC<ViewMessReplyProps> = ({ discussId, isVisible, onClose }) => {
  const { data: discussDetail, isFetching: isblogCommentsFetching } = useGetDiscussionByIdQuery(discussId);
  const datadiscussDetail = discussDetail?.discuss;
  return (
    <>
      <Modal visible={isVisible} onCancel={onClose} footer={null}>
        {datadiscussDetail ? (
          <>
            <div className='title text-3xl mb-7 flex justify-center'>
              <span className='text-3xl'>Discuss Reply</span>
            </div>
            <div className='name text-2xl mb-7'>
              {datadiscussDetail.replies.length > 0 ? (
                datadiscussDetail.replies.map((reply, index) => (
                  <Card key={index} style={{ marginBottom: '15px' }}>
                    <div className='flex flex-col	flex-wrap text-center'>
                      <div className='flex justify-center'>
                        <img style={{ width: 200 }} src={reply.userId?.avatar} alt={reply.userId?.name} />
                      </div>
                      <div>
                        <p className='text-1xl mt-4'>Name: {reply.userId?.name}</p>
                        <p className='text-1xl mt-4'>Reply: {reply.comments}</p>
                      </div>
                    </div>
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

export default ViewMessDiscuss;
