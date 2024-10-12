import fs from 'fs';
import path from 'path';
import { DataTypes, Options, Sequelize } from 'sequelize';
import configure from '../config/config';
import dotenv from 'dotenv';
dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configure[env];

console.log('환경', env);

interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
}

const db: DB = {} as DB;

const sequelize = new Sequelize(
  config.database!,
  config.username,
  config.password!,
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
    dialect: 'mysql',
  } as Options
);

const loadModel = async (file: string) => {
  const modelPath = path.join(__dirname, file);
  return await import(modelPath);
};

const initializeModels = async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test.') === -1
    );
  });

  for (const file of files) {
    const model = await loadModel(file);
    if (model.initModel) {
      model.initModel(sequelize);
      db[model.default.name] = model.default;
    }
  }

  console.log(db);
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

initializeModels();

export default db;
