import { Moment } from 'moment';
import { IBase } from './base.type';

export interface IBlog extends IBase {
  _id: string | undefined;
  title: string;
  author: string;
  blogImg: string;
  technology: string;
  tags: string[];
  readTime: any;
  datePublished: string;
  content: string;
  userId: string;
  categoryId: string;
}
