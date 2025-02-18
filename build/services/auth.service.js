import { UserModel } from '@/models/user.models';
export const findByEmailOrUsername = async (value) => {
    const data = (await UserModel.findOne({ $or: [{ email: value }, { username: value }] }).exec());
    return data;
};
export const findById = async (id) => {
    const user = (await UserModel.findById(id).select('-password').exec());
    return user;
};
export const CreateUser = async (data) => {
    const user = (await UserModel.create(data));
    return user;
};
export const UpdateProfile = async (id, profilePic) => {
    const user = (await UserModel.findByIdAndUpdate(id, { profilePic }).exec());
    return user;
};
export const UpdateRefreshToken = async (id, refresh_token) => {
    const data = (await UserModel.findByIdAndUpdate(id, { refresh_token }).exec());
    return data;
};
export const getUsers = async (id) => {
    const data = (await UserModel.find({ _id: { $ne: id } })
        .select('-password')
        .exec());
    return data;
};
