import { SocketIo } from '@/server';
import { GetGroupChat, getMessages, sendMessage } from '@/services/message.service';
import { IImageSchema } from '@/types/auth.types';
import { AsyncHandler } from '@/utils/asyncHandler';
import { UploadOnCloudinary } from '@/utils/imageUploader';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';

const getUserMessages = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const senderid = req.currentUser?.id;
  const receiverId = req.params.id;
  const messages = await getMessages(senderid as ObjectId, receiverId as unknown as ObjectId);

  res.status(StatusCodes.OK).json({
    message: 'messages',
    data: messages,
  });
});

const sendUserMessage = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const receiver_id = req.params.id;
  const sender_id = req.currentUser?.id as ObjectId;
  const { text, img } = req.body;

  const image = (await UploadOnCloudinary(img, '', true, true)) as IImageSchema;

  const result = await sendMessage(sender_id, receiver_id, text, image);

  SocketIo.emit('newMessage', result);

  res.status(StatusCodes.OK).json({
    message: 'Message Send',
    result,
  });
});

const getGroupChat = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const sender_id = req.currentUser?.id;
  const group_id = req.params.id;
  const messages = await GetGroupChat(sender_id as ObjectId, group_id as unknown as ObjectId);
  res.status(StatusCodes.OK).json({
    message: 'messages',
    data: messages,
  });
});

export { getUserMessages, sendUserMessage,getGroupChat };
