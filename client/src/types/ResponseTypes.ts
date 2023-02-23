export interface SuccessCreateBody {
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  user: UserPayload;
}

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