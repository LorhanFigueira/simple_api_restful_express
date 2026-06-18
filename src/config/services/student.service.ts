import { Student } from "../entities/student.entity.js";
import type studentRepository from "../repository/student.repository.js";

export default class StudentService {
  private repository: studentRepository;

  constructor(Repository: studentRepository) {
    this.repository = Repository;
  }

  async findStudents() {
    return await this.repository.getStudents();
  }

  async findStudent(id: string) {
    const findingUser = await this.repository.getStudent(id);

    if (!findingUser) {
      throw new Error("STUDENT_NOT_FOUND");
    }

    return findingUser;
  }

  async createStudent(dto: {name: string; email: string}) {
    const hasEmail = await this.repository.findEmail(dto.email);

    if (hasEmail) {
      throw new Error("STUDENT_HAS_EMAIL");
    }

    const newStudent = new Student();

    newStudent.name = dto.name;
    newStudent.email = dto.email;

    return this.repository.createStudent(newStudent);
  }

  async editStudent(id: string, dto: {name: string; email: string}) {
    const student = await this.repository.getStudent(id);

    if (!student) {
      throw new Error("STUDENT_NOT_FOUND")
    }
    if (dto.name) {
      student.name = dto.name;
    }
    if (dto.email) {  
      const emailExists = await this.repository.findEmail(dto.email)

      if (emailExists){
        throw new Error("STUDENT_HAS_EMAIL")
      }
      student.email = dto.email;
    }

    this.repository.editStudent(id, student);
  }

  async deleteStudent(id: string) {
    const student = await this.repository.getStudent(id);

    if (!student) {
      throw new Error("STUDENT_NOT_FOUND");
    }

    this.repository.deleteStudent(id);
  }
}
