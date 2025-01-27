import { ObjectId } from 'mongoose';

export interface IVerfifyJWT {
  id?: ObjectId;
  email?: string;
  username?: string;
}

export interface ICurrentUser {
  id: ObjectId;
  username: string;
  email: string;
}
