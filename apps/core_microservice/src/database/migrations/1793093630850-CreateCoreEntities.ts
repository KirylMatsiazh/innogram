import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCoreEntities1793093630850 implements MigrationInterface {
    name = 'CreateCoreEntities1793093630850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" character varying(36) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'User', "disabled" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "created_by" character varying(36), "updated_by" character varying(36), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."assets" ("id" character varying(36) NOT NULL, "file_name" character varying(255) NOT NULL, "file_path" character varying(500) NOT NULL, "file_type" character varying(100) NOT NULL, "file_size" integer NOT NULL, "order_index" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."accounts" ("id" character varying(36) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "provider" character varying(20) NOT NULL DEFAULT 'local', "provider_id" character varying(255), "last_login_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "user_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."chats" ("id" character varying(36) NOT NULL, "name" character varying(100) NOT NULL, "description" text, "type" character varying(20) NOT NULL DEFAULT 'private', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."profiles" ("id" character varying(36) NOT NULL, "username" character varying(50) NOT NULL, "display_name" character varying(100) NOT NULL, "birthday" date NOT NULL, "bio" text, "avatar_url" character varying(500), "is_public" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "user_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_d1ea35db5be7c08520d70dc03f8" UNIQUE ("username"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."posts" ("id" character varying(36) NOT NULL, "content" text NOT NULL, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "profile_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."comments" ("id" character varying(36) NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "post_id" character varying(36) NOT NULL, "profile_id" character varying(36) NOT NULL, "parent_comment_id" character varying(36), "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."messages" ("id" character varying(36) NOT NULL, "content" text NOT NULL, "is_edited" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "chat_id" character varying(36) NOT NULL, "profile_id" character varying(36) NOT NULL, "reply_to_message_id" character varying(36), "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."assets" ADD CONSTRAINT "FK_dccd1dbe2c036b9ab80876466b7" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."assets" ADD CONSTRAINT "FK_33ccc969d319ef2cb1d7c9eb4d3" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."accounts" ADD CONSTRAINT "FK_6ce484b7743042752cdecc41c99" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."accounts" ADD CONSTRAINT "FK_0dbe5e3689179dacc7c44c46d99" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats" ADD CONSTRAINT "FK_d3d5c049f59f0f7266900e6adc1" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats" ADD CONSTRAINT "FK_527dde285214de9064681188cb5" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles" ADD CONSTRAINT "FK_df9e4616cf01cd126786dcddb1a" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles" ADD CONSTRAINT "FK_a848ae853075ee4ab0d69f58fa2" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts" ADD CONSTRAINT "FK_9dbc2524c6f46641f5e7d107da1" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts" ADD CONSTRAINT "FK_5e508187fcc1b87d59e3673c766" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts" ADD CONSTRAINT "FK_632ba45f2301a61ca96d6ac2a74" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "main"."posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments" ADD CONSTRAINT "FK_6b5b121879fe056a71e8e0915c2" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments" ADD CONSTRAINT "FK_93ce08bdbea73c0c7ee673ec35a" FOREIGN KEY ("parent_comment_id") REFERENCES "main"."comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments" ADD CONSTRAINT "FK_980bfefe00ed11685f325d0bd4c" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments" ADD CONSTRAINT "FK_0c865c87e7c7d3274f83b671771" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages" ADD CONSTRAINT "FK_7540635fef1922f0b156b9ef74f" FOREIGN KEY ("chat_id") REFERENCES "main"."chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages" ADD CONSTRAINT "FK_f027d31c266699d0dae4366252b" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages" ADD CONSTRAINT "FK_7f87cbb925b1267778a7f4c5d67" FOREIGN KEY ("reply_to_message_id") REFERENCES "main"."messages"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages" ADD CONSTRAINT "FK_4d025b3431171ff016586ba81ad" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages" ADD CONSTRAINT "FK_bd66b84a312d9bf0e64b2e81902" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main"."messages" DROP CONSTRAINT "FK_bd66b84a312d9bf0e64b2e81902"`);
        await queryRunner.query(`ALTER TABLE "main"."messages" DROP CONSTRAINT "FK_4d025b3431171ff016586ba81ad"`);
        await queryRunner.query(`ALTER TABLE "main"."messages" DROP CONSTRAINT "FK_7f87cbb925b1267778a7f4c5d67"`);
        await queryRunner.query(`ALTER TABLE "main"."messages" DROP CONSTRAINT "FK_f027d31c266699d0dae4366252b"`);
        await queryRunner.query(`ALTER TABLE "main"."messages" DROP CONSTRAINT "FK_7540635fef1922f0b156b9ef74f"`);
        await queryRunner.query(`ALTER TABLE "main"."comments" DROP CONSTRAINT "FK_0c865c87e7c7d3274f83b671771"`);
        await queryRunner.query(`ALTER TABLE "main"."comments" DROP CONSTRAINT "FK_980bfefe00ed11685f325d0bd4c"`);
        await queryRunner.query(`ALTER TABLE "main"."comments" DROP CONSTRAINT "FK_93ce08bdbea73c0c7ee673ec35a"`);
        await queryRunner.query(`ALTER TABLE "main"."comments" DROP CONSTRAINT "FK_6b5b121879fe056a71e8e0915c2"`);
        await queryRunner.query(`ALTER TABLE "main"."comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "main"."posts" DROP CONSTRAINT "FK_632ba45f2301a61ca96d6ac2a74"`);
        await queryRunner.query(`ALTER TABLE "main"."posts" DROP CONSTRAINT "FK_5e508187fcc1b87d59e3673c766"`);
        await queryRunner.query(`ALTER TABLE "main"."posts" DROP CONSTRAINT "FK_9dbc2524c6f46641f5e7d107da1"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles" DROP CONSTRAINT "FK_a848ae853075ee4ab0d69f58fa2"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles" DROP CONSTRAINT "FK_df9e4616cf01cd126786dcddb1a"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "main"."chats" DROP CONSTRAINT "FK_527dde285214de9064681188cb5"`);
        await queryRunner.query(`ALTER TABLE "main"."chats" DROP CONSTRAINT "FK_d3d5c049f59f0f7266900e6adc1"`);
        await queryRunner.query(`ALTER TABLE "auth"."accounts" DROP CONSTRAINT "FK_0dbe5e3689179dacc7c44c46d99"`);
        await queryRunner.query(`ALTER TABLE "auth"."accounts" DROP CONSTRAINT "FK_6ce484b7743042752cdecc41c99"`);
        await queryRunner.query(`ALTER TABLE "auth"."accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`);
        await queryRunner.query(`ALTER TABLE "main"."assets" DROP CONSTRAINT "FK_33ccc969d319ef2cb1d7c9eb4d3"`);
        await queryRunner.query(`ALTER TABLE "main"."assets" DROP CONSTRAINT "FK_dccd1dbe2c036b9ab80876466b7"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c"`);
        await queryRunner.query(`DROP TABLE "main"."messages"`);
        await queryRunner.query(`DROP TABLE "main"."comments"`);
        await queryRunner.query(`DROP TABLE "main"."posts"`);
        await queryRunner.query(`DROP TABLE "main"."profiles"`);
        await queryRunner.query(`DROP TABLE "main"."chats"`);
        await queryRunner.query(`DROP TABLE "auth"."accounts"`);
        await queryRunner.query(`DROP TABLE "main"."assets"`);
        await queryRunner.query(`DROP TABLE "auth"."users"`);
    }

}
