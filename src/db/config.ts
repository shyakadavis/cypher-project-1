import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// configure dotenv. This is done once, don't re-configure it anywhere else.
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
// dialect needs to explicity stated - that is why it was changed from the previous commits where the driver was accessed from .env
// if you try to define the driver from the .env it will throw a fat error ❗👺

// creating an instance of Sequelize which will be used in different places, including our schemas.
export const sequelize = new Sequelize(
  `${dbName}`,
  `${dbUser}`,
  `${dbPassword}`,
  {
    host: dbHost,
    dialect: 'postgres',
  },
);

const sequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(` 🟢 Successfully connected to the db... 😄 🟢`);
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows error is Error
      console.log(
        ` ❗❗❗ Error occurred when connecting to the db: 😟 🔴 ${error.message} 🔴`,
      );
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// this is to run our migrations when connected to the db
sequelize
  .sync()
  .then(() => {
    console.log(' 🟢 Tables migrated successfully 😄 🟢');
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log(
        `🔴 Error occurred when migrating tables: 😟 ${error.message} 🔴 `,
      );
    } else {
      console.log('Unexpected error', error);
    }
  });

export default sequelizeConnection;
