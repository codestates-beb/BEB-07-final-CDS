import { AppDataSource } from './data-source';
// import { Swaps } from './entities/Swaps';
// import { Transactions } from './entities/Transactions';
// import { Users } from './entities/Users';
import { abi } from './contractArtifacts/CDS.json';
import CDS from './CDS';
import getEnv from './utils/getEnv';
import clearRecords from './utils/clearRecords';
const REMOTE_WEBSOCKET = getEnv('REMOTE_WEBSOCKET');
const GETH_WEBSOCKET = getEnv('GETH_WEBSOCKET');

AppDataSource.initialize()
  .then(async () => {
    await clearRecords(AppDataSource);

    // let cds = CDS.getInstance(REMOTE_WEBSOCKET, AppDataSource.manager);
    let cds = CDS.getInstance(GETH_WEBSOCKET, AppDataSource.manager);
    cds.setContract(abi, getEnv('CDS_CA'));
    cds.setFromBlock(getEnv('CDS_TXHASH', '0'));
    await cds.getPastEvents();

    cds.subEvents();
  })
  .catch((error) => console.log(error));
