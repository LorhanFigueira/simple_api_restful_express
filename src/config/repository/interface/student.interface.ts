import type { Student } from "../../entities/student.entity.js";

export default interface studentInterface {
  getStudents(): Array<Student> | Promise<Student[]>;
  getStudent(id: string): Student | Promise<Student | null>;
  createStudent(student: Student): void | Promise<Student>;
  editStudent(id: string, newStudent: Student): void | Promise<void>;
  deleteStudent(id: string): void | Promise<void>;

  findEmail(email: string): void | Promise<Student | null>
}
