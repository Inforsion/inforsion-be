const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Store = sequelize.define('Store', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        openingHours: {
            type: DataTypes.JSON,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'stores',
        timestamps: true
    });

    Store.associate = (models) => {
        Store.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'owner'
        });
        // Store.hasMany(models.Product, {
        //     foreignKey: 'storeId',
        //     as: 'products'
        // });
        // Store.hasMany(models.Order, {
        //     foreignKey: 'storeId',
        //     as: 'orders'
        // });
        // Store.hasMany(models.Expense, {
        //     foreignKey: 'storeId',
        //     as: 'expenses'
        // });
    };

    return Store;
};