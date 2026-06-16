import type { Enrollment } from "../../entities/enrollment.entity.js";

export default interface EnrollmentInterface {
    getEnrollments(): Array<Enrollment> | Promise<Enrollment[]>
    getEnrollment(id: number): Enrollment | Promise<any>
    enrollStudent(newEnrollment: Enrollment): void | Promise<void>
    editEnrollment(id: number, editedEnrollment: Enrollment): void | Promise<void>
    deleteEnrollment(id: number): void | Promise<void> 

    findSiblings(student: string, course: number): Enrollment | Promise<any>
}