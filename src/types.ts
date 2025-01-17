import { Document, ObjectId } from "mongoose";

export interface IImageSchema {
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


  export interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
    serializeErrors(): IError;
  }
  
  export interface IError {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
  }

  export interface IAuthResponse {
    _id:ObjectId;
    username: string;
    email: string;
    password: string;
    refresh_token?: string;
    profilePic?: IImageSchema; 
    createdAt?: Date;
    updatedAt?: Date;
  }