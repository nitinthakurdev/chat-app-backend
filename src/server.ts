import { json,urlencoded, type Application } from "express";
import http from "http";
import cors from "cors";
import { HealthRoute } from "@/controllers/health";
import { RootRouter } from "@/routes";

const SERVER_PORT = 4000;

export function Start(app: Application) {
    middlewares(app);
    Routes(app);
    startServer(app);
}

function middlewares(app: Application) {
    app.use(json({ limit: "20mb" }));
    app.use(urlencoded({ extended: true, limit: "20mb" }))
    app.use(cors());
}

function Routes(app: Application) {
    app.use("/api/v1",RootRouter())
    app.use("/",HealthRoute)
}

function startServer(app: Application) {
    const server: http.Server = http.createServer(app);
    server.listen(SERVER_PORT);
    console.log(`Server is up and running on Port : ${SERVER_PORT}`);
}