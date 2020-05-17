require('ts-node/register');
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  client: 'pg',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
  },
  timezone: 'UTC',
};

/* 
  yarn run knex:migrate:make <table-name>
  yarn run knex:migrate:latest
*/
