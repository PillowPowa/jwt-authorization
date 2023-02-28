import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import AuthorizationService from './AuthorizationService';
import { baseURL } from './httpRequester';
import type { SuccessCreateBody } from './../../../server/src/utils/types/AuthorizationTypes';
import type { UserAgent, UserPayload } from './types/ResponseTypes';

export default class Store {
  public user: UserPayload | null = null;
  public loading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  public setUser(user: UserPayload | null) {
    this.user = user;
  }
  public async login(
    identifier: string,
    password: string,
    userAgent: UserAgent
  ) {
    try {
      const response = await AuthorizationService.Login(
        identifier, password, userAgent
      );
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data
      }
    }
  }
  private setLoading(status: boolean) {
    this.loading = status;
  }
  public async registration(
    username: string,
    email: string,
    password: string,
    userAgent: UserAgent
  ) {
    try {
      const response = await AuthorizationService.Registration(
        username, email, password, userAgent
      );
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
  public async logout() {
    await AuthorizationService.Logout().catch(() => null);
    localStorage.removeItem('token');
    this.setUser(null);
  }
  public async refresh(userAgent: UserAgent) {
    this.setLoading(true);
    const axiosConfig = {withCredentials: true, params: { userAgent }};
    return axios
      .get<SuccessCreateBody>(`${baseURL}/refresh`, axiosConfig)
      .then((response) => {
        localStorage.setItem('token', response.data.accessToken);
        this.setUser(response.data.user);
        return response.data;
      })
      .catch(() => null)
      .finally(() => this.setLoading(false))
  }
}