import { type MigrationInterface, type QueryRunner } from "typeorm";

export class CourseContent1779825253989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO course(title, category, description)
            VALUES
            ('Programming I','Logic','Hello World & Boolean'),
            ('SQlite: Fundaments','Data Science','Discover how to make a simple Query on Sqlite.'),
            ('Programming II','Logic','Function & Derivates')
            `,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
