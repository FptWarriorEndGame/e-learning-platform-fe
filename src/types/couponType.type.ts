import { IBase } from './base.type';

export interface ICouponType extends IBase {
  _id: string;
  code: string;
  description: string;
  name: string;
}
