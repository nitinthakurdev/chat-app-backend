import { Schema, model } from 'mongoose';
import { ImageSchema } from '../models/user.models';
const messageSchema = new Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        trim: true,
    },
    image: ImageSchema,
}, { timestamps: true });
export const MessageModel = model('Message', messageSchema);
