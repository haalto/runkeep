import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './controllers';
const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;
