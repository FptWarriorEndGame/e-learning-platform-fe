import { User } from '../pages/site/Blog/components/CommentList/CommentList';

export interface BlogComment {
  _id: string;
  content: string;
  userId: User;
  blogId: string;
  parentCommentId?: string;
  isDeleted: boolean;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
