import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      order: {
        type: DataTypes.INTEGER,
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
      tableName: 'categories',
      timestamps: true,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products',
    });

    Category.belongsTo(Category, {
      foreignKey: 'parentId',
      as: 'parent',
    });

    Category.hasMany(Category, {
      foreignKey: 'parentId',
      as: 'children',
    });
  };

  return Category;
};
