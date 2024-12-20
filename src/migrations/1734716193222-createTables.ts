import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1734716193222 implements MigrationInterface {
    name = 'CreateTables1734716193222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "empresa" ("idempresa" uuid NOT NULL DEFAULT uuid_generate_v4(), "txnome_empresa" character varying NOT NULL, "logo_url" character varying NOT NULL, "dtoperacao_inclusao" TIMESTAMP NOT NULL DEFAULT now(), "dtoperacao_alteracao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75856e05396dc933fa9f6167924" PRIMARY KEY ("idempresa"))`);
        await queryRunner.query(`CREATE TABLE "layout" ("idlayout" uuid NOT NULL DEFAULT uuid_generate_v4(), "layout_html" text NOT NULL, "schema" json, "dtoperacao_inclusao" TIMESTAMP NOT NULL DEFAULT now(), "dtoperacao_alteracao" TIMESTAMP NOT NULL DEFAULT now(), "idempresa" uuid, CONSTRAINT "PK_9cbddb84177b5d9bf021d7535f8" PRIMARY KEY ("idlayout"))`);
        await queryRunner.query(`CREATE TABLE "chave_de_acesso" ("idchave_de_acesso" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_acesso" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT false, "dtoperacao_inclusao" TIMESTAMP NOT NULL DEFAULT now(), "dtoperacao_alteracao" TIMESTAMP NOT NULL DEFAULT now(), "idempresa" uuid, CONSTRAINT "REL_cc7a806ba705ba821e3a41c6a3" UNIQUE ("idempresa"), CONSTRAINT "PK_81fa7c21a076222c80d7728a07d" PRIMARY KEY ("idchave_de_acesso"))`);
        await queryRunner.query(`ALTER TABLE "layout" ADD CONSTRAINT "FK_2ac7786bcf67da0708edca2df18" FOREIGN KEY ("idempresa") REFERENCES "empresa"("idempresa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chave_de_acesso" ADD CONSTRAINT "FK_cc7a806ba705ba821e3a41c6a33" FOREIGN KEY ("idempresa") REFERENCES "empresa"("idempresa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chave_de_acesso" DROP CONSTRAINT "FK_cc7a806ba705ba821e3a41c6a33"`);
        await queryRunner.query(`ALTER TABLE "layout" DROP CONSTRAINT "FK_2ac7786bcf67da0708edca2df18"`);
        await queryRunner.query(`DROP TABLE "chave_de_acesso"`);
        await queryRunner.query(`DROP TABLE "layout"`);
        await queryRunner.query(`DROP TABLE "empresa"`);
    }

}
