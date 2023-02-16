import {Schema, model} from 'mongoose';

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String, unique: true, required: true},
});

export default model('user', userSchema);
