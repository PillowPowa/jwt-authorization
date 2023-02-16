import {Schema, model} from 'mongoose';

const tokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
  refresh: {type: String, required: true},
});

export default model('token', tokenSchema);
