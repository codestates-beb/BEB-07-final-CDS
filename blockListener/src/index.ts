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
    cds.setContract(abi, getEnv('CDS_CA'));
    cds.subEvents();
    await cds.getPastEvents();
  })
  .catch((error) => console.log(error));
