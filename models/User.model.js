import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    mail: { type: String, require: true },
    password: { type: String, require: true },
    is_admin: { type: Boolean, require: true },
    is_verified : {type: Boolean,require : true},
    verify_code : { type: String, require: true },
    is_online: { type: Boolean, require: true },
    photo: { type: String, require: true },
  },
  { timestamps: true }
);

export const User = mongoose.model('users',Schema)