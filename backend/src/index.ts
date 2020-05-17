import express from 'express';
import { PORT } from './utils/config';
import { db } from './db/db';
import userRouter from './User/routes';
import runRouter from './User/routes';
import { json } from 'body-parser';
import cors from 'cors';
const app = express();

db();

app.use(cors());
app.use(json());
app.use('/api/users', userRouter);
app.use('/api/runs', runRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
