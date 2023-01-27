import { AppDataSource } from './data-source';
import { Swaps } from './entities/Swaps';
import { Transactions } from './entities/Transactions';
import { Users } from './entities/Users';
import { abi } from './contractArtifacts/CDS.json';
import CDS from './CDS';
import getEnv from './utils/getEnv';
const REMOTE_WEBSOCKET = getEnv('REMOTE_WEBSOCKET');

AppDataSource.initialize()
  .then(async () => {
    let cds = CDS.getInstance(REMOTE_WEBSOCKET, AppDataSource.manager);
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
      .then((log) => console.log('user table cleared : ', log));
    await transactionRepository
      .createQueryBuilder()
      .delete()
      .from(Transactions)
      .where('true=true')
      .execute()
      .then((log) => console.log('transaction table cleared : ', log));
    await swapRepository
      .createQueryBuilder()
      .delete()
      .from(Swaps)
      .where('true=true')
      .execute()
      .then((log) => console.log('swap table cleared : ', log));

    cds.setContract(abi, getEnv('CDS_CA'));
    cds.setFromBlock(getEnv('CDS_TXHASH', '0'));
    await cds.getPastEvents();

    cds.subEvents();
  })
  .catch((error) => console.log(error));
