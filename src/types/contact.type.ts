import { IBase } from './base.type';

export interface IContact extends IBase {
  _id: string;
  code: string;
  name: string;
  email: string;
  message: string;
}

export interface IFeedbackReply extends IBase {
  _id: string;
  code: string;
  feedbackId: string;
  contentReply: string;
}
