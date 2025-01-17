import { UserModel } from "@/models/user.models";
import { IAuthResponse, IImageSchema } from "@/types";
import { ObjectId } from "mongoose";

export const findByEmailOrUsername = async (value:string):Promise<IAuthResponse | null> => {
    const data:IAuthResponse | null = await UserModel.findOne({$or:[{email:value},{username:value}]}).exec() as IAuthResponse;
    return data;
};

export const CreateUser = async (data:IAuthResponse):Promise<IAuthResponse> => {
    const user:IAuthResponse = await UserModel.create(data) as IAuthResponse;
    return user ;
};

export const UpdateProfile = async(id:ObjectId,imageUrl:IImageSchema):Promise<IAuthResponse | null> => {
    const user:IAuthResponse = await UserModel.findByIdAndUpdate(id,{imageUrl}).exec() as IAuthResponse;
    return user;
}

export const UpdateRefreshToken = async(id:ObjectId,refresh_token:string):Promise<IAuthResponse | null> => {
    const data:IAuthResponse = await UserModel.findByIdAndUpdate(id,{refresh_token}).exec() as IAuthResponse;
    return data
}