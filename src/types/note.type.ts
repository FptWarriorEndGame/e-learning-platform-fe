export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface INote {
  _id: string;
  title: string;
  userId: User;
  lessonId: string;
  courseId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  videoMinute: number;
}
