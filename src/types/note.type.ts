export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface ILesson {
  _id: string;
  name: string;
}
export interface ICourse {
  _id: string;
  name: string;
}

export interface INote {
  _id: string;
  title: string;
  userId: User | string;
  lessonId: ILesson | string;
  courseId: ICourse;
  content: string;
  createdAt: string;
  updatedAt: string;
  videoMinute: number;
}
