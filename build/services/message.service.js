import { MessageModel } from '../models/message.models';
export const getMessages = async (sender_id, receiver_id) => {
    const messages = await MessageModel.find({
        $or: [
            { sender_id, receiver_id },
            { sender_id: receiver_id, receiver_id: sender_id },
        ],
    }).exec();
    return messages;
};
export const GetGroupChat = async (sender_id, group_id) => {
    const messages = await MessageModel.find({
        $or: [
            { sender_id, receiver_id: group_id },
            { receiver_id: group_id },
        ],
    }).exec();
    return messages;
};
export const sendMessage = async (sender_id, receiver_id, text, image) => {
    const message = await MessageModel.create({ sender_id, receiver_id, text, image });
    return message;
};
