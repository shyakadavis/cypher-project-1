import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Sequelize,
  DataTypes,
} from 'sequelize';
import User from './user.model';
import sequelizeConnection from '../config';

const sequelize = sequelizeConnection;

export default class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {
  declare addressId: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare province: string;
  declare district: string;
  declare street: string;
  declare cell: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });

export const AddressMap = (sequelize: Sequelize) => {
  Address.init(
    {
      addressId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      province: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      district: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      street: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      cell: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'address',
      sequelize, // passing the `sequelize` instance is required
    },
  );
};
