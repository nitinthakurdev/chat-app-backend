import { Document } from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refresh_token?: string;
    profilePic?: {
      image_Url: string;
      image_id: string;
    };
    isModified: (path: string) => boolean;
  }