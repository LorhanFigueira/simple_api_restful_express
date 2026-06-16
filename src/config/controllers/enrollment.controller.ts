import type { Request, Response } from "express";
import type EnrollmentService from "../services/enrollment.service.js";
import * as yup from "yup";
import type { Enrollment } from "../entities/enrollment.entity.js";

const EnrollmentSchema = yup.object({
  student: yup.string().required("Student ID Required"),
  course: yup.number().required("Course ID Required"),
});

export default class EnrollmentController {
  private service: EnrollmentService;

  constructor(Service: EnrollmentService) {
    this.service = Service;
  }

  async findEnrollments(req: Request, res: Response) {
    try {
      const response = await this.service.getEnrollments();

      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ message: "An error occourred on API!" });
    }
  }

  async findEnrollment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await this.service.getEnrollment(id);

      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "ENROLLMENT_NOT_FOUND") {
          return res.status(400).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An error occourred on API!" });
    }
  }

  async enrollStudent(req: Request, res: Response) {
    try {
      const { student, course } = <Enrollment>req.body;

      const validatingEnrollment = await EnrollmentSchema.validate(req.body, {
        abortEarly: false,
      });

      await this.service.enrollStudent({ student, course });

      return res.status(201).json({ message: "Student enrolled!" });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        return res.status(400).json(e.errors);
      }
      if (e instanceof Error) {
        if (e.message === "SIBLINGS_FOUND") {
          return res
            .status(409)
            .json({ error: "This student is already attending this course!" });
        }
      }

      return res.status(500).json({ error: "An error occourred on API!" + e });
    }
  }

  async editEnroll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { student, course } = <Enrollment>req.body;

      await this.service.editEnrollment(id, {
        student,
        course,
      });

      return res.status(200).json({ message: "Enrollment edited!" });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "SIBLINGS_FOUND") {
          return res
            .status(409)
            .json({ error: "This student is already attending this course!" });
        }
        if (e.message === "ENROLLMENT_NOT_FOUND") {
          return res.status(400).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An error occourred on API!" });
    }
  }

  async deleteEnroll(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.service.deleteEnrollment(id);

      return res.status(200).json({ message: "Enrollment deleted!" });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "ENROLLMENT_NOT_FOUND") {
          return res.status(400).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An error occourred on API!" });
    }
  }
}
