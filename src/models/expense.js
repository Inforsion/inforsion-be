const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Expense = sequelize.define('Expense', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'stores',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expenseDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: true
        },
        receipt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isRecurring: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        recurringPeriod: {
            type: DataTypes.STRING,
            allowNull: true
        },
        taxDeductible: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        approvedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
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
        tableName: 'expenses',
        timestamps: true,
        indexes: [
            {
                fields: ['storeId', 'expenseDate']
            }
        ]
    });

    Expense.associate = (models) => {
        Expense.belongsTo(models.Store, {
            foreignKey: 'storeId',
            as: 'store'
        });
        Expense.belongsTo(models.User, {
            foreignKey: 'approvedBy',
            as: 'approver'
        });
    };

    return Expense;
};