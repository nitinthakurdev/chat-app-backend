import { ObjectId } from 'mongoose';
import { IImageSchema } from './auth.types';

export interface IMessageResponse {
  _id: ObjectId;
  sender_id: ObjectId;
  receiver_id: ObjectId;
  text?: string | null;
  image?: IImageSchema | null;
  createdAt: Date;
  updatedAt: Date;
}
