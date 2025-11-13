import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762976405008 implements MigrationInterface {
    name = 'InitialMigration1762976405008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_links" ("idtb_links" SERIAL NOT NULL, "short_code" character varying(6) NOT NULL, "original_url" text NOT NULL, "inactivated_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idtb_users" integer, CONSTRAINT "UQ_c55a1b9d5b5e4f1fff2a4faff26" UNIQUE ("short_code"), CONSTRAINT "PK_2d27e6c7889d266be7f7c9c3830" PRIMARY KEY ("idtb_links"))`);
        await queryRunner.query(`ALTER TABLE "tb_links" ADD CONSTRAINT "FK_4172410286d41f3a4561bc19f7a" FOREIGN KEY ("idtb_users") REFERENCES "tb_users"("idtb_users") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_links" DROP CONSTRAINT "FK_4172410286d41f3a4561bc19f7a"`);
        await queryRunner.query(`DROP TABLE "tb_links"`);
    }

}
