import type {Document, ObjectId} from 'mongoose';

export type IUser = {
  id: string;
  email: string;
  password: string;
  username: string;
  activationLink: string;
  isActivated: boolean;
} & Document;

export type CreatedUserData = IUser & {_id: ObjectId};

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  isActivated: boolean;
}

export enum UserAgent {
  Tablet = 'tablet',
  Mobile = 'mobile',
  Desktop = 'desktop',
}
