import { Server } from 'socket.io';
export async function socketIOConnections(httpserver) {
    const io = new Server(httpserver, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        },
    });
    io.on('connection', (socket) => {
        console.log('A user Socket connected id is : %s', socket.id);
    });
    io.on('disconnect', (reason) => {
        console.log('A user Socket disconneted', reason);
    });
    return io;
}
