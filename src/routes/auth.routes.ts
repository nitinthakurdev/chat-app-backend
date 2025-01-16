import { Router } from "express";
import { createUser } from "@/controllers/auth.controller";
import upload from "@/middleware/multer.middleware";
import { UserValidation } from "@/helpers/healper";


const router = Router();

export const AuthRoutes = () => {

    router.route("/create").post(upload.single("image"),UserValidation,createUser)



    return router
}