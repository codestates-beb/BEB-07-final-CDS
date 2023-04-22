import * as dotenv from 'dotenv';
dotenv.config();
import CDS from './CDS';

console.log(Object.getOwnPropertyNames(CDS.prototype));

console.log(Object.entries(CDS));
console.log(CDS['getInstance']('123', '123' as any));
