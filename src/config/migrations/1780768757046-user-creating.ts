import { type MigrationInterface, type QueryRunner } from "typeorm";

export class UserCreating1780768757046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO student(name, email)
            VALUES
            ('Rodrigo','rodrigo@g.com'),
            ('Renata','renata@g.com'),
            ('Fernanda','fer@g.com'),
            ('Pedro','pedro@g.com'),
            ('Leticia','leticia@g.com')
            `,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
