import { UserModel } from "@/models/user.models";
import { IAuthResponse, IImageSchema } from "@/types/auth.types";
import { ObjectId } from "mongoose";

export const findByEmailOrUsername = async (value:string):Promise<IAuthResponse | null> => {
    const data = await UserModel.findOne({$or:[{email:value},{username:value}]}).exec() as IAuthResponse;
    return data;
};

export const findById = async (id:ObjectId):Promise<IAuthResponse | null> => {
    const user = await UserModel.findById(id).select("-password").exec() as IAuthResponse;
    return user
}

export const CreateUser = async (data:IAuthResponse):Promise<IAuthResponse> => {
    const user = await UserModel.create(data) as IAuthResponse;
    return user ;
};

export const UpdateProfile = async(id:ObjectId,profilePic:IImageSchema):Promise<IAuthResponse | null> => {
    const user = await UserModel.findByIdAndUpdate(id,{profilePic}).exec() as IAuthResponse;
    return user;
}

export const UpdateRefreshToken = async(id:ObjectId,refresh_token:string | null):Promise<IAuthResponse | null> => {
    const data = await UserModel.findByIdAndUpdate(id,{refresh_token}).exec() as IAuthResponse;
    return data
}

export const getUsers = async(id:ObjectId):Promise<IAuthResponse[] | []> => {
    const data = await UserModel.find({_id:{$ne:id}}).select("-password").exec() as IAuthResponse[];
    return data
}