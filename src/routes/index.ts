import { Router } from 'express';
import { AuthRoutes } from '@/routes/auth.routes';
import { MessageRouter } from '@/routes/message.routes';

const router: Router = Router();

export const RootRouter = async (): Promise<Router> => {
  router.use('/auth', await AuthRoutes());
  router.use('/messages', await MessageRouter());
  return router;
};
