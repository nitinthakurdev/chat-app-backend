import { Router } from 'express';
import { AuthRoutes } from '@/routes/auth.routes';
import { MessageRouter } from '@/routes/message.routes';
import { GroupRouter } from './group.routes';
const router = Router();
export const RootRouter = async () => {
    router.use('/auth', await AuthRoutes());
    router.use('/messages', await MessageRouter());
    router.use('/group', await GroupRouter());
    return router;
};
