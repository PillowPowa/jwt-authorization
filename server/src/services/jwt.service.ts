import {sign} from 'jsonwebtoken';
import type {UserAgent, UserPayload} from './../utils/types/types';
import tokenModel from '../models/jwt.model';

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
    const tokenData = await tokenModel.findOne({userId, userAgent});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return tokenModel.create({
      userId,
      userAgent,
      refreshToken,
    });
  }
}
