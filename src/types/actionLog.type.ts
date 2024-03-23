import { IBase } from './base.type';

export interface IActionLog extends IBase {
  description?: string;
  type: string;
  createdByName?: string;
  functionType?: string;
  [key: string]: string | any;
}
