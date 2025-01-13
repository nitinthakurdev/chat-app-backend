import { Router } from "express";
import { createUser } from "@/controllers/auth.controller";


const router = Router();

export const AuthRoutes = () => {

    router.route("/create").post(createUser)



    return router
}