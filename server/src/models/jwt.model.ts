import {Schema, model} from 'mongoose';

const tokenSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
  refreshToken: {type: String, required: true},
  userAgent: {type: String, required: true},
});

export default model('token', tokenSchema);
