import {MigrationInterface, QueryRunner} from "typeorm";

export class createWords1651208282359 implements MigrationInterface {
    name = 'createWords1651208282359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`words\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_975efd50047f02b2266a8d8e9c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_975efd50047f02b2266a8d8e9c\` ON \`words\``);
        await queryRunner.query(`DROP TABLE \`words\``);
    }

}
