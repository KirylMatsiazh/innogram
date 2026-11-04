import type { MigrationInterface, QueryRunner } from 'typeorm'; // why type?????

export class CreateSchemas1792592453623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('auth');
        await queryRunner.createSchema('main');
        await queryRunner.createSchema('notification');
    }

    public async down(queryRunner: QueryRunner): Promise<void> { //Dropping schemas with data will fail without CASCADE.
        await queryRunner.dropSchema('notification');
        await queryRunner.dropSchema('main');
        await queryRunner.dropSchema('auth'); // Reverse order is necessary in case of objects depending on one another.
    }

}

// Using multiple SQL statements in one queryRunner.query() call
// can depend on the driver and query execution settings,
// so separate schema operations are a cleaner choice.