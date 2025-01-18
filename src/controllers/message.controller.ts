import { getMessages } from "@/services/message.service";
import { AsyncHandler } from "@/utils/asyncHandler";
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

export {getUserMessages}