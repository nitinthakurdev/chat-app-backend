import { GroupModel } from "@/models/Groups.models";
export const createGroup = async (data) => {
    const result = (await GroupModel.create(data));
    return result;
};
export const getGroupById = async (id) => {
    const result = await GroupModel.find({ $or: [{ admin: id }, { users: id }] }).exec();
    return result;
};
export const getGroupByAdminAndName = async (admin, name) => {
    const result = await GroupModel.findOne({ admin, name }).exec();
    return result;
};
