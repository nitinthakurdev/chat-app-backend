import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/types/auth.types";


export const ImageSchema = new Schema({
  image_Url: { type: String, required: true },
  image_id: { type: String, required: true },
});


const UserSchema = new Schema<IUser>({
  username: { type: String, trim: true, required: true, unique: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true },
  refresh_token: { type: String },
  profilePic: ImageSchema,
});

UserSchema.pre("save", async function (next) {
  const user = this as IUser; 
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 12);
  next();
});


export const UserModel = model<IUser>("User", UserSchema);
