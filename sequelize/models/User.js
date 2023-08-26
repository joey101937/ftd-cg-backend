import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    metadata: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};