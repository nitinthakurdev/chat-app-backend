import { json, NextFunction, Request, Response, urlencoded, type Application } from "express";
import http from "http";
import cors from "cors";
import { HealthRoute } from "@/controllers/health";
import { RootRouter } from "@/routes";
import { checkDbConnection } from "@/lib/DB.lib";
import { config } from "@/config/env.config";
import { CustomError } from "@/utils/CustomError";

const SERVER_PORT = 4000;


export function Start(app: Application) {
    middlewares(app);
    Routes(app);
    DbConnections();
    ErrorHandler(app);
    startServer(app);
}

function middlewares(app: Application) {
    app.use(json({ limit: "20mb" }));
    app.use(urlencoded({ extended: true, limit: "20mb" }))
    app.use(cors());
}

function Routes(app: Application) {
    app.use("/api/v1", RootRouter())
    app.use("/", HealthRoute)
}


function ErrorHandler(app: Application) {
    app.use((err: Error,_req: Request,res: Response,_next: NextFunction) => {
        if (err instanceof CustomError) {
           res.status(err.statusCode).json({ error: err.message });
           return
        }
  
        console.error("Unhandled Error:", err); 
         res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }

function DbConnections() {
    checkDbConnection(config.MONGODB_URI)
}

function startServer(app: Application) {
    const server: http.Server = http.createServer(app);
    server.listen(SERVER_PORT);
    console.log(`Server is up and running on Port : ${SERVER_PORT}`);
}