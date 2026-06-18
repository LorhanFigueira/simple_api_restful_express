import type { Repository } from "typeorm";
import type { Student } from "../entities/student.entity.js";
import type studentInterface from "./interface/student.interface.js";

export default class StudentRepository implements studentInterface {
  private repository: Repository<Student>;

  constructor(Repository: Repository<Student>) {
    this.repository = Repository;
  }
  async getStudents(): Promise<Student[]> {
    return await this.repository.find();
  }
  async getStudent(id: string): Promise<Student | null> {
    return await this.repository.findOne({ where: { id: id } });
  }
  createStudent(student: Student): Promise<Student> {
    return this.repository.save(student);
  }
  async editStudent(id: string, newStudent: Student): Promise<void> {
    const editedStudent = await this.getStudent(id);

    if (!editedStudent) {
      throw new Error("STUDENT_NOT_FOUND");
    }
    Object.assign(editedStudent, newStudent);
    await this.repository.save(editedStudent);
  }
  deleteStudent(id: string): void | Promise<void> {
    this.repository.delete(id);
  }

  async findEmail(email: string): Promise<Student | null> {
    return await this.repository.findOne({ where: { email: email } });
  }
}
