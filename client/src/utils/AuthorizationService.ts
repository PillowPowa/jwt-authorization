import {api} from './index';
import {AxiosResponse} from 'axios';
import type {UserAgent, SuccessCreateBody} from './types/ResponseTypes';

export default class AuthorizationService {
  static async Login(
    identifier: string,
    password: string,
    userAgent: UserAgent
  ): Promise<AxiosResponse<SuccessCreateBody>> {
    return api.post<SuccessCreateBody>('/login', {identifier, password, userAgent});
  }
  static async Registration(
    username: string,
    email: string,
    password: string,
    userAgent: UserAgent
  ): Promise<AxiosResponse<SuccessCreateBody>> {
    return api.post<SuccessCreateBody>('/registration', {username, email, password, userAgent});
  }
  static async Logout() {
    return api.post('/logout');
  }
}