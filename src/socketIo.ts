import { Server } from "socket.io";
import http from "http";

export async function socketIOConnections(httpserver: http.Server): Promise<Server> {
    const io: Server = new Server(httpserver, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
        }
    })

    
    io.on("connection", (socket) => {
        console.log("A user Socket connected id is : %s", socket.id);
    })

    io.on("disconnect", (reason) => {
        console.log("A user Socket disconneted", reason)
    })

    return io
}