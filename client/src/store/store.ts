import { makeAutoObservable } from 'mobx';
import type { UserAgent, UserPayload } from '../types/ResponseTypes';
import AuthorizationService from './../services/AuthorizationService';
import axios, { AxiosError } from 'axios';
import { SuccessCreateBody } from './../../../server/src/utils/types/AuthorizationTypes';
import { baseURL } from './../http/index';

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
      if (err instanceof AxiosError) {
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
      if (err instanceof AxiosError) {
        return err.response?.data
      }
    }
  }
  public async logout() {
    try {
      await AuthorizationService.Logout();
      localStorage.removeItem('token');
      this.setUser(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.warn(err.response?.data?.message);
      } else {
        console.warn(err);
      }
    }
  }
  public async refresh(userAgent: UserAgent) {
    try {
      this.setLoading(true);
      const response = await axios.get<SuccessCreateBody>(
        `${baseURL}/refresh`, {
        withCredentials: true,
        params: {
          userAgent
        }
      }
      );
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.warn(err.response?.data?.message);
      } else {
        console.warn(err);
      }
    } finally {
      this.setLoading(false);
    }
  }
}