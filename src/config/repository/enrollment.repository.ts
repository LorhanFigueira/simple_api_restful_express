import type { Repository } from "typeorm";
import type { Enrollment } from "../entities/enrollment.entity.js";
import type EnrollmentInterface from "./interface/enrollment.interface.js";

export default class EnrollmentRepository implements EnrollmentInterface {
  private repository: Repository<Enrollment>;

  constructor(Repository: Repository<Enrollment>) {
    this.repository = Repository;
  }
  async getEnrollments(): Promise<Enrollment[]> {
    return await this.repository.find({
      relations: { student: true, course: true },
    });
  }
  async getEnrollment(id: number): Promise<Enrollment | null> {
    return await this.repository.findOne({
      where: { id: id },
      relations: { student: true, course: true },
    });
  }
  enrollStudent(newEnrollment: Enrollment): Promise<Enrollment> {
    return this.repository.save(newEnrollment);
  }
  async editEnrollment(
    id: number,
    editedEnrollment: Enrollment,
  ): Promise<void> {
    const editedEnroll = await this.getEnrollment(id);

    if (!editedEnroll) {
      throw new Error("ENROLLMENT_NOT_FOUND");
    }
    Object.assign(editedEnroll, editedEnrollment);
    await this.repository.save(editedEnroll);
  }
  deleteEnrollment(id: number): void | Promise<void> {
    this.repository.delete(id);
  }

  async findSiblings(student: string, course: number): Promise<Enrollment | null> {
    return await this.repository.findOne({
      where: { student: { id: student }, course: { id: course } },
    });
  }
}
