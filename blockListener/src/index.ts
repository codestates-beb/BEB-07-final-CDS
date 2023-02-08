import { AppDataSource } from './data-source';
import { abi } from './contractArtifacts/CDS.json';
import CDS from './CDS';
import getEnv from './utils/getEnv';
import clearRecords from './utils/clearRecords';
const REMOTE_WEBSOCKET = getEnv('REMOTE_WEBSOCKET');
const GETH_WEBSOCKET = getEnv('GETH_WEBSOCKET');
const NETWORK = getEnv('NETWORK');
const DB_SCHEMA = getEnv('DB_SCHEMA');
const CDS_CA = getEnv('CDS_CA');

AppDataSource.initialize()
  .then(async () => {
    const rpcEndpoint = NETWORK === 'geth' ? GETH_WEBSOCKET : REMOTE_WEBSOCKET;

    console.log('** META INFORMATION **');
    console.log(`WEB3 NETWORK : ${NETWORK}`);
    console.log(`RPC ENDPOINT : ${rpcEndpoint}`);
    console.log(`CDS_CA : ${CDS_CA}`);
    console.log(`DB SCHEMA: ${DB_SCHEMA}`);

    await clearRecords(AppDataSource);
    let cds = CDS.getInstance(rpcEndpoint, AppDataSource.manager);
    cds.setContract(abi, CDS_CA);
    cds.setFromBlock(getEnv('CDS_TXHASH', '0'));
    await cds.getPastEvents();

    cds.subEvents();
  })
  .catch((error) => console.log(error));
