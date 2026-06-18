import type { Course } from "../../entities/course.entity.js";

export default interface courseInterface {
  getCourses(): Array<Course> | Promise<Course[]>;
  getCourse(id: number): Course | Promise<Course | null>;
  createCourse(course: Course): void | Promise<Course>;
  editCourse(id: number, newCourse: Course): void | Promise<void>;
  deleteCourse(id: number): void | Promise<void>;
}
