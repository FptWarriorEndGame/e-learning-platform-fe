import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface User {
  _id: string;
  name: string;
  avatar: string;
}

interface Reply {
  _id: string;
  content: string;
  userId?: User; // Đánh dấu là optional để xử lý trường hợp userId không được cung cấp
}

interface CommentListProps {
  replies: Reply[];
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
