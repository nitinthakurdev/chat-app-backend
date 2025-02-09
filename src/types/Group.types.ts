import {  Types } from "mongoose";
import { IImageSchema } from "./auth.types";
import { Document } from "mongoose";

export interface IGroup extends Document {
    name: string;
    admin: Types.ObjectId;
    users: Types.ObjectId[];
    Image?: IImageSchema;
  }

  export interface IGroupResponse {
    _id?: string;
    name: string;
    admin: string;
    users: string[];
    Image?: IImageSchema;
  }