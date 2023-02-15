import { DataSource } from 'typeorm';

async function clearRecords(appDataSource: DataSource): Promise<void> {
  for await (let table of appDataSource.entityMetadatas) {
    const tableName = table.tableName;
    const repo = appDataSource.getRepository(tableName);
    if (tableName === 'users') {
      const users = await repo.find({});
      for await (let user of users) {
        user.email = user.email ? user.email : null;
        user.nickname = user.nickname
          ? user.nickname
          : 'anonymous_' + user.address.slice(2, 7);
        user.soldCount = 0;
        user.boughtCount = 0;
        user.lastSold = null;
        user.lastBought = null;
        user.updatedAt = user.createdAt;
        user.nonce = null;
        await appDataSource.manager.save(user);
      }
    } else {
      await repo
        .createQueryBuilder()
        .delete()
        .from(tableName)
        .where('true=true')
        .execute()
        .then((log) => console.log(`${tableName} table cleared : `, log));
    }
  }
}

export default clearRecords;
