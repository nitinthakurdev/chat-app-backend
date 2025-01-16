import { CreateUser, findByEmailOrUsername } from "@/services/auth.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError, NotFoundError } from "@/utils/CustomError";
import {  UploadOnCloudinary } from "@/utils/imageUploader";
import { AccessToken, RefreshToken } from "@/utils/tokens";
import { Request, Response } from "express";

const createUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const file = req.file;

    if (!file) {
        throw new NotFoundError("file not found", "create user Method");
    };

    const user = await findByEmailOrUsername(data.email);
    if (user) {
        throw new BadRequestError("User already exist", "createUser methord error")
    }

    const profilePic = await UploadOnCloudinary(file?.path as string);

    const refresh_token = RefreshToken(data.email)
    
    const result = await CreateUser({...data,profilePic,refresh_token})

 const newresult = {
    _id:result._id,
    email:result.email,
    username:result.email,
    profilePic:result.profilePic?.image_Url
 }    

 const token = AccessToken(result._id,result.email)
    
    res.status(200).json({
        message: "test",
        newresult,
        access_token:token,
        refresh_token
    })
})

export { createUser }