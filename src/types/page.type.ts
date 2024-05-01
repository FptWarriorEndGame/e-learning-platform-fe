import { IBase } from './base.type';
import { ICategoryBlogs } from './categoryBlogs.type';
import { IUser } from './user.type';

export interface Blog extends IBase {
  _id: string;
  title: string;
  author: string;
  blogImg: string;
  technology: string;
  tags: string[];
  readTime: string;
  datePublished: string;
  content: string;
  userId: IUser;
  thumbnail: string;
  categoryId: ICategoryBlogs;
  __v: number;
}
