import { IBase } from './base.type';
import { User } from './note.type';

export interface IDiscuss extends IBase {
  code: string;
  _id: string;
  lessonId: string;
  courseId: string;
  userId: User;
  comments: string;
  parentDiscussId: string | null;
  discussId: string;
  replies: IReply[];
}

export interface IReply extends IBase {
  _id: string;
  userId: User;
  comments: string;
  courseId: string;
  lessonId: string;
}
