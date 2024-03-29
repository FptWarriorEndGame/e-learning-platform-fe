import { IBase } from './base.type';
export interface ISubscribe extends IBase {
  _id: string;
  code: string;
  email: string;
}

