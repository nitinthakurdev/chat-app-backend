import { getMessages, sendMessage } from "@/services/message.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { UploadOnCloudinary } from "@/utils/imageUploader";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongoose";


const getUserMessages = AsyncHandler(async (req:Request,res:Response):Promise<void>=>{
    const senderid = req.currentUser?.id;
    const receiverId = req.params.id;
    const messages = getMessages(senderid as ObjectId,receiverId as unknown as ObjectId);
    res.status(StatusCodes.OK).json({
        message:"messages",
        data:messages
    })
})

const sendUserMessage = AsyncHandler(async (req:Request,res:Response):Promise<void> => {
    const receiver_id = req.params.id;
    const sender_id = req.currentUser?.id as ObjectId;
    const {text} = req.body ;
    const file = req.file;
    let image ;
    if(file){
        image = await UploadOnCloudinary(file.path)
    }
    const result = await sendMessage(sender_id,receiver_id,text,image)

     res.status(StatusCodes.OK).json({
        message:"Message Send",
        result
    })

})

export {getUserMessages,sendUserMessage}