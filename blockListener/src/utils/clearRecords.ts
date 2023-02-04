import { DataSource } from 'typeorm';

async function clearRecords(appDataSource: DataSource): Promise<void> {
  for await (let table of appDataSource.entityMetadatas) {
    const tableName = table.tableName;
    const repo = appDataSource.getRepository(tableName);
    await repo
      .createQueryBuilder()
      .delete()
      .from(tableName)
      .where('true=true')
      .execute()
      .then((log) => console.log(`${tableName} table cleared : `, log));
  }
}

export default clearRecords;
