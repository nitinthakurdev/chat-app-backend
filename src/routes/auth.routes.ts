import { Router } from "express";
import { createUser, loginUser } from "@/controllers/auth.controller";
import upload from "@/middleware/multer.middleware";
import { UserLoginValidation, UserValidation } from "@/helpers/healper";
import { Authentication } from "@/middleware/authentication";


const router = Router();

export const AuthRoutes = () => {

    router.route("/create").post(upload.single("image"),UserValidation,createUser);
    router.route("/login").post(UserLoginValidation,loginUser);
    router.route("/logout").get(Authentication,loginUser);

    return router
}