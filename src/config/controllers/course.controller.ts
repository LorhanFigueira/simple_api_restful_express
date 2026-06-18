import type { Request, Response } from "express";
import type CourseService from "../services/course.service.js";

export default class CourseController {
  private service: CourseService;

  constructor(Service: CourseService) {
    this.service = Service;
  }

  async getCourses(req: Request, res: Response) {
    try {
      const response = await this.service.findCourses();
      if (response.length <= 0) {
        return res.status(204);
      }
      return res.status(200).json(response);
    } catch (_e) {
      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }

  async getCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await this.service.findCourse(Number(id));

      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "COURSE_NOT_FOUND") {
          return res.status(404).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }

  async createCourse(req: Request, res: Response) {
    try {
      const { title, category, description } = req.body;

      if (title.length < 3) {
        return res
          .status(400)
          .json({ error: "Isnt allowed 3 characters. try again!" });
      }
      const response = await this.service.createCourse({
        title,
        category,
        description,
      });

      return res
        .status(201)
        .json({ message: "Course created! check on Courses List!", id: `${response.id}` });
    } catch (_error) {
      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }

  async editCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, category, description } = req.body;

      if (title.length < 3) {
        return res
          .status(400)
          .json({ error: "Isnt allowed 3 characters. try again!" });
      }

        await this.service.editCourse(Number(id), {
        title,
        category,
        description,
      });

      return res.status(200).json({ message: "Course Edited!" });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "COURSE_NOT_FOUND") {
          return res.status(404).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }

  async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.service.deleteCourse(Number(id));

      res.status(200).json({ message: "Course deleted!" });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "COURSE_NOT_FOUND") {
          return res.status(404).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }
}
