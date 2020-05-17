import Knex from 'knex';
import * as config from '../../knexfile';

export const db = Knex(config);

db.raw('select 1')
  .then(() => {
    console.log(`Connected to database - OK`);
  })
  .catch((err) => {
    console.error(`Failed to connect to database: ${err}`);

    process.exit(1);
  });
