import { Router } from "express";
import { CreateGroup, GetGroup } from "../controllers/group.controller";
import { Authentication } from "../middleware/authentication";
const routes = Router();
export const GroupRouter = async () => {
    routes.route("/create").post(Authentication, CreateGroup);
    routes.route("/get").get(Authentication, GetGroup);
    return routes;
};
