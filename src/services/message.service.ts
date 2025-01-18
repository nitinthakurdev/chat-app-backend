import { MessageModel } from "@/models/message.models"
import { ObjectId } from "mongoose"

export const getMessages = async(sender_id:ObjectId,receiver_id:ObjectId):Promise<any> => {
    const messages = await MessageModel.find({
        $or:[
            {sender_id,receiver_id},
            {sender_id:receiver_id,receiver_id:sender_id}
        ]
    }).exec() 
    return messages 
}

// export const sendMessage = async (sender_id:ObjectId,receiver_id:ObjectId)