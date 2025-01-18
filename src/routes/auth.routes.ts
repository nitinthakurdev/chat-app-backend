import { Router } from "express";
import { createUser, getAllUser, getLoginUser, loginUser, logoutUser, updateProfile } from "@/controllers/auth.controller";
import upload from "@/middleware/multer.middleware";
import { UserLoginValidation, UserValidation } from "@/helpers/healper";
import { Authentication } from "@/middleware/authentication";


const router:Router = Router();

export const AuthRoutes = async ():Promise<Router> => {

    router.route("/create").post(upload.single("image"),UserValidation,createUser);
    router.route("/login").post(UserLoginValidation,loginUser);
    router.route("/logout").get(Authentication,logoutUser);
    router.route("/update-profile").patch(Authentication,upload.single("image"),updateProfile);
    router.route("/login-user").get(Authentication,getLoginUser);
    router.route("/all-users").get(Authentication,getAllUser);

    return router;
};