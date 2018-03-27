import mongoose from 'mongoose';
import { isEmail, isURL } from 'validator';
import findOrCreate from './find-or-create-plugin';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    match: /\d+/
  },
  displayName: { type: String, required: true, match: /^([A-Za-z]+((\s[A-Za-z]+)+)?)$/ },
  emails: [{ value: {
    type: String,
    required: true,
    unique: true,
    validate: [{ validator: value => isEmail(value), message: 'Invalid email.' }]
  } }],
  photos: [{ value: { type: String, validate: { validator: isURL } } }]
});

userSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);

export default User;
