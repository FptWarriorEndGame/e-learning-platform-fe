import { IBase } from './base.type';
import { ICourse } from './course.type';
import { ILesson } from './lesson.type';
import { User } from './note.type';

export interface IDiscuss extends IBase {
  code: string;
  _id: string;
  lessonId: ILesson;
  courseId: ICourse;
  userId: User;
  comments: string;
  parentDiscussId: string | null;
  discussId: string;
  replies: IReply[];
}

export interface IReply extends IBase {
  _id: string;
  userId: User;
  comments: string;
  courseId: string;
  lessonId: string;
}
