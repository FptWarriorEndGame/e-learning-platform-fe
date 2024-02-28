import { IBase } from './base.type';
import { ICourse } from './course.type';
import { IUser } from './user.type';
export interface IReview extends IBase {
  _id: string;
  courseId: ICourse;
  title: string;
  content: string;
  ratingStar: number;
  orderId: string;
  userId: IUser;
  createdAt?: string;
  updatedAt?: string;
}
