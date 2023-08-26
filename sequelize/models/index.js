import { Sequelize } from 'sequelize';
import User from './User';

export const getSequelize = () => {

  const sequelize = new Sequelize(process.env.DB_URL);
  
  const out = {
    models: {
      User: User(sequelize, Sequelize.DataTypes),
    },
    sequelize,
    Sequelize: Sequelize,
  }
  return out;
}