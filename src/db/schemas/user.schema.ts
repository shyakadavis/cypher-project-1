import Sequelize from 'sequelize';
import { sequelize } from '../config';

export const User = sequelize.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    district: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    sector: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cell: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: 'users',
  },
);
