import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1704664339546 implements MigrationInterface {
    name = 'Book1704664339546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`book\``);
    }

}
