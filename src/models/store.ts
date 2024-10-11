// import { Model, DataTypes, Sequelize, Association } from 'sequelize';
// import { UserInstance } from './user'; // 가정: User 모델이 정의되어 있음
// import { ProductInstance } from './product'; // 가정: Product 모델이 정의되어 있음
// import { ExpenseInstance } from './expense'; // 가정: Expense 모델이 정의되어 있음
//
// export interface StoreAttributes {
//   id?: number;
//   name: string;
//   location: string;
//   description?: string;
//   phoneNumber?: string;
//   email?: string;
//   openingHours?: object;
//   isActive: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
//   userId?: number;
// }
//
// export interface StoreInstance extends Model<StoreAttributes>, StoreAttributes {
//   getProducts: Association<StoreInstance, ProductInstance>['get'];
//   getExpenses: Association<StoreInstance, ExpenseInstance>['get'];
// }
//
// export default (sequelize: Sequelize) => {
//   const Store = sequelize.define<StoreInstance>(
//     'Store',
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       location: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       phoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       openingHours: {
//         type: DataTypes.JSON,
//         allowNull: true,
//       },
//       isActive: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//     },
//     {
//       tableName: 'stores',
//       timestamps: true,
//     }
//   );
//
//   Store.associate = (models: any) => {
//     Store.belongsTo(models.User, {
//       foreignKey: 'userId',
//       targetKey: 'id',
//       onDelete: 'cascade',
//       onUpdate: 'cascade',
//     });
//     Store.hasMany(models.Product, {
//       foreignKey: 'storeId',
//       as: 'products',
//     });
//     Store.hasMany(models.Expense, {
//       foreignKey: 'storeId',
//       as: 'expenses',
//     });
//   };
//
//   return Store;
// };

import sequelize, {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';
import models from './index';

class Stores extends Model<
  InferAttributes<Stores>,
  InferCreationAttributes<Stores>
> {
  declare name: string;
  declare location: string;
  declare description: string;
  declare phoneNumber: string;
  declare email: string;
  declare openingHours: object;
  declare isActive: boolean;
}

const initModel = (sequelize: Sequelize) => {
  Stores.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      openingHours: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      modelName: 'Stores',
      tableName: 'stores',
      timestamps: true,
      sequelize,
    }
  );
};

const associate = (db: any) => {
  Stores.belongsTo(db.Users, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
};

export { Stores, initModel, associate };
