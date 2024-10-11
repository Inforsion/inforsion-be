import sequelize, {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare username: string;
  declare email: string;
  declare password: string;
}

const initModel = (sequelize: Sequelize) => {
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Users',
      tableName: 'users',
      timestamps: true,
      sequelize,
    }
  );
};

export { Users, initModel };
