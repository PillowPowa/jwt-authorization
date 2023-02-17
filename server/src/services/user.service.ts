import UserModel from '../models/user.model';
import CustomError from './../utils/Error';

import {hash} from 'bcrypt';
import {v4} from 'uuid';

import MailService from './activation.service';
import TokenService from './jwt.service';
import {type auth, StatusCode} from '../utils/types/index';

export default class UserService {
  static async Registration({
    email,
    username,
    password,
    userAgent,
  }: auth.RegistrationRequestBody): Promise<auth.RegistrationResponseBody> {
    const userData = (
      await Promise.all([
        UserModel.findOne({email}),
        UserModel.findOne({username}),
      ])
    ).filter(data => data);

    if (userData.length) {
      throw new CustomError(
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
  static async Activation(
    activationLink: string
  ): Promise<auth.ActivationResponseBody> {
    const userData = await UserModel.findOne({activationLink});
    if (!userData) {
      throw new CustomError(
        StatusCode.FORBIDDEN,
        `The link '${activationLink}' is not valid`
      );
    }
    userData.isActivated = true;
    await userData.save();
    return UserModel.toPayload(userData);
  }
}
