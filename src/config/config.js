import { config } from 'dotenv';
config();

const development = {
  username: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: '127.0.0.1',
  dialect: 'mysql',
};

const test = {
  username: 'root',
  password: null,
  database: 'database_test',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const production = {
  username: process.env.PRODUCTION_DB_USERNAME,
  password: process.env.PRODUCTION_DB_PASSWORD,
  database: process.env.PRODUCTION_DB_NAME,
  host: process.env.PRODUCTION_DB_HOST,
  dialect: 'mysql',
};

export default { development, test, production };
