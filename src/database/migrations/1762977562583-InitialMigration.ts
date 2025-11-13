import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762977562583 implements MigrationInterface {
    name = 'InitialMigration1762977562583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_links" ADD "click_count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_links" DROP COLUMN "click_count"`);
    }

}
