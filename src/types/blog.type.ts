import { IBase } from "./base.type";

export interface IBlog extends IBase {
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
  categoryId: string;
}
