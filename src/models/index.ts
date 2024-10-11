import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Options } from 'sequelize';
import process from 'process';
import configure from '../config/config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configure[env];

interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
}

const db: DB = {} as DB;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
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
  } as Options
);

const loadModel = async (file: string) => {
  const modelPath = path.join(__dirname, file);
  const model = (await import(modelPath)).default(sequelize, DataTypes);
  return model;
};

(async () => {
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
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
      console.log(db[modelName]);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
})();

export default db;
