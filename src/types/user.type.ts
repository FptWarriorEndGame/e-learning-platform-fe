import { ICourse } from './course.type';
import { IBase } from './base.type';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  USER = 'USER',
  AUTHOR = 'AUTHOR'
}

export interface IUser extends IBase {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone: string;
  address?: string;
  avatar?: string;
  courses?: ICourse[];
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  tags?: string[];
  providerId?: string; // maybe improve later
  resetToken?: string;
  resetTokenExpiration?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
  payment?: string;
  headline?: string;
  biography?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  language?: string;
  showProfile?: boolean;
  showCourses?: boolean;
  statusColor?: string;
  statusName?: string;
  status?: string;
}
