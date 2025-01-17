import { CreateUser, findByEmailOrUsername, UpdateRefreshToken } from "@/services/auth.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError, NotFoundError } from "@/utils/CustomError";
import {  UploadOnCloudinary } from "@/utils/imageUploader";
import { AccessToken, RefreshToken } from "@/utils/tokens";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { compare } from "bcryptjs";

const createUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const file = req.file;

    if (!file) {
        throw new NotFoundError("file not found", "createUser Method");
    };

    const user = await findByEmailOrUsername(data.email);
    if (user) {
        throw new BadRequestError("User already exist", "createUser methord");
    };

    const profilePic = await UploadOnCloudinary(file?.path as string);
    const refresh_token = RefreshToken(data.email);
    const result = await CreateUser({...data,profilePic,refresh_token});

 const newresult = {
    _id:result._id,
    email:result.email,
    username:result.email,
    profilePic:result.profilePic?.image_Url
 }    

 const access_token = AccessToken(result._id,result.email)
    
    res.status(StatusCodes.OK).json({
        message: "test",
        newresult,
        access_token,
        refresh_token
    })
})

const loginUser = AsyncHandler(async (req:Request,res:Response):Promise<void> => {
    const { username, password } = req.body as { username: string; password: string };

    const user = await findByEmailOrUsername(username)
    if(!user){
        throw new NotFoundError("User Not Exist","loginUser method")
    }

    const comparePassword = await compare(password,user.password);
    if(!comparePassword){
        throw new BadRequestError("Wrong password try again...","loginUser method")
    }

    const refresh_token = RefreshToken(user.email)
    await UpdateRefreshToken(user._id,refresh_token)
    const data = {
        username:user.username,
        email:user.email,
        profilePic:user.profilePic?.image_Url
    }

    const access_token = AccessToken(user._id,user.email)
     res.status(StatusCodes.OK).json({
        message:"Login successful",
        data,
        access_token,
        refresh_token
    })

})

export { createUser,loginUser }