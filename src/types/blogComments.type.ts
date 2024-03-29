import { User } from '../pages/site/Blog/components/CommentList/CommentList';
import { IBase } from './base.type';

export interface IReply {
  _id: string;
  content?: string;
  userId?: User;
  avatar?: string;
  name?: string;
}

interface ILike {
  includes: any;
  userId: string;
}

export interface IBlogComment extends IBase {
  code: string;
  _id: string;
  content: string;
  userId: User;
  blogId: string;
  parentCommentId?: string;
  likes: string[];
  replies: IReply[];
}
