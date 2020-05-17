import { Router } from 'express';
import {
  getRun,
  getRuns,
  deleteRun,
  updateRun,
  createRun,
} from './controllers';

const runRouter = Router();

runRouter.get('/', getRuns);

runRouter.get('/:id', getRun);

runRouter.post('/', createRun);

runRouter.put('/', updateRun);

runRouter.delete('/', deleteRun);
