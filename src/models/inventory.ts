import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Inventory = sequelize.define(
    'Inventory',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '개',
      },
      minQuantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastRestockedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'inventories',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['storeId', 'productId'],
        },
      ],
    }
  );

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Store, {
      foreignKey: 'storeId',
      as: 'store',
    });
    Inventory.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return Inventory;
};
