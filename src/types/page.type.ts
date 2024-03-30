import { IBase } from './base.type';
import { ICategoryBlogs } from './categoryBlogs.type';

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
  userId: string;
  categoryId: ICategoryBlogs;
  __v: number;
}
