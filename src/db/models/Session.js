

import { model, Schema } from 'mongoose';


const sessionScheme = new Schema(
  {
    userId: {  type: Schema.Types.ObjectId, ref: 'User', required: true }, // ref ' user' , ' User' or 'users' check)
    accessToken: { type: String, required: true},
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: {type:Date, required: true },
    refreshTokenValidUntil:{type: Date, required: true},
    
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('sessions', sessionScheme);

  