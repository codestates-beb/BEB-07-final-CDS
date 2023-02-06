import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  createUsersTable,
  createSwapsTable,
  createTrasactionsTable,
} from './queries';

export class SequelizeToTypeOrm1675407005234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(createUsersTable);
    await queryRunner.query(createSwapsTable);
    await queryRunner.query(createTrasactionsTable);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE transactions`);
    await queryRunner.query(`DROP TABLE swaps`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
