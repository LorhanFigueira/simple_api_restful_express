import { Enrollment } from "../entities/enrollment.entity.js";
import type EnrollmentRepository from "../repository/enrollment.repository.js";

export default class EnrollmentService {
  private repository: EnrollmentRepository;

  constructor(Repository: EnrollmentRepository) {
    this.repository = Repository;
  }

  async getEnrollments() {
    return await this.repository.getEnrollments();
  }

  async getEnrollment(id: any) {
    const exists = await this.repository.getEnrollment(id);

      if(!exists){
        throw new Error("ENROLLMENT_NOT_FOUND")
      }

    return exists
  }

  async enrollStudent(dto: any) {  
    const isSiblings = await this.repository.findSiblings(dto.student, dto.course);

    if (isSiblings) {
      throw new Error("SIBLINGS_FOUND");
    }

    const newEnrollment = new Enrollment();
    newEnrollment.student = dto.student;
    newEnrollment.course = dto.course;

    await this.repository.enrollStudent(newEnrollment);
  }

  async editEnrollment(id: any, dto: any) {
    const isReal = await this.repository.getEnrollment(id);

    if (!isReal) {
      throw new Error("ENROLLMENT_NOT_FOUND");
    }

    const isSiblings = await this.repository.findSiblings(dto.student, dto.course);

    if (isSiblings) {
      throw new Error("SIBLINGS_FOUND");
    }

    if (dto.student) {
      isReal.student = dto.student;
    }
    if (dto.course) {
      isReal.course = dto.course;
    }

    await this.repository.editEnrollment(id, isReal);
  }

  async deleteEnrollment(id: any) {
    const isReal = this.repository.getEnrollment(id);

    if (!isReal) {
      throw new Error("ENROLLMENT_NOT_FOUND");
    }

    await this.repository.deleteEnrollment(id);
  }
}
