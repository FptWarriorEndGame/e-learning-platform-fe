import { Moment } from 'moment';
import { IBase } from './base.type';
import { IUser } from './user.type';

export interface IBlog extends IBase {
  _id: string | undefined;
  title: string;
  author: string;
  blogImg: string;
  technology: string;
  tags: string[];
  readTime: any;
  thumbnail: string;
  datePublished: string;
  content: string;
  userId: IUser;
  categoryId: string;
}
