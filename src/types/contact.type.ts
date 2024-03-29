import { IBase } from './base.type';
import { IUser } from './user.type';

export interface IContact extends IBase {
  _id: string;
  code: string;
  name: string;
  email: string;
  message: string;
  dateSendMail: string | IUser;
  hasReplies: boolean;
  replyCount: number;
}

export interface IFeedbackReply extends IBase {
  _id: string;
  code: string;
  feedbackId: string;
  contentReply: string;
}
