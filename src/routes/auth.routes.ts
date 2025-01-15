import { Router } from "express";
import { createUser } from "@/controllers/auth.controller";
import upload from "@/middleware/multer.middleware";


const router = Router();

export const AuthRoutes = () => {

    router.route("/create").post(upload.single("image"),createUser)



    return router
}