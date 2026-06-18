import { Course } from "../entities/course.entity.js";
import type CourseRepository from "../repository/course.repository.js";

export default class CourseService {
  private repository: CourseRepository;

  constructor(Repository: CourseRepository) {
    this.repository = Repository;
  }

  async findCourses() {
    return await this.repository.getCourses();
  }

  async findCourse(id: number) {
    const isExists = await this.repository.getCourse(id);

    if (!isExists) {
      throw new Error("COURSE_NOT_FOUND");
    }

    return isExists;
  }

  async createCourse(dto: {
    title: string;
    category: string;
    description: string;
  }) {
    const newCourse = new Course();

    newCourse.title = dto.title;
    newCourse.category = dto.category;
    newCourse.description = dto.description;

    return this.repository.createCourse(newCourse);
  }

  async editCourse(
    id: number,
    dto: { title: string; category: string; description: string },
  ) {
    const updatedCourse = await this.repository.getCourse(id);
    if (!updatedCourse) {
      throw new Error("COURSE_NOT_FOUND");
    }

    if (dto.title) {
      updatedCourse.title = dto.title;
    }
    if (dto.category) {
      updatedCourse.category = dto.category;
    }
    if (dto.description) {
      updatedCourse.description = dto.description;
    }

    await this.repository.editCourse(id, updatedCourse);
  }

  async deleteCourse(id: number) {
    const isExists = await this.repository.getCourse(id);

    if (!isExists) {
      throw new Error("COURSE_NOT_FOUND");
    }

    await this.repository.deleteCourse(id);
  }
}
