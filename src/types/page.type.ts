import { ICategoryBlogs } from "./categoryBlogs.type";

export interface Blog {
  _id: string;
  title: string;
  author: string;
  blogImg: string;
  technology: string;
  tags: string[];
  readTime: Date;
  datePublished: string;
  content: string;
  userId: string;
  categoryId: ICategoryBlogs;
  __v: number;
}
