import type { Request, Response } from "express";
import type StudentService from "../services/student.service.js";
import * as yup from "yup";
import type { Student } from "../entities/student.entity.js";

const studentSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default class StudentController {
  private service: StudentService;

  constructor(Service: StudentService) {
    this.service = Service;
  }
  async getStudents(req: Request, res: Response) {
    try {
      const response = await this.service.findStudents();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ error: "An error occourred on API!" });
    }
  }

  async getStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await this.service.findStudent(id);

      res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "STUDENT_NOT_FOUND") {
          return res.status(404).json({ error: "This ID doesnt exists!" });
        }

        return res.status(500).json({ error: "An Error Occourred on API!" });
      }
    }
  }

  async createStudent(req: Request, res: Response) {
    try {
      const validatedBody = await studentSchema.validate(req.body, {
        abortEarly: false,
      });
      const { name, email } = <Student>req.body;

      const response = await this.service.createStudent({ name, email });

      return res.status(201).json({ message: "Student created!", id: `${response.id}` });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        return res.status(400).json(e.errors);
      }
      if (e instanceof Error) {
        if (e.message === "STUDENT_HAS_EMAIL") {
          return res.status(409).json({ error: "Already have this Email" });
        }
      }

      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }

  async editStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = <Student>req.body;

      if (email) {
        const validatingEmail = await studentSchema.validateAt(
          "email",
          { email },
          { abortEarly: false },
        );
      }

      const response = await this.service.editStudent(id, { name, email });

      return res.status(200).json({ message: "Student edited!" });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        return res.status(400).json(e.errors);
      }
      if (e instanceof Error) {
        if (e.message === "STUDENT_HAS_EMAIL") {
          return res.status(409).json({ error: "Already have this Email" });
        }
        if (e.message === "STUDENT_NOT_FOUND") {
          return res.status(404).json({ error: "This ID doesnt exists!"})
        }
      }

      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.service.deleteStudent(id);

      return res.status(200).json({ message: "Student deleted!" });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "STUDENT_NOT_FOUND") {
          return res.status(404).json({ error: "This ID doesnt exists!" });
        }
      }

      return res.status(500).json({ error: "An Error Occourred on API!" });
    }
  }
}
