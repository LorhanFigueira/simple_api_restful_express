import { type MigrationInterface, type QueryRunner } from "typeorm";

export class EnrollmentCreating1780769297821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO enrollment("studentId", "courseId")
            VALUES('6','5');
            `,
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
