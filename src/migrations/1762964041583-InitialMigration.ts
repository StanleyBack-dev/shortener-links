import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762964041583 implements MigrationInterface {
    name = 'InitialMigration1762964041583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_users_auth" ("idtb_users_auth" SERIAL NOT NULL, "idtb_users" integer NOT NULL, "access_token" text, "refresh_token" text, "ip_address" character varying NOT NULL, "user_agent" character varying NOT NULL, "device_name" character varying NOT NULL, "is_revoked" boolean NOT NULL DEFAULT false, "session_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "refresh_token_expires_at" TIMESTAMP, "revoked_at" TIMESTAMP, "last_used_at" TIMESTAMP, CONSTRAINT "PK_143d497d024df6ddc20743d5a89" PRIMARY KEY ("idtb_users_auth"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("idtb_users" SERIAL NOT NULL, "public_idtb_users" character varying NOT NULL, "username" character varying(25) NOT NULL, "password" character varying NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "document_number" character varying(30) NOT NULL, "phone" character varying(20) NOT NULL, "first_access" boolean NOT NULL DEFAULT true, "status" boolean NOT NULL DEFAULT true, "last_access_at" TIMESTAMP NOT NULL, "inactivated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9180ece6a2465186a83ce6bf853" UNIQUE ("public_idtb_users"), CONSTRAINT "UQ_4402e5176d3d51b228b3466d07e" UNIQUE ("username"), CONSTRAINT "UQ_426777401c54326f2b8222662b1" UNIQUE ("document_number"), CONSTRAINT "PK_584c46109e65c8471a151d97829" PRIMARY KEY ("idtb_users"))`);
        await queryRunner.query(`ALTER TABLE "tb_users_auth" ADD CONSTRAINT "FK_a67b58f6d300c6f5e4003655421" FOREIGN KEY ("idtb_users") REFERENCES "tb_users"("idtb_users") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users_auth" DROP CONSTRAINT "FK_a67b58f6d300c6f5e4003655421"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "tb_users_auth"`);
    }

}
