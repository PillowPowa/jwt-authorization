import {sign, verify} from 'jsonwebtoken';
import type {UserAgent, UserPayload} from './../utils/types/types';
import TokenModel from '../models/jwt.model';
import type {LogoutResponseBody} from '../utils/types/AuthorizationTypes';

export default class TokenService {
  static GenerateBasicToken(payload: UserPayload) {
    const {
      JWT_SECRET_ACCESS_KEY,
      JWT_ACCESS_EXPIRES_IN,
      JWT_SECRET_REFRESH_KEY,
      JWT_REFRESH_EXPIRES_IN,
    } = process.env;

    const [accessToken, refreshToken] = [
      sign(payload, JWT_SECRET_ACCESS_KEY, {
        expiresIn: Number(JWT_ACCESS_EXPIRES_IN),
      }),
      sign(payload, JWT_SECRET_REFRESH_KEY, {
        expiresIn: Number(JWT_REFRESH_EXPIRES_IN),
      }),
    ];
    return {accessToken, refreshToken, createdAt: Date.now()};
  }
  static async SaveToken(
    userId: string,
    userAgent: UserAgent,
    refreshToken: string
  ) {
    const tokenData = await TokenModel.findOne({userId, userAgent});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return TokenModel.create({
      userId,
      userAgent,
      refreshToken,
    });
  }
  static async DeleteToken(refreshToken: string): Promise<LogoutResponseBody> {
    const tokenData = await TokenModel.findOneAndDelete({refreshToken});
    if (!tokenData) return {refreshToken: null, userAgent: null};
    return {
      refreshToken: tokenData.refreshToken,
      userAgent: tokenData.userAgent as UserAgent,
    };
  }
  static ValidateAccessToken(token: string): UserPayload | null {
    try {
      const userPayload = verify(token, process.env.JWT_SECRET_ACCESS_KEY);
      return userPayload as UserPayload;
    } catch (err) {
      return null;
    }
  }
  static ValidateRefreshToken(token: string): UserPayload | null {
    try {
      const userPayload = verify(token, process.env.JWT_SECRET_REFRESH_KEY);
      return userPayload as UserPayload;
    } catch (err) {
      return null;
    }
  }
  static async FindRefreshToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({refreshToken});
    return tokenData;
  }
}
