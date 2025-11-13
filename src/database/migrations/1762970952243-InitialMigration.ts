import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762970952243 implements MigrationInterface {
    name = 'InitialMigration1762970952243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD "ip_address" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP COLUMN "user_agent"`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD "user_agent" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP COLUMN "device_name"`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD "device_name" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "tb_users" ALTER COLUMN "last_access_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users" ALTER COLUMN "inactivated_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users" ALTER COLUMN "inactivated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users" ALTER COLUMN "last_access_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP COLUMN "device_name"`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD "device_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP COLUMN "user_agent"`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD "user_agent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD "ip_address" character varying NOT NULL`);
    }

}
