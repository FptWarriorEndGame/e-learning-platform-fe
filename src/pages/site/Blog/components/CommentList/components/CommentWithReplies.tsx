import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { IReply } from '../../../../../../types/blogComments.type';


interface CommentListProps {
  replies: IReply[];
  blogId: string;
}

const CommentWithReplies: React.FC<CommentListProps> = ({ replies, blogId }) => {
  return (
    <div>
      {replies.map((reply) => (
        <Card key={reply?._id} style={{ marginBottom: 16 }}>
          <Card.Meta
            avatar={reply?.userId ? <Avatar src={reply?.userId?.avatar} /> : <Avatar icon={<UserOutlined />} />}
            title={reply?.userId ? reply?.userId?.name : 'Người dùng ẩn danh'}
            description={reply?.content}
          />
        </Card>
      ))}
    </div>
  );
};

export default CommentWithReplies;
