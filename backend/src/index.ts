import express from 'express';
import { PORT } from './utils/config';
import { db } from './db/db';
import { json } from 'body-parser';
import cors from 'cors';
import { appRouter } from './router';
const app = express();

db();

app.use(cors());
app.use(json());
app.use('/', appRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
