import { GroupModel } from "@/models/Groups.models";
import { IGroupResponse } from "@/types/Group.types";
import { ObjectId } from "mongoose";


export const createGroup = async (data:IGroupResponse):Promise<IGroupResponse> => {
    const result = (await GroupModel.create(data)) as unknown  as IGroupResponse;
    return result  ;
}

export const getGroupById = async (id:ObjectId):Promise<IGroupResponse[] | null> => {
    const result = await GroupModel.find({ $or:[{admin:id},{users:id}] }).exec() as unknown as IGroupResponse[];
    return result;
}

export const getGroupByAdminAndName = async (admin:string, name:string):Promise<IGroupResponse | null> => {
    const result = await GroupModel.findOne({ admin, name }).exec() as unknown as IGroupResponse;
    return result;
}