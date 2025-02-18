import { json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import { HealthRoute } from '@/controllers/health';
import { RootRouter } from '@/routes';
import { checkDbConnection } from '@/lib/DB.lib';
import { config } from '@/config/env.config';
import { BadRequestError, CustomError } from '@/utils/CustomError';
import cookieParser from 'cookie-parser';
import { socketIOConnections } from '@/socketIo';
const SERVER_PORT = 4000;
let SocketIo;
async function Start(app) {
    middlewares(app);
    await Routes(app);
    DbConnections();
    ErrorHandler(app);
    await startServer(app);
}
function middlewares(app) {
    app.use(json({ limit: '20mb' }));
    app.use(urlencoded({ extended: true, limit: '20mb' }));
    app.use(cookieParser());
    app.use(cors({
        origin: `${config.CLIENT_URL}`,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }));
}
async function Routes(app) {
    app.use('/api/v1', await RootRouter());
    app.use('/health', HealthRoute);
    app.all('*', (_req, _res, next) => {
        next(new BadRequestError('path not found in server', 'Routes method'));
    });
}
function ErrorHandler(app) {
    app.use((error, _req, res, next) => {
        if (error instanceof CustomError) {
            console.log('error', `GatewayService ${error.comingFrom}:`, error);
            res.status(error.statusCode).json(error.serializeErrors());
        }
        next();
    });
}
function DbConnections() {
    checkDbConnection(config.MONGODB_URI);
}
async function startServer(app) {
    const server = http.createServer(app);
    const io = await socketIOConnections(server);
    SocketIo = io;
    server.listen(SERVER_PORT);
    console.log('Server is up and running on Port : %d', SERVER_PORT);
}
export { Start, SocketIo };
