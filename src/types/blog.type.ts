export interface IBlog {
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
  category: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isDeleted: boolean;
}
