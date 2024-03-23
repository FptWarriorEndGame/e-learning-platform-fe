import { IBase } from './base.type';

export interface ICategoryBlogs extends IBase {
  _id: string;
  code: string;
  name: string;
  cateImage: string;
  description: string;
  actions: JSX.Element;
}
