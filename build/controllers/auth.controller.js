import { CreateUser, findByEmailOrUsername, findById, getUsers, UpdateProfile, UpdateRefreshToken } from '../services/auth.service';
import { AsyncHandler } from '../utils/asyncHandler';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../utils/CustomError';
import { UploadOnCloudinary } from '../utils/imageUploader';
import { AccessToken, RefreshToken } from '../utils/tokens';
import { StatusCodes } from 'http-status-codes';
import { compare } from 'bcryptjs';
import { config } from '../config/env.config';
const options = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: config.NODE_ENV !== 'development',
};
const options2 = {
    maxAge: 25 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: config.NODE_ENV !== 'development',
};
const createUser = AsyncHandler(async (req, res) => {
    const data = req.body;
    const user = await findByEmailOrUsername(data.email);
    if (user) {
        throw new BadRequestError('User already exist', 'createUser methord');
    }
    const profilePic = await UploadOnCloudinary(data.image, '', true, true);
    const refresh_token = RefreshToken({ email: data.email });
    const result = await CreateUser({ ...data, profilePic, refresh_token });
    const newresult = {
        _id: result._id,
        email: result.email,
        username: result.email,
        profilePic: result.profilePic?.image_Url,
    };
    const access_token = AccessToken({ id: result._id, email: result.email });
    res.cookie('ajt', access_token, options).cookie('rjt', refresh_token, options2);
    res.status(StatusCodes.OK).json({
        message: 'User created successful',
        newresult,
        access_token,
        refresh_token,
    });
});
const loginUser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await findByEmailOrUsername(username);
    if (!user) {
        throw new NotFoundError('User Not Exist', 'loginUser method');
    }
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
        throw new BadRequestError('Wrong password try again...', 'loginUser method');
    }
    const refresh_token = RefreshToken({ email: user.email });
    await UpdateRefreshToken(user._id, refresh_token);
    const data = {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic?.image_Url,
    };
    const access_token = AccessToken({ id: user._id, email: user.email });
    res.cookie('ajt', access_token, options).cookie('rjt', refresh_token, options2);
    res.status(StatusCodes.OK).json({
        message: 'Login successful',
        data,
        access_token,
        refresh_token,
    });
});
const logoutUser = AsyncHandler(async (req, res) => {
    await UpdateRefreshToken(req?.currentUser?.id, null);
    res.clearCookie('ajt').clearCookie('rjt').status(StatusCodes.OK).json({
        message: 'Logout Successful',
    });
});
const updateProfile = AsyncHandler(async (req, res) => {
    const data = req.currentUser;
    const { image } = req.body;
    if (!image) {
        throw new NotFoundError('image not found', 'createUser Method');
    }
    const user = await findById(data?.id);
    if (!user) {
        throw new NotFoundError('User not found try again...', 'updateProfile method');
    }
    const profilePic = (await UploadOnCloudinary(image, user.profilePic?.image_id, true, true));
    await UpdateProfile(user._id, profilePic);
    res.status(StatusCodes.OK).json({
        message: 'Profile Update Successful',
    });
});
const getLoginUser = AsyncHandler(async (req, res) => {
    const user = await findById(req.currentUser?.id);
    if (!user) {
        throw new NotAuthorizedError('User not Autherize', 'getLoginUser method');
    }
    res.status(StatusCodes.OK).json({
        message: 'data found',
        user,
    });
});
const getAllUser = AsyncHandler(async (req, res) => {
    const id = req.currentUser?.id;
    const data = await getUsers(id);
    res.status(StatusCodes.OK).json({
        message: 'All users',
        data,
    });
});
export { createUser, loginUser, logoutUser, updateProfile, getLoginUser, getAllUser };
