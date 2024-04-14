import { Carousel, Modal } from 'antd';
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
              <span className='text-2xl'>Blog Comments Reply</span>
            </div>
            <Carousel dotPosition='top' className='name text-2xl mb-7 flex'>
              {dataBlogCommentsDetail.replies.length > 0 ? (
                dataBlogCommentsDetail.replies.map((reply, index) => (
                  <Card key={index} style={{ marginBottom: '15px' }}>
                    <img
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      src={reply.userId?.avatar}
                      alt={reply.userId?.name}
                    />
                    <p className='text-2xl mt-4 opacity-75'>
                      Name: <span className='opacity-75'>{reply.userId?.name}</span>{' '}
                    </p>
                    <p className='text-2xl mt-4 opacity-75'>
                      Reply: <span className='opacity-75'>{reply.content}</span>
                    </p>
                  </Card>
                ))
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Empty description='No Reply' />
                </div>
              )}
            </Carousel>
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
