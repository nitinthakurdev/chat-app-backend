import { Request, Response } from 'express';

export const HealthRoute = (_req: Request, res: Response) => {
  res.send('server is healthy and ok');
};
