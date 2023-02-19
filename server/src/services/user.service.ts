import UserModel from '../models/user.model';
import ApiError from '../utils/ApiError';

import {hash, compare} from 'bcrypt';
import {v4} from 'uuid';

import MailService from './activation.service';
import TokenService from './jwt.service';
import {type auth, StatusCode} from '../utils/types/index';
import type {UserAgent} from '../utils/types/types';

export default class UserService {
  static async Registration({
    email,
    username,
    password,
    userAgent,
  }: auth.RegistrationRequestBody): Promise<auth.SuccessCreateBody> {
    const userDatas = await Promise.all([
      UserModel.findOne({email}),
      UserModel.findOne({username}),
    ]);

    if (userDatas.some(data => data !== null)) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        `User with email '${email}' or username '${username}' currently exist!`
      );
    }

    password = await hash(password, Number(process.env.BCRYPT_SALT));
    const activationLink = v4();
    const createdUserData = await UserModel.create({
      email,
      username,
      password,
      activationLink,
    });

    const activationURL = `${process.env.THIS_API_URL}/activate/${activationLink}`;
    await MailService.SendActivationMessage(email, activationURL);
    const payload = UserModel.toPayload(createdUserData);
    const tokens = TokenService.GenerateBasicToken(payload);
    await TokenService.SaveToken(payload.id, userAgent, tokens.refreshToken);

    return {...tokens, user: payload};
  }
  static async Login({
    identifier,
    password,
    userAgent,
  }: auth.LoginRequestBody): Promise<auth.SuccessCreateBody> {
    const userData = (
      await Promise.all([
        UserModel.findOne({email: identifier}),
        UserModel.findOne({username: identifier}),
      ])
    ).find(value => value !== null);

    if (!userData) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        `User with identifier '${identifier}' does not exist!`
      );
    }

    const isPasswordCorrent = await compare(password, userData.password);
    if (!isPasswordCorrent) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        `User with identifier '${identifier}' enter wrong password!`
      );
    }

    const payload = UserModel.toPayload(userData);
    const tokens = TokenService.GenerateBasicToken(payload);
    await TokenService.SaveToken(payload.id, userAgent, tokens.refreshToken);

    return {...tokens, user: payload};
  }
  static async Logout(refreshToken: string): Promise<auth.LogoutResponseBody> {
    const token = await TokenService.DeleteToken(refreshToken);
    return token;
  }
  static async Refresh(
    refreshToken: string,
    userAgent: UserAgent
  ): Promise<auth.SuccessCreateBody> {
    const userPayload = TokenService.ValidateRefreshToken(refreshToken);
    const tokenData = await TokenService.FindRefreshToken(refreshToken);
    if (!userPayload || !tokenData) {
      throw new ApiError(StatusCode.UNAUTHORIZED, 'The user is not authorized');
    }
    const userData = await UserModel.findById(userPayload.id);
    if (!userData) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        `User '${userPayload.username}' with id '${userPayload.id}' does not exist!`
      );
    }
    const payload = UserModel.toPayload(userData);
    const tokens = TokenService.GenerateBasicToken(payload);
    await TokenService.SaveToken(
      userPayload.id,
      userAgent,
      tokens.refreshToken
    );

    return {...tokens, user: payload};
  }
  static async Activation(activationLink: string): Promise<void> {
    const userData = await UserModel.findOne({activationLink});
    if (!userData) {
      throw new ApiError(
        StatusCode.FORBIDDEN,
        `The link '${activationLink}' is not valid`
      );
    }
    userData.isActivated = true;
    await userData.save();
  }
}
