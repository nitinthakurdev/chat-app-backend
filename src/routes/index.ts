import { Router } from "express";
import { AuthRoutes } from "@/routes/auth.routes";

const router = Router();

export const RootRouter = ():Router => {
    router.use("/auth",AuthRoutes())
    return router
}