import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
import { Course } from "../entities/course.entity.js";
import { CourseContent1779825253989 } from "../migrations/1779825253989-course_content.js";
import { Student } from "../entities/student.entity.js";
import { Enrollment } from "../entities/enrollment.entity.js";
import { UserCreating1780768757046 } from "../migrations/1780768757046-user-creating.js";
import { EnrollmentCreating1780769297821 } from "../migrations/1780769297821-enrollment_creating.js";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: `${process.env.HOST}`,
  port: process.env.DB_PORT as any,
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PW}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: [Course, Student, Enrollment],

  migrationsRun: false, // make it true after creating the tables
  migrations: [
    CourseContent1779825253989,
    UserCreating1780768757046,
    EnrollmentCreating1780769297821,
  ],

  synchronize: true
});

export default AppDataSource;
