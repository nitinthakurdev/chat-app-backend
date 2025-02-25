import { Document, ObjectId } from 'mongoose';

export interface IImageSchema {
  _id?: ObjectId;
  image_Url: string;
  image_id: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refresh_token?: string;
  profilePic?: IImageSchema;
  isModified: (path: string) => boolean;
}

export interface IAuthResponse {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  refresh_token?: string;
  profilePic?: IImageSchema;
  createdAt?: Date;
  updatedAt?: Date;
}
