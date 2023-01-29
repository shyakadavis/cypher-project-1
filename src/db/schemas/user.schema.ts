import Sequelize from 'sequelize';
import { sequelize } from '../config';
import bcrypt from 'bcrypt';
export const User = sequelize.define(
  'user',
  {
    surName: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    },
    givenName: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(value, bcrypt.genSaltSync(8)),
        );
      },
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
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: 'users',
  },
);
