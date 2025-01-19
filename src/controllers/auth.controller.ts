import { CreateUser, findByEmailOrUsername, findById, getUsers, UpdateProfile, UpdateRefreshToken } from "@/services/auth.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "@/utils/CustomError";
import { DeleteOnCloudinary, UploadOnCloudinary } from "@/utils/imageUploader";
import { AccessToken, RefreshToken } from "@/utils/tokens";
import { CookieOptions, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { compare } from "bcryptjs";
import { config } from "@/config/env.config";
import { ObjectId } from "mongoose";

const options: CookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: config.NODE_ENV !== "development"
}

const options2: CookieOptions = {
    maxAge: 25 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: config.NODE_ENV !== "development"
}



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

    const profilePic = await UploadOnCloudinary(file.path);
    const refresh_token = RefreshToken({ email: data.email });
    const result = await CreateUser({ ...data, profilePic, refresh_token });

    const newresult = {
        _id: result._id,
        email: result.email,
        username: result.email,
        profilePic: result.profilePic?.image_Url
    }

    const access_token = AccessToken({ id: result._id, email: result.email })
    res.cookie("ajt", access_token, options).cookie("rjt", refresh_token, options2)

    res.status(StatusCodes.OK).json({
        message: "test",
        newresult,
        access_token,
        refresh_token
    })
})

const loginUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body as { username: string; password: string };

    const user = await findByEmailOrUsername(username);
    if (!user) {
        throw new NotFoundError("User Not Exist", "loginUser method")
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
        throw new BadRequestError("Wrong password try again...", "loginUser method")
    }

    const refresh_token = RefreshToken({ email: user.email })
    await UpdateRefreshToken(user._id, refresh_token)
    const data = {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic?.image_Url
    }

    const access_token = AccessToken({ id: user._id, email: user.email })
    res.cookie("ajt", access_token, options).cookie("rjt", refresh_token, options2)
    res.status(StatusCodes.OK).json({
        message: "Login successful",
        data,
        access_token,
        refresh_token
    })

})

const logoutUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    await UpdateRefreshToken(req?.currentUser?.id as ObjectId, null)
    res.clearCookie("ajt").clearCookie("rjt").status(StatusCodes.OK).json({
        message: "Logout Successful"
    })
})

const updateProfile = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data = req.currentUser;
    const file = req.file;

    if (!file) {
        throw new NotFoundError("file not found", "createUser Method");
    };
    const user = await findById(data?.id as ObjectId);
    if(!user){
        throw new NotFoundError("User not found try again...","updateProfile method");
    };

    const isImageDelete = await DeleteOnCloudinary(user.profilePic?.image_id as string);
    if(!isImageDelete) {
        throw new BadRequestError("Image Id is wrong","updateProfile method")
    }
    const profilePic = await UploadOnCloudinary(file?.path as string);

    await UpdateProfile(user._id,profilePic)
    res.status(StatusCodes.OK).json({
        message:"Profile Update Successful"
    })
})

const getLoginUser = AsyncHandler(async (req:Request,res:Response):Promise<void> => {
    const user = await findById(req.currentUser?.id as ObjectId)
    if(!user){
        throw new NotAuthorizedError("User not Autherize","getLoginUser method")
    }
    res.status(StatusCodes.OK).json({
        message:"data found",
        user
    })
})

const getAllUser = AsyncHandler(async (req:Request,res:Response):Promise<void> => {
    const id = req.currentUser?.id as ObjectId;
    const data = await getUsers(id);
    res.status(StatusCodes.OK).json({
        message:"All users",
        data
    })
})

export { createUser, loginUser, logoutUser, updateProfile,getLoginUser,getAllUser }