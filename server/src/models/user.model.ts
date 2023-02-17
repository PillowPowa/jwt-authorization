import {Schema, model} from 'mongoose';
import type {IUser, CreatedUserData, UserPayload} from '../utils/types/types';

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String, unique: true, required: true},
});

export default class UserModel extends model<IUser>('user', userSchema) {
  static toPayload(payload: CreatedUserData): UserPayload {
    return {
      id: payload._id,
      email: payload.email,
      username: payload.username,
      isActivated: payload.isActivated,
    };
  }
}
