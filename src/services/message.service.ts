import { MessageModel } from '@/models/message.models';
import { IImageSchema } from '@/types/auth.types';
import { ObjectId } from 'mongoose';

export const getMessages = async (sender_id: ObjectId, receiver_id: ObjectId): Promise<any> => {
  const messages = await MessageModel.find({
    $or: [
      { sender_id, receiver_id },
      { sender_id: receiver_id, receiver_id: sender_id },
    ],
  }).exec();
  return messages;
};

export const sendMessage = async (sender_id: ObjectId, receiver_id: string, text?: string, image?: IImageSchema): Promise<any> => {
  const message = await MessageModel.create({ sender_id, receiver_id, text, image });
  return message;
};
