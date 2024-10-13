import { config } from 'dotenv';
config();

interface Config {
  development: {
    username: string;
    password?: string;
    database?: string;
    host: string;
    dialect: string;
  };
  test: {
    username: string;
    password: null;
    database: string;
    host: string;
    dialect: string;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
  };
  [key: string]: {
    username: string;
    password?: string | null;
    database?: string;
    host: string;
    dialect: string;
  };
}
const configure: Config = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
  },

  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },

  production: {
    username: process.env.PRODUCTION_DB_USERNAME as string,
    password: process.env.PRODUCTION_DB_PASSWORD as string,
    database: process.env.PRODUCTION_DB_NAME as string,
    host: process.env.PRODUCTION_DB_HOST as string,
    dialect: 'mysql',
  },
};

export default configure;
