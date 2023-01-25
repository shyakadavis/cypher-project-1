import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  ModelDefined,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from 'sequelize';
import sequelizeConnection from '../config';


// the `sequelize` instance imported from config
const sequelize = sequelizeConnection;

// 'billingAddress' is excluded as it's not an attribute, it's an association.
class User extends Model<InferAttributes<User, { omit: 'billingAddress' }>, InferCreationAttributes<User, { omit: 'billingAddress' }>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare name: string;
  declare preferredName: string | null; // for nullable fields
  declare email: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getBillingAddress: HasManyGetAssociationsMixin<BillingAddress>; // Note the null assertions!
  declare addBillingAddress: HasManyAddAssociationMixin<BillingAddress, number>;
  declare addBillingAddresses: HasManyAddAssociationsMixin<BillingAddress, number>;
  declare setBillingAddress: HasManySetAssociationsMixin<BillingAddress, number>;
  declare removeBillingAddress: HasManyRemoveAssociationMixin<BillingAddress, number>;
  declare removeBillingAddresses: HasManyRemoveAssociationsMixin<BillingAddress, number>;
  declare hasBillingAddress: HasManyHasAssociationMixin<BillingAddress, number>;
  declare hasBillingAddresses: HasManyHasAssociationsMixin<BillingAddress, number>;
  declare countBillingAddress: HasManyCountAssociationsMixin;
  declare createBillingAddress: HasManyCreateAssociationMixin<BillingAddress, 'ownerId'>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare billingAddress?: NonAttribute<BillingAddress[]>; // Note this is optional since it's only populated when explicitly requested in code

    // getters that are not attributes should be tagged using NonAttribute
  // to remove them from the model's Attribute Typings.
  get fullName(): NonAttribute<string> {
    return this.name;
  }

   declare static associations: {
    billingAddress: Association<User, BillingAddress>;
  };
}

class BillingAddress extends Model<
  InferAttributes<BillingAddress>,
  InferCreationAttributes<BillingAddress>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;

  // foreign keys are automatically added by associations methods (like BillingAddress.belongsTo)
  // by branding them using the `ForeignKey` type, `BillingAddress.init` will know it does not need to
  // display an error if ownerId is missing.
  declare ownerId: ForeignKey<User['id']>;
  declare name: string;

  // `owner` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare owner?: NonAttribute<User>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {
  declare userId: ForeignKey<User['id']>;
  declare address: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}


BillingAddress.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'billingAddress',
  },
);

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email:{
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

Address.init(
  {
    address: {
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

// You can also define modules in a functional way
interface NoteAttributes {
  id: number;
  title: string;
  content: string;
}

// You can also set multiple attributes optional at once
type NoteCreationAttributes = Optional<NoteAttributes, 'id' | 'title'>;

// And with a functional approach defining a module looks like this
const Note: ModelDefined<
  NoteAttributes,
  NoteCreationAttributes
> = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new DataTypes.STRING(64),
      defaultValue: 'Unnamed Note'
    },
    content: {
      type: new DataTypes.STRING(4096),
      allowNull: false
    }
  },
  {
    tableName: 'notes'
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(BillingAddress, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'billingAddress' // this determines the name in `associations`!
});

Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });

async function doStuffWithUser() {
  const newUser = await User.create({
    name: 'Johnny',
    preferredName: 'John',
    email: 'johnny@gmail.com'
  });
  console.log(newUser.id, newUser.name, newUser.preferredName);

  const billingAddress = await newUser.createBillingAddress({
    name: 'first!',
  });

  const ourUser = await User.findByPk(1, {
    include: [User.associations.billingAddress],
    rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  });

  // Note the `!` null assertion since TS can't know if we included
  // the model or not
  console.log(ourUser.billingAddress![0].name);
}

(async () => {
  await sequelize.sync();
  await doStuffWithUser();
})();