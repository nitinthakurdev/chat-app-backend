import { json, NextFunction, Request, Response, urlencoded, type Application } from "express";
import http from "http";
import cors from "cors";
import { HealthRoute } from "@/controllers/health";
import { RootRouter } from "@/routes";
import { checkDbConnection } from "@/lib/DB.lib";
import { config } from "@/config/env.config";
import { BadRequestError, CustomError } from "@/utils/CustomError";
import { IErrorResponse } from "./types/error.types";
import cookieParser from "cookie-parser";

const SERVER_PORT = 4000;


export async function Start(app: Application) {
    middlewares(app);
   await Routes(app);
    DbConnections();
    ErrorHandler(app);
    startServer(app);
}

function middlewares(app: Application) {
    app.use(json({ limit: "20mb" }));
    app.use(urlencoded({ extended: true, limit: "20mb" }))
    app.use(cookieParser())
    app.use(cors({
        origin: `${config.CLIENT_URL}`,
        credentials: true,
        methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS']
    }));
}

async function Routes(app: Application) {
    app.use("/api/v1", await RootRouter());
    app.use("/health", HealthRoute);
    app.all("*", (_req: Request, _res: Response, next: NextFunction): void => {
        next(new BadRequestError("path not found in server", "Routes method"))
    })
}


function ErrorHandler(app: Application) {

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
            console.log('error', `GatewayService ${error.comingFrom}:`, error);
            res.status(error.statusCode).json(error.serializeErrors());
        }

        next();
    });
}

function DbConnections() {
    checkDbConnection(config.MONGODB_URI)
}

function startServer(app: Application) {
    const server: http.Server = http.createServer(app);
    server.listen(SERVER_PORT);
    console.log(`Server is up and running on Port : ${SERVER_PORT}`);
}