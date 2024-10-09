import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import configure from '../config/config.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configure[env];
const db: {
  sequelize?: Sequelize;
  Sequelize?: Sequelize;
  [key: string]: any;
} = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    connectionTimeout: 60000,
    retry: {
      max: 10,
      timeout: 5000,
    },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
