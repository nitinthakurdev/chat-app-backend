import { Schema,model } from "mongoose";
import { ImageSchema } from "@/models/user.models";

const messageSchema = new Schema({
    sender_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        trim:true,
        required:true
    },
    receiver_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        trim:true,
        required:true
    },
    text:{
        type:String,
    },
    image:ImageSchema
});

export const MessageModel = model("Message",messageSchema);