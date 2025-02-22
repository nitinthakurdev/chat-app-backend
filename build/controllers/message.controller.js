import { SocketIo } from '@/server';
import { GetGroupChat, getMessages, sendMessage } from '@/services/message.service';
import { AsyncHandler } from '@/utils/asyncHandler';
import { UploadOnCloudinary } from '@/utils/imageUploader';
import { StatusCodes } from 'http-status-codes';
const getUserMessages = AsyncHandler(async (req, res) => {
    const senderid = req.currentUser?.id;
    const receiverId = req.params.id;
    const messages = await getMessages(senderid, receiverId);
    res.status(StatusCodes.OK).json({
        message: 'messages',
        data: messages,
    });
});
const sendUserMessage = AsyncHandler(async (req, res) => {
    const receiver_id = req.params.id;
    const sender_id = req.currentUser?.id;
    const { text, img } = req.body;
    const image = (await UploadOnCloudinary(img, '', true, true));
    const result = await sendMessage(sender_id, receiver_id, text, image);
    SocketIo.emit('newMessage', result);
    res.status(StatusCodes.OK).json({
        message: 'Message Send',
        result,
    });
});
const getGroupChat = AsyncHandler(async (req, res) => {
    const sender_id = req.currentUser?.id;
    const group_id = req.params.id;
    const messages = await GetGroupChat(sender_id, group_id);
    res.status(StatusCodes.OK).json({
        message: 'messages',
        data: messages,
    });
});
export { getUserMessages, sendUserMessage, getGroupChat };
