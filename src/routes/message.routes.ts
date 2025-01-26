import { getUserMessages, sendUserMessage } from "@/controllers/message.controller";
import { Authentication } from "@/middleware/authentication";
import { Router } from "express";

const routes:Router = Router();

export const MessageRouter = async ():Promise<Router> => {
    routes.route("/get-messages/:id").get(Authentication,getUserMessages);
    routes.route("/send-messages/:id").post(Authentication,sendUserMessage);
    return routes
}