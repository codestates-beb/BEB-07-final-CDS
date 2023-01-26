import { AppDataSource } from './data-source';
import { Swaps } from './entities/Swaps';
import { Transactions } from './entities/Transactions';
import { Users } from './entities/Users';
import { abi } from './contractArtifacts/CDS.json';
import CDS from './CDS';
import getEnv from './utils/getEnv';

AppDataSource.initialize()
  .then(async () => {
    let cds = CDS.getInstance(
      'ws://20.214.105.181:8545',
      AppDataSource.manager,
    );
    // let cds = CDS.getInstance('ws://localhost:8545');
    const userRepository = AppDataSource.getRepository(Users);
    const transactionRepository = AppDataSource.getRepository(Transactions);
    const swapRepository = AppDataSource.getRepository(Swaps);
    await userRepository
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where('true=true')
      .execute()
      .then((data) => console.log('user table cleared : ', data));
    await transactionRepository
      .createQueryBuilder()
      .delete()
      .from(Transactions)
      .where('true=true')
      .execute()
      .then((data) => console.log('transaction table cleared : ', data));
    await swapRepository
      .createQueryBuilder()
      .delete()
      .from(Swaps)
      .where('true=true')
      .execute()
      .then((data) => console.log('swap table cleared : ', data));

    cds.setContract(abi, getEnv('CDS_CA'));
    await cds.getPastEvents();

    cds.subEvents();
  })
  .catch((error) => console.log(error));
