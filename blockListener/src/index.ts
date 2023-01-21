import { AppDataSource } from './data-source';
// import { User } from './entity/User';
import { Swaps } from './entity/Swaps';
import { Transactions } from './entity/Transactions';
import { Users } from './entity/Users';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');
    const user = new Users();
    user.address = '0x0000';
    user.nickname = 'seol';
    user.boughtCount = 0;
    user.soldCount = 0;
    user.lastBought = new Date();
    user.lastBought = new Date();

    await AppDataSource.manager.save(user);
    console.log('Saved a new user with id: ' + user.nickname);

    console.log('Loading users from the database...');
    const users = await AppDataSource.manager.find(Users);
    console.log('Loaded users: ', users);

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );
  })
  .catch((error) => console.log(error));
