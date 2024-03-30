// Những khóa học cụ thể hóa về lập trình (Javascript, HTML CSS,  )
// Danh mục (Lập trình, Ngôn ngữ, Kinh doanh,... )
import { IBase } from './base.type';

export interface ICategory extends IBase {
  _id: string;
  name: string;
  description: string;
  cateImage: string | ArrayBuffer | null | undefined;
  cateSlug: string;
  parentId?: string; // 0, 1, 2
  createdAt?: string;
  courses?: number;
}
