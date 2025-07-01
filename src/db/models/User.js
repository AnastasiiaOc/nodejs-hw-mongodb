
import { model, Schema } from 'mongoose';

const userScheme = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    // createdAt: { Date, required: true },
    // updatedAt:{ Date, required: true},
    
  },
  { timestamps: true, versionKey: false },

);

userScheme.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('users', userScheme);
