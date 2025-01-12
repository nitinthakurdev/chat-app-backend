import type { Application } from "express";
import http from "http";

const SERVER_PORT = 4000;

export function Start (app:Application){
    startServer(app)
}

function startServer(app:Application){
    const server:http.Server = http.createServer(app)
    server.listen(SERVER_PORT)
    console.log(`Server is up and running on Port : ${SERVER_PORT}`)
}