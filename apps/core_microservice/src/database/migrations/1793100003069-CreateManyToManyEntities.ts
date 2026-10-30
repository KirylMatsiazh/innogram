import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateManyToManyEntities1793100003069 implements MigrationInterface {
    name = 'CreateManyToManyEntities1793100003069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "main"."chats_participants" ("id" character varying(36) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'member', "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "left_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "profile_id" character varying(36) NOT NULL, "chat_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_e35913d87eff79d4430313e0b1b" UNIQUE ("profile_id", "chat_id"), CONSTRAINT "PK_bb39212ca0dee99682bd6904cdd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."comments_likes" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comment_id" character varying(36) NOT NULL, "profile_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_9a8c3cd3bd75b88739122a8ad59" UNIQUE ("comment_id", "profile_id"), CONSTRAINT "PK_76e988dd40034228052b54157cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."messages_assets" ("id" character varying(36) NOT NULL, "order_index" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "message_id" character varying(36) NOT NULL, "asset_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_92ea43d89895e77cb318982e49b" UNIQUE ("message_id", "asset_id"), CONSTRAINT "PK_4d47a1f95626bec47fa39c0bdd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."posts_assets" ("id" character varying(36) NOT NULL, "order_index" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "post_id" character varying(36) NOT NULL, "asset_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_1188729b8baab72f24202b316ea" UNIQUE ("post_id", "asset_id"), CONSTRAINT "PK_c09218a1fdc5f87ee3dd32a8562" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."posts_likes" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "post_id" character varying(36) NOT NULL, "profile_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_327119983a4164ea0c937df1f43" UNIQUE ("post_id", "profile_id"), CONSTRAINT "PK_2038d34048d51b766bca272ff5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."profiles_follows" ("id" character varying(36) NOT NULL, "accepted" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "follower_profile_id" character varying(36) NOT NULL, "followed_profile_id" character varying(36) NOT NULL, "created_by" character varying(36) NOT NULL, "updated_by" character varying(36), CONSTRAINT "UQ_32580493d46f0f04500d87560ee" UNIQUE ("follower_profile_id", "followed_profile_id"), CONSTRAINT "CHK_650e6aa71580c9a8aac210ce80" CHECK (follower_profile_id != followed_profile_id), CONSTRAINT "PK_2afda6a64450b244f2afc2340f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_68021766bd3dd7f7fb71c3273bc" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_1511c4daef0688dfba61bbc2021" FOREIGN KEY ("chat_id") REFERENCES "main"."chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_fadc00553d81a7a1f7271a4ed89" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_0aab09d1a1d52910cbdf97c6d1c" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_fab744c7db7ccbe1ded65166d73" FOREIGN KEY ("comment_id") REFERENCES "main"."comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_1e3f43ccd0f517f3d248b952834" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_87fdb6dc15818b1c5178d3320cb" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_29029678099aef7c8e4b00cd3ad" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_d8d48ea4985e94a520b2159f3af" FOREIGN KEY ("message_id") REFERENCES "main"."messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_27f4e06be67fbe5888840b5ab39" FOREIGN KEY ("asset_id") REFERENCES "main"."assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_a29562b77385ce3573cf47ce5b2" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_3cb385c17b260de104cc81398cd" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_af7c44cddba02664bdd375707c4" FOREIGN KEY ("post_id") REFERENCES "main"."posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_e14e8b24da991d85f9ba90465b8" FOREIGN KEY ("asset_id") REFERENCES "main"."assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_487941f5f655edddc6874166ea6" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_fecb822cac17c2af443334ed48b" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_6faf9115f9ab73dd332d218e9ba" FOREIGN KEY ("post_id") REFERENCES "main"."posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_87047bfd925f32570f16d9ceec0" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_c3308950aabebe521fe88c9ad47" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_1783d2bf6ceea78827c0c267463" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_722f4fb48096271c96380c6278c" FOREIGN KEY ("follower_profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_90bd341302feb51c5eaa57aab32" FOREIGN KEY ("followed_profile_id") REFERENCES "main"."profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_08c99c39e9017ed5bedd7f97f68" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_60ebef205b7d70c7103f8ec6e3f" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_60ebef205b7d70c7103f8ec6e3f"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_08c99c39e9017ed5bedd7f97f68"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_90bd341302feb51c5eaa57aab32"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_722f4fb48096271c96380c6278c"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_1783d2bf6ceea78827c0c267463"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_c3308950aabebe521fe88c9ad47"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_87047bfd925f32570f16d9ceec0"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_6faf9115f9ab73dd332d218e9ba"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_fecb822cac17c2af443334ed48b"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_487941f5f655edddc6874166ea6"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_e14e8b24da991d85f9ba90465b8"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_af7c44cddba02664bdd375707c4"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_3cb385c17b260de104cc81398cd"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_a29562b77385ce3573cf47ce5b2"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_27f4e06be67fbe5888840b5ab39"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_d8d48ea4985e94a520b2159f3af"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_29029678099aef7c8e4b00cd3ad"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_87fdb6dc15818b1c5178d3320cb"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_1e3f43ccd0f517f3d248b952834"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_fab744c7db7ccbe1ded65166d73"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_0aab09d1a1d52910cbdf97c6d1c"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_fadc00553d81a7a1f7271a4ed89"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_1511c4daef0688dfba61bbc2021"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_68021766bd3dd7f7fb71c3273bc"`);
        await queryRunner.query(`DROP TABLE "main"."profiles_follows"`);
        await queryRunner.query(`DROP TABLE "main"."posts_likes"`);
        await queryRunner.query(`DROP TABLE "main"."posts_assets"`);
        await queryRunner.query(`DROP TABLE "main"."messages_assets"`);
        await queryRunner.query(`DROP TABLE "main"."comments_likes"`);
        await queryRunner.query(`DROP TABLE "main"."chats_participants"`);
    }

}
