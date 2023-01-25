import User, { UserMap } from '../db/models/user.model';
import sequelizeConnection from '../db/config';
const sequelize = sequelizeConnection;

async function doStuffWithUser() {
  const newUser = await User.create({
    name: 'Johnny',
    preferredName: 'John',
    email: 'johnny@gmail.com',
    province: 'Souther',
    district: 'Huye',
    street: 'Taba',
    cell: 'N/A',
  });
  console.log(newUser.id, newUser.name, newUser.preferredName);

  const ourUser = await User.findByPk(1, {
    include: [User.associations.address],
    rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  });

  console.log(ourUser.addressId);
}

(async () => {
  await sequelize.sync();
  await doStuffWithUser();
})();
