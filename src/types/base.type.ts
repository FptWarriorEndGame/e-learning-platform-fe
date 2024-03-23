import { IUser } from './user.type';
export interface IBase {
  createdAt?: string;
  createdBy?: string | IUser;
  updatedAt?: string;
  updatedBy?: string | IUser;
  isDeleted?: boolean;
}
