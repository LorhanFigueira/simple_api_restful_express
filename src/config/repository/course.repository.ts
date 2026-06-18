import type { Repository } from "typeorm";
import type { Course } from "../entities/course.entity.js";
import type courseInterface from "./interface/course.interface.js";

export default class CourseRepository implements courseInterface {
  private repository: Repository<Course>;

  constructor(Repository: Repository<Course>) {
    this.repository = Repository;
  }
  async getCourses(): Promise<Course[]> {
    return await this.repository.find();
  }
  async getCourse(id: number): Promise<Course | null> {
    return await this.repository.findOne({ where: { id: id } });
  }
  async createCourse(course: Course): Promise<Course> {
    return this.repository.save(course);
  }
  async editCourse(id: number, newCourse: Course): Promise<void> {
    const oldCourse = await this.getCourse(id);
    if (!oldCourse){
      throw new Error('COURSE_NOT_FOUND')
    }
    Object.assign(oldCourse, newCourse);
    this.repository.save(oldCourse);
  }
  deleteCourse(id: number): void | Promise<void> {
    this.repository.delete(id)
  }
}
