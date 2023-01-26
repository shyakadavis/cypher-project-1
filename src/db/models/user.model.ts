import {
  Association,
  DataTypes,
  Model,
  Sequelize,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from 'sequelize';
import sequelizeConnection from '../config';
import BillingAddress from './address.model';
import Address from './address.model';

// the `sequelize` instance imported from config
const sequelize = sequelizeConnection;

// 'billingAddress' is excluded as it's not an attribute, it's an association.
export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare name: string;
  declare preferredName: string | null; // for nullable fields
  declare email: string;
  declare addressId: ForeignKey<Address['addressId']>;
  declare province: ForeignKey<Address['province']>;
  declare district: ForeignKey<Address['district']>;
  declare street: ForeignKey<Address['street']>;
  declare cell: ForeignKey<Address['cell']>;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  // getters that are not attributes should be tagged using NonAttribute
  // to remove them from the model's Attribute Typings.
  get fullName(): NonAttribute<string> {
    return this.name;
  }

  declare static associations: {
    address: Association<User, Address>;
  };
}

export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      preferredName: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'users',
      sequelize, // passing the `sequelize` instance is required
    },
  );
  User.sync();
};

Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });
