import { IBase } from './base.type';
import { ICouponType } from './couponType.type';
import { ICourse } from './course.type';

export interface ICoupon extends IBase {
  _id: string;
  code: string;
  description: string;
  discountAmount: number;
  couponTypeId: string | ICouponType;
  dateStart: Date;
  dateEnd: Date;
  dateRangeStart: {
    dateRangeEnd: string[];
  };
}

export interface ICouponCourse extends IBase {
  _id: string;
  code: string;
  couponId: string;
  courseId: ICourse;
}
