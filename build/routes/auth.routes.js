import { Router } from 'express';
import { createUser, getAllUser, getLoginUser, loginUser, logoutUser, updateProfile } from '@/controllers/auth.controller';
import { UserLoginValidation, UserValidation } from '@/helpers/healper';
import { Authentication } from '@/middleware/authentication';
const router = Router();
export const AuthRoutes = async () => {
    router.route('/create').post(UserValidation, createUser);
    router.route('/login').post(UserLoginValidation, loginUser);
    router.route('/logout').post(Authentication, logoutUser);
    router.route('/update-profile').patch(Authentication, updateProfile);
    router.route('/login-user').get(Authentication, getLoginUser);
    router.route('/all-users').get(Authentication, getAllUser);
    return router;
};
