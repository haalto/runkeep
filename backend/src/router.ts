import { Router } from 'express';
import { userRouter } from './user/routes';
import { runRouter } from './run/routes';
import { loginRouter } from './authorization/login/routes';

const appRouter = Router();

appRouter.use('/api/users', userRouter);
appRouter.use('/api/runs', runRouter);
appRouter.use('/api/login', loginRouter);

export { appRouter };
