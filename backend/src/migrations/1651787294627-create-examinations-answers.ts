import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExaminationsAnswers1651787294627
  implements MigrationInterface
{
  name = 'createExaminationsAnswers1651787294627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`examinations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`remembered_at\` datetime NULL, \`answered_at\` datetime NULL, \`created_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`position\` int NOT NULL, \`examination_id\` int NULL, UNIQUE INDEX \`IDX_d32b2bd0b847f0dceeedf8465c\` (\`examination_id\`, \`position\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`examinations_words\` (\`examination_id\` int NOT NULL, \`word_id\` int NOT NULL, INDEX \`IDX_443488b793d0dcd4a2b39fd875\` (\`examination_id\`), INDEX \`IDX_4ac2e9bcf81c974035f7df65fc\` (\`word_id\`), PRIMARY KEY (\`examination_id\`, \`word_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_baa2a4992b35d75732153a4a371\` FOREIGN KEY (\`examination_id\`) REFERENCES \`examinations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`examinations_words\` ADD CONSTRAINT \`FK_443488b793d0dcd4a2b39fd8751\` FOREIGN KEY (\`examination_id\`) REFERENCES \`examinations\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`examinations_words\` ADD CONSTRAINT \`FK_4ac2e9bcf81c974035f7df65fc8\` FOREIGN KEY (\`word_id\`) REFERENCES \`words\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`examinations_words\` DROP FOREIGN KEY \`FK_4ac2e9bcf81c974035f7df65fc8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`examinations_words\` DROP FOREIGN KEY \`FK_443488b793d0dcd4a2b39fd8751\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_baa2a4992b35d75732153a4a371\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4ac2e9bcf81c974035f7df65fc\` ON \`examinations_words\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_443488b793d0dcd4a2b39fd875\` ON \`examinations_words\``,
    );
    await queryRunner.query(`DROP TABLE \`examinations_words\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d32b2bd0b847f0dceeedf8465c\` ON \`answers\``,
    );
    await queryRunner.query(`DROP TABLE \`answers\``);
    await queryRunner.query(`DROP TABLE \`examinations\``);
  }
}
