import Sequelize from 'sequelize';
import { sequelize } from '../config';
import bcrypt from 'bcrypt';

export const User = sequelize.define(
  'user',
  {
    surName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    givenName: {
      type: Sequelize.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    district: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sector: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cell: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: 'users',
  },
);
