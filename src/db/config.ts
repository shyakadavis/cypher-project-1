import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
// dialect needs to explicity stated - that is why it was changed from the previous commits where the driver was accessed from .env
// if you try to define the driver from the .env it will throw a fat error ❗👺
const sequelizeConnection = async () => {
  try {
    const sequelize = new Sequelize(`${dbName}`, `${dbUser}`, `${dbPassword}`, {
      host: dbHost,
      dialect: 'postgres',
    });
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

export default sequelizeConnection;
